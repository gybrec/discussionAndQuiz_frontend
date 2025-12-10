import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — a space to ask questions, share perspectives, and grow through meaningful conversations and current affairs learning.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div
      className="
        min-h-screen bg-white dark:bg-black 
        transition-colors duration-300 
        text-neutral-900 dark:text-neutral-200 
        px-5 pt-10 pb-20
      "
    >
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">About {siteConfig.name}</h1>

        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          {siteConfig.name} is built on a simple purpose:
          <span className="font-semibold">
            {" "}to create a space where people can learn, share, and grow — one question at a time.
          </span>
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          In a world full of noise, we believe clarity comes from curiosity. 
          When people ask questions, express their perspectives, and listen to others, 
          real understanding begins.
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {siteConfig.name} gives users a place to explore meaningful questions, 
          share their thoughts or voice, and engage with fresh current affairs quizzes 
          designed to keep minds active and informed.
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          No unnecessary complexity. No pressure. Just a simple space where ideas flow, 
          perspectives matter, and learning happens naturally.
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {"Whether you're here to share your voice, understand a new viewpoint, or challenge yourself with quizzes — this platform is built for you."}
        </p>

        <p className="text-neutral-600 dark:text-neutral-400">
          Our mission is clear:{" "}
          <span className="font-semibold">
            empower people through thoughtful questions, open perspectives, 
            and continuous learning.
          </span>
        </p>

      </div>
    </div>
  );
}
