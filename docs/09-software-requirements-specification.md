# Software Requirements Specification

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification defines the functional and non-functional requirements for the Math Olympiad Management System. It is intended for stakeholders, developers, testers, DevOps engineers, and project managers who will design, build, verify, deploy, and maintain the system.

### 1.2 Scope

The system manages the complete lifecycle of a free, center-based Math Olympiad program, including:

- student account registration
- student profile submission
- admin review and approval
- unique student code generation
- exam center management
- exam scheduling and assignment
- seat allocation
- ID card generation
- admit card generation
- dashboards and operational reporting
- exports for administrative use

The system excludes payment processing because the olympiad is fully free.

### 1.3 Definitions, Acronyms, and Abbreviations

- `SRS`: Software Requirements Specification
- `ERD`: Entity Relationship Diagram or documentation
- `API`: Application Programming Interface
- `SPA`: Single Page Application
- `RBAC`: Role-Based Access Control
- `PDF`: Portable Document Format
- `QR`: Quick Response code
- `V1`: first production-ready scope
- `V2`: later enhancement scope

### 1.4 References

- Project overview and architecture docs in this folder
- Laravel framework documentation
- React documentation
- MySQL documentation
- Docker documentation

### 1.5 Document Overview

This document describes product context, users, assumptions, interfaces, functional requirements, non-functional requirements, constraints, data rules, and acceptance-level expectations.

## 2. Overall Description

### 2.1 Product Perspective

The system is a web-based platform consisting of:

- a Laravel API backend
- a React frontend
- a MySQL database
- document generation services for PDFs
- Docker-based local runtime

The frontend communicates only with the backend API. No Blade-based frontend is in scope.

### 2.2 Product Functions

The system shall support the following high-level functions:

- user authentication for students and administrators
- student registration and profile management
- approval and rejection workflow
- generation of unique student identifiers
- creation and management of exam centers
- creation and management of exams
- assignment of students to exams and centers
- automatic seat allocation
- PDF generation for ID cards and admit cards
- dashboard summaries and exportable operational reports
- optional notification dispatch for key events

### 2.3 User Classes And Characteristics

#### 2.3.1 Super Admin

- highest privilege level
- manages admins and global settings
- monitors all data across the system
- expected to be trained internal staff

#### 2.3.2 Admin

- manages student approvals, centers, exams, and reports
- expected to be trained staff or coordinators
- uses operational and review workflows frequently

#### 2.3.3 Student

- registers and maintains personal participation data
- views approval result, center assignment, and documents
- may have limited technical knowledge

### 2.4 Operating Environment

- backend runtime: PHP 8.2 or later compatible with selected Laravel version
- frontend runtime: modern Chromium, Firefox, Edge, Safari-class browsers
- database: MySQL 8 or later
- local development: Docker and Docker Compose
- hosting: Linux-based server or container environment recommended

### 2.5 Design And Implementation Constraints

- backend must be Laravel API only
- frontend must be React and consume backend API only
- authentication must use Sanctum or an equivalent secure token strategy
- source control must be GitHub-friendly
- deployment path should remain compatible with Jenkins-based CI/CD
- payment processing is out of scope

### 2.6 Assumptions And Dependencies

- admins are provisioned by seeding or by super admin actions
- location master data for division, district, and upazila is available
- email delivery infrastructure may be configured later if notifications are enabled
- PDF generation libraries and file storage are available in runtime containers

## 3. External Interface Requirements

### 3.1 User Interfaces

The system shall provide:

- a student interface for registration, profile, status, and document downloads
- an admin interface for review, exam operations, and reports
- clear visual distinction between statuses such as pending, approved, rejected, draft, published, and closed

### 3.2 Software Interfaces

- Laravel REST API exposed under versioned endpoints
- MySQL database connection
- PDF generation library integration
- optional Excel export library integration
- optional email service integration

### 3.3 Communications Interfaces

- HTTP or HTTPS between frontend and backend
- SQL connection between backend and MySQL
- optional SMTP API or gateway for email notifications

## 4. System Features And Functional Requirements

### 4.1 Authentication And Authorization

#### Description

The system shall authenticate students and administrators and enforce access by role.

#### Functional Requirements

- `FR-1`: The system shall allow a student to create an account using name, email, and password.
- `FR-2`: The system shall allow an authenticated user to log in and log out.
- `FR-3`: The system shall identify the authenticated user role as super admin, admin, or student.
- `FR-4`: The system shall restrict protected routes based on role.
- `FR-5`: The system shall invalidate the active token or session on logout.

### 4.2 Student Registration

#### Description

The system shall capture the full student registration profile for olympiad participation.

#### Functional Requirements

- `FR-6`: The system shall allow a student to submit personal and academic profile data.
- `FR-7`: The system shall allow a student to upload a profile photo.
- `FR-8`: The system shall store division, district, and upazila selections.
- `FR-9`: The system shall create each new student record with status `pending`.
- `FR-10`: The system shall prevent duplicate registration conflicts based on configured uniqueness rules.

### 4.3 Approval Management

#### Description

The system shall allow authorized admins to approve or reject student applications.

#### Functional Requirements

- `FR-11`: The system shall present an approval queue of pending student applications.
- `FR-12`: The system shall allow an admin to approve a pending student.
- `FR-13`: The system shall allow an admin to reject a pending student and optionally record a reason.
- `FR-14`: The system shall store the approver or rejector identity and timestamp.
- `FR-15`: The system shall prevent approval actions by unauthorized roles.

