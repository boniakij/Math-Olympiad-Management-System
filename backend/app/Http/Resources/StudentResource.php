<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_code' => $this->student_code,
            'full_name' => $this->full_name,
            'photo_url' => $this->photo_path ? asset('storage/'.$this->photo_path) : null,
            'father_name' => $this->father_name,
            'mother_name' => $this->mother_name,
            'school_name' => $this->school_name,
            'class_name' => $this->class_name,
            'phone' => $this->phone,
            'address' => $this->address,
            'status' => $this->status,
            'division' => LocationResource::make($this->whenLoaded('division')),
            'district' => LocationResource::make($this->whenLoaded('district')),
            'upazila' => LocationResource::make($this->whenLoaded('upazila')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'approved_at' => $this->approved_at,
            'rejected_at' => $this->rejected_at,
        ];
    }
}