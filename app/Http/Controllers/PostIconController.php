<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class PostIconController extends Controller
{
    public function __invoke(Post $post): Response
    {
        abort_if($post->icon_data === null, 404);

        $contents = is_resource($post->icon_data)
            ? stream_get_contents($post->icon_data)
            : $post->icon_data;

        return response($contents, 200, [
            'Cache-Control' => 'public, max-age=3600',
            'Content-Type' => $post->icon_mime_type,
        ]);
    }
}
