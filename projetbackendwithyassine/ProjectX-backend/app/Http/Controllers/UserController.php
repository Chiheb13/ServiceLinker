<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Create a new user record
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Return a response
        return response()->json(['user' => $user]);
    }
    public function getCurrentUser()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }
    public function index()
    {
        $data=User::all();
        return response()->json(['data',$data]);
    }
    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required',
            'desc' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'category_id' => 'required|exists:categories,id',
        ]);

        $image = $request->file('image');
        $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();

        $service = new Service;
        $service->name = $validatedData['name'];
        $service->desc = $validatedData['desc'];
        $service->price = $validatedData['price'];
        $service->image = $uploadedFileUrl;
        $service->category_id = $validatedData['category_id'];
        $service->user_id = auth()->id() ?? 0;
        $service->save();

        return response()->json(['message' => 'Service created successfully'], 201);
    }
}