<?php

namespace App\Http\Controllers;

use App\Support\MarkdownRenderer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarkdownPreviewController extends Controller
{
    public function __invoke(
        Request $request,
        MarkdownRenderer $markdownRenderer,
    ): JsonResponse {
        $validated = $request->validate([
            'content' => ['required', 'string', 'max:100000'],
        ]);

        return response()->json([
            'html' => $markdownRenderer->render($validated['content']),
        ]);
    }
}
