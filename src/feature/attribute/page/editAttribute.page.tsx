import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updateAttributeSchema } from "@/feature/attribute/schema/attribute.schema"
import type { AttributeResponse, UpdateAttributeInput } from "@/feature/attribute/schema/attribute.schema"
import { getAttributeByIdAPI, updateAttributeAPI } from "@/feature/attribute/api/attribute.api"
import { EditAttributeForm } from "@/feature/attribute/component/editAttribute.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(attribute: AttributeResponse): UpdateAttributeInput {
    return {
        attributeName: attribute.attributeName,
        dataType: attribute.dataType,
        unitLabel: attribute.unitLabel ?? undefined,
    }
}

export function EditAttributePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const attributeId = Number(params.attributeId)

    const attributeQuery = useQuery({
        queryKey: ["attribute", attributeId],
        queryFn: () => getAttributeByIdAPI(attributeId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateAttributeInput>({
        resolver: zodResolver(updateAttributeSchema),
    })

    useEffect(() => {
        if (attributeQuery.data) {
            reset(toFormValues(attributeQuery.data.data))
        }
    }, [attributeQuery.data, reset])

    const updateAttributeMutation = useMutation({
        mutationFn: (formData: UpdateAttributeInput) => updateAttributeAPI(attributeId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["attributes"] })
            toast.success(data.message)
            navigate("/attributes")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updateAttributeMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("attribute.edit.title")}</h1>
                <Link to="/attributes" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {attributeQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {attributeQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {attributeQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditAttributeForm register={register} errors={errors} />
                        <Button type="submit" disabled={updateAttributeMutation.isPending}>
                            {updateAttributeMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
