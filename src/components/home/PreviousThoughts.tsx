"use client";

import { useCallback, useEffect, useState } from "react";
import { thoughtService } from "@/services/thought.service";
import { getGuestId } from "@/utils/guestId";
import { siteConfig } from "@/config/siteConfig";
import { useToastMessage } from "@/hooks/useToastMessage";

interface Thought {
    id: number;
    name: string | null;
    thought: string;
    prompt: number | string;
    created_at: string;
    guest_id: string;
}

type PreviousThoughtsProps = {
    promptId: number;
    newThought?: Thought | null;
};

export default function PreviousThoughts({ promptId, newThought }: PreviousThoughtsProps) {
    const { toastError, toastSuccess } = useToastMessage();

    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [actionLoading, setActionLoading] = useState(false);

    const guestId = getGuestId();
    const MAX_NAME = siteConfig.maxThoughtName ?? 45;
    const MAX_THOUGHT = siteConfig.maxThought ?? 1200;
    const MIN_THOUGHT = siteConfig.minThought ?? 20

    const validateThought = (value: string) => {
        if (value.length < MIN_THOUGHT) {
            setErrorMessage(`Minimum ${MIN_THOUGHT} characters required.`);
        } else if (value.length === MAX_THOUGHT) {
            setErrorMessage(`Maximum ${MAX_THOUGHT} characters allowed.`);
        } else {
            setErrorMessage("");
        }
    };

    // read more / less
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    // EDIT MODE
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editThought, setEditThought] = useState("");

    // DELETE CONFIRM
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const mergeUnique = (list: Thought[]) => {
        const map = new Map<number, Thought>();
        list.forEach(item => map.set(item.id, item));
        return Array.from(map.values());
    };

    // New thought comes from parent → prepend
    useEffect(() => {
        if (newThought && newThought.prompt === promptId) {
            setThoughts(prev => mergeUnique([newThought, ...prev]));
        }
    }, [newThought, promptId]);

    const fetchThoughts = useCallback(async (pageNumber: number) => {
        setLoading(true);
        const data = await thoughtService.getByThought(promptId, pageNumber);

        setThoughts(prev =>
            mergeUnique(pageNumber === 1 ? data.results : [...prev, ...data.results])
        );
        setNext(data.next);
        setLoading(false);
    }, [promptId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchThoughts(page);
    }, [page, fetchThoughts]);

    const maxChars = 180;

    // ------------------------------
    // DELETE HANDLER
    // ------------------------------
    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            setActionLoading(true);

            await thoughtService.deleteThought(deleteId, guestId);

            toastSuccess("Thought deleted.");
            setThoughts((prev) => prev.filter((t) => t.id !== deleteId));

            setDeleteId(null);
        } finally {
            setActionLoading(false);
        }
    };

    // ------------------------------
    // ENTER EDIT MODE
    // ------------------------------
    const startEdit = (t: Thought) => {
        setEditingId(t.id);

        // If the name is "Anonymous", treat it like empty string
        const safeName = t.name && t.name !== "Anonymous" ? t.name : "";

        setEditName(safeName);
        setEditThought(t.thought);
    };


    // ------------------------------
    // SAVE EDIT
    // ------------------------------
    const saveEdit = async () => {
        if (!editingId) return;

        try {
            setActionLoading(true);

            if (editName.length > MAX_NAME) {
                setErrorMessage(`Name cannot exceed ${MAX_NAME} characters.`);
                toastError(`Name cannot exceed ${MAX_NAME} characters.`);
                return;
            }

            if (editThought.length < MIN_THOUGHT || editThought.length > MAX_THOUGHT) {
                toastError("Please fix your thought length before submitting.");
                return;
            }

            if (!guestId) {
                toastError("Something went wrong. Unable to verify your session.");
                setErrorMessage("Couldn’t confirm your guest identity. Please refresh and try again.");
                return;
            }

            const updated = await thoughtService.editThought(editingId, {
                guest_id: guestId,
                name: editName,
                thought: editThought,
            });

            toastSuccess("Your thought has been updated.");

            setThoughts(prev =>
                prev.map(t => (t.id === editingId ? { ...t, ...updated } : t))
            );

            setEditingId(null);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16 pb-20 sm:pb-24">

            {thoughts.length > 0 && (
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
                    Community Board
                </h3>
            )}

            <div className="space-y-6 sm:space-y-10">
                {thoughts.map(t => {
                    const isExpanded = expandedIds.includes(t.id);
                    const isOwner = t.guest_id === guestId;
                    const isEditing = editingId === t.id;

                    return (
                        <div key={t.id} className="px-2 sm:px-5 py-3 rounded-xl">

                            {/* --------------------------- */}
                            {/* EDIT MODE UI */}
                            {/* --------------------------- */}
                            {isEditing ? (
                                <div className="space-y-3">
                                    <input
                                        value={editName}
                                        onChange={e => setEditName(e.target.value)}
                                        maxLength={MAX_NAME}
                                        placeholder="Your name"
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

                                    <textarea
                                        value={editThought}
                                        maxLength={MAX_THOUGHT}
                                        onChange={(e) => {
                                            setEditThought(e.target.value);
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
                                        rows={4}
                                    />

                                    {errorMessage && (
                                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={saveEdit}
                                            disabled={actionLoading}
                                            className="px-4 py-2 rounded-md bg-blue-600 text-white"
                                        >
                                            {actionLoading ? "Saving..." : "Save"}
                                        </button>

                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-4 py-2 rounded-md bg-neutral-300 dark:bg-neutral-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* NAME */}
                                    <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                                        {t.name || "Anonymous"}
                                    </p>

                                    {/* TEXT */}
                                    <p className="text-neutral-700 dark:text-neutral-300 mt-2 break-words text-sm sm:text-base">
                                        {isExpanded
                                            ? t.thought
                                            : t.thought.length > maxChars
                                                ? t.thought.slice(0, maxChars) + "..."
                                                : t.thought}
                                    </p>

                                    {/* Read more / Read less */}
                                    {t.thought.length > maxChars && (
                                        <button
                                            onClick={() => toggleExpand(t.id)}
                                            className="text-blue-600 text-sm mt-1"
                                        >
                                            {isExpanded ? "Read less" : "Read more"}
                                        </button>
                                    )}

                                    {/* DATE */}
                                    <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-3">
                                        {new Date(t.created_at).toLocaleDateString()}
                                    </p>

                                    {/* OWNER BUTTONS */}
                                    {isOwner && (
                                        <div className="flex gap-4 mt-3">

                                            <button
                                                onClick={() => startEdit(t)}
                                                className="text-blue-600 text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => setDeleteId(t.id)}
                                                className="text-red-600 text-sm"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Load More */}
            {next && !loading && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setPage(page + 1)}
                        className="px-6 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm sm:text-base"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <p className="text-center text-neutral-500 mt-5 text-sm">Loading...</p>
            )}

            {/* DELETE CONFIRMATION POPUP */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white dark:bg-neutral-900 
                        p-6 rounded-xl shadow-xl w-full max-w-sm">

                        {/* TEXT */}
                        <p className="text-center text-neutral-800 dark:text-neutral-200 mb-6 text-base sm:text-lg">
                            Are you sure you want to delete this?
                        </p>

                        {/* BUTTONS */}
                        <div className="
                            flex flex-col sm:flex-row
                            gap-3 sm:gap-4
                            justify-center items-center
                            w-full
                        ">
                            {/* CANCEL BUTTON */}
                            <button
                                onClick={() => setDeleteId(null)}
                                className="
                                w-full sm:w-auto
                                px-5 py-2.5 rounded-md
                                bg-neutral-300 dark:bg-neutral-700 
                                text-neutral-900 dark:text-neutral-100
                                text-sm font-medium
                            "
                            >
                                Cancel
                            </button>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={confirmDelete}
                                disabled={actionLoading}
                                className="
                                w-full sm:w-auto
                                px-5 py-2.5 rounded-md
                                bg-red-600 hover:bg-red-700 
                                text-white text-sm font-medium
                            "
                            >
                                {actionLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
