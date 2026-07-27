import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import SiteRoutes from "@/shared/router/SiteRoutes"
import AdminRoutes from "@/shared/router/AdminRoutes"
import { Spinner } from "@/shared/component/spinner.component"

const NotFoundPage = lazy(() => import("@/shared/page/notFound.page").then((m) => ({ default: m.NotFoundPage })))

export default function AppRouter() {
    return (
        <Routes>
            {SiteRoutes()}
            {AdminRoutes()}
            <Route
                path="*"
                element={
                    <Suspense fallback={<Spinner />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />
        </Routes>
    )
}
