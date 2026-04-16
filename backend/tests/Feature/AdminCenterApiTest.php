<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Center;
use App\Models\District;
use App\Models\Division;
use App\Models\Upazila;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminCenterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_list_update_and_delete_centers(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::Admin->value,
        ]);
        Sanctum::actingAs($admin);

        [$division, $district, $upazila] = $this->createLocationTree();

        $createResponse = $this->postJson('/api/v1/admin/centers', [
            'name' => 'Dhaka Science Center',
            'code' => 'DSC-001',
            'address' => 'Central Road, Dhaka',
            'capacity' => 250,
            'division_id' => $division->id,
            'district_id' => $district->id,
            'upazila_id' => $upazila->id,
            'is_active' => true,
        ]);

        $createResponse
            ->assertCreated()
            ->assertJson([
                'success' => true,
                'message' => 'Center created successfully.',
            ]);

        $centerId = $createResponse->json('data.center.id');

        $this->getJson('/api/v1/admin/centers?search=Science')
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Centers fetched successfully.',
            ])
            ->assertJsonPath('data.meta.total', 1);

        $this->putJson("/api/v1/admin/centers/{$centerId}", [
            'capacity' => 300,
            'is_active' => false,
        ])
            ->assertOk()
            ->assertJsonPath('data.center.capacity', 300)
            ->assertJsonPath('data.center.is_active', false);

        $this->deleteJson("/api/v1/admin/centers/{$centerId}")
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Center deleted successfully.',
            ]);

        $this->assertDatabaseMissing('centers', [
            'id' => $centerId,
        ]);
    }

    public function test_student_cannot_access_admin_center_routes(): void
    {
        $student = User::factory()->create([
            'role' => UserRole::Student->value,
        ]);
        Sanctum::actingAs($student);

        $this->getJson('/api/v1/admin/centers')
            ->assertForbidden()
            ->assertJson([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ]);
    }

    public function test_admin_cannot_create_center_with_invalid_location_hierarchy(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::Admin->value,
        ]);
        Sanctum::actingAs($admin);

        [$division] = $this->createLocationTree();
        [, $wrongDistrict, $wrongUpazila] = $this->createLocationTree('Other Division', 'Other District', 'Other Upazila');

        $this->postJson('/api/v1/admin/centers', [
            'name' => 'Invalid Center',
            'code' => 'INV-001',
            'address' => 'Nowhere',
            'capacity' => 100,
            'division_id' => $division->id,
            'district_id' => $wrongDistrict->id,
            'upazila_id' => $wrongUpazila->id,
        ])
            ->assertUnprocessable()
            ->assertJson([
                'success' => false,
                'message' => 'Invalid location hierarchy.',
            ]);

        $this->assertDatabaseCount('centers', 0);
    }

    /**
     * @return array{0: Division, 1: District, 2: Upazila}
     */
    private function createLocationTree(
        string $divisionName = 'Dhaka',
        string $districtName = 'Dhaka District',
        string $upazilaName = 'Dhamrai'
    ): array {
        $division = Division::create([
            'name' => $divisionName,
            'code' => strtoupper(substr($divisionName, 0, 3)),
        ]);

        $district = District::create([
            'division_id' => $division->id,
            'name' => $districtName,
            'code' => strtoupper(substr($districtName, 0, 3)).'-1',
        ]);

        $upazila = Upazila::create([
            'district_id' => $district->id,
            'name' => $upazilaName,
            'code' => strtoupper(substr($upazilaName, 0, 3)).'-1',
        ]);

        return [$division, $district, $upazila];
    }
}