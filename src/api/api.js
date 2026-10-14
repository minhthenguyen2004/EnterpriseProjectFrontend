import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        try {
            const saved = localStorage.getItem("auth");
            if (saved) {
                const parsed = JSON.parse(saved);
                const token = parsed?.jwtToken || parsed?.token || parsed?.accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch {
            // Không làm gián đoạn request nếu parse lỗi
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
