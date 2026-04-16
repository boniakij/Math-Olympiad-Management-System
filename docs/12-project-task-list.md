# Project Task List

## Purpose

This document defines an implementation-ready task list for the Math Olympiad Management System. It is organized into 12 major workstreams so the team can plan, assign, estimate, and track delivery clearly.

## Task List Overview

1. Project foundation and planning
2. Backend API foundation
3. Authentication and authorization
4. Student registration and profile module
5. Admin approval and student management
6. Exam center and exam management
7. Seat allocation and document generation
8. Frontend foundation and shared UI
9. Student panel frontend development
10. Admin panel frontend development
11. DevOps and environment setup
12. Security, testing, and release readiness

## 1. Project Foundation And Planning

### Objective

Prepare the project structure, delivery rules, environments, and team alignment.

### Tasks

- Define final V1 scope and out-of-scope items
- Confirm user roles and permission matrix
- Finalize folder structure for backend, frontend, docker, and docs
- Define coding standards for Laravel and React
- Define Git branching and pull request workflow
- Prepare `.env.example` strategy for all apps
- Define issue tracking labels and milestone structure
- Prepare initial backlog from SRS and use case docs

### Deliverables

- Approved V1 scope
- Project structure ready
- Initial backlog and milestones

## 2. Backend API Foundation

### Objective

Set up the Laravel API base with clean architecture and shared conventions.

### Tasks

- Create Laravel API project structure
- Configure MySQL connection settings
- Configure API versioning under `/api/v1`
- Add shared API response format
- Add exception handling strategy for API responses
- Add request validation base patterns
- Add service layer and resource layer conventions
- Configure CORS for frontend access
- Configure file storage for student photos and generated PDFs
- Add base health-check endpoint

### Deliverables

- Running Laravel API base
- Standard response structure
- Versioned route strategy

## 3. Authentication And Authorization

### Objective

Implement secure access for student, admin, and super admin roles.

### Tasks

- Install and configure Laravel Sanctum
- Create user role enum or constants
- Build student registration endpoint
- Build login and logout endpoints
- Build current user endpoint
- Create role middleware and policies
- Restrict admin routes to admin and super admin
- Prevent unauthorized document access
- Add password hashing and validation rules
- Add rate limiting for auth endpoints

### Deliverables

- Working login and registration flow
- Role-based access control
- Protected API routes

## 4. Student Registration And Profile Module

### Objective

Collect and manage student application data correctly.

### Tasks

- Create `students` table and model
- Add location master tables: divisions, districts, upazilas
- Build student profile create and update endpoints
- Add photo upload handling
- Validate required student fields
- Add unique phone and email conflict checks where needed
- Build student profile API resource
- Build student dashboard summary endpoint
- Add approval status exposure for frontend
- Add student code generation logic placeholder for approval step

### Deliverables

- Student profile API complete
- Photo upload working
- Student status lifecycle started

## 5. Admin Approval And Student Management

### Objective

Give admins a clean operational workflow for reviewing applications.

### Tasks

- Build pending student list endpoint
- Build student detail endpoint for admin review
- Build approve student endpoint
- Build reject student endpoint with optional reason
- Record approver or rejector and timestamps
- Generate unique student code on approval
- Add filtering by status, location, and search keyword
- Add pagination for large student lists
- Add audit logging for approval and rejection actions
- Add notification trigger hooks for approval status changes

### Deliverables

- Admin review queue complete
- Approval and rejection flow complete
- Student code generation active

## 6. Exam Center And Exam Management

### Objective

Allow admins to define centers and olympiad events cleanly.

### Tasks

- Create `centers` table and model
- Create `exams` table and model
- Build center CRUD endpoints
- Build exam CRUD endpoints
- Add exam status handling: draft, published, closed
- Add center capacity validation
- Add center search and filtering
- Add exam search and filtering
- Add exam level field: school, district, national
- Add publish or unpublish workflow for exams

### Deliverables

- Center management complete
- Exam management complete
- Capacity and schedule validation working

## 7. Seat Allocation And Document Generation

### Objective

Assign students to exams and generate operational documents.

### Tasks

- Create `exam_registrations` table and model
- Build student-to-exam assignment endpoints
- Build center assignment endpoint
- Build automatic seat allocation logic
- Prevent seat duplication within same exam and center
- Integrate DomPDF for document generation
- Generate student ID card PDF
- Generate admit card PDF
- Integrate QR code generation for verification
- Add verification endpoints for QR-based validation
- Add attendance sheet export generation

