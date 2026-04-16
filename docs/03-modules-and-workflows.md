# Modules And Workflows

## Module List

1. Authentication
2. Student Registration
3. Approval Management
4. Student ID Card Generation
5. Exam Center Management
6. Exam Management
7. Admit Card Generation
8. Dashboard And Reporting
9. Export Module
10. Notification Module
11. Attendance Module
12. Result And Rank Module

## 1. Authentication Module

### Responsibilities

- Student registration and login
- Admin login
- Secure logout
- Authenticated user identity lookup
- Role-based route protection

### Main Rules

- Students self-register
- Admin accounts are created by super admin or seeders
- Suspended or rejected users cannot access protected student features

## 2. Student Registration Module

### Input Fields

- Full name
- Photo
- Father name
- Mother name
- School or college
- Class
- Phone
- Email
- Address
- Division
- District
- Upazila

### Business Rules

- One user account maps to one student profile
- Email and phone should be unique where possible
- Student code is generated only once on approval
- Student status starts as `pending`

## 3. Approval Management Module

### Statuses

- `pending`
- `approved`
- `rejected`

### Business Rules

- Only admin or super admin can approve or reject
- Approved students receive immutable student codes
- Rejected students can be allowed to resubmit in future if policy allows

## 4. Student ID Card Generation

### Trigger

- Automatically after approval or on demand by admin

### Output Fields

- Student name
- Student photo
- Unique student code
- Assigned center if available
- QR code

## 5. Exam Center Management

### Data Managed

- Center name
- Institution type
- Address
- Capacity
- Contact person
- Contact phone

### Rules

- Capacity cannot be exceeded during seat allocation
- Centers belong to a geographic location for filtering and planning

## 6. Exam Management

### Data Managed

- Exam name
- Exam level
- Date
- Start time
- Duration
- Description
- Status

### Recommended Statuses

- `draft`
- `published`
- `closed`

## 7. Admit Card Generation

### Trigger

- Available after student is approved and assigned to an exam and center

### Output Fields

- Student info
- Exam info
- Center info
- Seat number
- Reporting instructions
- QR code

## 8. Dashboard Module

### Admin Widgets

- Total registered students
- Pending approvals
- Approved students
- Rejected students
- Center-wise student count
- Exam-wise assignment count
- Attendance summary

### Student Widgets

- Approval status
- Student code
- Upcoming exam
- Assigned center
- Download links for documents

## 9. Export Module

### Exports

- Student list CSV or Excel
- Center list CSV or Excel
- Exam assignment list
- Attendance sheet PDF or Excel

## 10. Notification Module

### Events

- Registration received
- Approval completed
- Rejection completed
- Exam published
- Admit card available

### Channels

- Email in V1
- SMS in V2

## 11. Attendance Module

### Purpose

- Mark student present or absent at exam center
- Support manual search and QR scanning workflow

### Statuses

- `not_marked`
- `present`
- `absent`

## 12. Result And Rank Module

### Purpose

- Store marks
- Calculate ranking
- Publish qualified students to next level

## Core Workflow

### Registration To Exam

1. Student creates account
2. Student completes profile and uploads photo
3. Student record enters pending queue
4. Admin reviews profile
5. Admin approves student
6. System generates student code
7. System makes ID card available
8. Admin creates exam
9. Admin assigns students and centers
10. System allocates seat numbers
11. System generates admit cards
12. Student downloads admit card
13. Offline exam is conducted

## State Transition Notes

### Student Status

- Pending -> Approved
- Pending -> Rejected
- Rejected -> Pending if re-application is allowed

### Exam Assignment Status

- Unassigned -> Assigned
- Assigned -> Admit generated
- Admit generated -> Attendance marked

## Recommended Audit Fields

Add on important tables where practical:

- `created_by`
- `updated_by`
- `approved_by`
- `approved_at`
- `rejected_by`
- `rejected_at`