<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('pricing', function () {
        return Inertia::render('pricing');
    })->name('pricing');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('failed-payment', function () {
        return Inertia::render('failedPayment');
    })->name('failed-payment');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/checkout.php';
