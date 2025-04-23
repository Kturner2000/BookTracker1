import axios from "axios";

const PORT = import.meta.env.PORT
const local_URL = `http://localhost:5000/api`
const API_URL = import.meta.env.VITE_API_URL ?? local_URL

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});