import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"
import { createProductIngredientSchema } from "@/feature/product/schema/productIngredient.schema"
import type { ProductIngredientResponse } from "@/feature/product/schema/productIngredient.schema"
import {
    createProductIngredientAPI,
    deleteProductIngredientAPI,
    getProductIngredientsAPI,
    updateProductIngredientAPI,
} from "@/feature/product/api/productIngredient.api"
import { getIngredientsAPI } from "@/feature/ingredient/api/ingredient.api"
import { IngredientSelect } from "@/feature/ingredient/component/ingredientSelect.component"
import { UnitSelect } from "@/feature/unit/component/unitSelect.component"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Button } from "@/shared/component/button.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

const ingredientFormSchema = createProductIngredientSchema.omit({ productId: true })
type IngredientFormInput = z.infer<typeof ingredientFormSchema>

function toFormValues(productIngredient: ProductIngredientResponse): IngredientFormInput {
    return {
        ingredientId: productIngredient.ingredientId,
        proportionPercent:
            productIngredient.proportionPercent !== null ? Number(productIngredient.proportionPercent) : undefined,
        quantityValue: productIngredient.quantityValue !== null ? Number(productIngredient.quantityValue) : undefined,
        quantityUnitId: productIngredient.quantityUnitId ?? undefined,
        displayOrder: productIngredient.displayOrder,
    }
}

export function ProductIngredientSection({ productId }: { productId: number }) {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [editingId, setEditingId] = useState<number | null>(null)

    const productIngredientsQuery = useQuery({
        queryKey: ["productIngredients"],
        queryFn: getProductIngredientsAPI,
    })
    const ingredientsQuery = useQuery({ queryKey: ["ingredients"], queryFn: getIngredientsAPI })

    const productIngredients = (productIngredientsQuery.data?.data ?? []).filter(
        (productIngredient) => productIngredient.productId === productId
    )
    const ingredientNameById = new Map((ingredientsQuery.data?.data ?? []).map((i) => [i.id, i.displayName]))

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IngredientFormInput>({ resolver: zodResolver(ingredientFormSchema) })

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["productIngredients"] })

    const createMutation = useMutation({
        mutationFn: createProductIngredientAPI,
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: IngredientFormInput }) =>
            updateProductIngredientAPI(id, formData),
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            setEditingId(null)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProductIngredientAPI,
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
        },
        onError: (error) => toast.error(error.message),
    })

    const onSubmit = handleSubmit((formData) => {
        if (editingId) {
            updateMutation.mutate({ id: editingId, formData })
        } else {
            createMutation.mutate({ ...formData, productId })
        }
    })

    function startEdit(productIngredient: ProductIngredientResponse) {
        setEditingId(productIngredient.id)
        reset(toFormValues(productIngredient))
    }

    function cancelEdit() {
        setEditingId(null)
        reset({})
    }

    return (
        <div>
            <TableContainer className="mb-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <Th>{t("productIngredient.form.ingredientId")}</Th>
                            <Th>{t("productIngredient.form.proportionPercent")}</Th>
                            <Th>{t("productIngredient.form.quantityValue")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productIngredients.map((productIngredient) => (
                            <TableRow key={productIngredient.id}>
                                <Td>{ingredientNameById.get(productIngredient.ingredientId) ?? "-"}</Td>
                                <Td>{productIngredient.proportionPercent ?? "-"}</Td>
                                <Td>{productIngredient.quantityValue ?? "-"}</Td>
                                <Td className="space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(productIngredient)}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteMutation.mutate(productIngredient.id)}
                                        className="font-medium text-error-fg underline underline-offset-4"
                                    >
                                        {t("common.delete")}
                                    </button>
                                </Td>
                            </TableRow>
                        ))}
                        {productIngredients.length === 0 && (
                            <TableEmpty message={t("productIngredient.table.empty")} colSpan={4} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <FormField
                    label={t("productIngredient.form.ingredientId")}
                    htmlFor="ingredientId"
                    error={getFieldErrorMessage(t, errors.ingredientId)}
                >
                    <IngredientSelect
                        id="ingredientId"
                        hasError={!!errors.ingredientId}
                        {...register("ingredientId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productIngredient.form.quantityUnitId")}
                    htmlFor="quantityUnitId"
                    error={getFieldErrorMessage(t, errors.quantityUnitId)}
                >
                    <UnitSelect
                        id="quantityUnitId"
                        hasError={!!errors.quantityUnitId}
                        {...register("quantityUnitId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productIngredient.form.proportionPercent")}
                    htmlFor="proportionPercent"
                    error={getFieldErrorMessage(t, errors.proportionPercent)}
                >
                    <Input
                        id="proportionPercent"
                        type="number"
                        step="0.01"
                        hasError={!!errors.proportionPercent}
                        {...register("proportionPercent", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productIngredient.form.quantityValue")}
                    htmlFor="quantityValue"
                    error={getFieldErrorMessage(t, errors.quantityValue)}
                >
                    <Input
                        id="quantityValue"
                        type="number"
                        step="0.01"
                        hasError={!!errors.quantityValue}
                        {...register("quantityValue", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productIngredient.form.displayOrder")}
                    htmlFor="displayOrder"
                    error={getFieldErrorMessage(t, errors.displayOrder)}
                >
                    <Input
                        id="displayOrder"
                        type="number"
                        hasError={!!errors.displayOrder}
                        {...register("displayOrder", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <div className="flex gap-3 sm:col-span-2">
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                        {editingId ? t("common.save") : t("productIngredient.form.addButton")}
                    </Button>
                    {editingId && (
                        <Button type="button" variant="secondary" onClick={cancelEdit}>
                            {t("common.cancel")}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
