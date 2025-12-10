"use client";

import QuizQuestions from "./Review";
import { useParams } from "next/navigation";

export default function PromptPage() {
  const { id } = useParams();
  return <QuizQuestions id={id as string} />;
}
