<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Service;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = DB::table('categories')->count();
        $services = DB::table('services')->count();
        $users = DB::table('users')->count();
        return response()->json(['users' => $users, 'services' => $services, 'categories' => $categories]);

    }

    /**
     * Show the form for creating a new resource.
     */
    
    public function createcategory(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required',
            'desc' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'status' => 'required',
        ]);

        $image = $request->file('image');
        $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();

        $category = new Category;
        $category->name = $validatedData['name'];
        $category->desc = $validatedData['desc'];
        $category->status = $validatedData['status'];
        $category->image =  $uploadedFileUrl; 
        $category->save();

        return response()->json(['message' => 'Catagory created successfully'], 201);
    }
    
    public function deletecategory($id)
    {
        DB::table('categories')->where('id',$id)->delete();
        return response()->json(['message' => 'Catagory deleted successfully'], 201);
    }
   
    public function editcategory($id){
        $data=Category::select('*')->find($id);
        
        return response()->json([ 'data' => $data]);
    }
    public function updatecategory(Request $request, $id)
    {
        // Validate request data
        $validatedData = $request->validate([
            'status' => 'required',
        ]);
    
        // Find the category by its ID
        $category = Category::find($id);
    
        // Check if the category exists
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    
        // Update the category status
        $category->status = $validatedData['status'];
        $category->save();
    
        return response()->json(['message' => 'Category updated successfully'], 200);
    }
    public function deleteservice($id)
    {
        DB::table('services')->where('id',$id)->delete();
        return response()->json(['message' => 'Service deleted successfully'], 201);
    }
    public function updateSituation(Request $request, $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }
        $service->situation = 'accepted';
        $service->save();

        return response()->json(['message' => 'Service situation updated successfully'], 200);
    }
    public function deleteuser($id)
    {
        DB::table('users')->where('id',$id)->delete();
        return response()->json(['message' => 'User deleted successfully'], 201);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    
}
