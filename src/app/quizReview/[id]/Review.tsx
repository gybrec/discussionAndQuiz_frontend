"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { quizApiService } from "@/services/quiz.service";
import { getGuestId } from "@/utils/guestId";

export default function ReviewPage({ id }: { id: string | number }) {
    const quizId = Number(id);
    // 🚀 FIX 1 — guestId loaded only on client
    const [guestId, setGuestId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        const gid = getGuestId();
        setGuestId(gid);
    }, []);

    // ------------------------
    // FETCH REVIEW DATA
    // ------------------------
    const { data, isLoading, error } = useQuery({
        queryKey: ["quizReview", quizId, guestId],
        queryFn: () => quizApiService.getReview(quizId, guestId!),
        enabled: !!guestId && mounted, // Only run after guestId is ready
    });

    const [index, setIndex] = useState(0);

    // 🚀 FIX 2 — prevent hydration mismatch 
    if (!mounted) return null;

    if (!guestId)
        return <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 text-center py-20 text-red-500">
            guest_id missing.
        </div>;

    if (isLoading)
        return <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 text-center py-20">
            Loading Review...
        </div>;

    if (error || !data)
        return <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 text-center py-20 text-red-500">
            Review unavailable.
        </div>;

    const questions = data.results;

    if (!questions || questions.length === 0)
        return <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 text-center py-20">
            No review data available.
        </div>;

    const current = questions[index];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20">
            <div className="max-w-3xl mx-auto px-4 py-10">

                {/* HEADER */}
                <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
                    Review — {data.quiz_title}
                </h1>

                {/* CARD */}
                <div className="p-6 sm:p-7 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">

                    {/* QUESTION */}
                    <h2 className="text-lg sm:text-xl font-semibold mb-5 leading-relaxed">
                        {index + 1}. {current.question}
                    </h2>

                    {/* OPTIONS */}
                    <div className="space-y-3">
                        {current.options.map((opt: string, i: number) => {
                            if (!opt) return null;

                            const optNumber = i + 1;
                            const isCorrect = current.correct_option === optNumber;
                            const isSelected = current.selected_option === optNumber;

                            return (
                                <div
                                    key={i}
                                    className={`
                                        p-3 rounded-md border transition flex items-center justify-between
                                        ${isCorrect
                                            ? "bg-green-600 text-white border-green-700"
                                            : isSelected && !isCorrect
                                                ? "bg-red-600 text-white border-red-700"
                                                : "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                                        }
                                    `}
                                >
                                    {opt}

                                    {/* Icons */}
                                    {isCorrect && <CheckCircle size={18} className="text-white" />}
                                    {isSelected && !isCorrect && (
                                        <XCircle size={18} className="text-white" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* EXPLANATION */}
                    {current.explanation && (
                        <div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700">
                            <p className="font-semibold mb-1">Explanation:</p>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed break-words">
                                {current.explanation}
                            </p>
                        </div>
                    )}

                    {/* NAVIGATION */}
                    <div className="flex justify-between mt-8">
                        <button
                            disabled={index === 0}
                            onClick={() => setIndex(index - 1)}
                            className="
                                inline-flex items-center gap-2 
                                px-4 py-2 rounded-md text-sm
                                bg-neutral-200 dark:bg-neutral-800 
                                hover:bg-neutral-300 dark:hover:bg-neutral-700 
                                disabled:opacity-40 disabled:cursor-not-allowed
                            "
                        >
                            <ArrowLeft size={16} /> Prev
                        </button>

                        <button
                            disabled={index === questions.length - 1}
                            onClick={() => setIndex(index + 1)}
                            className="
                                inline-flex items-center gap-2 
                                px-4 py-2 rounded-md text-sm
                                bg-blue-600 hover:bg-blue-700 
                                text-white shadow-sm
                                disabled:opacity-40 disabled:cursor-not-allowed
                            "
                        >
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
