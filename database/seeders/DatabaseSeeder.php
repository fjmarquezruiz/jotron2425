<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Winery;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Winery::insert([
            ['name' => 'Bodega Pago de Jotrón', 'city' => 'Málaga', 'province' => 'Málaga', 'block' => false],
            ['name' => 'Bodega González Byass', 'city' => 'Jerez de la Frontera', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega Barbadillo', 'city' => 'Sanlúcar de Barrameda', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega Emilio Lustau', 'city' => 'Jerez de la Frontera', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega La Gitana', 'city' => 'Sanlúcar de Barrameda', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega Valdespino', 'city' => 'Jerez de la Frontera', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega Osborne', 'city' => 'El Puerto de Santa María', 'province' => 'Cádiz', 'block' => false],
            ['name' => 'Bodega Finca La Melonera', 'city' => 'Ronda', 'province' => 'Málaga', 'block' => false],
            ['name' => 'Bodega Cortijo Los Aguilares', 'city' => 'Ronda', 'province' => 'Málaga', 'block' => false],
            ['name' => 'Bodega La Cañada', 'city' => 'Málaga', 'province' => 'Málaga', 'block' => false],
        ]);

        // Create 8 random Winery records
        Winery::factory()->count(8)->create();
    }
}
