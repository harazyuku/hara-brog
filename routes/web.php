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

// これだけで index, create, store, show, edit, update, destroy の7つが有効になります
Route::resource('posts', PostController::class);

// トップページ（/）にアクセスしたときも、PostControllerのindex（一覧）を見せたいなら
Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__.'/settings.php';


