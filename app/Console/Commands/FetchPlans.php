<?php

namespace App\Console\Commands;

use ChargeBee\ChargeBee\Models\ItemPrice;
use ChargeBee\ChargeBee\Environment;
use Illuminate\Console\Command;

class FetchPlans extends Command
{
    protected
    $signature = 'chargebee:fetch-plan';
    protected
    $description = 'Fetch a plan from ChargeBee and write it to plans.txt';

    public
    function handle()
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
            $itemPriceDetails = [];
            foreach ($response as $entry) {
                $itemPrice = $entry->itemPrice();
                $itemPriceDetails[] = [
                    "chargebee_id" => $itemPrice->id,
                    "display_name" => $itemPrice->name,
                    "price" => $itemPrice->price,
                    "chargebee_product" => $itemPrice->itemId,
                    "frequency" => $itemPrice->periodUnit,
                    "currency" => $itemPrice->currencyCode,
                    "quantity" => 1
                ];
            }
            file_put_contents(storage_path('plans.txt'), json_encode($itemPriceDetails, JSON_PRETTY_PRINT), FILE_APPEND);
            $this->info("Plan details written to plans.txt");

        } catch (\Exception $e) {
            $this->error("Error fetching plan: " . $e->getMessage());
        }
    }
}
