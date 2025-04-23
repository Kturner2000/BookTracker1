import axios from "axios";

const PORT = import.meta.env.PORT
const API_URL = import.meta.env.VITE_API_URL ?? `http://localhost:${PORT}/api`

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});