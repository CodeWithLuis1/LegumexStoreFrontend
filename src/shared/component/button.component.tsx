import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "secondary"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
}

const baseClasses =
    "inline-flex h-12 items-center justify-center gap-2 rounded-btn px-6 text-sm font-semibold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50"

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-dorado text-verde-profundo shadow-solid hover:bg-dorado-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
    secondary:
        "border-[1.5px] border-verde-profundo bg-transparent text-verde-profundo hover:bg-verde-profundo hover:text-crema",
}

export function buttonClassName(variant: ButtonVariant = "primary", className = ""): string {
    return `${baseClasses} ${variantClasses[variant]} ${className}`
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "primary", className = "", ...props },
    ref
) {
    return <button ref={ref} className={buttonClassName(variant, className)} {...props} />
})
