<?php

use App\Http\Controllers\ServiceController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/userData/{id}", function ($id) {
    $user = User::with("services.category")->firstWhere(["id" => $id]);
    return response($user);
});

Route::post("/services", [ServiceController::class, "store"]);
