"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { homeApiService } from "@/services/home.service";

type Prompt = {
    id: number;
    title: string;
    answer: string;
    created_at: string;
};

const excerpt = (text: string) => {
    const max = 180;
    return text.length > max ? text.slice(0, max) + "..." : text;
};

export default function AllQuestions() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);

    useEffect(() => {
        homeApiService.getAll().then((res) => {
            setPrompts(res.results);
            setNextPage(res.next);
        });
    }, []);

    const loadMore = async () => {
        if (!nextPage) return;
        const res = await fetch(nextPage);
        const data = await res.json();
        setPrompts((prev) => [...prev, ...data.results]);
        setNextPage(data.next);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 ">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-28">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
                    All Questions
                </h2>

                {/* Prompt List */}
                <div className="space-y-4">
                    {prompts.map((p) => (
                        <Link
                            key={p.id}
                            href={`/questions/${p.id}`}
                            className="
                block p-5 rounded-xl border 
                bg-neutral-100 dark:bg-neutral-900
                border-neutral-300 dark:border-neutral-800
                shadow-sm hover:shadow-md transition
                hover:bg-neutral-200 dark:hover:bg-neutral-800
              "
                        >
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {p.title}
                            </h3>

                            <p className="text-sm mt-1 text-neutral-700 dark:text-neutral-400">
                                {excerpt(p.answer)}
                            </p>

                            <p className="text-xs mt-2 text-neutral-500 dark:text-neutral-500">
                                {new Date(p.created_at).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {nextPage && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={loadMore}
                            className="
                px-6 py-2 rounded-lg 
                bg-neutral-900 dark:bg-white
                text-white dark:text-black
                shadow hover:opacity-85 transition
              "
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
