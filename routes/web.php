<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarkdownPreviewController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// 投稿CRUD
Route::resource('posts', PostController::class);

Route::post('markdown/preview', MarkdownPreviewController::class)->name('markdown.preview');

// コメント投稿
Route::post('posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

// トップページ
Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__.'/settings.php';
