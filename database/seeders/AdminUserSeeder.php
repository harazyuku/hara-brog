<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws ValidationException
     */
    public function run(): void
    {
        $credentials = [
            'name' => config('admin.name'),
            'email' => config('admin.email'),
            'password' => config('admin.password'),
        ];

        if ($credentials['email'] === null && $credentials['password'] === null) {
            $this->command?->warn('ADMIN_EMAIL と ADMIN_PASSWORD が未設定のため、管理者作成をスキップしました。');

            return;
        }

        $validated = Validator::validate($credentials, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $admin = User::query()->firstOrNew([
            'email' => $validated['email'],
        ]);

        $admin->fill([
            'name' => $validated['name'],
            'password' => $validated['password'],
            'is_admin' => true,
        ]);
        $admin->email_verified_at ??= now();
        $admin->save();

        $this->command?->info("管理者アカウントを作成・更新しました: {$admin->email}");
    }
}