### Deliverables

- Exam registration workflow complete
- Seat allocation working
- ID and admit card generation working

## 8. Frontend Foundation And Shared UI

### Objective

Prepare the React application with shared services, routing, auth, and reusable components.

### Tasks

- Create React app structure
- Configure routing for public, student, and admin sections
- Create API client with base URL from environment
- Add auth context or store
- Add route guards by authentication and role
- Create shared layout components
- Create shared form input components
- Create shared table and status badge components
- Create loading, empty state, and error state components
- Define frontend environment variables

### Deliverables

- React base architecture ready
- Auth-aware routing working
- Shared service and UI layer ready

## 9. Student Panel Frontend Development

### Objective

Deliver the student-facing experience.

### Tasks

- Build registration page
- Build login page
- Build student dashboard page
- Build student profile page
- Build approval status view
- Build ID card download page
- Build admit card download page
- Connect student pages to API services
- Add form validation and user feedback
- Add protected student route layout

### Deliverables

- Student panel complete for V1
- Student registration to document flow connected

## 10. Admin Panel Frontend Development

### Objective

Deliver the admin-facing operational interface.

### Tasks

- Build admin dashboard page
- Build pending and all student list page
- Build student review detail page
- Build approve and reject actions in UI
- Build center management pages
- Build exam management pages
- Build assignment and seat allocation pages
- Build reports and exports page
- Add table filters, pagination, and search
- Add admin layout and protected admin routes

### Deliverables

- Admin operational panel complete
- Approval, center, exam, and report flows connected

## 11. DevOps And Environment Setup

### Objective

Make the project easy to run locally and ready for CI/CD.

### Tasks

- Create backend Dockerfile
- Create frontend Dockerfile
- Create root `docker-compose.yml`
- Configure MySQL service with persistent volume
- Define container networking
- Keep runtime architecture limited to 3 services: frontend, backend, mysql
- Add backend startup and migration entrypoint if required
- Add frontend environment injection strategy
- Create `.gitignore` for root and app folders as needed
- Write root README with startup commands
- Define Jenkins-ready pipeline stages
- Create root `Jenkinsfile`
- Configure Docker image tagging strategy for frontend and backend
- Define registry push process for application images
- Define deployment process for the 3-service stack
- Define production environment variable checklist

### Deliverables

- Local Docker stack runnable
- Documentation for setup complete
- Jenkins CI/CD preparation baseline ready
- Three-service deployment plan ready

## 12. Security, Testing, And Release Readiness

### Objective

Reduce delivery risk and prepare the project for safe iteration.

### Security Tasks

- Enforce auth and role middleware on protected routes
- Add request validation for all write endpoints
- Restrict file uploads by size and mime type
- Protect document download authorization
- Add rate limiting for auth and sensitive endpoints
- Ensure secrets are excluded from version control
- Review CORS configuration for only allowed frontend origins
- Add audit logs for admin-sensitive actions

### Testing Tasks

- Write backend feature tests for auth flows
- Write backend feature tests for approval flows
- Write backend tests for exam assignment and seat allocation
- Write frontend tests for key forms and guarded routes
- Add API smoke test checklist
- Add manual UAT checklist for student and admin workflows

### Release Tasks

- Verify all `.env.example` files are complete
- Verify migrations run on clean database
- Verify Docker startup works from zero state
- Verify document generation works end-to-end
- Verify export generation works end-to-end
- Verify Jenkins pipeline runs all defined CI/CD phases successfully
- Verify deployed stack includes frontend, backend, and mysql services only
- Prepare release notes template
- Prepare rollback and backup checklist

### Deliverables

- Security baseline in place
- Test baseline in place
- Release checklist ready

## Recommended Execution Order

1. Project foundation and planning
2. Backend API foundation
3. Authentication and authorization
4. Student registration and profile module
5. Admin approval and student management
6. Exam center and exam management
7. Seat allocation and document generation
8. Frontend foundation and shared UI
9. Student panel frontend development
10. Admin panel frontend development
11. DevOps and environment setup
12. Security, testing, and release readiness

## Priority Labels

### Must Have For V1

- Items 1 through 11

### Must Review Before Release

- Item 12

### Recommended Tracking Fields

Use these fields in your issue tracker:

- Task ID
- Workstream
- Title
- Owner
- Priority
- Status
- Estimate
- Dependency
- Acceptance criteria
- Notes