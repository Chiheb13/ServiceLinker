<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
{
    $data = Service::with('category')->where('situation', 'accepted')->get();
    $formattedData = $data->map(function($service) {
        return [
            'name' => $service->name,
            'image' => $service->image,
            'desc' => $service->desc,
            'id' => $service->id,
            'category' => $service->category->name,
            // Add any other fields you want to include from the Service model
        ];
    });
    return response()->json(['data' => $formattedData]);
}

    
public function waitingservices()
{
    $data = Service::with(['category', 'user'])->where('situation', 'awaiting')->get();
    
    $formattedData = $data->map(function($service) {
        return [
            'name' => $service->name,
            'image' => $service->image,
            'id' => $service->id,
            'desc' => $service->desc,
            'user_id' => $service->user_id,
            'user_name' => $service->user->name, // Access the user's name
            'price' => $service->price,
            'situation' => $service->situation,
            'category' => $service->category->name,
        ];
    });
    
    
    return response()->json(['data' => $formattedData]);
}

    public function similarServices($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }
        $similarServices = Service::where('category_id', $service->category_id)
            ->where('id', '!=', $id)
            ->get();

        return response()->json(['similar_services' => $similarServices]);
    }

    public function getLastFourServices()
{
    $data = Service::with('category')->where('situation', 'accepted')->orderBy('created_at', 'desc')
    ->limit(4)
    ->get();
    $formattedData = $data->map(function($service) {
        return [
            'name' => $service->name,
            'image' => $service->image,
            'desc' => $service->desc,
            'id' => $service->id,
            'category' => $service->category->name,
            // Add any other fields you want to include from the Service model
        ];
    });
    return response()->json(['data' => $formattedData]);
}


    
    public function showServiceDetails($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $cloudinary = new Cloudinary();
        $image = $request->file("image")->getRealPath();

        $imageUrl = $cloudinary->uploadApi()->upload($image)["secure_url"];
        $name = $request->name;
        $description = $request->description;
        $category = $request->category;
        $price = $request->price;
        $tags = $request->tags;
        $type = $request->type;

        $service = new Service();
        $service->name = $name;
        $service->desc = $description;
        $service->price = $price;
        $service->image = $imageUrl;
        $service->category_id = $category;
        $service->user_id = $request->user()["id"];
        $service->situation = "awaiting";

        $service->save();

        return $service;
    }
    public function getServicesNames()
    {
        $data = Service::where('situation', 'accepted')->get();
        $formattedData = $data->map(function ($service) {
            return [
                'name' => $service->name,
                "id" => $service->id,
            ];
        });
        return response()->json(['data' => $formattedData]);
    }
}
