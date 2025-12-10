"use client";

import { useEffect, useState } from "react";
import TodayCurrentAffairs from "../currentAffairs/TodayCurrentAffairs";
import RecentQuestionsSection from "../currentAffairs/RecentQuestionsSection";


export default function HomePage() {

    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    /* ------------- NORMAL RENDER ------------- */
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">

            <TodayCurrentAffairs />
            <RecentQuestionsSection />

        </div>
    );
}
