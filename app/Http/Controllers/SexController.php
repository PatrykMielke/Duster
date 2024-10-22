<?php

namespace App\Http\Controllers;

use App\Models\Sex;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SexController extends Controller
{
    public function index(){
        $navCategoryItems = Sex::with(['categories.items'])
        ->get();
        return Inertia::render('sraka', ['items' => $navCategoryItems]);
    }
} 
