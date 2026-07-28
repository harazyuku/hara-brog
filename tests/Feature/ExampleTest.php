<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('home page returns the latest posts', function () {
    $response = $this->get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('latestPosts')
            ->where('visitorNumber', 1)
        );
});

test('visitor counter increments once per session', function () {
    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('visitorNumber', 1)
        );

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('visitorNumber', 1)
        );

    $this->flushSession();

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('visitorNumber', 2)
        );

    $this->assertDatabaseHas('site_counters', [
        'key' => 'visitors',
        'value' => 2,
    ]);
});
