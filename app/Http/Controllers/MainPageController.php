<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listing;
use Illuminate\Http\Request;

class MainPageController extends Controller
{
    public function index(){
        $listings = Listing::with(['user', 'galleries', 'details.category', 'details'])  // Eager load the relationships
        ->get();

        return Inertia::render('HomePage',['listings' => $listings]);
    }
}
