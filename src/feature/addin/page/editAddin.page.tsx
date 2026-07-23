import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updateAddinSchema } from "@/feature/addin/schema/addin.schema"
import type { AddinResponse, UpdateAddinInput } from "@/feature/addin/schema/addin.schema"
import { getAddinByIdAPI, updateAddinAPI } from "@/feature/addin/api/addin.api"
import { EditAddinForm } from "@/feature/addin/component/editAddin.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(addin: AddinResponse): UpdateAddinInput {
    return {
        displayName: addin.displayName,
        fullDescription: addin.fullDescription ?? undefined,
        costPerServing: addin.costPerServing !== null ? Number(addin.costPerServing) : undefined,
    }
}

export function EditAddinPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const addinId = Number(params.addinId)

    const addinQuery = useQuery({
        queryKey: ["addin", addinId],
        queryFn: () => getAddinByIdAPI(addinId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateAddinInput>({
        resolver: zodResolver(updateAddinSchema),
    })

    useEffect(() => {
        if (addinQuery.data) {
            reset(toFormValues(addinQuery.data.data))
        }
    }, [addinQuery.data, reset])

    const updateAddinMutation = useMutation({
        mutationFn: (formData: UpdateAddinInput) => updateAddinAPI(addinId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["addins"] })
            toast.success(data.message)
            navigate("/addins")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updateAddinMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("addin.edit.title")}</h1>
                <Link to="/addins" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {addinQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {addinQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {addinQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditAddinForm register={register} errors={errors} />
                        <Button type="submit" disabled={updateAddinMutation.isPending}>
                            {updateAddinMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
