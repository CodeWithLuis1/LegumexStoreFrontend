import type { HTMLAttributes } from "react"

export function PageContainer({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={`mx-auto max-w-3xl px-6 py-10 ${className}`} {...props} />
}
