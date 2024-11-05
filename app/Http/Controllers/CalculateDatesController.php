<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class CalculateDatesController extends Controller
{
    public static function getLastActivity($secondsSinceEpoch) {
        // Convert the seconds to a human-readable date format (Y-m-d H:i:s)
        //$date = date('H:i:s d.m.Y ', $secondsSinceEpoch);
        $date = Carbon::parse($secondsSinceEpoch)->format('d.m.Y H:i:s');
        return $date;
    }
}
