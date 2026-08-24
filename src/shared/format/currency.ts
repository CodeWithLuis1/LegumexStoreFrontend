const currencyFormatter = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value)
}

// Version compacta ("Q1.2K") solo para espacios angostos como ticks de eje -- los montos que el
// usuario puede necesitar auditar (stat tiles, tooltips, tablas) siempre usan formatCurrency con
// precision completa, nunca esta.
const compactCurrencyFormatter = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    notation: "compact",
    maximumFractionDigits: 1,
})

export function formatCompactCurrency(value: number): string {
    return compactCurrencyFormatter.format(value)
}
