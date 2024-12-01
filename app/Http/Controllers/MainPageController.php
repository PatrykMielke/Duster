<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listing;
use Illuminate\Http\Request;

class MainPageController extends Controller
{
    public function index(){
        $listings = Listing::with(['user', 'galleries', 'details.category', 'details'])  // Eager load the relationships
        ->where('status_id', 1)
        ->get();

        return Inertia::render('HomePage',['listings' => $listings]);
    }
}
