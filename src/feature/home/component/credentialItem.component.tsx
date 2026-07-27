type CredentialItemProps = {
    value: string
    label: string
}

export function CredentialItem({ value, label }: CredentialItemProps) {
    return (
        <div className="text-center sm:text-left">
            <p className="font-mono text-3xl font-medium text-dorado sm:text-4xl">{value}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-crema/70">{label}</p>
        </div>
    )
}
