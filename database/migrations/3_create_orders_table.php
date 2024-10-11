<?php

use App\Models\User;
use App\Models\Listing;
use App\Models\PaymentMethods;
use App\Models\DeliveryMethods;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'buyer_id')->constrained('users');
            $table->foreignIdFor(Listing::class, 'listing_id')->constrained();
            $table->foreignIdFor(PaymentMethods::class,'payment_method_id')->constrained();
            $table->ForeignIdFor(DeliveryMethods::class, 'delivery_method_id')->constrained();
            $table->string('address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
