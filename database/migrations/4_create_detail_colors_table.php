<?php

use App\Models\Color;
use App\Models\Detail;
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
        Schema::create('detail_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Detail::class)->constrained();
            $table->foreignIdFor(Color::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_colors');
    }
};
