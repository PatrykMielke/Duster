<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\FinancialConnections\Transaction;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $userId = Auth::user()->id;

        $wallet = Wallet::where('user_id', $userId)->first();
        return Inertia::render('Profile/Wallet', ['wallet' => $wallet]);
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


        $validated = $request->validate([
            'amount' => 'required|numeric  ',
            'user_id' => 'required|exists:users,id',
        ]);

        $wallet = Wallet::where('user_id', $validated['user_id'])->first();
        // Jeśli portfel użytkownika istnieje
        if ($wallet) {
            $wallet->increment('balance', $validated['amount']);
            return Inertia::render(
                'Profile/Wallet',
                [
                    'message' => 'Płatność przebiegła pomyślnie.',
                    'wallet' => $wallet
                ]
            );
        } else {
            // Jeśli portfel nie istnieje
            return response()->json(['error' => 'Portfel użytkownika nie istnieje.'], 404);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wallet $wallet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wallet $wallet)
    {
        //
    }
}
