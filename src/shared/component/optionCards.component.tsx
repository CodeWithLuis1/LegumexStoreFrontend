import type { ReactNode } from "react"
import { Check } from "lucide-react"

export type CardOption = {
    text: string
    value: string | number 
    imageUrl?: string | null
    // Usado como fallback cuando no hay imageUrl (ej. mientras el admin no le carga foto a un
    // producto todavía) y como único visual en otros usos de esta card que no son fotográficos.
    icon?: ReactNode
    subtitle?: string
}

type OptionCardsProps = {
    options: CardOption[]
    value: string | number | null | undefined
    onChange: (value: string | number) => void
    hasError?: boolean
    columnsClassName?: string
    // Alto de la miniatura/foto. Default pensado para listas densas (ej. selector de producto
    // dentro de un form); las galerías a pantalla completa del cotizador (ver
    // quoteCalculatorForm.component.tsx) usan un valor más grande para sentirse "vitrina".
    imageHeightClassName?: string
}

function cardBorderClassName(isSelected: boolean, hasError: boolean | undefined): string {
    if (isSelected) return "border-verde-profundo bg-crema shadow-md shadow-verde-profundo/10"
    if (hasError) return "border-error-bd bg-hueso"
    return "border-gris-campo bg-hueso hover:border-verde-profundo/50"
}

// Card visual controlada (value/onChange), pensada para reusarse tanto suelta (estado local,
// ver quoteCalculatorForm.component.tsx) como envuelta en <Controller> para un campo real de
// react-hook-form (ver cardsFormField.component.tsx).
export function OptionCards({
    options,
    value,
    onChange,
    hasError,
    columnsClassName = "grid-cols-2 sm:grid-cols-3",
    imageHeightClassName = "h-28",
}: Readonly<OptionCardsProps>) {
    return (
        <div className={`grid gap-3 ${columnsClassName}`}>
            {options.map((option) => {
                const isSelected = value === option.value

                let media: ReactNode = null
                if (option.imageUrl) {
                    media = (
                        <div className={`${imageHeightClassName} w-full overflow-hidden bg-gris-campo/40`}>
                            <img
                                src={option.imageUrl}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    )
                } else if (option.icon) {
                    media = (
                        <div className={`flex ${imageHeightClassName} w-full items-center justify-center bg-gris-campo/15`}>
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                                    isSelected ? "bg-verde-profundo text-crema" : "bg-hueso text-texto-suave group-hover:text-verde-profundo"
                                }`}
                            >
                                {option.icon}
                            </div>
                        </div>
                    )
                }

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`group relative flex flex-col overflow-hidden rounded-2xl border-[1.5px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-dorado/50 focus:ring-offset-2 ${cardBorderClassName(isSelected, hasError)}`}
                    >
                        <div
                            className={`absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                                isSelected
                                    ? "scale-100 bg-verde-profundo text-crema"
                                    : "scale-0 bg-verde-profundo text-crema group-hover:scale-75"
                            }`}
                        >
                            <Check size={14} />
                        </div>

                        {media}

                        <div className="flex flex-1 flex-col gap-0.5 px-4 py-3">
                            <h3 className={`text-sm font-semibold ${isSelected ? "text-verde-profundo" : "text-verde-profundo/90"}`}>
                                {option.text}
                            </h3>
                            {option.subtitle && <p className="text-xs text-texto-suave">{option.subtitle}</p>}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
