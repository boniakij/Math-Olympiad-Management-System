# Project Overview

## System Name

Math Olympiad Management System

## Mission

Provide a clean and reliable platform for managing a free math olympiad lifecycle from student registration to offline exam execution.

## Primary Goals

- Allow students to register online
- Allow admins to review and approve registrations
- Generate student ID cards automatically after approval
- Create and schedule exams
- Assign students to exam centers and seats
- Generate admit cards before exam day
- Support offline center-based exam operations
- Provide dashboards and exports for organizers

## Core Users

### Super Admin

- Manage platform-wide settings
- Manage admins
- View all students, centers, exams, and reports
- Override approval or exam assignment decisions

### Admin

- Review student applications
- Approve or reject students
- Manage centers and exams
- Assign students to centers
- Download exports and operational sheets

### Student

- Register an account
- Complete profile
- Track approval status
- Download ID card and admit card
- View assigned center and exam information

## Problem Statement

Manual registration and offline exam planning create inconsistency, duplicate records, and operational mistakes. A centralized system reduces human error and makes registration, approval, scheduling, center allocation, and reporting traceable.

## Success Criteria

- Registration workflow is simple enough for students to complete without support
- Admin approval queue is easy to process
- Each approved student receives a unique student ID
- Each exam participant receives a center and seat number
- ID card and admit card are downloadable as PDFs
- Organizers can export operational reports quickly

## Functional Scope

### Included In V1

- Authentication for student and admin users
- Student application form with photo upload
- Approval and rejection process
- Exam center CRUD
- Exam CRUD
- Student to exam assignment
- Seat allocation
- ID and admit card generation
- Dashboard summaries
- Basic report export

### Deferred To V2

- SMS integration
- National progression between olympiad levels
- Result entry and rank calculation
- Bulk data import
- Advanced analytics
- Proctor and center operator roles

## Non-Functional Requirements

- Beginner-friendly local development
- API-only backend
- Separated React frontend
- Secure authentication and authorization
- Clear audit fields on major records
- Scalable data design for future levels and large registration volumes

## Recommended Folder Ownership

- `backend/`: Laravel API and business logic
- `frontend/`: React UI for student and admin panels
- `docker/`: container-related files and service configs
- `docs/`: architecture, API, database, workflows, and operations documentation