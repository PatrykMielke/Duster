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
        try {
            $validatedData = $request->validate([
                'listing_id' => 'required|integer|exists:listings,id',
                'user_id' => 'required|integer|exists:users,id',
            ]);

            $existingFollow = FollowedListing::where('listing_id', $validatedData['listing_id'])
                ->where('user_id', $validatedData['user_id'])
                ->first();

            if ($existingFollow) {
                return response()->json(['status' => 'Już obserwujesz ten listing'], 200);
            }

            $newFollow = FollowedListing::create($validatedData);

            return response()->json(['status' => 'Dodano do obserwowanych', 'data' => $newFollow], 201);
        } catch (\Exception $e) {
            // Zapisz błąd do logów i zwróć odpowiedź dla frontendu
            return response()->json(['error' => 'Wystąpił błąd podczas zapisu'], 500);
        }
    }


    public function check(Request $request)
    {
        $exists = FollowedListing::where('user_id', $request->user_id)
            ->where('listing_id', $request->listing_id)
            ->exists();

        return response()->json(['isFavorite' => $exists]);
    }



    public function destroy($userId)
    {
        $followedListings = FollowedListing::where('user_id', $userId)->with('listing')->get();

        return;
    }
}
