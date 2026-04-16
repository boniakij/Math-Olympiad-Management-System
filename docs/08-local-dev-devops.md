# Local Development And DevOps Notes

## Local Development Goals

- One-command local startup
- Predictable containers
- Separate backend and frontend services
- MySQL persistence through Docker volumes
- Clear environment variables

## Recommended Services

- `backend`: Laravel API container
- `frontend`: React dev server container
- `mysql`: MySQL database container
- `nginx`: optional reverse proxy for unified local routing

## Example Local Ports

- Frontend: `5173`
- Backend: `8000`
- MySQL: `3306`

## Environment Variables

### Backend

- `APP_NAME=MathOlympiad`
- `APP_ENV=local`
- `APP_URL=http://localhost:8000`
- `FRONTEND_URL=http://localhost:5173`
- `DB_CONNECTION=mysql`
- `DB_HOST=mysql`
- `DB_PORT=3306`
- `DB_DATABASE=math_olympiad`
- `DB_USERNAME=app_user`
- `DB_PASSWORD=app_password`
- `SANCTUM_STATEFUL_DOMAINS=localhost:5173`
- `SESSION_DOMAIN=localhost`

### Frontend

- `VITE_APP_NAME=Math Olympiad Management System`
- `VITE_API_BASE_URL=http://localhost:8000/api/v1`

## Storage Notes

- Student photos should be stored under a public disk path
- Generated PDFs can be stored and regenerated on demand
- Use structured folders by year and document type

Suggested storage shape:

```text
storage/app/public/
├── students/photos/
├── documents/id-cards/
└── documents/admit-cards/
```

## Queue Recommendations

Use Laravel queue for:

- PDF generation jobs
- Email notifications
- Bulk export processing

For local V1, `database` queue is acceptable.

## CI/CD Readiness

Prepare for Jenkins and GitHub with these conventions:

- Separate frontend and backend build stages
- Environment-specific `.env` management outside version control
- Automated backend tests and frontend build checks
- Docker image tagging by branch or release version

## Suggested Pipeline Stages

1. Install dependencies
2. Run backend code style and tests
3. Run frontend lint and build
4. Build Docker images
5. Push images to registry
6. Deploy to target environment

## Security Considerations

- Never commit real secrets
- Restrict admin creation paths
- Validate uploads strictly by mime type and size
- Protect document downloads with authorization checks
- Add rate limiting to auth endpoints

## Operational Recommendations

- Seed one super admin account in non-production environments
- Back up MySQL regularly
- Log approval and rejection actions
- Archive old exam documents by year