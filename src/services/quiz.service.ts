import { api } from "./api";
import { getGuestId } from "@/utils/guestId";

export const quizApiService = {
    // GET /featured/
    getTodayQuiz: async () => {
        const guest_id = getGuestId();
        const { data } = await api.get(`/currentaffairs/today/?guest_id=${guest_id}`);
        return data;
    },

    getRecentQuiz: async () => {
        const guest_id = getGuestId();
        const res = await api.get(`/currentaffairs/recent/?guest_id=${guest_id}`);
        return res.data;
    },

    getQuizById: async (id: number) => {
        const res = await api.get(`/quiz/${id}/`);
        return res.data.data;
    },

    submitQuiz: async (id: number, payload: any) => {
        const res = await api.post(`/quiz/${id}/submit/`, payload);
        return res.data;
    },

    getReview: async (id: number, guestId: string) => {
        const res = await api.get(`/quiz/${id}/review/?guest_id=${guestId}`);
        return res.data;
    },

};
