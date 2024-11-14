<?php

use App\Models\Size;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Listing;
use App\Models\Condition;
use App\Models\Item;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Listing::class, 'listing_id')->constrained();
            $table->foreignIdFor(Category::class, 'category_id')->constrained();
            $table->foreignIdFor(Size::class, 'size_id')->constrained();
            $table->foreignIdFor(Brand::class)->constrained();
            $table->foreignIdFor(Condition::class)->constrained();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details');
    }
};
