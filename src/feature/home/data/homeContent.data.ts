import type { StorefrontProductSummary } from "@/feature/product/component/productCard.component"

// Contenido de ejemplo. Ver seccion 8 del sistema de diseno: nombres, cifras
// reales de la empresa y logos de certificacion se cargaran en una pasada posterior.

export type CredentialItem = {
    id: string
    value: string
    labelKey: string
}

export const HOME_CREDENTIAL_ITEMS: CredentialItem[] = [
    { id: "years-operating", value: "15+", labelKey: "home.credentials.yearsOperating" },
    { id: "hectares-managed", value: "1,200 ha", labelKey: "home.credentials.hectaresManaged" },
    { id: "destination-countries", value: "18", labelKey: "home.credentials.destinationCountries" },
    { id: "quality-certifications", value: "6", labelKey: "home.credentials.qualityCertifications" },
]

export type CategoryShowcaseItem = {
    id: string
    slug: string
    tintClassName: string
    imageUrl?: string
    titleKey: string
    descriptionKey: string
}

export const HOME_CATEGORY_SHOWCASE_ITEMS: CategoryShowcaseItem[] = [
    {
        id: "vainas",
        slug: "vainas",
        tintClassName: "bg-cat-vainas",
        titleKey: "home.categories.vainas.title",
        descriptionKey: "home.categories.vainas.description",
    },
    {
        id: "cruciferas",
        slug: "cruciferas",
        tintClassName: "bg-cat-cruciferas",
        titleKey: "home.categories.cruciferas.title",
        descriptionKey: "home.categories.cruciferas.description",
    },
    {
        id: "mini-vegetales",
        slug: "mini-vegetales",
        tintClassName: "bg-cat-mini",
        titleKey: "home.categories.miniVegetales.title",
        descriptionKey: "home.categories.miniVegetales.description",
    },
    {
        id: "raices",
        slug: "raices",
        tintClassName: "bg-cat-raices",
        titleKey: "home.categories.raices.title",
        descriptionKey: "home.categories.raices.description",
    },
    {
        id: "iqf",
        slug: "iqf",
        tintClassName: "bg-cat-iqf",
        titleKey: "home.categories.iqf.title",
        descriptionKey: "home.categories.iqf.description",
    },
]

export type ProcessStepItem = {
    id: string
    stepNumber: string
    titleKey: string
    descriptionKey: string
}

export const HOME_PROCESS_STEPS: ProcessStepItem[] = [
    { id: "harvest", stepNumber: "01", titleKey: "home.process.harvest.title", descriptionKey: "home.process.harvest.description" },
    { id: "coldChain", stepNumber: "02", titleKey: "home.process.coldChain.title", descriptionKey: "home.process.coldChain.description" },
    { id: "dispatch", stepNumber: "03", titleKey: "home.process.dispatch.title", descriptionKey: "home.process.dispatch.description" },
]

export const HOME_FEATURED_PRODUCTS: StorefrontProductSummary[] = [
    {
        id: "arveja-china",
        slug: "arveja-china",
        displayName: "Arveja China",
        shortDescription: "Vaina plana, corte manual, calibre uniforme para exportación.",
        categoryTintClassName: "bg-cat-vainas",
        caliber: "Calibre 90/100",
        cutType: "Corte entero",
        line: "fresh",
        badgeTone: "bestseller",
        unitPriceLabel: "US$ 2.40 / kg",
    },
    {
        id: "brocoli-floretes",
        slug: "brocoli-floretes",
        displayName: "Brócoli en Floretes",
        shortDescription: "Floretes de tamaño parejo, listos para líneas de proceso.",
        categoryTintClassName: "bg-cat-cruciferas",
        caliber: "Calibre 30/40",
        cutType: "Floretes",
        line: "frozen",
        badgeTone: "new",
        unitPriceLabel: "US$ 1.95 / kg",
    },
    {
        id: "coliflor-entera",
        slug: "coliflor-entera",
        displayName: "Coliflor Entera",
        shortDescription: "Cabeza compacta, color uniforme, empaque a granel o retail.",
        categoryTintClassName: "bg-cat-cruciferas",
        caliber: "Calibre 12/14",
        cutType: "Entera",
        line: "fresh",
        unitPriceLabel: "US$ 1.60 / kg",
    },
    {
        id: "zanahoria-baby",
        slug: "zanahoria-baby",
        displayName: "Zanahoria Baby",
        shortDescription: "Mini zanahoria pelada, dulzor consistente, corte a mano.",
        categoryTintClassName: "bg-cat-mini",
        caliber: "Calibre 8/12",
        cutType: "Entera pelada",
        line: "fresh",
        badgeTone: "season",
        unitPriceLabel: "US$ 2.10 / kg",
    },
    {
        id: "mix-vegetales-wok",
        slug: "mix-vegetales-wok",
        displayName: "Mix Vegetales para Wok",
        shortDescription: "Combinación de vainas, zanahoria y pimiento en corte juliana.",
        categoryTintClassName: "bg-cat-mini",
        caliber: "Mix estándar",
        cutType: "Juliana",
        line: "frozen",
        unitPriceLabel: "US$ 2.25 / kg",
    },
    {
        id: "papa-nativa",
        slug: "papa-nativa",
        displayName: "Papa Nativa Seleccionada",
        shortDescription: "Variedades andinas clasificadas por calibre y color de piel.",
        categoryTintClassName: "bg-cat-raices",
        caliber: "Calibre 40/60mm",
        cutType: "Entera",
        line: "fresh",
        unitPriceLabel: "US$ 1.35 / kg",
    },
    {
        id: "ejote-verde-iqf",
        slug: "ejote-verde-iqf",
        displayName: "Ejote Verde IQF",
        shortDescription: "Corte francés congelado individualmente, sin aglomerados.",
        categoryTintClassName: "bg-cat-iqf",
        caliber: "Calibre 6/8mm",
        cutType: "Corte francés",
        line: "frozen",
        badgeTone: "bestseller",
        unitPriceLabel: "US$ 2.60 / kg",
    },
    {
        id: "espinaca-baby-iqf",
        slug: "espinaca-baby-iqf",
        displayName: "Espinaca Baby IQF",
        shortDescription: "Hoja tierna blanqueada y congelada, retención de color y nutrientes.",
        categoryTintClassName: "bg-cat-iqf",
        caliber: "Hoja entera",
        cutType: "Blanqueada",
        line: "frozen",
        unitPriceLabel: "US$ 2.05 / kg",
    },
]

export type CertificationItem = {
    id: string
    name: string
}

export const HOME_CERTIFICATIONS: CertificationItem[] = [
    { id: "brc", name: "BRC Food Safety" },
    { id: "haccp", name: "HACCP" },
    { id: "globalgap", name: "GLOBAL G.A.P." },
    { id: "iso22000", name: "ISO 22000" },
    { id: "kosher", name: "Kosher" },
    { id: "fda", name: "FDA Registered" },
]
