<?php

use App\Models\Sex;
use Inertia\Inertia;
use App\Models\Order;

use App\Models\Listing;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\ListingFollow;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ListingFollowController;

Route::get('/', function () {

    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');


Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories');

Route::get('/views', function () {
    return Inertia::render('Views');
})->name('views');


Route::get('/ProductDetails', function () {
    return Inertia::render('ProductDetails');
})->name('products');




//ADMIN
Route::get('/admin', [ListingController::class, 'adminDashboard'])->name('admin');



Route::patch('/api/listings/{id}', [ListingController::class, 'updateAdmin']);



Route::middleware('auth')->group(function () {

    // dodawanie i zapis nowego ogloszenia
    Route::get('/listings/create', [ListingController::class, 'create'])->name('listings.create');
    Route::post('/listings', [ListingController::class, 'store'])->name('listings.store');
    //// edycja i zapis ogloszenia
    Route::get('/listings/{id}/edit', [ListingController::class, 'edit'])->name('listings.edit');
    Route::put('/listings/{id}', [ListingController::class, 'update'])->name('listings.update');

    Route::get('/checkout/{id}', [OrderController::class, 'index'])->name('order.showCheckout');
});


///
Route::get('/listings', [ListingController::class, 'index'])->name('listings');
Route::get('/listing/{id}', [ListingController::class, 'show'])->name('listing');

//Route::get('/checkout/{id}', [ListingController::class, 'checkout'])->name('listing.showCheckout');



// obserwowanie ogloszen
Route::get('followed-listings/{userId}', [ListingFollowController::class, 'index']);
Route::get('/followed_listings/check', [ListingFollowController::class, 'check']);
Route::post('/followed_listings', [ListingFollowController::class, 'store']);
Route::delete('/followed_listings', [ListingFollowController::class, 'destroy']);




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



Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');





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

Route::get('/kategoria/{id}', [ListingController::class, 'showByCategory'])->name('showByCategory');

require __DIR__ . '/auth.php';
