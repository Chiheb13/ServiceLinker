<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'desc' => fake()->text(),
                'image' => fake()->imageUrl(),
                'price' => fake()->randomNumber(2),
                'category_id' =>  Category::all()->random()->id,
                'user_id' => User::all()->random()->id,
                'situation' => fake()->randomElement(['awaiting', 'accepted']),
                
        ];
    }
}
