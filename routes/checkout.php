<?php

use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;


Route::get('/checkout/{plan?}', [CheckoutController::class, "productCheckout"])
->middleware(['auth', 'verified'])
->name('checkout');

require __DIR__.'/auth.php';
