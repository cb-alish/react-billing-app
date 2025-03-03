import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem, SharedData} from '@/types';
import {Head, usePage, Link} from '@inertiajs/react';
import {LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pricing',
        href: '/pricing',
    },
];
export default function Pricing() {
    const {auth} = usePage<SharedData>().props;
    const subscription = auth.subscription;
    console.log(auth);
    const currentPlan = () => {
        return (
            <div
                className="absolute -top-3 left-6 rounded-full bg-green-400 px-3 py-1 text-xs font-medium text-white">
                Current Plan
            </div>
        )
    }
    const checkoutButtonLink = (plan: string, disabled: boolean = false) => {
        return (
            <a
                href={disabled ? "#" : `/checkout/${plan}`}
                className={`mt-auto rounded-lg px-4 py-2 font-medium text-white ${
                    disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}
                aria-disabled={disabled}
            >
                Upgrade Now
            </a>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pricing"/>
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Choose the Right Plan for You</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Get started for free or upgrade to unlock premium features
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Free Plan */}
                    <div
                        className="border-sidebar-border/70 dark:border-sidebar-border relative flex flex-col rounded-xl border p-6">
                        {!subscription || subscription.length === 0 ? currentPlan() : <></>}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">Free</h2>
                            <p className="text-gray-600 dark:text-gray-400">Essential features for beginners</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$0</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
                            </div>
                        </div>
                        <ul className="mb-6 space-y-3">
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>5 projects</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Basic analytics</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>24-hour support</span>
                            </li>
                        </ul>
                        <button
                            className="mt-auto rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div
                        className="border-sidebar-border/70 dark:border-sidebar-border relative flex flex-col rounded-xl border bg-gray-50 p-6 dark:bg-gray-800/50">
                        { subscription?.[0]?.chargebee_price === "pro-plan-INR-Monthly" ? currentPlan() : <></> }
                        <div
                            className="absolute -top-3 right-6 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                            Popular
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">Pro</h2>
                            <p className="text-gray-600 dark:text-gray-400">Advanced features for professionals</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$29</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
                            </div>
                        </div>
                        <ul className="mb-6 space-y-3">
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>25 projects</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Advanced analytics</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Custom integrations</span>
                            </li>
                        </ul>
                        {checkoutButtonLink("pro-plan-INR-Monthly", subscription?.[0]?.chargebee_price === "pro-plan-INR-Monthly")}
                    </div>

                    {/* Premium Plan */}
                    <div
                         className="border-sidebar-border/70 dark:border-sidebar-border relative flex flex-col rounded-xl border bg-gray-50 p-6 dark:bg-gray-800/50">
                        { subscription?.[0]?.chargebee_price === "premium-plan-INR-Monthly" ? currentPlan() : <></> }
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">Premium</h2>
                            <p className="text-gray-600 dark:text-gray-400">Enterprise-grade solutions</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$99</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
                            </div>
                        </div>
                        <ul className="mb-6 space-y-3">
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Unlimited projects</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Real-time analytics</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>24/7 dedicated support</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Advanced security</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>API access</span>
                            </li>
                        </ul>
                        {checkoutButtonLink("premium-plan-INR-Monthly", subscription?.[0]?.chargebee_price === "premium-plan-INR-Monthly")}
                    </div>
                </div>

                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border mt-4 rounded-xl border p-6 text-center">
                    <h3 className="text-xl font-bold">Need a custom solution?</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Contact our sales team for a tailored enterprise package
                    </p>
                    <button
                        className="mt-4 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        Get in Touch
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
