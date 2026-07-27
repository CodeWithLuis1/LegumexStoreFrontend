import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { updateIngredientSchema } from "@/feature/ingredient/schema/ingredient.schema"
import type { IngredientResponse, UpdateIngredientInput } from "@/feature/ingredient/schema/ingredient.schema"
import { getIngredientByIdAPI, updateIngredientAPI } from "@/feature/ingredient/api/ingredient.api"
import { EditIngredientForm } from "@/feature/ingredient/component/editIngredient.component"
import { PageContainer } from "@/shared/component/pageContainer.component"
import { Card } from "@/shared/component/card.component"
import { Button, buttonClassName } from "@/shared/component/button.component"

function toFormValues(ingredient: IngredientResponse): UpdateIngredientInput {
    return {
        displayName: ingredient.displayName,
        urlSlug: ingredient.urlSlug,
        ingredientType: ingredient.ingredientType,
        isOrganicAvailable: ingredient.isOrganicAvailable,
        isMixable: ingredient.isMixable,
        costPerUnit: ingredient.costPerUnit !== null ? Number(ingredient.costPerUnit) : undefined,
        costUnitId: ingredient.costUnitId ?? undefined,
    }
}

export function EditIngredientPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const params = useParams()
    const ingredientId = Number(params.ingredientId)

    const ingredientQuery = useQuery({
        queryKey: ["ingredient", ingredientId],
        queryFn: () => getIngredientByIdAPI(ingredientId),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateIngredientInput>({
        resolver: zodResolver(updateIngredientSchema),
    })

    useEffect(() => {
        if (ingredientQuery.data) {
            reset(toFormValues(ingredientQuery.data.data))
        }
    }, [ingredientQuery.data, reset])

    const updateIngredientMutation = useMutation({
        mutationFn: (formData: UpdateIngredientInput) => updateIngredientAPI(ingredientId, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["ingredients"] })
            toast.success(data.message)
            navigate("/admin/ingredients")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        updateIngredientMutation.mutate(formData)
    })

    return (
        <PageContainer>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-verde-profundo">{t("ingredient.edit.title")}</h1>
                <Link to="/admin/ingredients" className={buttonClassName("secondary")}>
                    {t("common.back")}
                </Link>
            </div>

            <Card>
                {ingredientQuery.isLoading && <p className="text-texto-suave">{t("common.loading")}</p>}
                {ingredientQuery.isError && <p className="text-error-fg">{t("common.loadError")}</p>}

                {ingredientQuery.data && (
                    <form onSubmit={onSubmit}>
                        <EditIngredientForm register={register} errors={errors} />
                        <Button type="submit" disabled={updateIngredientMutation.isPending}>
                            {updateIngredientMutation.isPending ? t("common.saving") : t("common.save")}
                        </Button>
                    </form>
                )}
            </Card>
        </PageContainer>
    )
}
