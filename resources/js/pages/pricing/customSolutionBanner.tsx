import React from 'react';

export default function CustomSolutionBanner() {
    return (
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
    );
}
