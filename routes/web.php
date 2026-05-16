<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\HomeController;


// web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// 投稿CRUD
Route::resource('posts', PostController::class);

// コメント投稿
Route::post('posts/{post}/comments', [App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');

// トップページ
Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__.'/settings.php';


