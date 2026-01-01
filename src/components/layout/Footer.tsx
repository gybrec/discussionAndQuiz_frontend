"use client";

import Link from "next/link";
import { useTheme } from "@/context/theme/use-theme";

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer
      className="w-full border-t border-neutral-200 dark:border-neutral-800 py-10 px-6"
      style={{
        borderColor: colors.border,
        backgroundColor: colors.background,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center sm:flex-row sm:justify-between gap-6">

        {/* Left Side — Copyright */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          © {new Date().getFullYear()} Voactive. All rights reserved.
        </p>

        {/* Right Side — Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
          >
            Terms of Service
          </Link>

          <Link
            href="/about"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <p className="text-center mt-8 text-xs text-neutral-500 dark:text-neutral-500">
        Where curiosity grows, ideas flow, and knowledge finds its voice.
      </p>
    </footer>
  );
}
