<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Student\UpdateStudentProfileRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\JsonResponse;

class StudentProfileController extends ApiController
{
    public function show(): JsonResponse
    {
        $student = $this->student();

        return $this->success('Student profile fetched successfully.', [
            'student' => new StudentResource($student),
        ]);
    }

    public function update(UpdateStudentProfileRequest $request): JsonResponse
    {
        $student = $this->student();
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('students/photos', 'public');
        }

        unset($validated['photo']);

        $student->update($validated);
        $student->refresh()->load('division', 'district', 'upazila', 'user');

        return $this->success('Student profile updated successfully.', [
            'student' => new StudentResource($student),
        ]);
    }

    public function dashboard(): JsonResponse
    {
        $student = $this->student();

        return $this->success('Student dashboard data fetched successfully.', [
            'student' => new StudentResource($student),
            'summary' => [
                'status' => $student->status,
                'student_code' => $student->student_code,
                'documents_ready' => [
                    'id_card' => $student->status === 'approved',
                    'admit_card' => false,
                ],
            ],
        ]);
    }

    private function student(): Student
    {
        /** @var Student $student */
        $student = request()->user()->student()->with('division', 'district', 'upazila', 'user')->firstOrFail();

        return $student;
    }
}