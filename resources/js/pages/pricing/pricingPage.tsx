import {BreadcrumbItem} from "@/types";
import AppLayout from "@/layouts/app-layout";
import Pricing from "@/pages/pricing/pricing";
import ChargebeeBanner from "@/pages/banners/chargebeeBanner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pricing',
        href: '/pricing',
    },
];

export default function PricingPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Pricing/>
            <ChargebeeBanner/>
        </AppLayout>
    )
}

