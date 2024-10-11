<?php

use App\Models\Listing;
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
        Schema::create('listing_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Listing::class);
            $table->foreignIdFor(Color::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listing_colors');
    }
};
