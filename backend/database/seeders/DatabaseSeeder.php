<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@aribamath.org',
            'role' => UserRole::Admin->value,
        ]);

        User::factory()->create([
            'name' => 'Student User',
            'email' => 'student@aribamath.org',
            'role' => UserRole::Student->value,
        ]);
    }
}
