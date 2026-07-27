import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Camera, Image as ImageIcon, Trash2 } from "lucide-react"
import { Label } from "@/shared/component/label.component"
import { FieldError } from "@/shared/component/fieldError.component"
import { ImageCaptureModal } from "@/shared/component/imageCaptureModal.component"

type ImageUploadFieldProps = {
    label: string
    htmlFor?: string
    value?: string | null
    onChange: (value: string) => void
    error?: string
    helperText?: string
}

export function ImageUploadField({ label, htmlFor, value, onChange, error, helperText }: ImageUploadFieldProps) {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="mb-5">
            <Label htmlFor={htmlFor}>{label}</Label>

            <div
                className={`flex flex-col gap-4 rounded-card border-[1.5px] border-dashed p-4 sm:flex-row sm:items-center ${
                    error ? "border-error-bd" : "border-gris-campo"
                }`}
            >
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-crema">
                    {value ? (
                        <img src={value} alt={label} className="h-full w-full object-cover" />
                    ) : (
                        <ImageIcon className="h-8 w-8 text-texto-suave" />
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    {helperText && <p className="text-sm text-texto-suave">{helperText}</p>}
                    <div className="flex flex-wrap gap-2">
                        <button
                            id={htmlFor}
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex h-10 items-center gap-2 rounded-btn border-[1.5px] border-verde-profundo px-4 text-xs font-semibold uppercase tracking-wide text-verde-profundo transition hover:bg-verde-profundo hover:text-crema"
                        >
                            <Camera className="h-4 w-4" />
                            {value ? t("common.imageCapture.changeImage") : t("common.imageCapture.addImage")}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="inline-flex h-10 items-center gap-2 rounded-btn px-4 text-xs font-semibold uppercase tracking-wide text-error-fg transition hover:bg-error-bd/10"
                            >
                                <Trash2 className="h-4 w-4" />
                                {t("common.imageCapture.remove")}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <FieldError>{error}</FieldError>

            {isModalOpen && (
                <ImageCaptureModal title={label} onClose={() => setIsModalOpen(false)} onSave={onChange} />
            )}
        </div>
    )
}
