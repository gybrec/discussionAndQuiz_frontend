"use client";

import { useEffect, useState } from "react";
import { homeApiService } from "@/services/home.service";
import ShareThought from "@/components/home/ShareThought";
import PreviousThoughts from "@/components/home/PreviousThoughts";
import RecentPrompts from "@/components/home/PreviousQuestions";

type PromptType = {
    id: number;
    title: string;
    answer: string;
    ai_note: string;
    created_at: string;
};

export default function PromptContent({ id }: { id: string | number }) {
    const [prompt, setPrompt] = useState<PromptType | null>(null);
    const [newThought, setNewThought] = useState(null);

    useEffect(() => {
        if (!id) return;
        homeApiService.getById(id).then(setPrompt);
    }, [id]);

    if (!prompt) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 ">
            <div className="
                max-w-7xl mx-auto 
                pt-4 sm:pt-12 pb-32 
                grid grid-cols-1 
                lg:grid-cols-[3fr_1fr] 
                gap-10
            ">

                {/* LEFT SIDE — PROMPT + THOUGHT INPUT + PREVIOUS THOUGHT */}
                <div className="space-y-12">

                    {/* PROMPT TITLE + ANSWER */}
                    <div className="px-4 sm:px-10">
                        <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                            {prompt.title}
                        </h1>

                        {/* AI Note */}
                        <p className="italic text-xs text-neutral-500 dark:text-neutral-400 mb-5">
                            {prompt.ai_note}
                        </p>

                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {prompt.answer}
                        </p>

                        {prompt.created_at && (
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-3">
                                {new Date(prompt.created_at).toLocaleDateString()}
                            </p>
                        )}

                        {/* Footer Prompt */}
                        <p className="italic text-xs text-neutral-500 dark:text-neutral-400 mt-5">
                            What’s your angle on this? Let’s explore it together.
                        </p>
                    </div>

                    {/* SHARE YOUR THOUGHT */}
                    <ShareThought
                        promptId={prompt.id}
                        onNewThought={(t) => setNewThought(t)}
                    />

                    {/* PREVIOUS THOUGHTS */}
                    <PreviousThoughts
                        promptId={prompt.id}
                        newThought={newThought}
                    />
                </div>

                {/* RIGHT SIDE — RECENT PROMPTS (Slim Sidebar) */}
                <div className="space-y-6">
                    <RecentPrompts />
                </div>

            </div>
        </div>
    );
}
