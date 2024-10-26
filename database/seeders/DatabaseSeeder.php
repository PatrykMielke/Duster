<?php

namespace Database\Seeders;

use App\Models\Sex;
use App\Models\Size;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Visit;
use App\Models\Status;
use App\Models\Category;
use App\Models\Material;
use App\Models\Condition;
use App\Models\PaymentMethods;
use App\Models\DeliveryMethods;
use Database\Seeders\SexSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\DetailSeeder;
use Database\Seeders\ListingSeeder;

class DatabaseSeeder extends Seeder
{
        /**
         * Seed the application's database.
         */
        public function run(): void
        {

                $this->call(BrandSeeder::class);
                $this->call(ConditionSeeder::class);
                $this->call(DeliveryMethodSeeder::class);
                $this->call(MaterialSeeder::class);
                $this->call(SizeSeeder::class);
                $this->call(SexSeeder::class);
                $this->call(RoleSeeder::class);
                User::factory(20)->create();

                $this->call(ColorSeeder::class);
                $this->call(PaymentMethodsSeeder::class);
                $this->call(CategorySeeder::class);
                $this->call(StatusSeeder::class);
                $this->call(ItemSeeder::class);
                $this->call(ListingSeeder::class);
                $this->call(VisitSeeder::class);
                $this->call(DetailSeeder::class);
                $this->call(DetailMaterialSeeder::class);
                $this->call(DetailColorSeeder::class);

                $this->call(GallerySeeder::class);
        }
}
