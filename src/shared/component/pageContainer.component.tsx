import type { HTMLAttributes } from "react"

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
    // Los listados/tablas admin (ver destinationTable.component.tsx, productTable.component.tsx,
    // etc.) necesitan mucho más ancho que un formulario para no forzar scroll horizontal en
    // laptop -- antes cada *.page.tsx de listado repetía className="max-w-4xl" a mano, seguía
    // quedando angosto. Centralizado acá: un solo lugar para ajustar el ancho de TODAS las tablas
    // admin a la vez.
    wide?: boolean
}

export function PageContainer({ className = "", wide = false, ...props }: Readonly<PageContainerProps>) {
    return (
        <div
            className={`mx-auto px-4 py-6 sm:px-6 sm:py-10 ${wide ? "max-w-7xl" : "max-w-3xl"} ${className}`}
            {...props}
        />
    )
}
