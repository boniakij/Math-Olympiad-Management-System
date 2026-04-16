<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\RejectStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminStudentController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $students = Student::query()
            ->with('division', 'district', 'upazila', 'user')
            ->when($request->string('status')->toString(), function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->string('search')->toString(), function ($query, $search) {
                $query->where(function ($nestedQuery) use ($search): void {
                    $nestedQuery
                        ->where('full_name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('student_code', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($userQuery) use ($search): void {
                            $userQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return $this->success('Students fetched successfully.', [
            'items' => StudentResource::collection($students->items()),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
        ]);
    }

    public function show(Student $student): JsonResponse
    {
        $student->load('division', 'district', 'upazila', 'user');

        return $this->success('Student details fetched successfully.', [
            'student' => new StudentResource($student),
        ]);
    }

    public function approve(Student $student): JsonResponse
    {
        if ($student->status === 'approved') {
            return $this->success('Student is already approved.', [
                'student' => new StudentResource($student->load('division', 'district', 'upazila', 'user')),
            ]);
        }

        $student->update([
            'status' => 'approved',
            'student_code' => $student->student_code ?? $this->generateStudentCode($student),
            'approved_at' => now(),
            'approved_by' => request()->user()->id,
            'rejected_at' => null,
            'rejected_by' => null,
            'rejection_reason' => null,
        ]);

        return $this->success('Student approved successfully.', [
            'student' => new StudentResource($student->fresh()->load('division', 'district', 'upazila', 'user')),
        ]);
    }

    public function reject(RejectStudentRequest $request, Student $student): JsonResponse
    {
        $student->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => request()->user()->id,
            'rejection_reason' => $request->validated('reason'),
        ]);

        return $this->success('Student rejected successfully.', [
            'student' => new StudentResource($student->fresh()->load('division', 'district', 'upazila', 'user')),
        ]);
    }

    private function generateStudentCode(Student $student): string
    {
        return sprintf('MO-%s-%06d', now()->format('Y'), $student->id);
    }
}