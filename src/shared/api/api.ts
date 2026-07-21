import axios from "axios"
import i18n from "@/shared/i18n/i18n"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

api.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language
    return config
})

export default api
