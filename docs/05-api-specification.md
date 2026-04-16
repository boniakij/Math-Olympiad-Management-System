# API Specification

## API Style

- REST API
- JSON request and response bodies
- Versioned under `/api/v1`
- Standard response wrapper

## Base URL

```text
/api/v1
```

## Authentication

Use Laravel Sanctum.

### Public Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /locations/divisions`
- `GET /locations/divisions/{division}/districts`
- `GET /locations/districts/{district}/upazilas`

### Protected Endpoints

Require authenticated user token or SPA session.

## Standard Response Format

### Success

```json
{
  "success": true,
  "message": "Student approved successfully.",
  "data": {
    "id": 15,
    "student_code": "MO-2026-00015"
  }
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

## Auth Endpoints

### Register Student

- `POST /api/v1/auth/register`

Request fields:

- name
- email
- password
- password_confirmation
- full_name
- photo
- father_name
- mother_name
- school_name
- class_name
- phone
- address
- division_id
- district_id
- upazila_id

### Login

- `POST /api/v1/auth/login`

Request fields:

- email
- password

### Logout

- `POST /api/v1/auth/logout`

### Current User

- `GET /api/v1/auth/me`

## Student Endpoints

### Student Profile

- `GET /api/v1/student/profile`
- `PUT /api/v1/student/profile`

### Student Documents

- `GET /api/v1/student/id-card`
- `GET /api/v1/student/admit-cards`

## Admin Student Management

### Student List

- `GET /api/v1/admin/students`

Query params:

- status
- search
- division_id
- district_id
- center_id
- exam_id
- page

### Student Details

- `GET /api/v1/admin/students/{student}`

### Approve Student

- `POST /api/v1/admin/students/{student}/approve`

### Reject Student

- `POST /api/v1/admin/students/{student}/reject`

Request fields:

- reason

## Center Endpoints

### Center CRUD

- `GET /api/v1/admin/centers`
- `POST /api/v1/admin/centers`
- `GET /api/v1/admin/centers/{center}`
- `PUT /api/v1/admin/centers/{center}`
- `DELETE /api/v1/admin/centers/{center}`

## Exam Endpoints

### Exam CRUD

- `GET /api/v1/admin/exams`
- `POST /api/v1/admin/exams`
- `GET /api/v1/admin/exams/{exam}`
- `PUT /api/v1/admin/exams/{exam}`
- `DELETE /api/v1/admin/exams/{exam}`

### Assignment Endpoints

- `POST /api/v1/admin/exams/{exam}/assign-students`
- `POST /api/v1/admin/exams/{exam}/auto-allocate-seats`
- `GET /api/v1/admin/exams/{exam}/registrations`

## Dashboard Endpoints

### Admin Dashboard

- `GET /api/v1/admin/dashboard/summary`

### Student Dashboard

- `GET /api/v1/student/dashboard`

## Report Endpoints

- `GET /api/v1/admin/reports/students/export`
- `GET /api/v1/admin/reports/centers/export`
- `GET /api/v1/admin/reports/attendance-sheet/{exam}`

## Verification Endpoints

- `GET /api/v1/verify/student/{student_code}`
- `GET /api/v1/verify/registration/{registration_code}`

## Route Groups Recommendation

```php
Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        // register, login, logout, me
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('student')->group(function () {
            // profile, dashboard, documents
        });

        Route::prefix('admin')->middleware('role:admin,super_admin')->group(function () {
            // students, centers, exams, reports, dashboard
        });
    });
});
```

## Status Code Guidance

- `200` success
- `201` resource created
- `401` unauthenticated
- `403` unauthorized
- `404` resource not found
- `422` validation failed
- `500` internal server error