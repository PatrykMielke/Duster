<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use App\Models\Comment;
use App\Models\Listing;
use App\Models\FollowedUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\NameUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\EmailUpdateRequest;
use Illuminate\Validation\Rules\Password;
use App\Http\Requests\PasswordUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function show($id)
    {
        // WSZYSTKIE OGLOSZENIA
        if (!$user = User::withCount(['followers', 'following'])->find($id)) {
            return redirect()->route('index');
        }

        // Pobierz średnią ocenę dla komentarzy użytkownika (średnia z jego komentarzy)
        $averageRating = Comment::where('profile_user_id', $user->id)
            ->avg('rating'); // Obliczamy średnią ocenę
        $ratingCount = Comment::where('profile_user_id', $user->id)->count('rating');


        // Możesz dodać średnią ocenę do obiektu $listing
        $user->averageRating = $averageRating;
        $user->ratingCount = $ratingCount;

        $listings = Listing::with(['user', 'galleries'])
            ->where('status_id', 1)
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        $isFollowing = false;

        if (auth()->check()) {
            $isFollowing = FollowedUser::where('user_id', auth()->id())
                ->where('followed_user_id', (int) $id)
                ->exists();

        }
        $followedListings = Auth::user()->followedListings()
        ->with('listing.galleries') // Include the related listings
        ->get()
        ->pluck('listing');
        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'products' => $listings,
            'isFollowing' => $isFollowing,
            'followedListings' => $followedListings,
        ]);
    }
    /**
     * Update the user's profile information.
     */
    public function userOrders(){
        $orders = Order::with(['listing','listing.user', 'paymentMethod', 'deliveryMethod'])->where('buyer_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Profile/Orders', ['orders' => $orders]);
    }
    public function updateName(NameUpdateRequest $request): RedirectResponse
    {

        $request->user()->fill($request->validated());

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    public function updateEmail(EmailUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();
        $user->update(['is_active' => false]);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    public function wallet()
    {
        return Inertia::render('Profile/wallet', []);
    }
    public function updatePassword(PasswordUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        $user = Auth::user();
        $user->update(['password' => Hash::make($request->password)]);
        return Redirect::route('profile.edit');
    }
}
