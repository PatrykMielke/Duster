<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Walidacja danych wejściowych
        $validated = $request->validate([
            'report_reason' => 'required|integer',
            'referenceId' => 'required|integer',
            'reportType' => 'required|string',
            'additional_comments' => 'nullable|string',
        ]);
        $data = [
            'reason_id' => $request->input('report_reason'),
            'reference_id' => $request->input('referenceId'),
            'type' => $request->input('reportType'),
            'reported_by' => Auth::check() ? Auth::user()->id : null,
            'description' => $request->input('additional_comments', ''),
        ];

        Report::create($data);
        return redirect()->back();
    }
    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
