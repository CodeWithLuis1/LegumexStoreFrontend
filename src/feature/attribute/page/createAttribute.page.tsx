import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { createAttributeSchema } from "@/feature/attribute/schema/attribute.schema"
import type { CreateAttributeInput } from "@/feature/attribute/schema/attribute.schema"
import { createAttributeAPI } from "@/feature/attribute/api/attribute.api"
import { CreateAttributeForm } from "@/feature/attribute/component/createAttribute.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

export function CreateAttributePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAttributeInput>({
        resolver: zodResolver(createAttributeSchema),
    })

    const createAttributeMutation = useMutation({
        mutationFn: createAttributeAPI,
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
        createAttributeMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("attribute.create.title")}</h1>
                <Link to="/attributes" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                <form onSubmit={onSubmit}>
                    <CreateAttributeForm register={register} errors={errors} />
                    <Button type="submit" disabled={createAttributeMutation.isPending}>
                        {createAttributeMutation.isPending ? t("common.saving") : t("common.save")}
                    </Button>
                </form>
            </Card>
        </PageContainer>
    )
}
