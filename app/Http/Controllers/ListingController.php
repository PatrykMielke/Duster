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
        $listings = Listing::with(['user', 'galleries'])->orderBy('created_at', 'desc')->where('status_id', 1)->get();

        return Inertia::render('Listing/Listings', [
            'products' => $listings,
        ]);
    }


    public function adminDashboard()
    {
        // WSZYSTKIE OGLOSZENIA
        $listings = Listing::with(['user', 'galleries', 'status'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Dashboard');
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

    public function checkout($id)
    {
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);


        return Inertia::render('Listing/Checkout/Checkout', [
            'listing' => $listing
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
