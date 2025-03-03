<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function productCheckout(Request $request, string $plan){
         $checkout = $request
            ->user()
            ->newSubscription('default', $plan)
            ->checkout([
                'success_url' => route('dashboard'),
                'cancel_url'  => route('failed-payment')
            ]);
        return redirect()->away($checkout->url);
    }
}
