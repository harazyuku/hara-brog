<?php

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('the admin seeder creates an administrator from configuration', function () {
    config()->set([
        'admin.name' => '管理者',
        'admin.email' => 'admin@example.com',
        'admin.password' => 'strong-password',
    ]);

    $this->seed(AdminUserSeeder::class);
    $this->seed(AdminUserSeeder::class);

    $admin = User::query()->where('email', 'admin@example.com')->sole();

    expect($admin->name)
        ->toBe('管理者')
        ->and($admin->is_admin)->toBeTrue()
        ->and($admin->email_verified_at)->not->toBeNull()
        ->and(Hash::check('strong-password', $admin->password))->toBeTrue();
});
