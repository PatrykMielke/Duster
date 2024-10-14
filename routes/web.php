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

Route::get('/dashboard', function () {

/*

 dla kazdej plci -> tworzy się oddzielna zakładka
 każda zakładka ma swoje kategorie przedmiotów Ubrania, Obuwie, Akcesoria
 dla zakładka wypisuje wszystkie rodzaje przedmiotów odpowiadające kateorii i płci


*/

    $mega = Sex::find(1)->items;


    return Inertia::render('Dashboard', [
        'mega' => $mega
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