### 4.4 Student Code And Identity Card

#### Description

The system shall generate a unique student code and produce an ID card PDF after approval.

#### Functional Requirements

- `FR-16`: The system shall generate a unique student code when a student is approved.
- `FR-17`: The system shall generate a student ID card PDF for approved students.
- `FR-18`: The ID card shall include student name, photo, student code, and QR code.
- `FR-19`: The ID card may include assigned center information if available.

### 4.5 Exam Center Management

#### Description

The system shall manage exam centers and their capacities.

#### Functional Requirements

- `FR-20`: The system shall allow admins to create, view, update, and deactivate centers.
- `FR-21`: Each center shall store name, location, and capacity.
- `FR-22`: The system shall prevent assignments that exceed center capacity.

### 4.6 Exam Management

#### Description

The system shall allow admins to define olympiad exams and assign students.

#### Functional Requirements

- `FR-23`: The system shall allow admins to create exams with name, level, date, time, and duration.
- `FR-24`: The system shall support exam statuses at minimum as draft, published, and closed.
- `FR-25`: The system shall allow admins to assign students to exams.
- `FR-26`: The system shall allow admins to assign or change centers for exam registrations.

### 4.7 Seat Allocation And Admit Card

#### Description

The system shall allocate seats and generate admit cards for exam participants.

#### Functional Requirements

- `FR-27`: The system shall assign a seat number to each student exam registration.
- `FR-28`: The system shall ensure seat number uniqueness within a center for a given exam.
- `FR-29`: The system shall generate an admit card PDF for assigned students.
- `FR-30`: The admit card shall include exam name, date, time, center, and seat number.
- `FR-31`: The admit card shall include a QR code for verification.

### 4.8 Dashboard And Reporting

#### Description

The system shall provide operational dashboards and export functionality.

#### Functional Requirements

- `FR-32`: The system shall display admin counts for total, pending, approved, and rejected students.
- `FR-33`: The system shall display center-wise and exam-wise summary data.
- `FR-34`: The system shall provide student dashboard data including approval and exam assignment status.
- `FR-35`: The system shall export student lists, center lists, and attendance sheets.

### 4.9 Notifications

#### Description

The system may notify students about key workflow events.

#### Functional Requirements

- `FR-36`: The system shall support notification events for approval, rejection, exam publishing, and admit availability.
- `FR-37`: The system should support email notification in V1.
- `FR-38`: The system may support SMS notification in V2.

### 4.10 Verification, Attendance, And Future Extensions

#### Description

The system shall be extensible for field operations and post-exam workflows.

#### Functional Requirements

- `FR-39`: The system shall support QR-based verification endpoints for student identity and admit validation.
- `FR-40`: The system should support attendance marking for assigned students.
- `FR-41`: The system may support mark entry and rank calculation in a future release.
- `FR-42`: The system may support multi-level olympiad progression in a future release.

## 5. Non-Functional Requirements

### 5.1 Performance

- `NFR-1`: The system should return standard list and detail API responses within acceptable operational latency under expected V1 load.
- `NFR-2`: PDF generation should be asynchronous for bulk operations when load requires it.

### 5.2 Security

- `NFR-3`: Passwords shall be stored only as secure hashes.
- `NFR-4`: Protected endpoints shall require authentication.
- `NFR-5`: Administrative endpoints shall require role authorization.
- `NFR-6`: Uploaded files shall be validated by type and size.
- `NFR-7`: Sensitive configuration values shall not be committed to version control.

### 5.3 Reliability

- `NFR-8`: The system shall maintain data integrity for approval, assignment, and seat allocation operations.
- `NFR-9`: The system shall log critical failures and administrative actions where feasible.

### 5.4 Maintainability

- `NFR-10`: Backend and frontend shall remain clearly separated.
- `NFR-11`: Code shall be modular and beginner-friendly.
- `NFR-12`: Environment configuration shall be documented using example environment files.

### 5.5 Scalability

- `NFR-13`: The architecture shall support future introduction of queues, cache, and object storage.
- `NFR-14`: The system should support multiple exam cycles without schema redesign.

### 5.6 Usability

- `NFR-15`: Forms and dashboard actions shall be understandable for non-technical users.
- `NFR-16`: Status values and operational steps shall be presented clearly.

## 6. Data Requirements

### 6.1 Core Data Objects

- users
- students
- divisions
- districts
- upazilas
- centers
- exams
- exam registrations
- notifications

### 6.2 Data Quality Rules

- email shall be unique in users
- student code shall be unique in students
- seat number shall be unique for a specific exam and center combination
- one student should not have duplicate registrations for the same exam

## 7. Business Rules

- `BR-1`: Only approved students are eligible for final exam assignment.
- `BR-2`: Student code generation occurs only on approval.
- `BR-3`: Admit card generation requires approval, exam assignment, center assignment, and seat assignment.
- `BR-4`: Center assignment cannot exceed center capacity.
- `BR-5`: Only authorized admins may approve, reject, assign, or publish exam operations.

## 8. Acceptance Summary

The V1 system is acceptable when:

- students can register and log in
- admins can review and approve or reject students
- approved students receive unique codes
- admins can create centers and exams
- admins can assign students and seats
- students can download ID cards and admit cards
- admins can export key reports

## 9. Future Considerations

- attendance scanning workflows
- ranking and results publication
- multi-level progression logic
- message queue and Redis-backed optimization
- cloud storage integration for documents