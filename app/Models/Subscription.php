<?php

namespace App\Models;
use \Laravel\CashierChargebee\Subscription as CashierSubscription;

class Subscription extends CashierSubscription
{
    protected $casts = [
        'billing_cycle_anchor' => 'datetime',
    ];
}
