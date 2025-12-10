import { api } from "./api";

export const homeApiService = {
  // GET /featured/
  getFeaturedDiscussion: async () => {
    const { data } = await api.get("/discussion/featured/");
    return data?.data ?? null;
  },

  // GET /getRecent/
  getRecent: async () => {
    const res = await api.get(`/discussion/recent/`);
    return res.data;
  },

  // GET /discussion/:id/
  getById: async (id: string | number) => {
    const res = await api.get(`/discussion/${id}/`);
    return res.data;
  },

  // GET /prompts/
  getAll: async () => {
    const res = await api.get("/discussion/all/");
    return res.data;
  },
};
