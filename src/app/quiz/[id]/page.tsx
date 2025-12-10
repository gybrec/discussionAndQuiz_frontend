"use client";

import QuizQuestions from "./QuizQuestions";
import { useParams } from "next/navigation";

export default function PromptPage() {
  const { id } = useParams();
  return <QuizQuestions id={id as string} />;
}
