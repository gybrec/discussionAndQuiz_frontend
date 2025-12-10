"use client";

import FeaturedPrompt from "./FeaturedPrompt";
import ShareThought from "./ShareThought";
import PreviousThoughts from "./PreviousThoughts";
import PreviousQuestions from './PreviousQuestions';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeApiService } from "@/services/home.service";


export default function HomePage() {

    const { data: featured, isLoading, error } = useQuery({
        queryKey: ["featuredPrompt"],
        queryFn: () => homeApiService.getFeaturedDiscussion(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const [newThought, setNewThought] = useState(null);
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    /* ------------- LOADER ------------- */
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-neutral-700 dark:text-neutral-300 bg-white dark:bg-black transition-colors duration-300">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    /* ------------- ERROR ------------- */
    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black transition-colors duration-300 text-neutral-700 dark:text-neutral-300">
                Failed to load content. Try again.
            </div>
        );
    }

    // /* ------------- NO FEATURED FOUND ------------- */
    if (!featured) {
        return (
            <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
                {/* ONLY PreviousPrompts should show if featured is empty */}
                <PreviousQuestions />
            </div>
        );
    }

    /* ------------- NORMAL RENDER ------------- */
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">

            {/* Pass data to FeaturedPrompt component */}
            <FeaturedPrompt data={featured} />

            {/* Pass featured.id so thoughts attach to right question */}
            <ShareThought
                promptId={featured.id}
                onNewThought={(t) => setNewThought(t)}
            />

            {/* Thoughts for this featured prompt */}
            <PreviousThoughts
                promptId={featured.id}
                newThought={newThought}
            />

            {/* <div className="my-16" /> */}

            <PreviousQuestions />
        </div>
    );
}
