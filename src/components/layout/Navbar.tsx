"use client";

import Link from "next/link";
import { useTheme } from "@/context/theme/use-theme";
import { Moon, Sun, Home } from "lucide-react";

export default function Navbar() {
  const { effectiveTheme, toggleTheme, colors } = useTheme();

  const mobileTap =
    "transition active:opacity-50 active:scale-95 md:active:opacity-100 md:active:scale-100";

  return (
    <header
      className="w-full border-b backdrop-blur-md transition-colors"
      style={{
        borderColor: colors.border,
        backgroundColor: colors.background,
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">

        {/* TOP ROW — ALWAYS SHOWS */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 font-semibold hover:opacity-80 ${mobileTap}`}
            style={{ color: colors.text }}
          >
            <Home size={18} />
            Home
          </Link>

          {/* THEME TOGGLE */}
          <button
            onClick={() =>
              toggleTheme(effectiveTheme === "dark" ? "light" : "dark")
            }
            className="p-2 rounded-md border transition"
            style={{
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            }}
          >
            {effectiveTheme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </div>

        {/* SECOND ROW — ONLY SHOW ON MOBILE */}
        <div
          className="flex items-center gap-6 flex-wrap md:hidden"
          style={{ color: colors.text }}
        >
          <Link
            href="/allquestions"
            className={`text-sm hover:opacity-80 ${mobileTap}`}
            style={{ color: colors.text }}
          >
            Community Questions
          </Link>

          {/* <Link
            href="/currentaffairs"
            className="hover:opacity-80 transition text-sm"
            style={{ color: colors.text }}
          > */}
          {/* <Link
            href="/currentaffairs"
            className={`text-sm hover:opacity-80 ${mobileTap}`}
            style={{ color: colors.text }}
          >
            Current Affairs Quiz
          </Link> */}
        </div>

        {/* DESKTOP NAVIGATION (HIDDEN ON MOBILE) */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ color: colors.text }}
        >
          <Link
            href="/allquestions"
            className="hover:opacity-80 transition text-sm"
            style={{ color: colors.text }}
          >
            Community Questions
          </Link>

          {/* <Link
            href="/currentaffairs"
            className="hover:opacity-80 transition text-sm"
            style={{ color: colors.text }}
          >
            Current Affairs Quiz
          </Link> */}
        </div>
      </nav>
    </header>
  );
}
