#!/bin/sh
set -eu

cd /var/www/html

if [ ! -f .env ] && [ -f .env.example ]; then
    cp .env.example .env
fi

if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    composer install --no-interaction --prefer-dist
fi

rm -f bootstrap/cache/packages.php bootstrap/cache/services.php
php artisan package:discover --ansi >/dev/null

if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
    php artisan key:generate --force
fi

php artisan storage:link >/dev/null 2>&1 || true



if [ "${APP_RUN_MIGRATIONS:-false}" = "true" ]; then
    php artisan migrate --force
fi

exec "$@"
