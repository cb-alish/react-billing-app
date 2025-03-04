import React, {useState} from 'react';
import PlanCard from './PlanCard';
import {usePage} from "@inertiajs/react";
import {SharedData} from "@/types";
import { Loader2 } from 'lucide-react';

interface PricingCardsProps {
    subscription: any;
}

export default function PricingCards() {
    const { auth } = usePage<SharedData>().props;
    const subscription = auth.subscription;

    const getCurrentSubscriptionPlan = ()=>{
        if(!subscription || subscription.length < 1 || subscription?.[0].chargebee_status === "cancelled"){
            return "none";
        }
        return subscription?.[0].chargebee_price;
    }
    const checkoutButtonLink = (plan: string) => {
        const [isLoading, setIsLoading] = useState(false);
        const currentPlan = plan === getCurrentSubscriptionPlan();

        const handleClick = (e: React.MouseEvent) => {
            if (currentPlan || isLoading) {
                e.preventDefault(); // Prevent navigation if disabled or already loading
                return;
            }
            setIsLoading(true);
        };

        return (
            !isLoading ? <a
                href={ `/checkout/${plan}`}
                className={`mt-auto rounded-lg px-4 py-2 font-medium text-white transition ${
                    currentPlan
                        ? "bg-gray-400 cursor-not-allowed"
                        : isLoading
                            ? "bg-blue-400 cursor-wait"
                            : "bg-blue-600 hover:bg-blue-700"
                }`}
                aria-disabled={currentPlan || isLoading}
                onClick={handleClick}
            >
                Upgrade Now
            </a> : <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
            </>
        );
    };

    const currentPlan = () => {
        return (
            <div
                className="absolute -top-3 left-6 rounded-full bg-green-400 px-3 py-1 text-xs font-medium text-white">
                Current Plan
            </div>
        );
    };

    // Free Plan details
    const freePlan = {
        name: "Free",
        description: "Essential features for beginners",
        price: "$0",
        currentPlan: !subscription || subscription.length === 0 || subscription?.[0].chargebee_status === "cancelled",
        popular: false,
        features: [
            "5 projects",
            "Basic analytics",
            "24-hour support",
        ]
    };

    // Pro Plan details
    const proPlan = {
        name: "Pro",
        description: "Advanced features for professionals",
        price: "$29",
        currentPlan: getCurrentSubscriptionPlan() === "pro-plan-INR-Monthly",
        popular: true,
        features: [
            "25 projects",
            "Advanced analytics",
            "Priority support",
            "Custom integrations"
        ],
        action: checkoutButtonLink("pro-plan-INR-Monthly")
    };

    // Premium Plan details
    const premiumPlan = {
        name: "Premium",
        description: "Enterprise-grade solutions",
        price: "$99",
        currentPlan: getCurrentSubscriptionPlan() === "premium-plan-INR-Monthly",
        popular: false,
        features: [
            "Unlimited projects",
            "Real-time analytics",
            "24/7 dedicated support",
            "Advanced security",
            "API access"
        ],
        action: checkoutButtonLink("premium-plan-INR-Monthly")
    };

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <PlanCard
                plan={freePlan}
                currentPlanRenderer={currentPlan}
            />
            <PlanCard
                plan={proPlan}
                currentPlanRenderer={currentPlan}
                additionalClasses="bg-gray-50 dark:bg-gray-800/50"
            />
            <PlanCard
                plan={premiumPlan}
                currentPlanRenderer={currentPlan}
                additionalClasses="bg-gray-50 dark:bg-gray-800/50"
            />
        </div>
    );
}
