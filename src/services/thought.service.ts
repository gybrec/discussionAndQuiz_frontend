// services/thoughtService.ts
import { api } from "./api";

export const thoughtService = {
  create: async (payload: { prompt: number; name?: string; thought: string }) => {
    const res = await api.post("/thought/create/", payload);
    return res.data;
  },

  getByThought: async (promptId: number, page: number = 1) => {
    const res = await api.get(`/discussion/${promptId}/thoughts/?page=${page}`);
    return res.data; // { count, next, previous, results }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editThought: async (id: number, payload: any) => {
    const res = await api.put(`/thought/${id}/`, payload);
    return res.data;
  },

  deleteThought: async (id: number, guest_id: string) => {
    const res = await api.delete(`/thought/${id}/?guest_id=${guest_id}`);
    return res.data;
  },

};
