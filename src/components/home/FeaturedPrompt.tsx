"use client";

import React from "react";

type FeaturedPromptProps = {
  data: {
    id: number;
    title: string;
    answer: string;
    ai_note: string;
    created_at: string;
  } | null;
};

export default function FeaturedPrompt({ data }: FeaturedPromptProps) {
  // If no featured prompt → don't render anything (homepage will show previous prompts only)
  if (!data) {
    return null;
  }

  const paragraphs = data.answer.trim().split("\n\n");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">

      {/* Header */}
      <h1
        className="
          text-2xl sm:text-4xl 
          font-bold tracking-tight mb-2
          text-neutral-900 dark:text-neutral-100 
          leading-snug font-sans
        "
      >
        Let’s think together.
      </h1>

      <p className="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400">
        Share your perspective — the conversation isn’t complete without you.
      </p>

      {/* Featured Container */}
      <div
        className="
          w-full rounded-md border border-neutral-300 
          dark:border-neutral-700 
          bg-white dark:bg-neutral-900 
          text-neutral-900 dark:text-neutral-100
          transition mt-9 
          px-4 sm:px-10 pb-10
        "
      >
        {/* Label */}
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-500 mt-5 mb-2">
          <span>🔥</span>
          <span className="text-[10px] sm:text-xs tracking-wide uppercase font-medium">
            Featured Question
          </span>
        </div>

        {/* Title */}
        <h1
          className="
            text-2xl sm:text-3xl 
            font-bold tracking-tight mb-2
            text-neutral-900 dark:text-neutral-100 
            leading-snug font-sans
          "
        >
          {data.title}
        </h1>

        {/* AI Note */}
        <p className="italic text-[11px] sm:text-[12px] text-neutral-500 dark:text-neutral-400 mb-5">
          {data.ai_note}
        </p>

        {/* Answer */}
        <div
          className="
            font-sans 
            text-[15px] sm:text-[18px] 
            leading-[1.7] sm:leading-[1.78] 
            text-neutral-800 dark:text-neutral-200 
            space-y-4 sm:space-y-6
          "
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {/* Footer Prompt */}
        <p className="italic text-[14px] sm:text-[14px] text-neutral-500 dark:text-neutral-400 mt-5">
          What’s your angle on this? Let’s explore it together.
        </p>
      </div>
    </div>
  );
}
