import {Head, Link, usePage} from '@inertiajs/react';
import {CreditCard, DollarSign, FileText, Calendar, PlusCircle, Loader2} from 'lucide-react';
import React, {useState} from 'react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {type BreadcrumbItem, SharedData} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billing Details',
        href: '/settings/billing',
    },
];

// Interfaces
interface Subscription {
    plan?: string;
    price?: number;
    nextBillingDate?: string;
    status?: 'Active' | 'Pending' | 'Cancelled';
    nextBillingDescription?: string
}

interface PaymentMethod {
    type?: string;
    lastFourDigits?: string;
    expiryDate?: string;
}

interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending';
}

const updatePaymentMethodButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (isLoading) {
            e.preventDefault(); // Prevent navigation if disabled or already loading
            return;
        }
        setIsLoading(true);
    };
    return (
        isLoading ? (
            <Loader2 className="animate-spin ml-2" />
        ) : (
            <a
                href="/update-payment-method"
                className="w-full flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:w-auto"
                onClick={handleClick}
            >
                Add Payment Method
            </a>
        )
    );
};

// Status Badge Component (unchanged from previous implementation)
const StatusBadge: React.FC<{ status: string; type: 'subscription' | 'invoice' }> = ({ status, type }) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';

    const getStatusClasses = () => {
        if (type === 'subscription') {
            switch (status) {
                case 'Active':
                    return 'bg-green-100 text-green-800';
                case 'Pending':
                case 'Cancelled':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        }

        return status === 'Paid'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <span className={`${baseClasses} ${getStatusClasses()}`}>
            {status}
        </span>
    );
};

// No Subscription Component
const NoSubscriptionCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <DollarSign className="mr-2" />
                    No Active Subscription
                </CardTitle>
                <CardDescription>
                    You currently do not have an active subscription.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Explore our plans and choose the one that best fits your needs.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/pricing">
                        View Pricing Plans
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

// Subscription Card Component
const SubscriptionCard: React.FC<{ subscription: Subscription }> = ({ subscription }) => {
    if (!subscription.plan) {
        return <NoSubscriptionCard />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <DollarSign className="mr-2" />
                    Current Subscription
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-muted-foreground">Plan</p>
                        <p className="font-semibold">{subscription.plan}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">{subscription.nextBillingDescription}</p>
                        <p className="font-semibold">{subscription.nextBillingDate}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Status</p>
                        <StatusBadge status={subscription.status || 'Pending'} type="subscription" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// No Payment Method Component
const NoPaymentMethodCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CreditCard className="mr-2" />
                    Add Payment Method
                </CardTitle>
                <CardDescription>
                    No payment method is currently saved.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Add a payment method to enable automatic billing and uninterrupted service.
                </p>
            </CardContent>
            <CardFooter>
                {updatePaymentMethodButton()}
            </CardFooter>
        </Card>
    );
};

// Payment Method Card Component
const PaymentMethodCard: React.FC<{ paymentMethod?: PaymentMethod }> = ({ paymentMethod }) => {
    if (!paymentMethod?.type) {
        return <NoPaymentMethodCard />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CreditCard className="mr-2" />
                    Payment Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-muted-foreground">Card Type</p>
                        <p className="font-semibold">{paymentMethod.type}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Card Number</p>
                        <p className="font-semibold">**** **** **** {paymentMethod.lastFourDigits}</p>
                    </div>
                    {updatePaymentMethodButton()}
                </div>
            </CardContent>
        </Card>
    );
};

// No Invoices Component
const NoInvoicesCard: React.FC = () => {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <FileText className="mr-2" />
                    No Invoices
                </CardTitle>
                <CardDescription>
                    You have no billing history at the moment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center">
                    Once you have an active subscription, your invoices will appear here.
                </p>
            </CardContent>
        </Card>
    );
};

// Invoices Card Component
const InvoicesCard: React.FC<{ invoices: Invoice[] }> = ({ invoices }) => {
    if (invoices.length === 0) {
        return <NoInvoicesCard />;
    }

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <FileText className="mr-2" />
                    Recent Invoices
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="divide-y">
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center py-4">
                            <div>
                                <p className="font-medium">{invoice.id}</p>
                                <p className="text-muted-foreground text-sm flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {invoice.date}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                                <StatusBadge status={invoice.status} type="invoice" />
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                    View All Invoices
                </Button>
            </CardContent>
        </Card>
    );
};

const prepareSubscriptionPayload = (subscriptions: any) => {
    const dateOptions:Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    let nextBillingDescription;
    if(subscriptions?.[0]?.chargebee_status == 'cancelled'){
        nextBillingDescription = "cancelled at"
    }
    if(subscriptions?.[0]?.chargebee_status == 'in_trial'){
        nextBillingDescription = "trails ends at"
    }
    if(subscriptions?.[0]?.chargebee_status == 'active'){
        nextBillingDescription = "next billing cycle"
    }
    const currentSubscription: Subscription = {
        plan: subscriptions?.[0]?.chargebee_price,
        nextBillingDate: new Date(subscriptions?.[0]?.ends_at).toLocaleDateString("en-US", dateOptions),
        status: subscriptions?.[0]?.chargebee_status,
        nextBillingDescription: nextBillingDescription,
    };
    return currentSubscription;
}


const preparePaymentMethodDetails = (user: any) => {
    return {
        type: user?.pm_type,
        lastFourDigits: user?.pm_last_four,
    }
}
// Main Billing Details Page Component
export default function BillingDetails() {
    const { auth } = usePage<SharedData>().props;
    console.log(auth);
    const currentSubscription = prepareSubscriptionPayload(auth.subscription);
    const paymentMethod = preparePaymentMethodDetails(auth.user);

    const recentInvoices: Invoice[] = [
        // Uncomment to test no invoices scenario
        // [],

        {
            id: 'INV-2024-03-01',
            date: 'March 1, 2025',
            amount: 29.99,
            status: 'Paid'
        },
        {
            id: 'INV-2024-02-01',
            date: 'February 1, 2025',
            amount: 29.99,
            status: 'Paid'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing Details" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Billing Details"
                        description="Manage your subscription, payment methods, and billing history"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SubscriptionCard subscription={currentSubscription} />
                        <PaymentMethodCard paymentMethod={paymentMethod} />
                        <InvoicesCard invoices={recentInvoices} />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
