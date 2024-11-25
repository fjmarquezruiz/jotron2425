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
        Schema::create('wines', function (Blueprint $table) {
            $table->id(); // Crea una columna auto-incremental y la establece como clave primaria
            $table->string('name', 100); // VARCHAR(100)
            $table->decimal('price', 10, 2); // DECIMAL(10, 2)
            $table->integer('stock')->default(0); // INT NOT NULL DEFAULT 0
            $table->integer('year')->nullable(); // INT
            $table->string('image', 255)->nullable(); // VARCHAR(255)
            $table->longText('description')->nullable(); // TEXT
            $table->longText('visual_tasting')->nullable(); // TEXT
            $table->longText('aroma_tasting')->nullable(); // TEXT
            $table->longText('mouth_tasting')->nullable(); // TEXT
            $table->integer('capacity')->nullable(); // INT
            $table->decimal('minimum_temperature', 5, 2)->nullable(); // DECIMAL(5, 2)
            $table->decimal('maximum_temperature', 5, 2)->nullable(); // DECIMAL(5, 2)
            $table->decimal('alcohol_content', 5, 2)->nullable(); // DECIMAL(5, 2)
            $table->longText('pairing')->nullable(); // TEXT
            $table->boolean('block')->default(false); // BOOLEAN DEFAULT FALSE
            $table->foreignId('winery_id')->nullable()->constrained('wineries')->onDelete('set null')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wines');
    }
};
