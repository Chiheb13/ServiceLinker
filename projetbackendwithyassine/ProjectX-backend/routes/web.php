<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\User;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';

Route::get('/auth/google', function () {

    return Socialite::driver('google')->redirect();
});

Route::get('/auth/callback', function () {

    $user = Socialite::driver('google')->user();

    $user_email = $user->getEmail();
    $existingUser = User::where('email', $user_email)->first();
    if (!$existingUser) {
        $newUser = new User();
        $newUser->name = $user->getName();
        $newUser->email = $user->getEmail();
        $newUser->img = $user->getAvatar();
        $newUser->google_id = $user->getId();
        $newUser->save();

        Auth::login($newUser);
    } else {
        if ($existingUser->img !== $user->getAvatar()) {
            $existingUser->img = $user->getAvatar();
            $existingUser->save();
        }

        Auth::login($existingUser);
    }

    return redirect(env("FRONTEND_URL"));
});
Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index')->name('categories');
});
Route::controller(ServiceController::class)->group(function () {
    Route::get('/servicedetails/{id}', 'showServiceDetails')->name('showServiceDetails');
    Route::get('/lastservice', 'getLastFourServices')->name('getLastFourServices');
    Route::get('/service', 'index')->name('service');
    Route::get('/waitingservices', 'waitingservices')->name('waitingservices');
    Route::get('/similarServices/{id}', 'similarServices')->name('similarServices');
    Route::get('/servicesName', 'getServicesNames');
});

Route::controller(UserController::class)->group(function () {
    Route::post('/register', 'register')->name('register');
    Route::post('/addservice', 'store')->name('addservice');
    Route::get('/users', 'index')->name('users');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/dashboard', 'index')->name('dashboard');
    Route::post('/createcategory', 'createcategory')->name('createcategory');
    Route::get('/editcategory/{id}', 'editcategory');
    Route::put('/updatecategory/{id}', 'updatecategory');
    Route::delete('/deletecategory/{id}', 'deletecategory');
    Route::delete('/deleteservice/{id}', 'deleteservice');
    Route::put('/updateSituation/{id}', 'updateSituation');
    Route::delete('/deleteuser/{id}', 'deleteuser');
});

Route::post('/addCategory', function (Request $request) {

    $image = $request->file('image');
    $imagePath = $image->getRealPath();

    $cloudinary = new Cloudinary();
    $url = $cloudinary->uploadApi()->upload($imagePath)["secure_url"];
    $name = $request->get("name");
    $status = $request->get("status");
    $description = $request->get("description");

    $category = new Category();
    $category->name = $name;
    $category->desc = $description;
    $category->status = $status;
    $category->image = $url;
    $category->save();

    return $category;

});
