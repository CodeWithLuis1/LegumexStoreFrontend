import { Outlet } from "react-router-dom"
import { AnnouncementBar } from "@/shared/layout/AnnouncementBar"
import { SiteHeader } from "@/shared/layout/SiteHeader"
import { SiteFooter } from "@/shared/layout/SiteFooter"

export function SiteLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-crema">
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    )
}
