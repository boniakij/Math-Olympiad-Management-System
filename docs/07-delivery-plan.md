# Delivery Plan

## Delivery Approach

Build in small, testable phases. Each phase should leave the application in a runnable state.

## Phase 1: Project Setup

- Create Laravel API project
- Create React project
- Configure Docker Compose
- Configure MySQL
- Add environment example files
- Add auth-ready folder structure

Deliverable:

- Project boots locally with frontend, backend, and database containers

## Phase 2: Authentication

- Student registration
- Student login
- Admin login
- Current user API
- Role-based route protection

Deliverable:

- Users can authenticate and access the right dashboard

## Phase 3: Student Registration Module

- Student profile creation
- Photo upload
- Location selectors
- Pending status workflow

Deliverable:

- Admin can view pending student submissions

## Phase 4: Approval Module

- Approve or reject student
- Generate student code
- Record approval metadata

Deliverable:

- Approved students become eligible for documents and exam assignment

## Phase 5: Center And Exam Management

- Center CRUD
- Exam CRUD
- Assign students to exams
- Assign centers
- Auto seat allocation

Deliverable:

- Exam planning is operational

## Phase 6: Documents

- ID card PDF generation
- Admit card PDF generation
- Verification QR code links

Deliverable:

- Students can download official documents

## Phase 7: Dashboard And Reports

- Admin dashboard summary
- Student dashboard summary
- Export student and center reports
- Attendance sheet generation

Deliverable:

- Organizers can monitor and operate the exam cycle

## Phase 8: Operational Enhancements

- Attendance marking
- Email notification
- Basic audit logs
- Result entry foundation

Deliverable:

- System is ready for controlled real-world usage

## Recommended Priorities

### Must Have

- Auth
- Student registration
- Approval
- Centers
- Exams
- Seat assignment
- PDF generation

### Should Have

- Reports
- Dashboard
- QR verification
- Email notifications

### Nice To Have

- SMS integration
- Ranking system
- Multi-level promotion logic

## Suggested Team Split

### Backend

- Auth and authorization
- Student module
- Exam and center module
- PDF and export services

### Frontend

- Student panel
- Admin panel
- Shared form and table components

### DevOps

- Docker environment
- CI pipeline
- Environment variable management
- Release process