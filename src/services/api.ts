import axios from "axios";
import { API_BASE } from "@/lib/constants";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
