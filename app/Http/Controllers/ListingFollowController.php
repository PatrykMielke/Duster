<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FollowedListing;
use App\Http\Controllers\Controller;

class ListingFollowController extends Controller
{

    public function index($userId)
    {
        $followedListings = FollowedListing::where('user_id', $userId)->with('listing')->get();

        return response()->json($followedListings);
    }

    public function store(Request $request)
    {
        dd($request->all());
        $validatedData = $request->validate([
            'listing_id' => 'required|integer|exists:listings,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $existingFollow = FollowedListing::where('listing_id', $validatedData['listing_id'])
            ->where('user_id', $validatedData['user_id'])
            ->first();

        if ($existingFollow) {
            return;
        }

        $newFollow = FollowedListing::create($validatedData);

        return $newFollow;
    }




    public function destroy($userId)
    {
        $followedListings = FollowedListing::where('user_id', $userId)->with('listing')->get();

        return;
    }
}
