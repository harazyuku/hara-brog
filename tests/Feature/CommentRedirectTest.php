<?php

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('comment submission redirects to the comments section', function () {
    $post = Post::query()->create([
        'title' => 'コメント対象の記事',
        'category' => '日常',
        'content' => '本文です。',
    ]);

    $response = $this
        ->withHeaders([
            'Accept' => 'application/json',
            'X-Inertia' => 'true',
        ])
        ->post(route('comments.store', $post), [
            'name' => '読者',
            'content' => 'コメント本文',
        ]);

    $response
        ->assertStatus(409)
        ->assertHeader(
            'X-Inertia-Location',
            route('posts.show', $post, absolute: false).'#comments',
        );

    $this->assertDatabaseHas('comments', [
        'post_id' => $post->id,
        'content' => 'コメント本文',
    ]);
});
