"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { quizApiService } from "@/services/quiz.service";
import { useQuery } from "@tanstack/react-query";

export default function CurrentAffairsSection() {
    const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});
    // 👆 each quiz manages its own expand state

    const { data, isLoading, error } = useQuery({
        queryKey: ["todayCurrentAffairsQuiz"],
        queryFn: () => quizApiService.getTodayQuiz(), // returns {quizzes: []}
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading || error || !data || !data.quizzes) return null;

    const quizzes = data.quizzes;

    if (quizzes.length === 0) return null;

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const toggle = (id: number) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-5">

            {/* Section title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                Today’s Highlights
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 mb-5">
                Stay sharp — attempt today’s quizzes and track your performance.
            </p>

            {/* Render all today's quizzes */}
            <div className="flex flex-col gap-6">
                {quizzes.map((item: any) => {
                    const quiz = item.quiz;
                    const attempted = item.already_attempted;
                    const r = item.attempt_result;

                    const isOpen = expanded[quiz.id] || false;

                    return (
                        <div
                            key={quiz.id}
                            className="
                                w-full rounded-xl border border-neutral-300 dark:border-neutral-700
                                bg-white dark:bg-neutral-900 p-5 sm:p-7 shadow-sm
                                hover:shadow-md transition flex flex-col gap-4
                            "
                        >
                            {/* DATE */}
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                {today}
                            </p>

                            {/* TITLE */}
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                {quiz.title}
                            </h2>

                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                A quick way to boost your awareness.
                            </p>

                            {/* NOT ATTEMPTED → START BUTTON */}
                            {!attempted ? (
                                <Link
                                    href={`/quiz/${quiz.id}`}
                                    className="
                                        inline-flex items-center justify-center gap-2 
                                        px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 
                                        text-white text-sm sm:text-base rounded-md font-medium 
                                        transition shadow-sm hover:shadow active:scale-[0.98]
                                        w-full sm:w-auto
                                    "
                                >
                                    Start Quiz
                                    <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <>
                                    {/* COMPLETED SUMMARY */}
                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() => toggle(quiz.id)}
                                    >
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            Completed — Score: {r.score}
                                        </p>

                                        {isOpen ? (
                                            <ChevronUp size={20} className="text-neutral-600 dark:text-neutral-300" />
                                        ) : (
                                            <ChevronDown size={20} className="text-neutral-600 dark:text-neutral-300" />
                                        )}
                                    </div>

                                    {/* EXPANDED DETAILS */}
                                    {isOpen && (
                                        <div
                                            className="
                                                mt-3 p-4 rounded-lg 
                                                bg-neutral-100 dark:bg-neutral-800
                                                border border-neutral-300 dark:border-neutral-700
                                            "
                                        >
                                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                                Total Questions: <strong>{r.total_questions}</strong>
                                            </p>

                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                Right: {r.total_right}
                                            </p>

                                            <p className="text-sm text-red-600 dark:text-red-400">
                                                Wrong: {r.total_wrong}
                                            </p>

                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                Attempted: {r.total_attempted}
                                            </p>
                                        </div>
                                    )}

                                    {/* BOTTOM BUTTONS */}
                                    <div className="flex flex-col sm:flex-row gap-3 mt-4">

                                        <Link
                                            href={`/quiz/${quiz.id}`}
                                            className="
                                                px-4 py-2 rounded-md 
                                                bg-blue-600 hover:bg-blue-700 text-white 
                                                text-sm font-medium transition shadow-sm 
                                                active:scale-[0.98]
                                                w-full sm:w-auto text-center
                                            "
                                        >
                                            Take Again
                                        </Link>

                                        <Link
                                            href={`/quizReview/${quiz.id}?review=true`}
                                            className="
                                                px-4 py-2 rounded-md 
                                                bg-neutral-200 dark:bg-neutral-800 
                                                hover:bg-neutral-300 dark:hover:bg-neutral-700 
                                                text-neutral-900 dark:text-neutral-100 
                                                text-sm font-medium transition 
                                                active:scale-[0.98]
                                                w-full sm:w-auto text-center
                                            "
                                        >
                                            Review Answers
                                        </Link>

                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
