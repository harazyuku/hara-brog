<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('a post can be created with a list icon', function () {
    $this->actingAs(User::factory()->admin()->create());

    $response = $this->post(route('posts.store'), [
        'title' => '画像つき記事',
        'category' => 'テック',
        'content' => '本文です。',
        'icon' => UploadedFile::fake()->image('icon.png', 320, 180),
    ]);

    $response->assertRedirect(route('posts.index', absolute: false));

    $post = Post::query()->sole();

    expect($post->icon_data)
        ->not->toBeNull()
        ->and($post->icon_mime_type)->toBe('image/webp')
        ->and($post->has_icon)->toBeTrue();

    $this->get(route('posts.icon', $post))
        ->assertOk()
        ->assertHeader('Content-Type', 'image/webp');
});

test('post lists expose the icon state without exposing image bytes', function () {
    $post = Post::query()->create([
        'title' => '一覧記事',
        'category' => '日常',
        'content' => '本文です。',
    ]);

    $post->forceFill([
        'icon_data' => 'fake-image-bytes',
        'icon_mime_type' => 'image/webp',
    ])->save();

    $this->get(route('posts.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Posts')
            ->where('Posts.0.has_icon', true)
            ->missing('Posts.0.icon_data')
            ->missing('Posts.0.icon_mime_type'),
        );
});

test('a non-image file cannot be used as a list icon', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('posts.store'), [
        'title' => '不正な画像',
        'category' => 'テック',
        'content' => '本文です。',
        'icon' => UploadedFile::fake()->create(
            'not-an-image.txt',
            10,
            'text/plain',
        ),
    ])->assertSessionHasErrors('icon');

    expect(Post::query()->count())->toBe(0);
});
