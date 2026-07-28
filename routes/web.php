<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarkdownPreviewController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostIconController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

// web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// 記事の閲覧
Route::resource('posts', PostController::class)->only(['index']);

// 管理者用の記事操作
Route::middleware(['auth', EnsureUserIsAdmin::class])->group(function () {
    Route::resource('posts', PostController::class)
        ->only(['create', 'store', 'edit', 'update', 'destroy']);

    Route::post('markdown/preview', MarkdownPreviewController::class)
        ->name('markdown.preview');
});

Route::get('posts/{post}/icon', PostIconController::class)->name('posts.icon');

// コメント投稿
Route::post('posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

Route::resource('posts', PostController::class)->only(['show']);

// トップページ
Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__.'/settings.php';
