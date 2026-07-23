import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updateCategorySchema } from "@/feature/category/schema/category.schema"
import type { CategoryResponse, UpdateCategoryInput } from "@/feature/category/schema/category.schema"
import { getCategoryByIdAPI, updateCategoryAPI } from "@/feature/category/api/category.api"
import { EditCategoryForm } from "@/feature/category/component/editCategory.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(category: CategoryResponse): UpdateCategoryInput {
    return {
        displayName: category.displayName,
        urlSlug: category.urlSlug,
        fullDescription: category.fullDescription ?? undefined,
        displayOrder: category.displayOrder,
        defaultMargin: category.defaultMargin !== null ? Number(category.defaultMargin) : undefined,
    }
}

export function EditCategoryPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const categoryId = Number(params.categoryId)

    const categoryQuery = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getCategoryByIdAPI(categoryId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateCategoryInput>({
        resolver: zodResolver(updateCategorySchema),
    })

    useEffect(() => {
        if (categoryQuery.data) {
            reset(toFormValues(categoryQuery.data.data))
        }
    }, [categoryQuery.data, reset])

    const updateCategoryMutation = useMutation({
        mutationFn: (formData: UpdateCategoryInput) => updateCategoryAPI(categoryId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success(data.message)
            navigate("/categories")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updateCategoryMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("category.edit.title")}</h1>
                <Link to="/categories" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {categoryQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {categoryQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {categoryQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditCategoryForm register={register} errors={errors} />
                        <Button type="submit" disabled={updateCategoryMutation.isPending}>
                            {updateCategoryMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
