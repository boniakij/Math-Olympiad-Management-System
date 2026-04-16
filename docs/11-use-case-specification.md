# Use Case Specification

## 1. Purpose

This document provides a formal use case catalog for the Math Olympiad Management System. Each use case defines actors, triggers, preconditions, main flow, alternate flow, and expected outcomes.

## 2. Actors

### 2.1 Student

A participant who registers, manages profile data, and downloads official documents.

### 2.2 Admin

An authorized operator who reviews registrations and manages exam operations.

### 2.3 Super Admin

An administrator with highest privileges, including admin management and full visibility.

### 2.4 System

Automated platform behavior such as code generation, PDF generation, notifications, and seat allocation.

## 3. Use Case List

- `UC-01` Student Registers Account
- `UC-02` Student Logs In
- `UC-03` Student Completes Profile
- `UC-04` Admin Reviews Student Application
- `UC-05` Admin Approves Student
- `UC-06` Admin Rejects Student
- `UC-07` System Generates Student ID Card
- `UC-08` Admin Creates Exam Center
- `UC-09` Admin Creates Exam
- `UC-10` Admin Assigns Student To Exam
- `UC-11` System Allocates Seat Number
- `UC-12` System Generates Admit Card
- `UC-13` Student Downloads ID Card
- `UC-14` Student Downloads Admit Card
- `UC-15` Admin Views Dashboard Summary
- `UC-16` Admin Exports Operational Reports
- `UC-17` System Verifies QR Code
- `UC-18` Admin Marks Attendance

## 4. Detailed Use Cases

### UC-01 Student Registers Account

- Primary actor: Student
- Trigger: Student selects registration action
- Preconditions:
  - Student is not authenticated
  - Student email is not already used
- Main success scenario:
  1. Student opens registration form.
  2. Student enters account credentials and profile details.
  3. Student uploads a valid photo.
  4. System validates the input.
  5. System creates user and student profile records.
  6. System stores student status as `pending`.
  7. System returns a success response.
- Alternate flows:
  - If validation fails, the system returns field errors.
  - If email already exists, the system rejects the registration.
- Postconditions:
  - User account exists.
  - Student profile exists with `pending` status.

### UC-02 Student Logs In

- Primary actor: Student
- Trigger: Student submits login form
- Preconditions:
  - Student account exists
- Main success scenario:
  1. Student enters email and password.
  2. System validates credentials.
  3. System creates an authenticated session or token.
  4. System returns authenticated user data.
- Alternate flows:
  - Invalid credentials are rejected.
- Postconditions:
  - Student is authenticated.

### UC-03 Student Completes Profile

- Primary actor: Student
- Trigger: Student opens profile page
- Preconditions:
  - Student is authenticated
- Main success scenario:
  1. Student views current profile data.
  2. Student edits personal fields.
  3. Student submits updated data.
  4. System validates and saves the changes.
- Alternate flows:
  - Invalid data causes validation errors.
- Postconditions:
  - Student profile is updated.

### UC-04 Admin Reviews Student Application

- Primary actor: Admin
- Trigger: Admin opens pending student list
- Preconditions:
  - Admin is authenticated and authorized
- Main success scenario:
  1. Admin opens pending applications list.
  2. System displays pending student records.
  3. Admin opens a student detail view.
  4. Admin reviews submitted information and photo.
- Postconditions:
  - Application is ready for decision.

### UC-05 Admin Approves Student

- Primary actor: Admin
- Supporting actor: System
- Trigger: Admin selects approve action
- Preconditions:
  - Student status is `pending`
  - Admin is authorized
- Main success scenario:
  1. Admin approves the student.
  2. System changes student status to `approved`.
  3. System records approver identity and timestamp.
  4. System generates a unique student code.
  5. System schedules or generates the ID card.
  6. System optionally creates a notification.
- Alternate flows:
  - If student status is no longer pending, the system rejects the action.
- Postconditions:
  - Student is approved.
  - Student code exists.

### UC-06 Admin Rejects Student

- Primary actor: Admin
- Trigger: Admin selects reject action
- Preconditions:
  - Student status is `pending`
- Main success scenario:
  1. Admin enters a rejection reason if policy requires it.
  2. System changes student status to `rejected`.
  3. System records rejector identity and timestamp.
  4. System optionally creates a notification.
- Postconditions:
  - Student is rejected.

### UC-07 System Generates Student ID Card

- Primary actor: System
- Supporting actor: Student
- Trigger: Student approval completed or admin requests regeneration
- Preconditions:
  - Student is approved
  - Student has a generated student code
- Main success scenario:
  1. System collects student identity data.
  2. System generates QR verification data.
  3. System renders PDF content.
  4. System stores or streams the generated PDF.
- Postconditions:
  - ID card is available for download.

### UC-08 Admin Creates Exam Center

- Primary actor: Admin
- Trigger: Admin submits center creation form
- Preconditions:
  - Admin is authorized
