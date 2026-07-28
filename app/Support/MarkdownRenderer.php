<?php

namespace App\Support;

use Illuminate\Support\Str;

class MarkdownRenderer
{
    public function render(string $markdown): string
    {
        return (string) Str::of($markdown)->markdown([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }
}
