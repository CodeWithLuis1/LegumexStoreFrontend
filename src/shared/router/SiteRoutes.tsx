import { lazy, Suspense } from "react"
import { Route } from "react-router-dom"
import { SiteLayout } from "@/shared/layout/SiteLayout"
import { Spinner } from "@/shared/component/spinner.component"

const HomePage = lazy(() => import("@/feature/home/page/home.page").then((m) => ({ default: m.HomePage })))

export default function SiteRoutes() {
    return (
        <Route element={<SiteLayout />}>
            <Route
                path="/"
                element={
                    <Suspense fallback={<Spinner />}>
                        <HomePage />
                    </Suspense>
                }
            />
        </Route>
    )
}
