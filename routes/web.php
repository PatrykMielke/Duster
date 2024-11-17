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
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\UserFollowController;
use App\Http\Controllers\ListingFollowController;
use App\Http\Controllers\AdminDashboardController;

Route::get('/', [MainPageController::class, 'index'])->name('index');

Route::get('/kategoria/{id}', [ListingController::class, 'showByCategory'])->name('showByCategory');


//ADMIN
Route::prefix('admin')->group(function () {


    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin');
    Route::post('/listing', [AdminDashboardController::class, 'edit'])->name('admin.listingedit');
    Route::post('/user', [AdminDashboardController::class, 'useredit'])->name('admin.useredit');
});
//Edycja ogloszen z widoku admina


/// Wszystkie ogloszenia
Route::get('/listings', [ListingController::class, 'index'])->name('listings');
Route::get('/listing/{id}', [ListingController::class, 'show'])->name('listing');


Route::middleware('auth')->group(function () {

    // dodawanie i zapis nowego ogloszenia
    Route::get('/ogloszenia/stworz', [ListingController::class, 'create'])->name('listings.create');
    Route::post('/ogloszenia', [ListingController::class, 'store'])->name('listings.store');
    //// edycja i zapis ogloszenia
    Route::get('/ogloszenia/{id}/edycja', [ListingController::class, 'edit'])->name('listings.edit');
    Route::put('/ogloszenia/{id}', [ListingController::class, 'update'])->name('listings.update');


    //Zakup ogkoszenia
    Route::get('/checkout/{id}', [OrderController::class, 'index'])->name('order.showCheckout');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
});


///
Route::get('/ogloszenia', [ListingController::class, 'index'])->name('listings');
Route::get('/ogloszenia/{id}', [ListingController::class, 'show'])->name('listing');




// obserwowanie ogloszen
Route::prefix('followed_listings')->group(function () {
    Route::get('/check', [ListingFollowController::class, 'check']);
    Route::get('/{userId}', [ListingFollowController::class, 'index']);
    Route::post('/', [ListingFollowController::class, 'store']);
    Route::delete('/', [ListingFollowController::class, 'destroy']);
});

////
Route::prefix('followed_users')->group(function () {
    Route::get('/check', [UserFollowController::class, 'check'])->name('followed_users.check');     //nie uzywane
    Route::get('uid/{userId}', [UserFollowController::class, 'index'])->name('followed_users.index');
    Route::post('/', [UserFollowController::class, 'store'])->name('followed_users.store');
    Route::delete('/', [UserFollowController::class, 'destroy'])->name('followed_users.destroy');
});

Route::get('/portfel', [WalletController::class, 'index'])->name('wallet');
Route::post('/portfel', [WalletController::class, 'store']);
//// robocze

//Route::get('/checkout/{id}', [ListingController::class, 'checkout'])->name('listing.showCheckout');


Route::get('/twarde', function () {
    return Inertia::render('twarde');
})->name('twarde');

Route::get('/tesa', function () {
    return Inertia::render('tes');
})->name('tes');

Route::get('/t', function () {
    return Inertia::render('t');
})->name('t');
Route::get('/listingsss', function () {
    $listings = Listing::where('status_id', 1)->get();
    dd($listings);
    return Inertia::render('t');
})->name('t');


Route::get('/views', function () {
    return Inertia::render('Views');
})->name('views');

Route::get('/ProductDetails', function () {
    return Inertia::render('ProductDetails');
})->name('products');




Route::post('/zamowienia', [OrderController::class, 'store'])->name('orders.store');

Route::middleware('auth')->group(function () {

    Route::prefix('profil')->group(function () {

        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::get('/{id}', [ProfileController::class, 'show'])->where('id', '[0-9]+')->name('profile.show');
        Route::patch('/update-name', [ProfileController::class, 'updateName'])->name('profile.updateName');
        Route::patch('/update-email', [ProfileController::class, 'updateEmail'])->name('profile.updateEmail');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::put('/update-password', [ProfileController::class, 'updatePassword'])->name('profile.update-password');
    });
    Route::get('/zamowienia', [ProfileController::class, 'userOrders'])->name('profile.userOrders');
});

// API

Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories');

Route::post('/comments', [CommentController::class, 'store'])->middleware('auth');
Route::get('/comments/{id}', [CommentController::class, 'getComments']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);


Route::fallback(function () {
    return Inertia::render('HomePage',);
});

require __DIR__ . '/auth.php';
