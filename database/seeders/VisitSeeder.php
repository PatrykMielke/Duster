<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Visit;
use App\Models\Listing;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pobierz wszystkie listingi
        $listings = Listing::all();

        // Przypisz losową liczbę wizyt do każdego ogłoszenia
        foreach ($listings as $listing) {
            // Losowa liczba wizyt dla danego ogłoszenia (np. od 1 do 10 wizyt)
            $numberOfVisits = rand(1, 20);

            // Przypisz wizyty do tego ogłoszenia
            for ($i = 0; $i < $numberOfVisits; $i++) {
                Visit::create([
                    'user_id' => User::inRandomOrder()->first()->id,
                    'listing_id' => $listing->id,
                ]);
            }
        }
    }
}
