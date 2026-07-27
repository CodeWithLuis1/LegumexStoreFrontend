import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import { Camera, Upload, X } from "lucide-react"
import { buttonClassName } from "@/shared/component/button.component"

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

type Mode = "choose" | "camera" | "preview"

type ImageCaptureModalProps = {
    title: string
    onClose: () => void
    onSave: (dataUrl: string) => void
}

export function ImageCaptureModal({ title, onClose, onSave }: ImageCaptureModalProps) {
    const { t } = useTranslation()
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [mode, setMode] = useState<Mode>("choose")
    const [preview, setPreview] = useState<string | null>(null)
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)

    useEffect(() => {
        if (mode !== "camera") return

        let cancelled = false

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                    audio: false,
                })
                if (cancelled) {
                    stream.getTracks().forEach((track) => track.stop())
                    return
                }
                streamRef.current = stream
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            } catch {
                if (!cancelled) setCameraError(t("common.imageCapture.cameraError"))
            }
        }

        startCamera()

        return () => {
            cancelled = true
            streamRef.current?.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }
    }, [mode, t])

    function handleChooseCamera() {
        setCameraError(null)
        setMode("camera")
    }

    function handleCapture() {
        const video = videoRef.current
        if (!video || !video.videoWidth) return

        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext("2d")
        if (!context) return

        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        setPreview(canvas.toDataURL("image/jpeg", 0.9))
        setMode("preview")
    }

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        event.target.value = ""
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setFileError(t("common.imageCapture.invalidFile"))
            return
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setFileError(t("common.imageCapture.fileTooLarge"))
            return
        }

        setFileError(null)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
            setMode("preview")
        }
        reader.readAsDataURL(file)
    }

    function handleRetake() {
        setPreview(null)
        setCameraError(null)
        setFileError(null)
        setMode("choose")
    }

    function handleSave() {
        if (!preview) return
        onSave(preview)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-verde-profundo/50 p-4">
            <div className="w-full max-w-md rounded-card bg-hueso p-6 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-verde-profundo">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-texto-suave transition hover:text-verde-profundo"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {mode === "choose" && (
                    <div className="flex flex-col gap-3">
                        <button type="button" onClick={handleChooseCamera} className={buttonClassName("secondary", "w-full")}>
                            <Camera className="h-4 w-4" />
                            {t("common.imageCapture.useCamera")}
                        </button>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={buttonClassName("secondary", "w-full")}
                        >
                            <Upload className="h-4 w-4" />
                            {t("common.imageCapture.uploadFile")}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                        {fileError && <p className="text-sm text-error-fg">{fileError}</p>}
                        <button type="button" onClick={onClose} className={buttonClassName("dark", "w-full")}>
                            {t("common.cancel")}
                        </button>
                    </div>
                )}

                {mode === "camera" && (
                    <div className="flex flex-col gap-4">
                        {cameraError ? (
                            <p className="text-sm text-error-fg">{cameraError}</p>
                        ) : (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="aspect-square w-full rounded-[10px] bg-verde-profundo object-cover"
                            />
                        )}
                        <div className="flex gap-3">
                            <button type="button" onClick={handleRetake} className={buttonClassName("dark", "flex-1")}>
                                {t("common.imageCapture.back")}
                            </button>
                            {!cameraError && (
                                <button type="button" onClick={handleCapture} className={buttonClassName("primary", "flex-1")}>
                                    <Camera className="h-4 w-4" />
                                    {t("common.imageCapture.takePhoto")}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {mode === "preview" && preview && (
                    <div className="flex flex-col gap-4">
                        <img src={preview} alt={title} className="aspect-square w-full rounded-[10px] object-cover" />
                        <div className="flex gap-3">
                            <button type="button" onClick={handleRetake} className={buttonClassName("dark", "flex-1")}>
                                {t("common.imageCapture.retake")}
                            </button>
                            <button type="button" onClick={handleSave} className={buttonClassName("primary", "flex-1")}>
                                {t("common.save")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
