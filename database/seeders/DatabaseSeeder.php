<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post; // ← これを追加！
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // もしテストユーザーを作りたいならここを活かす（任意）
        // User::factory(10)->create();

        // ❌ User::factory() ではなく、✅ Post::create() を使う
        Post::create([
            'title' => 'データベースからこんにちは',
            'content' => 'これはDBから取得した記事です。',
            'category' => '日常'
        ]);

        Post::create([
            'title' => 'テストおおおおおおおおおお',
            'content' => 'あああああああｓ',
            'category' => '食べログアンチスレ'
        ]);
    }
}
