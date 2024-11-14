<?php

use App\Models\Sex;
use Inertia\Inertia;
use App\Models\Order;

use App\Models\Listing;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\ListingFollow;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserFollowController;
use App\Http\Controllers\ListingFollowController;

Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');




Route::get('/views', function () {
    return Inertia::render('Views');
})->name('views');


Route::get('/ProductDetails', function () {
    return Inertia::render('ProductDetails');
})->name('products');




//ADMIN
Route::get('/admin', [ListingController::class, 'adminDashboard'])->name('admin');

//Edycja ogloszen z widoku admina
Route::patch('/api/listings/{id}', [ListingController::class, 'updateAdmin']);


/// Wszystkie ogloszenia
Route::get('/listings', [ListingController::class, 'index'])->name('listings');
Route::get('/listing/{id}', [ListingController::class, 'show'])->name('listing');


Route::middleware('auth')->group(function () {

    // Nowe ogloszenie
    Route::get('/listings/create', [ListingController::class, 'create'])->name('listings.create');
    Route::post('/listings', [ListingController::class, 'store'])->name('listings.store');
    // Edycja ogloszenia
    Route::get('/listings/{id}/edit', [ListingController::class, 'edit'])->name('listings.edit');
    Route::put('/listings/{id}', [ListingController::class, 'update'])->name('listings.update');


    //Zakup ogkoszenia
    Route::get('/checkout/{id}', [OrderController::class, 'index'])->name('order.showCheckout');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
});



//Route::get('/checkout/{id}', [ListingController::class, 'checkout'])->name('listing.showCheckout');



// obserwowanie ogloszen i uzytkownikow
Route::get('followed-listings/{userId}', [ListingFollowController::class, 'index']);
Route::get('/followed_listings/check', [ListingFollowController::class, 'check']);
Route::post('/followed_listings', [ListingFollowController::class, 'store']);
Route::delete('/followed_listings', [ListingFollowController::class, 'destroy']);

Route::prefix('followed-users')->group(function () {
    Route::get('/{userId}', [UserFollowController::class, 'index'])->name('followed_users.index');
    Route::get('/check', [UserFollowController::class, 'check'])->name('followed_users.check');
    Route::post('/', [UserFollowController::class, 'store'])->name('followed_users.store');
    Route::delete('/', [UserFollowController::class, 'destroy'])->name('followed_users.destroy');
});

//// robocze

Route::get('/twarde', function () {
    return Inertia::render('twarde');
})->name('twarde');

Route::get('/tesa', function () {
    return Inertia::render('tes');
})->name('tes');

Route::get('/t', function () {
    return Inertia::render('t');
})->name('t');

////






///////////
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::prefix('profile')->group(function () {

        Route::get('/{id}', [ProfileController::class, 'show'])->name('profile.show');
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/update-name', [ProfileController::class, 'updateName'])->name('profile.updateName');
        Route::patch('/update-email', [ProfileController::class, 'updateEmail'])->name('profile.updateEmail');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::put('/update-password', [ProfileController::class, 'updatePassword'])->name('profile.update-password');
    });

    Route::get('/wallet', function () {
        return Inertia::render('Profile/Wallet');
    })->name('wallet');

    Route::get('/settings', function () {
        return Inertia::render('Profile/Settings');
    })->name('settings');
});

require __DIR__ . '/auth.php';
