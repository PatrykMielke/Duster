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
        // WSZYSTKIE OGLOSZENIA
        //
        // Pobierz ogłoszenia uporządkowane według daty utworzenia z powiązanymi użytkownikami i galeriami
        $listings = Listing::with(['user', 'galleries'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Listing/Listings', [
            'products' => $listings,
        ]);
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
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);
        $uniqueUserCount = $listing->visits()->distinct('user_id')->count('user_id');


        return Inertia::render('Listing/ListingDetails', [
            'listing' => $listing,
            'uniqueUserCount' => $uniqueUserCount,

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
