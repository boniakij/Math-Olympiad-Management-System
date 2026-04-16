<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CenterResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'address' => $this->address,
            'capacity' => $this->capacity,
            'is_active' => $this->is_active,
            'division' => LocationResource::make($this->whenLoaded('division')),
            'district' => LocationResource::make($this->whenLoaded('district')),
            'upazila' => LocationResource::make($this->whenLoaded('upazila')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}