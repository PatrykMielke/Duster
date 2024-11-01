<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Inertia\Inertia;
use App\Models\Order;

use App\Models\Listing;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // Validate the request data
        $validatedData = $request->validate([
            'address' => 'required|string|max:255',
            'apartment' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'phone' => 'required|string|max:20',
        ]);

        // Create a new order in the database
        Order::create($validatedData);

        // Return a redirect response with a success message using Inertia
        return redirect()->back()->with('success', 'Order created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $id)
    {
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);


        return Inertia::render('Listing/Checkout/Checkout', [
            'listing' => $listing
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }



    public function createCheckoutSession(Request $request)
    {
        $user = $request->user();

        $checkoutSession = $user->checkoutCharge(
            $request->total * 100, // Kwota w centach
            'usd',
            [
                'mode' => 'payment',
                'success_url' => route('orders.success'),
                'cancel_url' => route('orders.cancel'),
            ]
        );

        return $checkoutSession;
    }
}
