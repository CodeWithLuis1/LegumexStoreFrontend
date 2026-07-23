import type { HTMLAttributes } from "react"

export function PageContainer({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={`mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 ${className}`} {...props} />
}
