<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $studentId = $this->user()?->student?->id;

        return [
            'full_name' => ['sometimes', 'required', 'string', 'max:255'],
            'photo' => ['sometimes', 'nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'father_name' => ['sometimes', 'required', 'string', 'max:255'],
            'mother_name' => ['sometimes', 'required', 'string', 'max:255'],
            'school_name' => ['sometimes', 'required', 'string', 'max:255'],
            'class_name' => ['sometimes', 'required', 'string', 'max:100'],
            'phone' => ['sometimes', 'required', 'string', 'max:30', Rule::unique('students', 'phone')->ignore($studentId)],
            'address' => ['sometimes', 'required', 'string', 'max:1000'],
            'division_id' => ['sometimes', 'required', 'integer', Rule::exists('divisions', 'id')],
            'district_id' => ['sometimes', 'required', 'integer', Rule::exists('districts', 'id')],
            'upazila_id' => ['sometimes', 'required', 'integer', Rule::exists('upazilas', 'id')],
        ];
    }
}