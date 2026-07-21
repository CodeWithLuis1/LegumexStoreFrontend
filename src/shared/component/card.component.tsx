import type { HTMLAttributes } from "react"

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={`rounded-card bg-hueso p-6 shadow-card ${className}`} {...props} />
}
