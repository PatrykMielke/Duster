<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    $mega = array (
        0 =>
        array (
          'label' => 'Kobiety',
          'icon' => 'pi pi-box',
          'items' =>
          array (
            0 =>
            array (
              0 =>
              array (
                'label' => 'Living Room',
                'items' =>
                array (
                  0 =>
                  array (
                    'label' => 'Accessories'
                    , 'url' => route('dashboard')
                  ),
                  1 =>
                  array (
                    'label' => 'Armchair',
                  ),
                  2 =>
                  array (
                    'label' => 'Coffee Table',
                  ),
                  3 =>
                  array (
                    'label' => 'Couch',
                  ),
                  4 =>
                  array (
                    'label' => 'TV Stand',
                  ),
                ),
              ),
            ),
            1 =>
            array (
              0 =>
              array (
                'label' => 'Kitchen',
                'items' =>
                array (
                  0 =>
                  array (
                    'label' => 'Bar stool',
                  ),
                  1 =>
                  array (
                    'label' => 'Chair',
                  ),
                  2 =>
                  array (
                    'label' => 'Table',
                  ),
                ),
              ),
              1 =>
              array (
                'label' => 'Bathroom',
                'items' =>
                array (
                  0 =>
                  array (
                    'label' => 'Accessories',
                  ),
                ),
              ),
            ),
            2 =>
            array (
              0 =>
              array (
                'label' => 'Bedroom',
                'items' =>
                array (
                  0 =>
                  array (
                    'label' => 'Bed',
                  ),
                  1 =>
                  array (
                    'label' => 'Chaise lounge',
                  ),
                  2 =>
                  array (
                    'label' => 'Cupboard',
                  ),
                  3 =>
                  array (
                    'label' => 'Dresser',
                  ),
                  4 =>
                  array (
                    'label' => 'Wardrobe',
                  ),
                ),
              ),
            ),
            3 =>
            array (
              0 =>
              array (
                'label' => 'Office',
                'items' =>
                array (
                  0 =>
                  array (
                    'label' => 'Bookcase',
                  ),
                  1 =>
                  array (
                    'label' => 'Cabinet',
                  ),
                  2 =>
                  array (
                    'label' => 'Chair',
                  ),
                  3 =>
                  array (
                    'label' => 'Desk',
                  ),
                  4 =>
                  array (
                    'label' => 'Executive Chair',
                  ),
                ),
              ),
            ),
          ),
        ),
    );

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
