<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reason_id')->references('id')->on('reasons')->onDelete('cascade');
            $table->unsignedBigInteger('reference_id');
            $table->enum('type', ['comment', 'user', 'listing']);
            $table->unsignedBigInteger('reported_by');
            $table->text('description');
            $table->boolean('is_resolved')->default(false);
            $table->timestamps();


            $table->foreign('reported_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
