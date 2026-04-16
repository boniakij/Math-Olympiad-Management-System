# Math Olympiad Management System Docs

This folder contains the working documentation for the Math Olympiad Management System.

## Document Index

1. [01-project-overview.md](./01-project-overview.md)
   Purpose: business goal, users, scope, and core system objectives.

2. [02-system-architecture.md](./02-system-architecture.md)
   Purpose: recommended architecture, services, application layers, and technical decisions.

3. [03-modules-and-workflows.md](./03-modules-and-workflows.md)
   Purpose: module responsibilities, process flow, and user journeys.

4. [04-database-design.md](./04-database-design.md)
   Purpose: database entities, relationships, table design, and indexing guidance.

5. [05-api-specification.md](./05-api-specification.md)
   Purpose: REST API structure, endpoints, request and response contracts, and auth rules.

6. [06-frontend-structure.md](./06-frontend-structure.md)
   Purpose: React application structure, pages, layouts, routing, and state handling.

7. [07-delivery-plan.md](./07-delivery-plan.md)
   Purpose: phased implementation plan, milestones, and practical development order.

8. [08-local-dev-devops.md](./08-local-dev-devops.md)
   Purpose: local development, Docker strategy, environment variables, and CI/CD readiness.

9. [09-software-requirements-specification.md](./09-software-requirements-specification.md)
   Purpose: formal software requirements specification with functional and non-functional requirements.

10. [10-entity-relationship-document.md](./10-entity-relationship-document.md)
    Purpose: formal ERD narrative, entity definitions, relationships, constraints, and normalization notes.

11. [11-use-case-specification.md](./11-use-case-specification.md)
    Purpose: formal use case catalog with actors, triggers, preconditions, flows, and exceptions.

## Recommended Scope For V1

- Student registration and login
- Admin approval and rejection flow
- Student profile management
- Exam center management
- Exam creation and assignment
- Seat allocation
- ID card PDF generation
- Admit card PDF generation
- Admin dashboard overview
- Export of core reports

## Recommended Scope For V2

- Attendance marking workflow
- QR code verification app or page
- Result publishing
- Rank calculation
- Multi-level olympiad progression
- SMS notification integration

## Architecture Summary

- Backend: Laravel API only
- Frontend: React with separate Admin and Student interfaces
- Auth: Laravel Sanctum for SPA and token-based access
- Database: MySQL
- Documents: DomPDF for ID card and admit card generation
- Exports: Laravel Excel for report generation
- QR: Simple QR code generation for verification links
- Runtime: Docker Compose for local development

## Design Principles

- API-first backend
- Clear separation between frontend and backend
- Role-based authorization
- Modular service design for future scaling
- Developer-friendly local setup
- CI/CD ready folder structure for GitHub and Jenkins