<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('the command creates an administrator', function () {
    $this->artisan('app:create-admin')
        ->expectsQuestion('管理者名', '池原 優斗')
        ->expectsQuestion('メールアドレス', 'admin@example.com')
        ->expectsQuestion('パスワード（12文字以上）', 'strong-password')
        ->expectsQuestion('パスワードを再入力', 'strong-password')
        ->expectsOutput('管理者アカウントを作成しました: admin@example.com')
        ->assertSuccessful();

    $admin = User::query()->where('email', 'admin@example.com')->sole();

    expect($admin->is_admin)
        ->toBeTrue()
        ->and($admin->email_verified_at)->not->toBeNull();
});
