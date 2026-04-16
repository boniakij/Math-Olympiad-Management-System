<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserRole;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends ApiController
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => UserRole::Student,
        ]);

        $photoPath = $request->hasFile('photo')
            ? $request->file('photo')->store('students/photos', 'public')
            : null;

        $student = Student::create([
            'user_id' => $user->id,
            'full_name' => $validated['full_name'],
            'photo_path' => $photoPath,
            'father_name' => $validated['father_name'],
            'mother_name' => $validated['mother_name'],
            'school_name' => $validated['school_name'],
            'class_name' => $validated['class_name'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'division_id' => $validated['division_id'],
            'district_id' => $validated['district_id'],
            'upazila_id' => $validated['upazila_id'],
            'status' => 'pending',
        ]);

        $token = $user->createToken('student-auth-token')->plainTextToken;

        return $this->success('Registration completed successfully.', [
            'token' => $token,
            'user' => new UserResource($user->load('student.division', 'student.district', 'student.upazila')),
            'student_id' => $student->id,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::with('student.division', 'student.district', 'student.upazila')
            ->where('email', $validated['email'])
            ->first();

        if ($user === null || ! Hash::check($validated['password'], $user->password)) {
            return $this->error('The provided credentials are invalid.', [], 401);
        }

        $user->tokens()->delete();

        $token = $user->createToken('auth-token')->plainTextToken;

        return $this->success('Login successful.', [
            'token' => $token,
            'user' => new UserResource($user),
        ]);
    }

    public function me(): JsonResponse
    {
        $user = request()->user()->loadMissing('student.division', 'student.district', 'student.upazila');

        return $this->success('Authenticated user fetched successfully.', [
            'user' => new UserResource($user),
        ]);
    }

    public function logout(): JsonResponse
    {
        request()->user()?->currentAccessToken()?->delete();

        return $this->success('Logout successful.');
    }
}