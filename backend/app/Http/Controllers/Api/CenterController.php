<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\StoreCenterRequest;
use App\Http\Requests\Admin\UpdateCenterRequest;
use App\Http\Resources\CenterResource;
use App\Models\Center;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CenterController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $centers = Center::query()
            ->with('division', 'district', 'upazila')
            ->when($request->string('search')->toString(), function ($query, $search): void {
                $query->where(function ($nestedQuery) use ($search): void {
                    $nestedQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('division_id'), function ($query) use ($request): void {
                $query->where('division_id', $request->integer('division_id'));
            })
            ->when($request->filled('district_id'), function ($query) use ($request): void {
                $query->where('district_id', $request->integer('district_id'));
            })
            ->when($request->filled('upazila_id'), function ($query) use ($request): void {
                $query->where('upazila_id', $request->integer('upazila_id'));
            })
            ->when($request->filled('is_active'), function ($query) use ($request): void {
                $query->where('is_active', $request->boolean('is_active'));
            })
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return $this->success('Centers fetched successfully.', [
            'items' => CenterResource::collection($centers->items()),
            'meta' => [
                'current_page' => $centers->currentPage(),
                'last_page' => $centers->lastPage(),
                'per_page' => $centers->perPage(),
                'total' => $centers->total(),
            ],
        ]);
    }

    public function store(StoreCenterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $locationError = $this->validateLocationHierarchy($validated['division_id'], $validated['district_id'], $validated['upazila_id']);
        if ($locationError !== null) {
            return $locationError;
        }

        $center = Center::create($validated);
        $center->load('division', 'district', 'upazila');

        return $this->success('Center created successfully.', [
            'center' => new CenterResource($center),
        ], 201);
    }

    public function show(Center $center): JsonResponse
    {
        $center->load('division', 'district', 'upazila');

        return $this->success('Center details fetched successfully.', [
            'center' => new CenterResource($center),
        ]);
    }

    public function update(UpdateCenterRequest $request, Center $center): JsonResponse
    {
        $validated = $request->validated();

        if (
            array_key_exists('division_id', $validated)
            || array_key_exists('district_id', $validated)
            || array_key_exists('upazila_id', $validated)
        ) {
            $divisionId = $validated['division_id'] ?? $center->division_id;
            $districtId = $validated['district_id'] ?? $center->district_id;
            $upazilaId = $validated['upazila_id'] ?? $center->upazila_id;

            $locationError = $this->validateLocationHierarchy($divisionId, $districtId, $upazilaId);
            if ($locationError !== null) {
                return $locationError;
            }
        }

        $center->update($validated);
        $center->refresh()->load('division', 'district', 'upazila');

        return $this->success('Center updated successfully.', [
            'center' => new CenterResource($center),
        ]);
    }

    public function destroy(Center $center): JsonResponse
    {
        $center->delete();

        return $this->success('Center deleted successfully.');
    }

    private function validateLocationHierarchy(int $divisionId, int $districtId, int $upazilaId): ?JsonResponse
    {
        $districtBelongsToDivision = \App\Models\District::query()
            ->whereKey($districtId)
            ->where('division_id', $divisionId)
            ->exists();

        if (! $districtBelongsToDivision) {
            return $this->error('Invalid location hierarchy.', [
                'district_id' => ['The selected district does not belong to the selected division.'],
            ]);
        }

        $upazilaBelongsToDistrict = \App\Models\Upazila::query()
            ->whereKey($upazilaId)
            ->where('district_id', $districtId)
            ->exists();

        if (! $upazilaBelongsToDistrict) {
            return $this->error('Invalid location hierarchy.', [
                'upazila_id' => ['The selected upazila does not belong to the selected district.'],
            ]);
        }

        return null;
    }
}