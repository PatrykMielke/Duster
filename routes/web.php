<?php

use App\Http\Controllers\ListingController;

use App\Models\Sex;
use Inertia\Inertia;
use App\Models\Listing;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\VisitController;

Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');


Route::get('/a', function () {
    $navCategoryItems = Sex::with(['categories.items'])
        ->get();
    return Inertia::render('sraka', ['items' => $navCategoryItems]);
})->name('sraka');

Route::get('/HomePage', function () {
    return Inertia::render('HomePage');
})->name('HomePage');

Route::get('/ProductDetails', function () {
    return Inertia::render('ProductDetails');
})->name('products');

Route::get('/unique', [VisitController::class, 'index'])->name('unique');;




//// robocze





Route::get('/twarde', function () {
    return Inertia::render('twarde');
})->name('twarde');



Route::get('/tes', function () {
    return Inertia::render('tes');
})->name('tes');


//// API

use App\Http\Controllers\ProfileController;

//Route::get('/listings', [ListingController::class, 'index'])->name('listings.index');


Route::get('/listings', function () {
    return Inertia::render('ListingsList', ['products' => Listing::all()]);
})->name('listings');







////////////
Route::get('/listing/{id}', [ListingController::class, 'show'])->name('listing');



///////////











Route::get('/a', function () {
    $navCategoryItems = Sex::with(['categories.items'])
        ->get();
    return Inertia::render('sraka', ['items' => $navCategoryItems]);
})->name('sraka');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
