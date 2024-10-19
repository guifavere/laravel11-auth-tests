<?php

test('should register a user', function () {
    $response = $this->postJson('register', [
        'name' => 'user-test',
        'email' => 'user@test.com',
        'password' => 'test-password',
        'password_confirmation' => 'test-password',
    ]);

    $this->assertDatabaseHas('users', [
        'name' => 'user-test',
        'email' => 'user@test.com',
    ]);

    $response->assertNoContent();
});
