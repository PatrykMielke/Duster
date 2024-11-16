<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Listing;
use Illuminate\Http\Request;
use App\Http\Controllers\CalculateDatesController;

class AdminController extends Controller
{
    public function index()
    {
        // WSZYSTKIE OGLOSZENIA
        $listings = Listing::with(['user', 'galleries', 'status'])->orderBy('created_at', 'desc')->get();

        //
        $users = User::with(['role', 'session'])->get();

        $users->each(function ($user) {
            if (isset($user->session->last_activity)) {
                $user->session->last_activity = CalculateDatesController::getLastActivity($user->session->last_activity);
            }
        });

        $orders = Order::with(['buyer', 'listing', 'paymentMethod', 'deliveryMethod'])->get();
        //dd($users);
        return Inertia::render('Admin/Dashboard', [
            'products' => $listings,
            'users' => $users,
            'orders' => $orders,
        ]);
    }
}
