import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { createProductSchema } from "@/feature/product/schema/product.schema"
import type { CreateProductInput } from "@/feature/product/schema/product.schema"
import { createProductAPI } from "@/feature/product/api/product.api"
import { CreateProductForm } from "@/feature/product/component/createProduct.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

export function CreateProductPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductInput>({
        resolver: zodResolver(createProductSchema),
    })

    const createProductMutation = useMutation({
        mutationFn: createProductAPI,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            toast.success(data.message)
            navigate(`/products/${data.data.id}/edit`)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        createProductMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("product.create.title")}</h1>
                <Link to="/products" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                <form onSubmit={onSubmit}>
                    <CreateProductForm register={register} errors={errors} />
                    <Button type="submit" disabled={createProductMutation.isPending}>
                        {createProductMutation.isPending ? t("common.saving") : t("common.save")}
                    </Button>
                </form>
            </Card>
        </PageContainer>
    )
}
