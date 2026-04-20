<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Post;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'latestPosts' => Post::latest()->take(6)->get()
        ]);
    }
}
