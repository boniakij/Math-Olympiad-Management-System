<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthCheckTest extends TestCase
{
    public function test_the_up_endpoint_returns_a_successful_response(): void
    {
        $response = $this->get('/up');

        $response->assertOk();
    }

    public function test_the_api_health_endpoint_returns_a_success_payload(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'API is healthy.',
            ]);
    }
}
