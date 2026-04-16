<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\LocationResource;
use App\Models\District;
use App\Models\Division;

class LocationController extends ApiController
{
    public function divisions()
    {
        return $this->success('Divisions fetched successfully.', [
            'items' => LocationResource::collection(Division::query()->orderBy('name')->get()),
        ]);
    }

    public function districts(Division $division)
    {
        return $this->success('Districts fetched successfully.', [
            'items' => LocationResource::collection($division->districts()->orderBy('name')->get()),
        ]);
    }

    public function upazilas(District $district)
    {
        return $this->success('Upazilas fetched successfully.', [
            'items' => LocationResource::collection($district->upazilas()->orderBy('name')->get()),
        ]);
    }
}