import { forwardRef } from "react"
import type { TextareaHTMLAttributes } from "react"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { hasError, className = "", ...props },
    ref
) {
    return (
        <textarea
            ref={ref}
            rows={4}
            className={`w-full rounded-[10px] border-[1.5px] bg-hueso px-4 py-3 text-verde-profundo placeholder:text-texto-suave focus:outline-none focus:ring-2 focus:ring-dorado focus:ring-offset-2 ${
                hasError ? "border-error-bd" : "border-gris-campo focus:border-verde-profundo"
            } ${className}`}
            {...props}
        />
    )
})
