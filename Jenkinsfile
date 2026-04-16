pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        booleanParam(name: 'PUSH_IMAGES', defaultValue: true, description: 'Push backend and frontend images to the configured registry.')
        booleanParam(name: 'DEPLOY_STACK', defaultValue: false, description: 'Deploy the 3-service stack after a successful build.')
        booleanParam(name: 'RUN_MIGRATIONS', defaultValue: true, description: 'Run Laravel database migrations after deployment.')
        booleanParam(name: 'RUN_SMOKE_TESTS', defaultValue: true, description: 'Run frontend and backend smoke tests after deployment.')
        stringParam(name: 'DOCKER_REGISTRY', defaultValue: 'ghcr.io', description: 'Container registry hostname.')
        stringParam(name: 'FRONTEND_IMAGE_REPO', defaultValue: 'math-olympiad/frontend', description: 'Frontend image repository path.')
        stringParam(name: 'BACKEND_IMAGE_REPO', defaultValue: 'math-olympiad/backend', description: 'Backend image repository path.')
        stringParam(name: 'MYSQL_IMAGE', defaultValue: 'mysql:8.4', description: 'MySQL image used by the deployment stack.')
        stringParam(name: 'DOCKER_REGISTRY_CREDENTIALS_ID', defaultValue: 'docker-registry-credentials', description: 'Jenkins username/password credential ID for the registry.')
        stringParam(name: 'DEPLOY_SSH_CREDENTIALS_ID', defaultValue: 'deploy-ssh-key', description: 'Jenkins SSH private key credential ID for deployment.')
        stringParam(name: 'DEPLOY_HOST', defaultValue: '', description: 'Target server hostname or IP for deployment.')
        stringParam(name: 'DEPLOY_PATH', defaultValue: '/opt/math-olympiad', description: 'Remote directory containing the deployment compose file.')
        stringParam(name: 'REMOTE_COMPOSE_FILE', defaultValue: 'docker-compose.yml', description: 'Compose file name on the target host.')
        stringParam(name: 'BACKEND_HEALTHCHECK_URL', defaultValue: 'http://localhost:8000/up', description: 'Backend health endpoint used for smoke testing.')
        stringParam(name: 'FRONTEND_HEALTHCHECK_URL', defaultValue: 'http://localhost:5173', description: 'Frontend URL used for smoke testing.')
    }

    environment {
        CI = 'true'
        COMPOSE_DOCKER_CLI_BUILD = '1'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Source Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Build Metadata') {
            steps {
                script {
                    env.GIT_SHA = sh(script: 'git rev-parse --short=8 HEAD', returnStdout: true).trim()
                    env.BRANCH_SLUG = (env.BRANCH_NAME ?: 'local').replaceAll('[^A-Za-z0-9_.-]', '-')
                    env.IMAGE_TAG = "${env.BRANCH_SLUG}-${env.BUILD_NUMBER}-${env.GIT_SHA}"
                    env.FRONTEND_IMAGE = "${params.DOCKER_REGISTRY}/${params.FRONTEND_IMAGE_REPO}:${env.IMAGE_TAG}"
                    env.BACKEND_IMAGE = "${params.DOCKER_REGISTRY}/${params.BACKEND_IMAGE_REPO}:${env.IMAGE_TAG}"

                    currentBuild.displayName = "#${env.BUILD_NUMBER} ${env.BRANCH_SLUG} ${env.GIT_SHA}"
                }
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'composer install --no-interaction --prefer-dist --optimize-autoloader'
                            sh 'if [ ! -f .env ]; then cp .env.example .env; fi'
                            sh 'php artisan key:generate --force'
                        }
                    }
                }

                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Backend Validation And Tests') {
            steps {
                dir('backend') {
                    sh 'vendor/bin/pint --test'
                    sh 'php artisan test --env=testing'
                }
            }
        }

        stage('Frontend Validation And Build') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    if (!fileExists('backend/Dockerfile')) {
                        error('Missing backend/Dockerfile required for the backend image build.')
                    }

                    if (!fileExists('frontend/Dockerfile')) {
                        error('Missing frontend/Dockerfile required for the frontend image build.')
                    }
                }

                sh 'docker build -t "$BACKEND_IMAGE" -f backend/Dockerfile .'
                sh 'docker build -t "$FRONTEND_IMAGE" -f frontend/Dockerfile .'
            }
        }

        stage('Push Docker Images') {
            when {
                expression {
                    return params.PUSH_IMAGES
                }
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: params.DOCKER_REGISTRY_CREDENTIALS_ID,
                        usernameVariable: 'REGISTRY_USERNAME',
                        passwordVariable: 'REGISTRY_PASSWORD'
                    )
                ]) {
                    sh 'echo "$REGISTRY_PASSWORD" | docker login "$DOCKER_REGISTRY" --username "$REGISTRY_USERNAME" --password-stdin'
                    sh 'docker push "$BACKEND_IMAGE"'
                    sh 'docker push "$FRONTEND_IMAGE"'
                    sh 'docker logout "$DOCKER_REGISTRY"'
                }
            }
        }

        stage('Deploy Stack') {
            when {
                expression {
                    return params.DEPLOY_STACK
                }
            }

            steps {
                script {
                    if (!params.PUSH_IMAGES) {
                        error('DEPLOY_STACK requires PUSH_IMAGES=true so the target host can pull the new images.')
                    }

                    if (!params.DEPLOY_HOST?.trim()) {
                        error('DEPLOY_HOST is required when DEPLOY_STACK=true.')
                    }
                }

                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: params.DEPLOY_SSH_CREDENTIALS_ID,
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    script {
                        def remoteHost = params.DEPLOY_HOST.trim()

                        sh """#!/bin/sh
set -eu
ssh -i \"$SSH_KEY\" -o StrictHostKeyChecking=no \"$SSH_USER@${remoteHost}\" <<'EOF'
set -eu
cd '${params.DEPLOY_PATH}'
export FRONTEND_IMAGE='${env.FRONTEND_IMAGE}'
export BACKEND_IMAGE='${env.BACKEND_IMAGE}'
export MYSQL_IMAGE='${params.MYSQL_IMAGE}'
docker compose -f '${params.REMOTE_COMPOSE_FILE}' pull frontend backend mysql
docker compose -f '${params.REMOTE_COMPOSE_FILE}' up -d frontend backend mysql
EOF
"""
                    }
                }
            }
        }

        stage('Run Database Migrations') {
            when {
                allOf {
                    expression {
                        return params.DEPLOY_STACK
                    }
                    expression {
                        return params.RUN_MIGRATIONS
                    }
                }
            }

            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: params.DEPLOY_SSH_CREDENTIALS_ID,
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    script {
                        def remoteHost = params.DEPLOY_HOST.trim()

                        sh """#!/bin/sh
set -eu
ssh -i \"$SSH_KEY\" -o StrictHostKeyChecking=no \"$SSH_USER@${remoteHost}\" <<'EOF'
set -eu
cd '${params.DEPLOY_PATH}'
docker compose -f '${params.REMOTE_COMPOSE_FILE}' exec -T backend php artisan migrate --force
EOF
"""
                    }
                }
            }
        }

        stage('Smoke Tests') {
            when {
                allOf {
                    expression {
                        return params.DEPLOY_STACK
                    }
                    expression {
                        return params.RUN_SMOKE_TESTS
                    }
                }
            }

            steps {
                sh 'curl --fail --silent --show-error "$BACKEND_HEALTHCHECK_URL" > /dev/null'
                sh 'curl --fail --silent --show-error "$FRONTEND_HEALTHCHECK_URL" > /dev/null'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully for ${env.IMAGE_TAG}."
        }

        failure {
            echo 'Pipeline failed. Follow the documented rollback process before promoting another release.'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}