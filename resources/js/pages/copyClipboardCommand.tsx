import React, { useState } from 'react';
import { ClipboardCopy } from 'lucide-react';

const CommandWithCopyButton = ({ command, note }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center space-x-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3 text-sm">
                <div className="flex items-center">
                    <span className="text-zinc-400 mr-2">$</span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-mono">{command}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    aria-label="Copy to clipboard"
                >
                    <ClipboardCopy size={16} className={copied ? "text-green-500" : "text-zinc-500 dark:text-zinc-400"} />
                </button>
            </div>
            {note && (
                <p className="mt-4 text-center text-s text-black-500 dark:text-red-400">
                    {note}
                </p>
            )}
        </div>
    );
};

export default CommandWithCopyButton;
