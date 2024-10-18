<?php

use App\Models\Sex;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/layout', function () {
    return Inertia::render('LayoutTestowy');
})->name('layout');



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


Route::get('/unique', function () {
    return Inertia::render('UniqueVisits');
})->name('unique');



//// robocze
Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

Route::get('/tes', function () {
    return Inertia::render('tes');
})->name('tes');

Route::get('/twarde', function () {
    return Inertia::render('twarde');
})->name('twarde');



//// API
Route::get('/visits/unique-users', [VisitController::class, 'getUniqueUserCount']);



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
