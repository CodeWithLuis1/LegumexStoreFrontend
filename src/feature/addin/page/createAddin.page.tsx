import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { createAddinSchema } from "@/feature/addin/schema/addin.schema"
import type { CreateAddinInput } from "@/feature/addin/schema/addin.schema"
import { createAddinAPI } from "@/feature/addin/api/addin.api"
import { CreateAddinForm } from "@/feature/addin/component/createAddin.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

export function CreateAddinPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAddinInput>({
        resolver: zodResolver(createAddinSchema),
    })

    const createAddinMutation = useMutation({
        mutationFn: createAddinAPI,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["addins"] })
            toast.success(data.message)
            navigate("/admin/addins")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        createAddinMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("addin.create.title")}</h1>
                <Link to="/admin/addins" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                <form onSubmit={onSubmit}>
                    <CreateAddinForm register={register} errors={errors} />
                    <Button type="submit" disabled={createAddinMutation.isPending}>
                        {createAddinMutation.isPending ? t("common.saving") : t("common.save")}
                    </Button>
                </form>
            </Card>
        </PageContainer>
    )
}
