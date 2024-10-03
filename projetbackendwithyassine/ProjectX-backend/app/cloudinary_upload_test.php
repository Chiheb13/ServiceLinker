<?php

// Require Composer's autoloader
require __DIR__ . '/../vendor/autoload.php';

// Set Cloudinary configuration
\Cloudinary::config(array(
    "cloud_name" => "dbimabaoj",
    "api_key" => "211434371667125",
    "api_secret" => "8LZQJTccdE8TAtE98bXjijdwFy4"
));

// Upload a file to Cloudinary
$imagePath = "C:\\Users\\chiheb\\Pictures\\bechirbensiid.png"; // Replace with the path to your image file
$uploadResult = \Cloudinary\Uploader::upload($imagePath);

// Print upload result
var_dump($uploadResult);
