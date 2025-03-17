<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Chargebee\Cashier\Listeners\HandleWebhookReceived;
use ChargeBee\ChargeBee\Models\ItemPrice;

class CustomWebhookHandler extends HandleWebhookReceived
{
    protected function updateOrCreateSubscriptionFromPayload($user, array $data)
    {
        $firstItem = $data['subscription_items'][0];
        $isSinglePrice = count($data['subscription_items']) === 1;

        $trialEndsAt = isset($data['trial_end']) ? Carbon::createFromTimestamp($data['trial_end']) : null;
        $endsAt = isset($data['cancelled_at']) ? Carbon::createFromTimestamp($data['cancelled_at']) : null;
        $nextBillingCycle = isset($data['next_billing_at']) ? Carbon::createFromTimestamp($data['next_billing_at']) : null;

        $subscription = $user->subscriptions()->updateOrCreate(
            ['chargebee_id' => $data['id']],
            [
                'type' => $data['meta_data']['type'] ?? $data['meta_data']['name'] ?? $this->newSubscriptionType($data),
                'chargebee_status' => $data['status'],
                'chargebee_price' => $isSinglePrice ? $firstItem['item_price_id'] : null,
                'quantity' => $isSinglePrice && isset($firstItem['quantity']) ? $firstItem['quantity'] : null,
                'trial_ends_at' => $trialEndsAt,
                'ends_at' => $endsAt,
                'next_billing_at' => $nextBillingCycle
            ]
        );

        $subscriptionItemPriceIds = [];

        foreach ($data['subscription_items'] as $item) {
            $subscriptionItemPriceIds[] = $item['item_price_id'];

            $subscription->items()->updateOrCreate(
                ['chargebee_price' => $item['item_price_id']],
                [
                    'chargebee_product' => ItemPrice::retrieve($item['item_price_id'])->itemPrice()->itemId,
                    'quantity' => $item['quantity'] ?? null,
                ]
            );
        }

        $subscription->items()->whereNotIn('chargebee_price', $subscriptionItemPriceIds)->delete();

        return $subscription;
    }
}
