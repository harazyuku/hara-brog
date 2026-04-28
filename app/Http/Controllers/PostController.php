<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
$posts = Post::latest()->get();
    return Inertia::render('Posts', [
        'Posts' => $posts
    ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('PostCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request)
    {
        // 1. バリデーション（入力チェック）
        $validated = $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
            'content' => 'required',
        ]);

        // 2. データベースに保存
        Post::create($validated);

        // 3. 一覧ページに戻る
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('PostShow', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('PostEdit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
