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
        Schema::create('wineries', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name', 100)->unique(); // Unique name
            $table->string('city', 100)->nullable(); // Localidad can be null
            $table->string('province', 100)->nullable(); // Provincia can be null
            $table->boolean('block')->default(false); // Default value for Bloqueado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wineries');
    }
};
