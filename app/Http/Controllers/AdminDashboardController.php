<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Status;
use App\Models\Listing;
use App\Jobs\SendMailJob;
use App\Jobs\NotifyUserJob;
use Illuminate\Http\Request;
use function Pest\Laravel\get;
use App\Notifications\UserBlocked;

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

    public function edit_listing(Request $request)
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

    public function edit_user(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
            'is_active' => 'required|boolean',
        ]);

        $updated = User::where('id', $validated['id'])->update([
            'role_id' => $validated['role_id'],
            'is_active' => $validated['is_active'],
        ]);

        if ($validated['is_active'] == false) {

            $user = User::where('id', $updated)->first();

            NotifyUserJob::dispatch($user);


            Listing::where('user_id', $validated['id'])->update([
                'status_id' => 3,
            ]);
        }
        return redirect()->route('admin');
    }
}
