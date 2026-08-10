type SectionTone = "light" | "dark"

type SectionHeadingProps = {
    eyebrow?: string
    title: string
    description?: string
    tone?: SectionTone
    align?: "left" | "center"
    className?: string
}

const titleToneClasses: Record<SectionTone, string> = {
    light: "text-verde-profundo",
    dark: "text-crema",
}

const eyebrowToneClasses: Record<SectionTone, string> = {
    light: "text-texto-suave",
    dark: "text-crema/70",
}

const descriptionToneClasses: Record<SectionTone, string> = {
    light: "text-texto-suave",
    dark: "text-crema/80",
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    tone = "light",
    align = "left",
    className = "",
}: SectionHeadingProps) {
    return (
        <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
            {eyebrow && (
                <p className={`mb-3 font-mono text-[13px] uppercase tracking-[0.06em] ${eyebrowToneClasses[tone]}`}>
                    {eyebrow}
                </p>
            )}
            <h2
                className={`font-display text-[clamp(2rem,4vw,3rem)] leading-[0.95] font-extrabold uppercase tracking-[-0.02em] ${titleToneClasses[tone]}`}
            >
                {title}
            </h2>
            {description && (
                <p className={`mt-4 text-lg leading-relaxed ${descriptionToneClasses[tone]}`}>{description}</p>
            )}
        </div>
    )
}
