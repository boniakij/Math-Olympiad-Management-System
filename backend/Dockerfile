FROM composer:2 AS vendor

WORKDIR /app

COPY backend/composer.json backend/composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

FROM php:8.2-cli-alpine

RUN apk add --no-cache \
    bash \
    git \
    icu-dev \
    libzip-dev \
    mysql-client \
    oniguruma-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo_mysql mbstring intl zip pcntl

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY --from=vendor /app/vendor ./vendor
COPY backend/. .
COPY docker/backend/entrypoint.sh /usr/local/bin/backend-entrypoint

RUN chmod +x /usr/local/bin/backend-entrypoint \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["backend-entrypoint"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
