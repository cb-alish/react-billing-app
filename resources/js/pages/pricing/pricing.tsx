import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem, SharedData} from '@/types';
import {Head, usePage} from '@inertiajs/react';
import PricingCards from './PricingCards';
import CustomSolutionBanner from './CustomSolutionBanner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pricing',
        href: '/pricing',
    }
];

export default function Pricing() {
    const {auth} = usePage<SharedData>().props;
    const subscription = auth.subscription;
    return (
        auth.user ?
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                    <PricingCards/>
                    <CustomSolutionBanner/>
                </div>
            </AppLayout> :
            <>
                <Head title="Pricing"/>
                <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Choose the Right Plan for You</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Get started for free or upgrade to unlock premium features
                        </p>
                    </div>
                    <PricingCards/>
                    <CustomSolutionBanner/>
                </div>
            </>
    );
}
