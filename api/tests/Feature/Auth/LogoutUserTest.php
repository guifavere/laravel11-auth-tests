<?php

use App\Models\User;

test('should logout the user', function () {
    $token = User::factory()->create()->createToken('auth_token');

    $response = $this->withHeader('Authorization', "Bearer $token->plainTextToken")->postJson('logout');

    $response->assertStatus(204);
    $this->assertDatabaseMissing('personal_access_tokens', ['id' => $token->accessToken->id]);
});
