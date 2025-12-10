"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { quizApiService } from "@/services/quiz.service";

type RecentQuizItem = {
  quiz: {
    id: number;
    title: string;
    created_at: string;
    difficulty: string;
    category: string | null;
    timer_seconds: number;
  };
  already_attempted: boolean;
  attempt_result: {
    score: number | null;
    total_questions: number | null;
    total_right: number | null;
    total_wrong: number | null;
  };
};

export default function RecentQuestionsSection() {
  const [recentQuizs, setRecentQuizs] = useState<RecentQuizItem[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadInitial = async () => {
    setLoading(true);
    const res = await quizApiService.getRecentQuiz();
    setRecentQuizs(res.results);
    setNextCursor(res.next);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadInitial();
  }, []);

  const loadMore = async () => {
    if (!nextCursor) return;

    setLoading(true);
    const res = await fetch(nextCursor);
    const data = await res.json();

    setRecentQuizs((prev) => [...prev, ...data.results]);
    setNextCursor(data.next);
    setLoading(false);
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-15">

      <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        Recent Current Affairs Quizzes
      </h1>

      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 mb-5">
        Explore the latest quizzes and keep your knowledge fresh and relevant.
      </p>

      <div className="flex flex-col gap-5">
        {recentQuizs.map((item) => {
          const q = item.quiz;
          const attempted = item.already_attempted;
          const r = item.attempt_result;

          const isOpen = expanded[q.id] || false;

          return (
            <div
              key={q.id}
              className="
                w-full rounded-xl border border-neutral-300 dark:border-neutral-700
                bg-white dark:bg-neutral-900 p-5 sm:p-7 shadow-sm
                hover:shadow-md transition flex flex-col gap-4
              "
            >
              {/* DATE */}
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {new Date(q.created_at).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* TITLE */}
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                {q.title}
              </h2>

              {/* UI STATE */}
              {!attempted ? (
                <Link
                  href={`/quiz/${q.id}`}
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
                  {/* Completed Line */}
                  <div className="flex items-center justify-between cursor-pointer"
                       onClick={() => toggleExpand(q.id)}
                  >
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      Completed — Score: {r.score}
                    </p>

                    {isOpen ? (
                      <ChevronUp size={20} className="text-neutral-600 dark:text-neutral-300" />
                    ) : (
                      <ChevronDown size={20} className="text-neutral-600 dark:text-neutral-300" />
                    )}
                  </div>

                  {/* EXPANDED DETAIL */}
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

                      {r.total_right !== null && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Right: {r.total_right}
                        </p>
                      )}

                      {r.total_wrong !== null && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Wrong: {r.total_wrong}
                        </p>
                      )}
                    </div>
                  )}

                  {/* BOTTOM BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">

                    <Link
                      href={`/quiz/${q.id}`}
                      className="
                        px-4 py-2 rounded-md 
                        bg-blue-600 hover:bg-blue-700 text-white 
                        text-sm font-medium transition shadow-sm active:scale-[0.98]
                        w-full sm:w-auto text-center
                      "
                    >
                      Take Again
                    </Link>

                    <Link
                      href={`/quizReview/${q.id}?review=true`}
                      className="
                        px-4 py-2 rounded-md 
                        bg-neutral-200 dark:bg-neutral-800 
                        hover:bg-neutral-300 dark:hover:bg-neutral-700 
                        text-neutral-900 dark:text-neutral-100 
                        text-sm font-medium transition active:scale-[0.98]
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

      {/* LOAD MORE */}
      {nextCursor && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="
              px-6 py-2 rounded-lg 
              bg-neutral-900 dark:bg-white
              text-white dark:text-black
              shadow hover:opacity-85 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

    </section>
  );
}
