<?php

use App\Models\Size;
use App\Models\User;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Status;
use App\Models\Category;
use App\Models\Condition;
use App\Models\ListingColor;
use App\Models\ListingMaterial;
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
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('price');

            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Category::class)->constrained();
            $table->foreignIdFor(Size::class)->constrained();
            $table->foreignIdFor(Brand::class)->constrained();
            $table->foreignIdFor(ListingColor::class)->constrained();
            $table->foreignIdFor(ListingMaterial::class)->constrained();
            $table->foreignIdFor(Condition::class)->constrained();
            $table->foreignIdFor(Status::class)->constrained();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};