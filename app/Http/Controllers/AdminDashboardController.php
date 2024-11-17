<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Status;
use App\Models\Listing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\CalculateDatesController;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // WSZYSTKIE OGLOSZENIA
        $listings = Listing::with(['user', 'status'])->orderBy('created_at', 'desc')->get();

        $users = User::with(['role', 'session'])->get();
        $statuses = Status::all();
        $users->each(function ($user) {
            if (isset($user->session->last_activity)) {
                $user->session->last_activity = CalculateDatesController::getLastActivity($user->session->last_activity);
            }
        });
        $orders = Order::with(['buyer', 'listing', 'listing.user', 'paymentMethod', 'deliveryMethod'])->get();
        $roles = Role::all();

        return Inertia::render('Admin/Dashboard', [
            'products' => $listings,
            'users' => $users,
            'statuses' => $statuses,
            'orders' => $orders,
            'roles' => $roles,

        ]);
    }

    public function edit(Request $request)
    {
        $validated = $request->validate([
            'status_id' => 'required|exists:statuses,id',
            'id' => 'required|exists:listings,id',
        ]);

        $updated = Listing::where('id', $validated['id'])->update([
            'status_id' => $validated['status_id']
        ]);
        return redirect()->route('admin');
    }

    public function useredit(Request $request)
    {
        dd($request)->all();
        $validated = $request->validate([
            'id' => 'required|exists:listings,id',
        ]);
    }
}
