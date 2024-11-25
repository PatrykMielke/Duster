<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Report;
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
        $reports = Report::with(['reporter', 'reason'])
            ->where('is_resolved', false)
            ->orderBy('created_at', 'desc')
            ->get();

        $users = User::with(['role', 'session'])->get();
        $statuses = Status::all();
        $users->each(function ($user) {
            if (isset($user->session->last_activity)) {
                $user->session->last_activity = CalculateDatesController::getLastActivity($user->session->last_activity);
            }
        });
        $orders = Order::with(['buyer', 'listing', 'listing.user', 'paymentMethod', 'deliveryMethod'])->get();
        $roles = Role::all();
        $chartData = $this->getChartData();
        //dd($chartData);
        return Inertia::render('Admin/Dashboard', [
            'products' => $listings,
            'users' => $users,
            'statuses' => $statuses,
            'orders' => $orders,
            'roles' => $roles,
            'chartData' => $chartData,
            'reports' => $reports,
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
    public function getChartData()
    {
        //users
        $totalUsers = User::count();
        $activeUsers = User::where('is_active', 1)->count();
        $inactiveUsers = User::where('is_active', 0)->count();
        $newUsersToday = User::whereDate('created_at', now())->count();
        $newUsersInLastYear = User::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>=', now()->subMonths(12))  // Filter for the last 12 months
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $totalListings = Listing::count();
        $listingsToday = Listing::whereDate('created_at', now())->count();

        $listingsByMonth = Listing::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc', 'month', 'asc')
            ->limit(12)
            ->get();
        $listingsByYear = Listing::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();

        $totalOrders = Order::count();
        $ordersToday = Order::whereDate('created_at', now())->count('id');
        $ordersThisMonth = Order::whereMonth('created_at', now()->month)->count('id');
        $ordersThisYear = Order::whereYear('created_at', now()->year)->count('id');

        $ordersByMonth = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc', 'month', 'asc')
            ->limit(12)
            ->get();
        $ordersByYear = Order::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();


        $topCategories = Order::selectRaw('categories.name as category_name, COUNT(orders.id) as total_orders, categories.id as category_id')
            ->join('listings', 'orders.listing_id', '=', 'listings.id')
            ->join('details', 'listings.id', '=', 'details.listing_id')
            ->join('categories', 'details.category_id', '=', 'categories.id')
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total_orders')
            ->limit(10)
            ->get()
            ->map(function ($category) {
                $currentCategory = \App\Models\Category::find($category->category_id);

                // Build the full hierarchy of parent categories
                $parents = [];
                while ($currentCategory->parent) {
                    $currentCategory = $currentCategory->parent;
                    array_unshift($parents, $currentCategory->name);
                }

                $category->parent_hierarchy = $parents; // Add hierarchy to the result
                return $category;
            });


        return response()->json([
            'totalUsers' => $totalUsers,
            'activeUsers' => $activeUsers,
            'inactiveUsers' => $inactiveUsers,
            'newUsersToday' => $newUsersToday,
            'newUsersInLastYear' => $newUsersInLastYear,

            'totalListings' => $totalListings,
            'listingsToday' => $listingsToday,
            'listingsByMonth' => $listingsByMonth,
            'listingsByYear' => $listingsByYear,

            'totalOrders' => $totalOrders,
            'ordersToday' => $ordersToday,
            'ordersThisMonth' => $ordersThisMonth,
            'ordersThisYear' => $ordersThisYear,
            'ordersByMonth' => $ordersByMonth,
            'ordersByYear' => $ordersByYear,

            'topCategories' => $topCategories,
        ])->original;
    }
}
