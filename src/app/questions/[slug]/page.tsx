"use client";

import QuestionContent from "./QuestionContent";
import { useParams } from "next/navigation";

export default function PromptPage() {
  const { slug } = useParams();
  return <QuestionContent id={slug as string} />;
}
