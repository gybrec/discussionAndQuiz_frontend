"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { quizApiService } from "@/services/quiz.service";
import { getGuestId } from "@/utils/guestId";
import Link from "next/link";

export default function QuizPage({ id }: { id: string | number }) {
    const quizId = Number(id);

    // ----------------------------
    // FETCH QUIZ DETAILS
    // ----------------------------
    const { data, isLoading, error } = useQuery({
        queryKey: ["quizDetail", quizId],
        queryFn: () => quizApiService.getQuizById(quizId),
    });

    const quiz = data || null;

    // ----------------------------
    // STATES
    // ----------------------------
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<any>(null);

    // ----------------------------
    // TIMER
    // ----------------------------
    useEffect(() => {
        if (quiz?.timer_seconds) {
            setTimeLeft(Number(quiz.timer_seconds));
        }
    }, [quiz]);

    const formatTime = () => {
        if (timeLeft === null) return "--:--";
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    // ----------------------------
    // SELECT OPTION
    // ----------------------------
    const handleOptionSelect = (qid: number, opt: number) => {
        setAnswers({ ...answers, [qid]: opt });
    };

    // ----------------------------
    // SUBMIT QUIZ
    // ----------------------------
    const handleSubmit = async () => {
        setSubmitted(true);
        const guestId = getGuestId();

        const payload = {
            guest_id: guestId,
            answers: quiz?.questions.map((q: any) => ({
                question_id: q.id,
                selected_option: answers[q.id] ?? null,
            })),
        };

        try {
            const res = await quizApiService.submitQuiz(quizId, payload);
            setResult(res);
        } catch (e: any) {
            setResult({
                error: "Error submitting quiz",
                raw: e?.response?.data,
            });
        }
    };

    // ----------------------------
    // TIMER TICK
    // ----------------------------
    useEffect(() => {
        if (submitted || timeLeft === null) return;

        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    // ----------------------------
    // SAFETY CHECKS
    // ----------------------------
    if (isLoading)
        return <div className="text-center py-20">Loading quiz...</div>;

    if (error || !quiz)
        return (
            <div className="text-center py-20 text-red-500">
                Quiz not available.
            </div>
        );

    if (!quiz.questions || quiz.questions.length === 0)
        return (
            <div className="text-center py-20 text-neutral-500">
                No questions found.
            </div>
        );

    const current = quiz.questions[index];

    // ============================================================
    // MAIN UI
    // ============================================================
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20">
            <div className="max-w-3xl mx-auto px-4 py-10">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold">{quiz.title}</h1>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-sm font-medium">
                        <Clock size={16} />
                        {formatTime()}
                    </div>
                </div>

                {/* IF NOT SUBMITTED — SHOW QUIZ */}
                {!submitted ? (
                    <div className="p-6 sm:p-7 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">

                        {/* QUESTION */}
                        <h2 className="text-lg sm:text-xl font-semibold mb-5 leading-relaxed">
                            {index + 1}. {current.question}
                        </h2>

                        {/* OPTIONS */}
                        <div className="space-y-3">
                            {["option1", "option2", "option3", "option4"].map((optKey, i) => {
                                const opt = current[optKey];
                                if (!opt) return null;

                                const optNum = i + 1;
                                const selected = answers[current.id] === optNum;

                                return (
                                    <label
                                        key={i}
                                        className={`block p-3 rounded-md cursor-pointer border transition
                                            ${selected
                                                ? "bg-blue-600 text-white border-blue-700"
                                                : "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${current.id}`}
                                            className="hidden"
                                            checked={selected}
                                            onChange={() => handleOptionSelect(current.id, optNum)}
                                        />
                                        {opt}
                                    </label>
                                );
                            })}
                        </div>

                        {/* NAVIGATION */}
                        <div className="flex justify-between mt-8">
                            <button
                                disabled={index === 0}
                                onClick={() => setIndex(index - 1)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-40"
                            >
                                <ArrowLeft size={16} /> Prev
                            </button>

                            {index === quiz.questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-sm"
                                >
                                    Submit Quiz
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIndex(index + 1)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Next <ArrowRight size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    // ============================================================
                    // SUBMITTED VIEW
                    // ============================================================
                    <div className="space-y-8">

                        {/* RESULT CARD */}
                        <div className="max-w-3xl mx-auto px-1 py-4 sm:px-10 sm:py-12">

                            {/* HEADER */}
                            <div
                                className="
                                    text-center mb-8
                                    bg-neutral-100 dark:bg-neutral-900
                                    text-neutral-900 dark:text-neutral-100
                                    p-6 rounded-2xl border border-neutral-300 dark:border-neutral-700
                                "
                            >
                                <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2">
                                    🏆 Quiz Completed
                                </h1>

                                <p className="text-sm sm:text-base mt-2 opacity-70">
                                    {"Here's your performance summary."}
                                </p>
                            </div>



                            {/* MAIN CARD */}
                            <div className="
                                rounded-3xl p-8 sm:p-10
                                bg-white dark:bg-neutral-900/90
                                backdrop-blur-xl border border-neutral-300 dark:border-neutral-800
                                shadow-2xl space-y-10
                            ">

                                {/* SCORE RING */}
                                <div className="flex justify-center">
                                    <div className="relative w-44 h-44 flex items-center justify-center">

                                        {/* BACK CIRCLE */}
                                        <div
                                            className="absolute inset-0 rounded-full border-[10px]
                                            border-neutral-200 dark:border-neutral-800"
                                        >

                                        </div>

                                        {/* CALCULATE CLEAN VALUES */}
                                        {(() => {
                                            const total = result?.total_questions || 0;
                                            const right = result?.total_right || 0;
                                            const progress = total === 0 ? 0 : (right / total) * 408;

                                            return (
                                                <svg className="w-full h-full rotate-[-90deg]">
                                                    <circle
                                                        cx="88"
                                                        cy="88"
                                                        r="70"
                                                        strokeWidth="12"
                                                        stroke="url(#grad2)"
                                                        strokeDasharray={`${progress} 440`}
                                                        strokeLinecap="round"
                                                        fill="none"
                                                        className="transition-all duration-700 ease-out"
                                                    />
                                                    <defs>
                                                        <linearGradient id="grad2">
                                                            <stop offset="0%" stopColor="#6366f1" />
                                                            <stop offset="100%" stopColor="#ec4899" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            );
                                        })()}

                                        {/* SCORE NUMBER */}
                                        <div className="absolute text-center">
                                            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
                                                {result?.total_right ?? 0}
                                            </p>
                                            <p className="text-xs opacity-70">
                                                out of {result?.total_questions ?? 0}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* METRICS */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                                    {/* SCORE */}
                                    <div className="
                                        p-5 rounded-xl text-center 
                                        bg-neutral-100 dark:bg-neutral-800 
                                        border border-neutral-300 dark:border-neutral-700 shadow"
                                    >
                                        <p className="text-xs uppercase opacity-70">Score</p>
                                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            {result?.score ?? 0}
                                        </p>
                                    </div>

                                    {/* CORRECT */}
                                    <div className="
                                        p-5 rounded-xl text-center 
                                        bg-green-50 dark:bg-green-900/20 
                                        border border-green-200 dark:border-green-800 shadow"
                                    >
                                        <p className="text-xs uppercase opacity-70">Correct</p>
                                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                            {result?.total_right ?? 0}
                                        </p>
                                    </div>

                                    {/* WRONG */}
                                    <div className="
                                        p-5 rounded-xl text-center 
                                        bg-red-50 dark:bg-red-900/20 
                                        border border-red-200 dark:border-red-800 shadow"
                                    >
                                        <p className="text-xs uppercase opacity-70">Wrong</p>
                                        <p className="text-xl font-bold text-red-600 dark:text-red-400">
                                            {result?.total_wrong ?? 0}
                                        </p>
                                    </div>

                                </div>

                                {/* BUTTONS */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">

                                    {/* RETAKE */}
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="
                                          px-6 py-3 rounded-xl text-white font-medium
                                          bg-indigo-600 hover:bg-indigo-700 
                                          shadow active:scale-95 transition
                                          text-center
                                        "
                                    >
                                        Retry Quiz
                                    </button>

                                    {/* REVIEW */}
                                    <Link
                                        href={`/quizReview/${id}?review=true`}
                                        className="
                                          px-6 py-3 rounded-xl 
                                          bg-neutral-200 dark:bg-neutral-800 
                                          text-neutral-900 dark:text-neutral-100 
                                          font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700
                                          shadow active:scale-95 transition
                                          text-center
                                        "
                                    >
                                        Review Answers
                                    </Link>

                                </div>

                            </div>
                        </div>



                        {/* SUGGESTED QUIZ SECTION */}
                        {result?.suggestions?.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                                    Suggested Quizzes For You
                                </h3>

                                <div className="flex flex-col gap-5">
                                    {result.suggestions.map((q: any) => (
                                        <div
                                            key={q.id}
                                            className="
                                                p-5 sm:p-6 rounded-xl 
                                                bg-white dark:bg-neutral-900
                                                border border-neutral-300 dark:border-neutral-700
                                                shadow-sm hover:shadow-md 
                                                transition
                                                flex flex-col gap-4
                                            "
                                        >
                                            {/* Title */}
                                            <p className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                                {q.title}
                                            </p>

                                            {/* Subtext */}
                                            <p className="text-xs opacity-60 text-neutral-600 dark:text-neutral-400">
                                                {new Date(q.created_at).toLocaleDateString("en-IN")}
                                            </p>

                                            {/* BUTTON */}
                                            <Link
                                                href={`/quiz/${q.id}`}
                                                className="
                                                    w-full
                                                    text-center
                                                    px-4 py-2 sm:py-2.5
                                                    rounded-md 
                                                    bg-blue-600 hover:bg-blue-700 
                                                    text-white
                                                    font-medium
                                                    text-sm sm:text-base
                                                    shadow-sm hover:shadow 
                                                    hover:opacity-90
                                                    active:scale-[0.97]
                                                    transition
                                                "
                                            >
                                                Start Quiz →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                )}
            </div>
        </div>
    );
}
