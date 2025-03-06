import React, {useState} from 'react';
import {Loader2} from "lucide-react";

interface PlanCardProps {
    plan: {
        name: string;
        description: string;
        price: string;
        currentPlan: boolean;
        popular: boolean;
        features: string[];
        action: React.ReactNode;
    };
    currentPlanRenderer: () => React.ReactNode;
    additionalClasses?: string;
}

const cancleSubscriptionButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (isLoading) {
            e.preventDefault(); // Prevent navigation if disabled or already loading
            return;
        }
        setIsLoading(true);
    };

    return (
        !isLoading ? <a
            href={ `/subscription/cancel-subscription`}
            className={`rounded-lg px-4 py-2 text-center font-medium text-red-600 border border-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 ${ isLoading
                        ? "bg-red-400 cursor-wait"
                        : ""
            }`}
            aria-disabled={ isLoading}
            onClick={handleClick}
        >
            cancel now
        </a> : <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
        </>
    );
};
export default function PlanCard({
                                     plan,
                                     currentPlanRenderer,
                                     additionalClasses = ""
                                 }: PlanCardProps) {
    return (
        <div
            className={`border-sidebar-border/70 dark:border-sidebar-border relative flex flex-col rounded-xl border p-6 ${additionalClasses}`}>
            {plan.currentPlan ? currentPlanRenderer() : <></>}

            {plan.popular && (
                <div
                    className="absolute -top-3 right-6 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                    Popular
                </div>
            )}

            <div className="mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
                </div>
            </div>

            <ul className="mb-6 space-y-3">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto flex flex-col gap-2">
                {!plan.currentPlan ? plan.action : <> </>}

                {plan.currentPlan && plan.name !== "Free" && cancleSubscriptionButton()}
            </div>
        </div>
    );
}
