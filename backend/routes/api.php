<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AdminStudentController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\CenterController;
use App\Http\Controllers\Api\StudentProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'API is healthy.',
            'data' => [
                'service' => config('app.name'),
            ],
        ]);
    });

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    Route::prefix('locations')->group(function (): void {
        Route::get('/divisions', [LocationController::class, 'divisions']);
        Route::get('/divisions/{division}/districts', [LocationController::class, 'districts']);
        Route::get('/districts/{district}/upazilas', [LocationController::class, 'upazilas']);
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::prefix('student')->middleware('role:student')->group(function (): void {
            Route::get('/profile', [StudentProfileController::class, 'show']);
            Route::put('/profile', [StudentProfileController::class, 'update']);
            Route::get('/dashboard', [StudentProfileController::class, 'dashboard']);
        });

        Route::prefix('admin')->middleware('role:admin,super_admin')->group(function (): void {
            Route::get('/dashboard/summary', [AdminDashboardController::class, 'summary']);

            Route::prefix('centers')->group(function (): void {
                Route::get('/', [CenterController::class, 'index']);
                Route::post('/', [CenterController::class, 'store']);
                Route::get('/{center}', [CenterController::class, 'show']);
                Route::put('/{center}', [CenterController::class, 'update']);
                Route::delete('/{center}', [CenterController::class, 'destroy']);
            });

            Route::prefix('students')->group(function (): void {
                Route::get('/', [AdminStudentController::class, 'index']);
                Route::get('/{student}', [AdminStudentController::class, 'show']);
                Route::post('/{student}/approve', [AdminStudentController::class, 'approve']);
                Route::post('/{student}/reject', [AdminStudentController::class, 'reject']);
            });
        });
    });
});