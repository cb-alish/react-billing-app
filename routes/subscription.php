<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\SubscriptionController;


Route::get('/subscription/cancel-subscription', [SubscriptionController::class, "cancelSubscription"])
    ->middleware(['auth', 'verified'])
    ->name('cancel-subscription');

require __DIR__.'/auth.php';
