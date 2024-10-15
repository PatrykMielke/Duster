<?php

use App\Models\Sex;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dupso', function () {
    return Inertia::render('Layout');
});

Route::get('/a', function () {

    $navCategoryItems = Sex::with(['categories.items'])
    ->get();

    return Inertia::render('sraka',['items' => $navCategoryItems]);
});

Route::get('/aa', function () {
    return Inertia::render('HomePage');
});
Route::get('/test', function () {
    return Inertia::render('Layout');
});

Route::get('/z', function () {
    return Inertia::render('Header');
});
Route::get('/zz', function () {
    return Inertia::render('L');
});
Route::get('/xx', function () {
    return Inertia::render('HomePage');
});




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
