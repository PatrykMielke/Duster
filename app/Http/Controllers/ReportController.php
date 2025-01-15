<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Report;
use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;

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
    public function edit(Report $report) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        //
    }

    //ADMIN reports > modal> block user 
    public function block(Request $request)
    {
        $type = $request->selectedReport['type'];
        $referenceId = $request->selectedReport['reference_id'];

        $report = Report::find($request->selectedReport['id']);

        switch ($type) {
            case 'user':
                $user = User::find($referenceId);
                if ($user) {
                    Mail::to($user->email)->send(new \App\Mail\UserBlocked());

                    $user->is_active = false;
                    $user->save();
                    $report->is_resolved = true;
                    $report->save();
                }
                break;

            case 'comment':
                $comment = Comment::find($referenceId);
                if ($comment) {
                    $user = User::where('id', $comment->user_id)->first();
                    Mail::to($user->email)->send(new \App\Mail\UserBlocked());


                    $report->is_resolved = true;
                    $report->save();
                }
                break;

            case 'listing':
                $listing = Listing::find($referenceId);
                if ($listing) {
                    $user = User::where('id', $listing->user_id)->first();
                    Mail::to($user->email)->send(new \App\Mail\UserBlocked());

                    $author = User::find($listing->user_id);
                    $author->is_active = false;
                    $author->save();

                    $listing->status_id = 3;
                    $listing->save();

                    $report->is_resolved = true;
                    $report->save();
                }
                break;
        }

        return redirect()->back();
    }

    //ADMIN reports > modal> warn user 

    public function warn(Request $request)
    {
        $type = $request->selectedReport['type'];
        $referenceId = $request->selectedReport['reference_id'];

        $report = Report::find($request->selectedReport['id']);

        switch ($type) {
            case 'user':
                $user = User::find($referenceId);
                if ($user) {
                    Mail::to($user->email)->send(new \App\Mail\UserWarn());


                    $report->is_resolved = true;
                    $report->save();
                }
                break;

            case 'comment':
                $comment = Comment::find($referenceId);
                if ($comment) {

                    $user = User::where('id', $comment->user_id)->first();
                    Mail::to($user->email)->send(new \App\Mail\UserWarn());


                    $report->is_resolved = true;
                    $report->save();
                }
                break;

            case 'listing':
                $listing = Listing::find($referenceId);
                if ($listing) {

                    $user = User::where('id', $listing->user_id)->first();
                    Mail::to($user->email)->send(new \App\Mail\UserWarn());


                    $report->is_resolved = true;
                    $report->save();
                }
                break;
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    //ADMIN reports > modal> delete user 

    public function destroy(Request $request)
    {
        $report = Report::find($request->selectedReport['id']);

        $report->is_resolved = true;
        $report->save();

        return redirect()->back();
    }
}
