<?php

namespace Database\Seeders;

use App\Models\Sex;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories1 = [
            'Kobieta',
            'Mężczyzna',
        ];

        $categories2 = [
            'Ubrania',
            'Obuwie ',
            'Akcesoria',
        ];

        $ubrania_meskie = [
            "Koszulki",
            "Bluzy, Bluzki",
            "Swetry",
            "Kurtki",
            "Płaszcze",
            "Marynarki",
            "Spodnie",
            "Jeansy",
            "Bielizna",
            "Shorty",
            "Piżamy"
        ];

        $ubrania_damskie = [
            "Koszulki",
            "Bluzy, Bluzki",
            "Swetry",
            "Kurtki",
            "Płaszcze",
            "Marynarki",
            "Spodnie",
            "Jeansy",
            "Bielizna",
            "Shorty",
            "Piżamy",
            "Sukienki"
        ];

        $obuwie_meskie = [
            "Kapcie",
            "Trampki",
            "Sneakersy",
            "Klapecki",
            "Mokasyny",
            "Sandały",
            "Kozaki",
            "Wizytowe",
            "Sportowe"
        ];

        $obuwie_damskie = [
            "Kapcie",
            "Trampki",
            "Sneakersy",
            "Klapecki",
            "Mokasyny",
            "Sandały",
            "Buty na obcasie",
            "Kozaki",
            "Wizytowe",
            "Sportowe",
            "Baleriny"
        ];

        $akcesoria_meskie = [
            "Zegarki",
            "Bransoletki",
            "Pierscionki",
            "Okulary",
            "Torby",
            "Paski",
            "Kapelusze i czapki",
            "Krawaty",
            "Chusty",
            "Szaliki",
            "Rękawiczki"
        ];

        $akcesoria_damskie = [
            "Zegarki",
            "Bransoletki",
            "Pierscionki",
            "Okulary",
            "Torby",
            "Paski",
            "Kapelusze i czapki",
            "Chusty",
            "Szaliki",
            "Rękawiczki"
        ];

        $sexID = array();
        foreach ($categories1 as $category) {
            array_push($sexID,Category::create([
                'name' => $category,
                'parent_id' => NULL,
            ])->id);
        }

        $typeID = array();
        foreach ($sexID as $sex){
            foreach ($categories2 as $category) {
                array_push($typeID,Category::create([
                    'name' => $category,
                    'parent_id' => $sex,
                ])->id);
            }
        }

        foreach ($ubrania_damskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[0],
            ]);
        }
        foreach ($obuwie_damskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[1],
            ]);
        }
        foreach ($akcesoria_damskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[2],
            ]);
        }
        foreach ($ubrania_meskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[3],
            ]);
        }
        foreach ($obuwie_meskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[4],
            ]);
        }
        foreach ($akcesoria_meskie as $category){
            Category::create([
                'name' => $category,
                'parent_id' => $typeID[5],
            ]);
        }
    }
}
