import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updateProductTypeSchema } from "@/feature/product-type/schema/productType.schema"
import type { ProductTypeResponse, UpdateProductTypeInput } from "@/feature/product-type/schema/productType.schema"
import { getProductTypeByIdAPI, updateProductTypeAPI } from "@/feature/product-type/api/productType.api"
import { EditProductTypeForm } from "@/feature/product-type/component/editProductType.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(productType: ProductTypeResponse): UpdateProductTypeInput {
    return {
        typeCode: productType.typeCode,
        displayName: productType.displayName,
    }
}

export function EditProductTypePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const productTypeId = Number(params.productTypeId)

    const productTypeQuery = useQuery({
        queryKey: ["productType", productTypeId],
        queryFn: () => getProductTypeByIdAPI(productTypeId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateProductTypeInput>({
        resolver: zodResolver(updateProductTypeSchema),
    })

    useEffect(() => {
        if (productTypeQuery.data) {
            reset(toFormValues(productTypeQuery.data.data))
        }
    }, [productTypeQuery.data, reset])

    const updateProductTypeMutation = useMutation({
        mutationFn: (formData: UpdateProductTypeInput) => updateProductTypeAPI(productTypeId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["productTypes"] })
            toast.success(data.message)
            navigate("/product-types")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updateProductTypeMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("productType.edit.title")}</h1>
                <Link to="/product-types" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {productTypeQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {productTypeQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {productTypeQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditProductTypeForm register={register} errors={errors} />
                        <Button type="submit" disabled={updateProductTypeMutation.isPending}>
                            {updateProductTypeMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
