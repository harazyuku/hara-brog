<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\SiteCounter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $visitorNumber = $request->session()->get('visitor_number');

        if (! is_int($visitorNumber)) {
            $visitorNumber = SiteCounter::claimVisitorNumber();
            $request->session()->put('visitor_number', $visitorNumber);
        }

        return Inertia::render('Home', [
            'latestPosts' => Post::query()
                ->forListing()
                ->latest()
                ->take(6)
                ->get(),
            'visitorNumber' => $visitorNumber,
        ]);
    }
}
