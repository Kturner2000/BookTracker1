import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useBookStore = create((set, get) => ({
    books: [],
    book: null,
    readingStatusOverview: [],
    booksByStatus: [],
    booksNotPublished: [],
    isBookLoading: false,
    error: null, 

    // send book to MongoDB
    saveBookToDatabase: async (bookData) => {
        set({ isBookLoading: true, error: null });
        try {
            const res = await axiosInstance.post('/books/addBook', bookData);
            set({ book: res.data });
        } catch (error) {
            console.error("Error in saveBookToDatabase:", error.message);
            set({ error: error.message });
        } finally {
            set({ isBookLoading: false,  error:null });
        }
    },

    // Fetch all books
    getAllBooks: async () => {
        set({ isBookLoading: true });
        try {
            const res = await axiosInstance.get('/books');
            set({ books: res.data });
        } catch (error) {
            console.error("Error in getAllBooks:", error.message);
            set({ error: error.message });
        } finally {
            set({ isBookLoading: false, error:null });
        }
    },

    getNotPublishedBooks: async () => {
        set({ isBookLoading: true });
        try {
            const res = await axiosInstance.get('/books/not-published');
            set({ booksNotPublished: res.data });
        } catch (error) {
            console.error("Error in getAllBooks:", error.message);
            set({ error: error.message });
        } finally {
            set({ isBookLoading: false,  error:null });
        }
    },

    // Fetch a single book
    getBook: async (id) => {
        set({ isBookLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/books/${id}`);
            set({ book: res.data });
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch book details" });
        } finally {
            set({ isBookLoading: false,  error:null });
        }
    },

    // Update a book
    updateBookById: async ({ id, updateData }) => {
        set({ isBookLoading: true, error: null });
        try {
            const res = await axiosInstance.put(`/books/edit/${id}`, updateData);
            set(state => ({
                books: state.books.map(b => b._id === id ? res.data : b), // Immutable update
                book: res.data
            }));
        } catch (error) {
            console.error("Error in updateBookById:", error.message);
            set({ error: error.message });
        } finally {
            set({ isBookLoading: false,  error:null });
        }
    },

    // Fetch books by read status
    getBooksByReadStatus: async (status, selectedGenre ) => {
        set({ isBookLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/books/status/${status}`, {
                params: { genre: selectedGenre }
            });
            set({
                booksByStatus: res.data // Store the entire response
            });
        } catch (error) {
            console.error("Error in getBooksByReadStatus:", error.message);
            set({ error: error.message });
        } finally {
            set({ isBookLoading: false,  error:null });
        }
    },
    searchBooks: (query) => {
        const books = get().books; // Get books from Zustand store
        return books.length
            ? books.filter(book =>
                  book.title.toLowerCase().includes(query.toLowerCase()) || 
                  book.seriesName?.toLowerCase().includes(query.toLowerCase())
              )
            : [];
    },
    
    
}));
