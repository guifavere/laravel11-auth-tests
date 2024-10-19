<?php

use App\Models\User;

test('should show the user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('api/user');

    $response->assertStatus(200)->assertJsonStructure([
        'id',
        'name',
        'email',
    ]);
});
