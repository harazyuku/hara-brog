<?php

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('markdown preview returns safe html', function () {
    $response = $this->postJson(route('markdown.preview'), [
        'content' => "# 見出し\n\n**太字**\n\n<script>alert('xss')</script>\n\n[危険](javascript:alert('xss'))",
    ]);

    $response
        ->assertOk()
        ->assertJsonPath('html', fn (string $html): bool => str_contains($html, '<h1>見出し</h1>')
            && str_contains($html, '<strong>太字</strong>')
            && ! str_contains($html, '<script')
            && ! str_contains($html, 'href="javascript:'));
});

test('post page receives rendered markdown while preserving source', function () {
    $post = Post::query()->create([
        'title' => 'Markdown記事',
        'category' => 'テック',
        'content' => "## 小見出し\n\n本文です。",
    ]);

    $this->get(route('posts.show', $post))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('PostShow')
            ->where('post.content', "## 小見出し\n\n本文です。")
            ->where('post.content_html', "<h2>小見出し</h2>\n<p>本文です。</p>\n"),
        );
});

test('updating a post does not create a duplicate', function () {
    $post = Post::query()->create([
        'title' => '変更前',
        'category' => '日常',
        'content' => '変更前の本文',
    ]);

    $this->put(route('posts.update', $post), [
        'title' => '変更後',
        'category' => 'テック',
        'content' => '**変更後の本文**',
    ])->assertRedirect(route('posts.show', $post));

    expect(Post::query()->count())->toBe(1)
        ->and($post->refresh()->title)->toBe('変更後')
        ->and($post->content)->toBe('**変更後の本文**');
});
