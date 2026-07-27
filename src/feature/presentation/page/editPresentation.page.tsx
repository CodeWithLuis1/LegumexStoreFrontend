import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updatePresentationSchema } from "@/feature/presentation/schema/presentation.schema"
import type { PresentationResponse, UpdatePresentationInput } from "@/feature/presentation/schema/presentation.schema"
import { getPresentationByIdAPI, updatePresentationAPI } from "@/feature/presentation/api/presentation.api"
import { EditPresentationForm } from "@/feature/presentation/component/editPresentation.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(presentation: PresentationResponse): UpdatePresentationInput {
    return {
        displayLabel: presentation.displayLabel,
        netWeightGrams: presentation.netWeightGrams !== null ? Number(presentation.netWeightGrams) : undefined,
        displayValue: presentation.displayValue !== null ? Number(presentation.displayValue) : undefined,
        displayUnitId: presentation.displayUnitId ?? undefined,
        categoryId: presentation.categoryId ?? undefined,
    }
}

export function EditPresentationPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const presentationId = Number(params.presentationId)

    const presentationQuery = useQuery({
        queryKey: ["presentation", presentationId],
        queryFn: () => getPresentationByIdAPI(presentationId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdatePresentationInput>({
        resolver: zodResolver(updatePresentationSchema),
    })

    useEffect(() => {
        if (presentationQuery.data) {
            reset(toFormValues(presentationQuery.data.data))
        }
    }, [presentationQuery.data, reset])

    const updatePresentationMutation = useMutation({
        mutationFn: (formData: UpdatePresentationInput) => updatePresentationAPI(presentationId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["presentations"] })
            toast.success(data.message)
            navigate("/admin/presentations")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updatePresentationMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("presentation.edit.title")}</h1>
                <Link to="/admin/presentations" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {presentationQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {presentationQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {presentationQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditPresentationForm register={register} errors={errors} />
                        <Button type="submit" disabled={updatePresentationMutation.isPending}>
                            {updatePresentationMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
