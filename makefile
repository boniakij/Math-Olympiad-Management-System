up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps

backend-test:
	docker compose exec backend php artisan test

frontend-lint:
	docker compose exec frontend npm run lint
