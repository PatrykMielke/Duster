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
    public function index()
    {
        // Pobieramy wszystkie ogłoszenia z bazy danych
        $listings = Listing::all();

        // Zwracamy widok Inertia z listingami
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
     * Display the specified resource.
     */
    public function show($id)
    {
        $listing = Listing::findOrFail($id);

        return Inertia::render('ProductDetails', ['listing' => $listing]);
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
