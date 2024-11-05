<?php

namespace App\Http\Controllers;

use App\Models\Item;

use App\Models\Size;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Color;
use Inertia\Response;
use App\Models\Detail;
use App\Models\Status;
use App\Models\Listing;
use App\Models\Material;
use App\Models\Condition;
use Illuminate\Http\Request;
use calculateLastActivityDate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // WSZYSTKIE OGLOSZENIA
        $listings = Listing::with(['user', 'galleries'])->orderBy('created_at', 'desc')->where('status_id', 1)->get();

        return Inertia::render('Listing/Listings', [
            'products' => $listings,
        ]);
    }


    public function adminDashboard()
    {
        // WSZYSTKIE OGLOSZENIA
        $listings = Listing::with(['user', 'galleries', 'status'])->orderBy('created_at', 'desc')->get();

        //
        $users = User::with(['role','session'])->get();

        $users->each(function ($user) {
            if(isset($user->session->last_activity)){
                $user->session->last_activity = CalculateDatesController::getLastActivity($user->session->last_activity);
            }
        });

        //dd($users);
        return Inertia::render('Admin/Dashboard', [
            'products' => $listings,
            'users' => $users,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $statuses = Status::all();
        $colors = Color::all();
        $sizes = Size::all();
        $brands = Brand::all();
        $materials = Material::all();
        $conditions = Condition::all();
        $items = Item::all();

        return Inertia::render('Listing/Create', [
            'statuses' => $statuses,
            'colors' => $colors,
            'sizes' => $sizes,
            'brands' => $brands,
            'materials' => $materials,
            'conditions' => $conditions,
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request): RedirectResponse
    {
        // Debugowanie danych wejściowych
        dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:statuses,id',
            'condition_id' => 'required|exists:conditions,id',
            'item_id' => 'required|exists:items,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'brand_id' => 'required|exists:brands,id',
            'material_ids' => 'required|array',
            'material_ids.*' => 'exists:materials,id',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $listing = Listing::create($request->only('title', 'description', 'price', 'user_id', 'status_id'));

        $detail = $listing->details()->create(array_merge(
            $request->only('item_id', 'size_id', 'brand_id', 'condition_id'),
            ['listing_id' => $listing->id]
        ));

        foreach ($request->color_ids as $color_id) {
            $detail->detailColor()->create([
                'color_id' => $color_id,
                'detail_id' => $detail->id,
            ]);
        }

        foreach ($request->material_ids as $material_id) {
            $detail->detailMaterial()->create([
                'material_id' => $material_id,
                'detail_id' => $detail->id,
            ]);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {
                    $imagePath = $image->store('images', 'public');

                    // Zapis ścieżki do obrazu w bazie danych
                    $listing->galleries()->create([
                        'image' => Storage::url($imagePath),
                        'listing_id' => $listing->id,
                    ]);
                } catch (\Exception $e) {
                    // Obsługa błędu zapisu
                    return redirect()->back()->withErrors(['error' => 'Wystąpił problem z zapisem obrazu: ' . $e->getMessage()]);
                }
            }
        }

        return redirect()->route('HomePage')->with('success', 'Ogłoszenie dodane pomyślnie.');
    }



    /**
     * Display specified
     */
    public function show($id)
    {
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);
        $uniqueUserCount = $listing->visits()->distinct('user_id')->count('user_id');


        return Inertia::render('Listing/ListingDetails', [
            'listing' => $listing,
            'uniqueUserCount' => $uniqueUserCount,

        ]);
    }

    public function checkout($id)
    {
        $listing = Listing::with(['user', 'galleries', 'details.size', 'details.brand', 'details.condition', 'details.detailColor.color', 'details.detailMaterial.material',])->findOrFail($id);


        return Inertia::render('Listing/Checkout/Checkout', [
            'listing' => $listing
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */

    public function edit($id): Response
    {
        $listing = Listing::with(['details', 'details.detailColor', 'details.detailMaterial'])->findOrFail($id);

        $users = User::all();
        $statuses = Status::all();
        $conditions = Condition::all();
        $items = Item::all();
        $colors = Color::all();
        $sizes = Size::all();
        $brands = Brand::all();
        $materials = Material::all();

        return Inertia::render('Listing/Edit', [
            'listing' => $listing,
            'users' => $users,
            'statuses' => $statuses,
            'conditions' => $conditions,
            'items' => $items,
            'colors' => $colors,
            'sizes' => $sizes,
            'brands' => $brands,
            'materials' => $materials,
        ]);
    }

    // Method to handle the update request
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:statuses,id',
            'condition_id' => 'required|exists:conditions,id',
            'item_id' => 'required|exists:items,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'brand_id' => 'required|exists:brands,id',
            'material_ids' => 'required|array',
            'material_ids.*' => 'exists:materials,id',
        ]);

        $listing = Listing::findOrFail($id);
        $listing->update($request->only('title', 'description', 'price', 'user_id', 'status_id'));

        $detail = $listing->details()->first();
        $detail->update($request->only('item_id', 'size_id', 'brand_id', 'condition_id'));

        $detail->detailColor()->delete();
        foreach ($request->color_ids as $color_id) {
            $detail->detailColor()->create([
                'color_id' => $color_id,
                'detail_id' => $detail->id,
            ]);
        }

        $detail->detailMaterial()->delete();
        foreach ($request->material_ids as $material_id) {
            $detail->detailMaterial()->create([
                'material_id' => $material_id,
                'detail_id' => $detail->id,
            ]);
        }

        return redirect()->route('HomePage')->with('success', 'Ogłoszenie zaktualizowane pomyślnie.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        //
    }
}
