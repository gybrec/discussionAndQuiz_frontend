"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CurrentAffairsSection() {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-5">

            {/* OUTSIDE TITLE */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                Today’s Highlight
            </h1>

            {/* OUTSIDE SUBTEXT */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 mb-5">
                A quick quiz to keep your awareness sharp and your mind in motion.
            </p>

            {/* CARD */}
            <div
                className="
                    w-full 
                    rounded-xl 
                    border border-neutral-300 dark:border-neutral-700 
                    bg-white dark:bg-neutral-900
                    p-5 sm:p-7 
                    shadow-sm hover:shadow-md 
                    transition 
                    flex flex-col 
                    gap-4 sm:gap-5
                "
            >

                {/* DATE */}
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    {today}
                </p>

                {/* TITLE INSIDE CARD */}
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    Today’s Current Affairs Quiz
                </h2>

                {/* SUBTEXT INSIDE CARD */}
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Stay updated. Test your awareness. Join the moment.
                </p>

                {/* BUTTON */}
                <Link
                    href={`/quiz/${1}`}
                    className="
                        inline-flex items-center justify-center gap-2 
                        mt-2 
                        px-4 py-2 sm:px-5 sm:py-2.5
                        bg-blue-600 hover:bg-blue-700 
                        text-white 
                        text-sm sm:text-base 
                        rounded-md 
                        font-medium 
                        transition 
                        shadow-sm hover:shadow 
                        active:scale-[0.98]
                    "
                >
                    Start Quiz
                    <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
