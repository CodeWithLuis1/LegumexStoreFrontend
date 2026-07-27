import { ShieldCheck } from "lucide-react"

type CertificationMarkProps = {
    name: string
}

export function CertificationMark({ name }: CertificationMarkProps) {
    return (
        <div className="flex items-center gap-2 grayscale opacity-60 transition hover:opacity-100 hover:grayscale-0">
            <ShieldCheck size={20} className="text-texto-suave" />
            <span className="font-mono text-xs uppercase tracking-wide text-texto-suave">{name}</span>
        </div>
    )
}