- Main success scenario:
  1. Admin enters center information.
  2. System validates name, code, location, and capacity.
  3. System stores the center record.
- Alternate flows:
  - Duplicate center code is rejected.
- Postconditions:
  - Center exists and can be used for exam assignment.

### UC-09 Admin Creates Exam

- Primary actor: Admin
- Trigger: Admin submits exam form
- Preconditions:
  - Admin is authorized
- Main success scenario:
  1. Admin enters exam details.
  2. System validates exam schedule information.
  3. System creates the exam record with chosen status.
- Postconditions:
  - Exam is available for assignment workflows.

### UC-10 Admin Assigns Student To Exam

- Primary actor: Admin
- Trigger: Admin assigns approved student to an exam
- Preconditions:
  - Student is approved
  - Exam exists
- Main success scenario:
  1. Admin selects exam.
  2. Admin selects one or more approved students.
  3. Admin optionally chooses a center.
  4. System creates exam registration records.
- Alternate flows:
  - Duplicate exam registration is blocked.
- Postconditions:
  - Student exam registration exists.

### UC-11 System Allocates Seat Number

- Primary actor: System
- Supporting actor: Admin
- Trigger: Admin requests seat allocation or assignment workflow completes
- Preconditions:
  - Exam registration exists
  - Center capacity is available
- Main success scenario:
  1. System finds eligible registrations without seats.
  2. System allocates seat numbers in a deterministic order.
  3. System enforces uniqueness within exam and center.
  4. System saves seat assignments.
- Alternate flows:
  - If center capacity is full, the system stops allocation and reports the conflict.
- Postconditions:
  - Eligible registrations have valid seat numbers.

### UC-12 System Generates Admit Card

- Primary actor: System
- Trigger: Student has approved registration, assigned exam, assigned center, and seat number
- Preconditions:
  - Student is approved
  - Exam registration exists
  - Center and seat number exist
- Main success scenario:
  1. System gathers student, exam, and center data.
  2. System generates verification QR code.
  3. System renders admit card PDF.
  4. System stores or streams the PDF.
- Postconditions:
  - Admit card is available for download.

### UC-13 Student Downloads ID Card

- Primary actor: Student
- Trigger: Student opens document download area
- Preconditions:
  - Student is authenticated
  - Student is approved
- Main success scenario:
  1. Student requests ID card.
  2. System verifies authorization.
  3. System returns generated ID card PDF.
- Alternate flows:
  - If approval is incomplete, the system denies download.

### UC-14 Student Downloads Admit Card

- Primary actor: Student
- Trigger: Student opens admit card page
- Preconditions:
  - Student is authenticated
  - Admit card prerequisites are complete
- Main success scenario:
  1. Student requests admit card.
  2. System verifies authorization and readiness.
  3. System returns generated admit card PDF.
- Alternate flows:
  - If assignment is incomplete, the system informs the student that the card is not ready.

### UC-15 Admin Views Dashboard Summary

- Primary actor: Admin
- Trigger: Admin opens dashboard
- Preconditions:
  - Admin is authenticated
- Main success scenario:
  1. System aggregates student, exam, and center metrics.
  2. System returns summary data.
  3. Admin views operational statistics.

### UC-16 Admin Exports Operational Reports

- Primary actor: Admin
- Trigger: Admin selects export action
- Preconditions:
  - Admin is authorized
- Main success scenario:
  1. Admin selects report type and filters.
  2. System validates the request.
  3. System generates the export file.
  4. System returns the file for download.

### UC-17 System Verifies QR Code

- Primary actor: System
- Supporting actor: Admin or Center Operator
- Trigger: A QR code is scanned or verification URL is opened
- Preconditions:
  - Verification token or public code is valid
- Main success scenario:
  1. System receives verification input.
  2. System resolves the related student or exam registration.
  3. System returns verification status and core identity details.
- Alternate flows:
  - Invalid or expired verification data returns a failed verification response.

### UC-18 Admin Marks Attendance

- Primary actor: Admin
- Trigger: Admin marks present or absent for exam registration
- Preconditions:
  - Exam registration exists
  - Exam date is active or attendance window is open
- Main success scenario:
  1. Admin searches student or scans QR code.
  2. System finds the exam registration.
  3. Admin marks attendance.
  4. System stores attendance state.
- Alternate flows:
  - If no registration exists, the system rejects the action.
- Postconditions:
  - Attendance status is updated.

## 5. Use Case Relationship Notes

- `UC-05` includes student code generation and can trigger `UC-07`.
- `UC-10` can trigger `UC-11` depending on allocation strategy.
- `UC-11` is a prerequisite for `UC-12`.
- `UC-12` is a prerequisite for `UC-14`.
- `UC-17` supports both `UC-13`, `UC-14`, and `UC-18` operationally.

## 6. Use Case Prioritization

### Must Have For V1

- `UC-01` through `UC-16`

### Should Have For V1 Or V1.1

- `UC-17`
- `UC-18`

### Future Expansion

- result publication
- rank calculation
- level promotion and qualification workflows