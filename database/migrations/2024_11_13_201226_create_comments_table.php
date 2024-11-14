<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID użytkownika, który dodał komentarz
            $table->foreignId('profile_user_id')->constrained('users')->onDelete('cascade'); // ID użytkownika, do którego należy profil
            $table->tinyInteger('rating')->unsigned()->default(1); // Ocena (1-5)
            $table->text('comment'); // Treść komentarza
            $table->timestamps(); // Daty utworzenia i aktualizacji
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
