<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;

class AdminDashboardController extends ApiController
{
    public function summary()
    {
        $students = Student::query();

        return $this->success('Admin dashboard summary fetched successfully.', [
            'summary' => [
                'total_students' => (clone $students)->count(),
                'pending_students' => (clone $students)->where('status', 'pending')->count(),
                'approved_students' => (clone $students)->where('status', 'approved')->count(),
                'rejected_students' => (clone $students)->where('status', 'rejected')->count(),
            ],
        ]);
    }
}