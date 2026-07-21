import { Routes } from "react-router-dom"
import AdminRoutes from "@/shared/router/AdminRoutes"

export default function AppRouter() {
    return <Routes>{AdminRoutes()}</Routes>
}
