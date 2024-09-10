<?php

use App\Models\User;

test('should not login user with invalid credentials', function (string $email, string $password) {
    User::factory()->create([
        'email' => 'user@userland.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->postJson('login', [
        'email' => $email,
        'password' => $password,
    ]);

    $response->assertStatus(422)->assertJsonStructure(['message']);
})->with([
    ['incorrect@email.com', 'password123'],
    ['user@userland.com', 'incorrect-password'],
]);

test('should login user', function () {
    User::factory()->create([
        'email' => 'user@userland.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->postJson('login', [
        'email' => 'user@userland.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)->assertJsonStructure(['token']);
});
