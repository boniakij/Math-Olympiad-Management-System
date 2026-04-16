# Default Login Credentials

Use these credentials after running backend migrations and seeders.

## Admin Account

- Role: `admin`
- Email: `admin@aribamath.org`
- Password: `password`

## Student Account

- Role: `student`
- Email: `student@aribamath.org`
- Password: `password`

## How To Seed

From the `backend` folder:

```bash
php artisan migrate:fresh --seed
```

If you do not want to reset database tables:

```bash
php artisan db:seed
```
