import { useState, useEffect, useRef } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

export default function PricingCard() {
    const [billing, setBilling] = useState("Monthly");
    const [hoveredCard, setHoveredCard] = useState(null);
    const [plans, setPlans] = useState([]);
    const markerRef = useRef(null);
    const monthlyRef = useRef(null);
    const yearlyRef = useRef(null);

    useEffect(() => {
        fetch("/plans/list") // Adjust URL based on your backend
            .then((response) => response.json())
            .then((data) => setPlans(data))
            .catch((error) => console.error("Error fetching plans:", error));
    }, []);

    useEffect(() => {
        if (monthlyRef.current && markerRef.current) {
            toggleRepositionMarker(monthlyRef.current);
            markerRef.current.classList.remove("opacity-0");
            setTimeout(() => {
                markerRef.current.classList.add("duration-300", "ease-out");
            }, 10);
        }
    }, []);

    const toggleRepositionMarker = (toggleButton) => {
        if (!markerRef.current) return;
        markerRef.current.style.width = `${toggleButton.offsetWidth}px`;
        markerRef.current.style.height = `${toggleButton.offsetHeight}px`;
        markerRef.current.style.left = `${toggleButton.offsetLeft}px`;
    };

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <section className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">Chart Your Course</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300">
                    Set sail and discover the riches of our value-packed plans.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="relative inline-flex items-center justify-center p-1 border-2 rounded-full border-[#FF3300] dark:border-[#FF3300]">
                    <div
                        ref={monthlyRef}
                        onClick={() => {
                            setBilling("Monthly");
                            toggleRepositionMarker(monthlyRef.current);
                        }}
                        className={`relative z-20 px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                            billing === "Monthly"
                                ? "text-white"
                                : "text-[#012A38] dark:text-white"
                        }`}
                    >
                        Monthly
                    </div>
                    <div
                        ref={yearlyRef}
                        onClick={() => {
                            setBilling("Yearly");
                            toggleRepositionMarker(yearlyRef.current);
                        }}
                        className={`relative z-20 px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                            billing === "Yearly"
                                ? "text-white"
                                : "text-[#012A38] dark:text-white"
                        }`}
                    >
                        Yearly
                    </div>
                    <div ref={markerRef} className="absolute left-0 z-10 w-1/2 h-full opacity-0">
                        <div className="w-full h-full rounded-full bg-[#FF3300]"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`flex flex-col h-full transition-all duration-300 ease-in-out`}
                    >
                        <div className={`flex flex-col h-full bg-white dark:bg-zinc-800 rounded-xl border-2 shadow-md overflow-hidden ${
                            hoveredCard === index
                                ? "border-[#FF3300] border-1"
                                : plan.default && hoveredCard === null
                                    ? "border-[#FF3300]"
                                    : "border-[#012A38] border-opacity-30 dark:border-opacity-50"
                        }`}>
                            <div className="px-6 pt-6">
                                <span className={`inline-block px-4 py-1 text-sm font-medium text-white rounded-full ${
                                    hoveredCard === index ? "bg-[#FF3300]" : "bg-[#012A38]"
                                }`}>
                                    {plan.name}
                                </span>
                            </div>
                            <div className="px-6 mt-4">
                                <div className="flex items-baseline">
                                    <span className={`text-4xl font-bold ${
                                        hoveredCard === index ? "text-[#FF3300]" : "text-[#012A38] dark:text-zinc-50"
                                    }`}>
                                        {getSymbolFromCurrency(plan?.currency)}{billing === "Monthly" ? plan.monthly_price : plan.yearly_price}
                                    </span>
                                    <span className="ml-1 text-lg font-medium text-zinc-500 dark:text-zinc-400">
                                        /{billing === "Monthly" ? "mo" : "yr"}
                                    </span>
                                </div>
                                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                                    Plan description goes here.
                                </p>
                            </div>

                            <div className="p-6 mt-auto bg-zinc-50 dark:bg-zinc-900">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${
                                                hoveredCard === index ? "text-[#FF3300]" : "text-[#FF3300]"
                                            }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6">
                                    <a
                                        href={`/checkout/${billing=="Monthly" ? plan.monthly_chargebee_id : plan.yearly_chargebee_id}`}
                                        className={`block w-full px-4 py-3 text-center font-medium rounded-lg transition-all ${
                                            hoveredCard === index
                                                ? "bg-[#FF3300] text-white hover:bg-opacity-90"
                                                : plan.default && hoveredCard === null
                                                    ? "bg-[#FF3300] text-white hover:bg-opacity-90"
                                                    : "bg-[#012A38] text-white hover:bg-opacity-90"
                                        }`}
                                    >
                                        Get Started
                                    </a>
                                </div>
                            </div>

                            {(plan.default && hoveredCard === null) || hoveredCard === index ? (
                                <div className="absolute top-0 right-0 w-full h-1"></div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
                Plans are auto configured if you have webhook enabled, if you want to fetch plan you can run php a something something command and see
                <code>/a/txt</code>. Also you can manually add plan using admin using admin. Default password for admin is d5faultPassw0rd
            </p>
        </section>
    );
}
