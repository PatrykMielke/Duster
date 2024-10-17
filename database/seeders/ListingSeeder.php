<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Listing;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Zakładamy, że w tabeli `users` i `status` istnieją odpowiednie rekordy.
        // Seedujemy dane dla użytkowników z ID od 1 do 10.
        foreach (range(1, 10) as $userId) {
            Listing::create([
                'title' => 'tytul',
                'description' => 'opis',
                'price' => rand(100, 1000),
                'user_id' => $userId,
                'status_id' => Status::inRandomOrder()->first()->id, // losowy status
            ]);
        }
    }
}
