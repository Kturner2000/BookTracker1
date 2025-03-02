import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useSeriesStore = create((set, get) => ({
    allSeries: [],
    series: null,
    isSeriesLoading: false,
    seriesError: null, 

    // Get a single series by id
    getSeries: async (id) => {
        set({ isSeriesLoading: true, seriesError: null });
        try {
            const res = await axiosInstance.get(`/series/${id}`);
            set({ series: res.data, isSeriesLoading: false });
        } catch (error) {
            console.error("Error fetching series:", error);
            set({
                isSeriesLoading: false,
                seriesError: error.response?.data?.message || "Failed to fetch series"
            });
        }
    },
    

    // Update an existing series
    updateSeries: async (id, updateData) => {
        set({ isSeriesLoading: true, seriesError: null });
        try {
            const res = await axiosInstance.put(`/series/updateSeries/{:id}`, updateData);
            set(state => ({
                allSeries: state.allSeries.map(s => s._id === id ? res.data : s),
                series: state.series?._id === id ? res.data : state.series
            }));
        } catch (error) {
            console.error("Error in updateSeries: ", error.message);
            set({ seriesError: error.message });
        } finally {
            set({ isSeriesLoading: false, seriesError: null})
        }
    },

    // Get all series
    getAllSeries: async () => {
        set({ isSeriesLoading: true, seriesError: null });
    try {
        const res = await axiosInstance.get(`/series`);
        if (res.data.message === "No series found") {
            set({ allSeries: [], isSeriesLoading: false });
        } else {
            set({ allSeries: res.data, isSeriesLoading: false });
        }
    } catch (error) {
        console.error("Error in getAllSeries: ", error.message);
        set({ seriesError: "Failed to load series. Please try again later.", isSeriesLoading: false });
    } finally {
        set({ isSeriesLoading: false, seriesError: null})
    }
},

    archiveSeries: async () => {
        set({ isSeriesLoading: true, seriesError: null });
        try {
            const res = await axiosInstance.put(`/series/updateBooks/:id`);
            
                set({ series: res.data, isSeriesLoading: false });
            
        } catch (error) {
            console.error("Error in getAllSeries: ", error.message);
            set({ seriesError: "Failed to load series. Please try again later.", isSeriesLoading: false });
        } finally {
            set({ isSeriesLoading: false, seriesError: null})
        }
    } 


}));
