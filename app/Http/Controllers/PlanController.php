<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::all()->groupBy('chargebee_product')->map(function ($group) {
            $monthly = $group->where('frequency', 'month')->first();
            $yearly = $group->where('frequency', 'year')->first();

            return [
                'name' => $group->first()->display_name,
                'monthly_price' => $monthly ? number_format($monthly->price / 100, 2) : 0,
                'yearly_price' => $yearly ? number_format($yearly->price / 100, 2) : 0,
                'monthly_chargebee_id' => optional($monthly)->chargebee_id,
                'yearly_chargebee_id' => optional($yearly)->chargebee_id,
                'features' => ["Feature A", "Feature B", "Feature C"], // Modify as needed
                'default' => false, // Add logic for default selection if needed
                'currency' => $monthly?->currency ?? $yearly?->currency,
            ];

        })->values();

        return response()->json($plans);
    }
}
