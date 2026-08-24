import { useTranslation } from "react-i18next"

// Insignia de estado activo/inactivo -- usada en las tablas de catálogos (producto, categoría,
// subcategoría, ...) junto al botón de activar/desactivar. Ver BaseCatalogModel.isActive en el
// backend: el toggle nunca borra el registro, solo lo oculta del cotizador.
export function StatusBadge({ isActive }: Readonly<{ isActive: boolean }>) {
    const { t } = useTranslation()

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                isActive
                    ? "border-exito-bd bg-exito-bg text-exito-fg"
                    : "border-error-bd bg-error-bg text-error-fg"
            }`}
        >
            {isActive ? t("common.active") : t("common.inactive")}
        </span>
    )
}
