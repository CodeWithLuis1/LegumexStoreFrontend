type HowWeWorkStepProps = {
    stepNumber: string
    title: string
    description: string
}

export function HowWeWorkStep({ stepNumber, title, description }: HowWeWorkStepProps) {
    return (
        <div>
            <span className="font-mono text-sm text-dorado-hover">{stepNumber}</span>
            <h3 className="mt-3 text-lg font-semibold text-verde-profundo">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-texto-suave">{description}</p>
        </div>
    )
}
