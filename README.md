# Math Olympiad Management System

Laravel API, React frontend, and MySQL database with a 3-service Docker setup and Jenkins-ready CI/CD structure.

## Stack

- Frontend: React + Vite
- Backend: Laravel API
- Database: MySQL 8.4
- Containers: Docker Compose
- CI/CD: Jenkins

## Runtime Architecture

The local and deployment runtime is limited to 3 services only:

1. `frontend`
2. `backend`
3. `mysql`

## Project Structure

```text
project-root/
├── backend/
├── frontend/
├── docker/
├── docs/
├── Jenkinsfile
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker Desktop or Docker Engine with Docker Compose
- Git

Optional for non-Docker local work:

- PHP 8.2+
- Composer
- Node.js 20+
- npm

## Environment Files

Backend example:

- [backend/.env.example](backend/.env.example)

Frontend example:

- [frontend/.env.example](frontend/.env.example)

For Docker-based local development, the compose file already provides the required core runtime variables.

## Services

### Frontend

- Service name: `frontend`
- URL: `http://localhost:5173`

### Backend

- Service name: `backend`
- URL: `http://localhost:8000`
- API base: `http://localhost:8000/api/v1`
- Health endpoint: `http://localhost:8000/up`

### Database

- Service name: `mysql`
- Port: `3306`
- Database: `math_olympiad`

## Quick Start

Build and start the full stack:

```bash
docker compose up --build -d
```

Watch logs:

```bash
docker compose logs -f
```

Stop the stack:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

## Useful Commands

Run Laravel migrations manually:

```bash
docker compose exec backend php artisan migrate --force
```

Open a backend shell:

```bash
docker compose exec backend sh
```

Open a frontend shell:

```bash
docker compose exec frontend sh
```

Inspect registered API routes:

```bash
docker compose exec backend php artisan route:list --path=api
```

Run backend tests:

```bash
docker compose exec backend php artisan test
```

## Docker Notes

- The backend container installs Composer dependencies on first startup if needed.
- The frontend container installs npm dependencies on first startup if needed.
- MySQL data is stored in a named Docker volume.
- Laravel storage is persisted in a named Docker volume.

## Jenkins Integration

The root [Jenkinsfile](Jenkinsfile) is designed to work with this layout.

Expected image names are controlled by these variables:

- `FRONTEND_IMAGE`
- `BACKEND_IMAGE`
- `MYSQL_IMAGE`

The compose file is compatible with both:

- local builds using `docker compose up --build`
- remote deployments where Jenkins exports image variables and runs `docker compose pull` and `docker compose up -d`

## Production Checklist

- replace default database credentials
- provide real application secrets outside version control
- set production `APP_ENV` and `APP_DEBUG=false`
- use real registry image tags for frontend and backend
- review allowed frontend origins for Sanctum and CORS
- ensure the remote server already has Docker and Docker Compose available
