"use client";

import { useState } from "react";
// import { thoughtService } from "@/services/thought.service";
import React from "react";
import { useToastMessage } from "@/hooks/useToastMessage";
import { thoughtService } from "@/services/thought.service";
import { getGuestId } from "@/utils/guestId";
import { siteConfig } from "@/config/siteConfig";

type ShareThoughtProps = {
    promptId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onNewThought: (thought: any) => void;
};

export default function ShareThought({ promptId, onNewThought }: ShareThoughtProps) {

    const { toastError, toastSuccess } = useToastMessage();

    const [name, setName] = useState<string>("");
    const [thought, setThought] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const MAX_NAME = siteConfig.maxThoughtName ?? 45;
    const MAX_THOUGHT = siteConfig.maxThought ?? 1200;
    const MIN_THOUGHT = siteConfig.minThought ?? 20

    // Live validation
    const validateThought = (value: string) => {
        if (value.length < MIN_THOUGHT) {
            setErrorMessage(`Minimum ${MIN_THOUGHT} characters required.`);
        } else if (value.length === MAX_THOUGHT) {
            setErrorMessage(`Maximum ${MAX_THOUGHT} characters allowed.`);
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.length > MAX_NAME) {
            setErrorMessage(`Name cannot exceed ${MAX_NAME} characters.`);
            toastError(`Name cannot exceed ${MAX_NAME} characters.`);
            return;
        }

        if (thought.length < MIN_THOUGHT || thought.length > MAX_THOUGHT) {
            toastError("Please fix your thought length before submitting.");
            return;
        }

        try {
            setLoading(true);
            const guestId = getGuestId();

            if (!guestId) {
                toastError("Something went wrong. Unable to verify your session.");
                setErrorMessage("Couldn’t confirm your guest identity. Please refresh and try again.");
                return;
            }

            const payload = {
                guest_id: guestId,
                prompt: promptId,            // ✅ Now using dynamic ID
                name: name || "Anonymous",
                thought,
            };

            const newItem = await thoughtService.create(payload);

            toastSuccess("Your thought has been added!");

            // Tell parent about new thought
            onNewThought(newItem?.data);

            setName("");
            setThought("");
            setErrorMessage("");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.error(error);
            toastError(error?.response?.data?.detail || "Failed to submit thought");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                max-w-4xl mx-auto 
                px-4 sm:px-6 
                mt-6 sm:mt-3
            "
        >
            <div
                className="
                w-full 
                rounded-md 
                border border-neutral-300 dark:border-neutral-700 
                bg-white dark:bg-neutral-900 
                text-neutral-900 dark:text-neutral-100 
                px-4 sm:px-10 
                pt-6 pb-10
            "
            >
                <h3
                    className="
                    text-xl sm:text-2xl 
                    font-semibold 
                    mb-5 sm:mb-6 
                    text-neutral-900 dark:text-neutral-100
                "
                >
                    Your Voice Matters Here
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

                    {/* Name */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Name (optional)"
                            value={name}
                            maxLength={MAX_NAME}
                            onChange={(e) => setName(e.target.value)}
                            className="
                                w-full 
                                p-3 sm:p-3 
                                rounded-md 
                                border border-neutral-300 dark:border-neutral-700 
                                bg-white dark:bg-neutral-900 
                                text-neutral-900 dark:text-neutral-100 
                                text-sm sm:text-base
                                transition
                            "
                        />
                    </div>

                    {/* Thought */}
                    <div className="space-y-1">
                        <textarea
                            placeholder="Share your thought..."
                            value={thought}
                            maxLength={MAX_THOUGHT}
                            onChange={(e) => {
                                setThought(e.target.value);
                                validateThought(e.target.value);
                            }}
                            className="
                                w-full 
                                p-3 sm:p-3 
                                rounded-md 
                                border border-neutral-300 dark:border-neutral-700 
                                bg-white dark:bg-neutral-900 
                                text-neutral-900 dark:text-neutral-100 
                                h-28 sm:h-32 
                                resize-none 
                                text-sm sm:text-base
                                transition
                            "
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {errorMessage}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full 
                            px-5 py-3 
                            rounded-md 
                            bg-blue-600 hover:bg-blue-700 
                            text-white 
                            font-semibold 
                            transition 
                            shadow-sm hover:shadow 
                            active:scale-[0.98]
                            text-sm sm:text-base
                        "
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
