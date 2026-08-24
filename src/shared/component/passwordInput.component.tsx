import { useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "@/shared/component/input.component"

type PasswordInputProps = UseFormRegisterReturn & {
    id: string
    placeholder: string
    hasError: boolean
    hidePasswordLabel: string
    showPasswordLabel: string
}

// Campo de password con toggle mostrar/ocultar -- compartido por login.page.tsx (admin) y
// customerLogin.page.tsx (cliente), único elemento visual repetido entre esos dos forms que no es
// solo el shell (ver authCard.component.tsx). El estado de visibilidad es local a cada instancia.
export function PasswordInput({
    id,
    placeholder,
    hasError,
    hidePasswordLabel,
    showPasswordLabel,
    ...registerProps
}: Readonly<PasswordInputProps>) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-texto-suave" />
            <Input
                id={id}
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                autoComplete="current-password"
                hasError={hasError}
                className="pl-11 pr-11"
                preserveCase
                {...registerProps}
            />
            <button
                type="button"
                onClick={() => setIsVisible((visible) => !visible)}
                aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-texto-suave transition hover:text-verde-profundo"
            >
                {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    )
}
