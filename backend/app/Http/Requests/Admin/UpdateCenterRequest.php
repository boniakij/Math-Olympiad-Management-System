<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCenterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $center = $this->route('center');
        $centerId = is_object($center) ? $center->id : $center;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'code' => ['sometimes', 'required', 'string', 'max:30', Rule::unique('centers', 'code')->ignore($centerId)],
            'address' => ['sometimes', 'required', 'string', 'max:1000'],
            'capacity' => ['sometimes', 'required', 'integer', 'min:1', 'max:100000'],
            'division_id' => ['sometimes', 'required', 'integer', 'exists:divisions,id'],
            'district_id' => ['sometimes', 'required', 'integer', 'exists:districts,id'],
            'upazila_id' => ['sometimes', 'required', 'integer', 'exists:upazilas,id'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}