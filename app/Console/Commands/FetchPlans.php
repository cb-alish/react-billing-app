<?php

namespace App\Console\Commands;

use ChargeBee\ChargeBee\Models\ItemPrice;
use ChargeBee\ChargeBee\Environment;
use Illuminate\Console\Command;
use App\Models\Plan;

class FetchPlans extends Command
{
    protected $signature = 'chargebee:fetch-plan';
    protected $description = 'Fetch plans from ChargeBee and store them in the database';

    public function handle()
    {
        $site = env('CHARGEBEE_SITE');
        $apiKey = env('CHARGEBEE_API_KEY');

        if (!$site || !$apiKey) {
            $this->error('ChargeBee site or API key is missing in .env file');
            return;
        }

        Environment::configure($site, $apiKey);

        try {
            $response = ItemPrice::all([
                "item_type[is]" => "plan",
            ]);

            foreach ($response as $entry) {
                $itemPrice = $entry->itemPrice();

                // Insert into database
                Plan::updateOrCreate(
                    ['chargebee_id' => $itemPrice->id], // Unique identifier
                    [
                        "display_name" => $itemPrice->name,
                        "price" => $itemPrice->price,
                        "chargebee_product" => $itemPrice->itemId,
                        "frequency" => $itemPrice->periodUnit,
                        "currency" => $itemPrice->currencyCode,
                        "quantity" => 1
                    ]
                );
            }

            $this->info("Plan details successfully stored in the database.");

        } catch (\Exception $e) {
            $this->error("Error fetching plans: " . $e->getMessage());
        }
    }
}
