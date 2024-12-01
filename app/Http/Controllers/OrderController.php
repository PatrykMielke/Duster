<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use App\Models\User;
use Inertia\Inertia;

use App\Models\Order;
use App\Models\Wallet;
use App\Models\Listing;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use App\Models\PaymentMethods;
use App\Models\DeliveryMethods;
use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);
        $paymentMethods = PaymentMethods::all();
        $deliveryMethods = DeliveryMethods::all();
        $users = User::all();
        return Inertia::render('Listing/Checkout/Checkout', [
            'listing' => $listing,
            'paymentMethods' => $paymentMethods,
            'deliveryMethods' => $deliveryMethods,
            'users' => $users
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
        $validatedData = $request->validate([
            'email' => 'required|email',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'apartment' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'required|string|max:20',
            'phone' => 'nullable|string|max:20',
            'delivery_method' => 'required|exists:delivery_methods,id',
            'payment_method' => 'required|exists:payment_methods,id',
            'listing_id' => 'required|exists:listings,id',
            'user_id' => 'required|exists:users,id',
            'buyer_id' => 'required|exists:users,id',
            'card_number' => 'nullable|string|max:20',
            'card_name' => 'nullable|string|max:255',
            'expiration' => 'nullable|string|max:10',
            'cvc' => 'nullable|string|max:4',
            'total' => 'required|numeric',
        ]);


        $orderData = [
            'buyer_id' => $validatedData['buyer_id'],

            'listing_id' => $validatedData['listing_id'],
            'payment_method_id' => $validatedData['payment_method'],
            'delivery_method_id' => $validatedData['delivery_method'],
            'address' => $validatedData['address'],
            'zipcode' => $validatedData['postal_code'],
            'city' => $validatedData['city'],
            'country' => $validatedData['country'],
            'apartment' => $validatedData['apartment'] ?? null,
        ];

        $buyerWallet = Wallet::where('user_id', $validatedData['buyer_id'])->first();
        $listing = Listing::where('id', $validatedData['listing_id'])->first();


        if ($buyerWallet->balance < $listing->price) {
            return Inertia::render(
                'Profile/Wallet',
                [
                    'message' => 'Nie masz wystarczających srodków na koncie.',

                ]
            );
        }
        $buyerWallet->decrement('balance', $listing->price);

        Order::create($orderData);
        Listing::where('id', $validatedData['listing_id'])->update(['status_id' => 2]);
        return Redirect::route('index');
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
