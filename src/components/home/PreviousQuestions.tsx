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

export default function PreviousQuestions() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    homeApiService.getRecent().then(setPrompts);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-25">

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
        Latest Questions
      </h2>

      {/* Prompt List */}
      <div className="space-y-4">
        {prompts.map((p) => (
          <Link
            key={p.id}
            href={`/questions/${p.id}`}
            className="
              block p-5 rounded-xl border 
              bg-white dark:bg-neutral-900 
              border-neutral-200 dark:border-neutral-800 
              shadow-sm hover:shadow-md transition 
              hover:bg-neutral-50 dark:hover:bg-neutral-800
            "
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {p.title}
            </h3>

            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">
              {excerpt(p.answer)}
            </p>

            <p className="text-xs mt-2 text-neutral-500 dark:text-neutral-500">
              {new Date(p.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/allquestions"
          className="
            px-6 py-2 rounded-lg font-medium
            bg-neutral-900 dark:bg-white 
            text-white dark:text-black 
            shadow hover:opacity-85 transition
          "
        >
          View Community Questions
        </Link>
      </div>
    </div>
  );
}
