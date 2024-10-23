<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($sortField = 'created_at', $sortOrder = 'desc')
    {
        $listings = Listing::orderBy($sortField, $sortOrder)->get();

        return Inertia::render('ListingsList', ['products' => $listings]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display specified 
     */
    public function show($id)
    {
        // Znajdź listing wraz z powiązanym użytkownikiem
        $listing = Listing::with('user')->findOrFail($id);

        // Pobierz powiązany model User
        $user = $listing->user;

        return Inertia::render('Listing/ListingDetails', [
            'listing' => $listing,
            'user' => $user
        ]);
    }

    public function showVisits($id)
    {
        $listing = Listing::findOrFail($id);

        // Zliczanie unikalnych użytkowników, którzy odwiedzili ogłoszenie
        $uniqueUserCount = $listing->visits()->distinct('user_id')->count('user_id');

        return view('listings.show', [
            'listing' => $listing,
            'uniqueUserCount' => $uniqueUserCount
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Listing $listing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Listing $listing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        //
    }
}
