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
        foreach (range(1, 100) as $userId) {
            // Losujemy liczbę ogłoszeń dla danego użytkownika (od 1 do 20)
            $numberOfListings = rand(1, 20);

            // Tworzymy ogłoszenia dla danego użytkownika
            foreach (range(1, $numberOfListings) as $i) {
                // Losowa data w zakresie od stycznia 2022 do dziś
                $createdAt = fake()->dateTimeBetween('-1 years', 'now');
                $updatedAt = fake()->dateTimeBetween($createdAt, 'now'); // updated_at nie może być wcześniej niż created_at

                Listing::create([
                    'title' => fake()->sentence(1),
                    'description' => fake()->paragraph(5),
                    'price' => rand(10, 400),
                    'user_id' => $userId,
                    'status_id' => Status::inRandomOrder()->first()->id,
                    'created_at' => $createdAt,
                    'updated_at' => $updatedAt,
                ]);
            }
        }
    }
}
