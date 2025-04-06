import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useAuthorStore = create((set, get) => ({
    allAuthors: [], // Renamed to match your useState
    author: { name: '', _id: '', books: [] },
    isAuthorLoading: false,
    authorError: null,

    // Get a single author by id
    getAuthor: async (id) => {
        set({ isAuthorLoading: true, authorError: null });
        try {
            const res = await axiosInstance.get(`/author/${id}`);
            set({ author: res.data, isAuthorLoading: false });
        } catch (error) {
            console.error("Error fetching author:", error);
            set({
                isAuthorLoading: false,
                authorError: error.response?.data?.message || "Failed to fetch author"
            });
        }
    },

    // Get all authors
    getAllAuthors: async () => {
        set({ isAuthorLoading: true, authorError: null });
        try {
            const res = await axiosInstance.get(`/author`);
            if (res.data.message === "No authors found") {
                set({ allAuthors: [], isAuthorLoading: false });
            } else {
                set({ allAuthors: res.data, isAuthorLoading: false });
            }
        } catch (error) {
            console.error("Error in getAllAuthors: ", error.message);
            set({
                authorError: "Failed to load authors. Please try again later.",
                isAuthorLoading: false
            });
        }
    }
}));
