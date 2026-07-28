<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePostRequest;
use App\Models\Post;
use App\Support\MarkdownRenderer;
use App\Support\PostIconProcessor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $posts = Post::query()->forListing()->latest()->get();

        return Inertia::render('Posts', [
            'Posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('PostCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        SavePostRequest $request,
        PostIconProcessor $postIconProcessor,
    ): RedirectResponse {
        DB::transaction(function () use ($request, $postIconProcessor): void {
            $post = Post::query()->create($request->safe()->except('icon'));

            $this->saveIcon($request, $post, $postIconProcessor);
        });

        return new RedirectResponse(route('posts.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Post $post,
        MarkdownRenderer $markdownRenderer,
    ): Response {
        $post->load('comments');
        $postData = $post->toArray();
        $postData['content_html'] = $markdownRenderer->render($post->content);

        return inertia('PostShow', [
            'post' => $postData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        return inertia('PostEdit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        SavePostRequest $request,
        Post $post,
        PostIconProcessor $postIconProcessor,
    ): RedirectResponse {
        DB::transaction(function () use (
            $request,
            $post,
            $postIconProcessor,
        ): void {
            $post->update($request->safe()->except('icon'));

            $this->saveIcon($request, $post, $postIconProcessor);
        });

        return new RedirectResponse(
            route('posts.show', $post, absolute: false),
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return new RedirectResponse(route('posts.index', absolute: false));
    }

    private function saveIcon(
        SavePostRequest $request,
        Post $post,
        PostIconProcessor $postIconProcessor,
    ): void {
        $uploadedFile = $request->file('icon');

        if (! $uploadedFile instanceof UploadedFile) {
            return;
        }

        $iconContents = $postIconProcessor->process($uploadedFile);
        $iconStream = fopen('php://temp', 'w+b');

        if (
            $iconStream === false
            || fwrite($iconStream, $iconContents) !== strlen($iconContents)
        ) {
            throw new RuntimeException('一覧アイコン画像を保存できませんでした。');
        }

        rewind($iconStream);

        try {
            $post->forceFill([
                'icon_data' => $iconStream,
                'icon_mime_type' => 'image/webp',
            ])->save();
        } finally {
            fclose($iconStream);
        }
    }
}
