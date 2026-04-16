# Frontend Structure

## Frontend Goal

Provide a single React application with clear separation between student and admin experiences while sharing authentication, routing, API services, and common UI components.

## Recommended Pages

### Public Pages

- Login
- Register
- Forgot password if added later

### Student Pages

- Student Dashboard
- Profile
- Approval Status
- Download ID Card
- Download Admit Card

### Admin Pages

- Admin Dashboard
- Student List
- Student Review Details
- Center Management
- Exam Management
- Seat Allocation
- Reports

## Suggested Structure

```text
src/
├── app/
│   ├── App.jsx
│   ├── providers.jsx
│   └── router.jsx
├── components/
│   ├── common/
│   ├── forms/
│   ├── layout/
│   └── feedback/
├── features/
│   ├── admin/
│   ├── auth/
│   ├── centers/
│   ├── exams/
│   ├── reports/
│   └── student/
├── pages/
│   ├── admin/
│   ├── auth/
│   └── student/
├── services/
│   ├── apiClient.js
│   ├── authService.js
│   ├── centerService.js
│   ├── examService.js
│   ├── reportService.js
│   └── studentService.js
├── hooks/
├── store/
├── utils/
└── styles/
```

## Routing Strategy

### Public Routes

- `/login`
- `/register`

### Student Routes

- `/student/dashboard`
- `/student/profile`
- `/student/id-card`
- `/student/admit-cards`

### Admin Routes

- `/admin/dashboard`
- `/admin/students`
- `/admin/centers`
- `/admin/exams`
- `/admin/reports`

## Route Guard Rules

- Unauthenticated users only access public routes
- Students cannot access admin routes
- Admin users cannot access student-only document pages unless explicitly allowed

## State Management Recommendation

For V1, keep it simple:

- Context API for auth state
- Local component state for forms and filters
- Service layer for all API communication

If the app grows significantly, move to Zustand or Redux Toolkit.

## UI Guidance

- Keep forms simple and explicit
- Use clear statuses for pending, approved, rejected
- Use tables for admin listings
- Keep document download actions highly visible
- Optimize for low-friction use on average laptop browsers

## API Integration Pattern

Create a shared API client with:

- base URL from environment
- auth token or cookie support
- unified error handling
- optional request interceptors

## Frontend Security Notes

- Never trust role flags from local storage alone
- Use backend response to validate current user role
- Clear auth state on 401 responses
- Validate file upload type and size before submission