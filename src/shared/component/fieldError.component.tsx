export function FieldError({ children }: { children?: string }) {
    if (!children) return null
    return <p className="mt-1.5 text-sm text-error-fg">{children}</p>
}
