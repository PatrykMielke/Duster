<?php

use App\Models\Detail;
use App\Models\Material;
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
        Schema::create('detail_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Detail::class)->constrained();
            $table->foreignIdFor(Material::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_materials');
    }
};
