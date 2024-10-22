<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorevisitRequest;
use App\Http\Requests\UpdatevisitRequest;

class VisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('UniqueVisits', ['uniqueUserCount' => $this->getUniqueUserCount()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    private function getUniqueUserCount()
    {
        $uniqueUserCount = DB::table('visits')
            ->where('listing_id', 1)
            ->distinct('user_id')
            ->count('user_id');


        return ($uniqueUserCount);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorevisitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(visit $visit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(visit $visit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatevisitRequest $request, visit $visit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(visit $visit)
    {
        //
    }
}
