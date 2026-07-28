<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests can read posts but cannot manage them', function () {
    $post = Post::query()->create([
        'title' => '公開記事',
        'category' => '日常',
        'content' => '本文です。',
    ]);

    $this->get(route('posts.index'))->assertOk();
    $this->get(route('posts.show', $post))->assertOk();

    $this->get(route('posts.create'))
        ->assertRedirect(route('login'));
    $this->get(route('posts.edit', $post))
        ->assertRedirect(route('login'));
    $this->delete(route('posts.destroy', $post))
        ->assertRedirect(route('login'));
});

test('non administrators cannot manage posts', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('posts.create'))
        ->assertForbidden();
});

test('administrators can manage posts', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('posts.create'))
        ->assertOk();

    $this->post(route('posts.store'), [
        'title' => '管理者の記事',
        'category' => '開発',
        'content' => '管理者だけが投稿できます。',
    ])->assertRedirect(route('posts.index', absolute: false));

    $this->assertDatabaseHas('posts', [
        'title' => '管理者の記事',
    ]);
});
