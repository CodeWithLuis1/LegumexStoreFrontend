import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"
import { createProductAttributeSchema } from "@/feature/product/schema/productAttribute.schema"
import type { ProductAttributeResponse } from "@/feature/product/schema/productAttribute.schema"
import {
    createProductAttributeAPI,
    deleteProductAttributeAPI,
    getProductAttributesAPI,
    updateProductAttributeAPI,
} from "@/feature/product/api/productAttribute.api"
import { getAttributesAPI } from "@/feature/attribute/api/attribute.api"
import { AttributeSelect } from "@/feature/attribute/component/attributeSelect.component"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { Button } from "@/shared/component/button.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

const attributeFormSchema = createProductAttributeSchema.omit({ productId: true })
type AttributeFormInput = z.infer<typeof attributeFormSchema>

function toFormValues(productAttribute: ProductAttributeResponse): AttributeFormInput {
    return {
        attributeId: productAttribute.attributeId,
        valueString: productAttribute.valueString ?? undefined,
        valueNumber: productAttribute.valueNumber !== null ? Number(productAttribute.valueNumber) : undefined,
        valueBoolean: productAttribute.valueBoolean ?? undefined,
    }
}

function formatValue(productAttribute: ProductAttributeResponse): string {
    if (productAttribute.valueString !== null) return productAttribute.valueString
    if (productAttribute.valueNumber !== null) return productAttribute.valueNumber
    if (productAttribute.valueBoolean !== null) return productAttribute.valueBoolean ? "true" : "false"
    return "-"
}

export function ProductAttributeSection({ productId }: { productId: number }) {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [editingId, setEditingId] = useState<number | null>(null)

    const productAttributesQuery = useQuery({
        queryKey: ["productAttributes"],
        queryFn: getProductAttributesAPI,
    })
    const attributesQuery = useQuery({ queryKey: ["attributes"], queryFn: getAttributesAPI })

    const productAttributes = (productAttributesQuery.data?.data ?? []).filter(
        (productAttribute) => productAttribute.productId === productId
    )
    const attributes = attributesQuery.data?.data ?? []
    const attributeById = new Map(attributes.map((a) => [a.id, a]))

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<AttributeFormInput>({ resolver: zodResolver(attributeFormSchema) })

    const selectedAttributeId = useWatch({ control, name: "attributeId" })
    const selectedAttribute = selectedAttributeId ? attributeById.get(selectedAttributeId) : undefined
    const dataType = selectedAttribute?.dataType

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["productAttributes"] })

    const createMutation = useMutation({
        mutationFn: createProductAttributeAPI,
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: AttributeFormInput }) =>
            updateProductAttributeAPI(id, formData),
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            setEditingId(null)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProductAttributeAPI,
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

    function startEdit(productAttribute: ProductAttributeResponse) {
        setEditingId(productAttribute.id)
        reset(toFormValues(productAttribute))
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
                            <Th>{t("productAttribute.form.attributeId")}</Th>
                            <Th>{t("productAttribute.form.value")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productAttributes.map((productAttribute) => (
                            <TableRow key={productAttribute.id}>
                                <Td>{attributeById.get(productAttribute.attributeId)?.attributeName ?? "-"}</Td>
                                <Td>{formatValue(productAttribute)}</Td>
                                <Td className="space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(productAttribute)}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteMutation.mutate(productAttribute.id)}
                                        className="font-medium text-error-fg underline underline-offset-4"
                                    >
                                        {t("common.delete")}
                                    </button>
                                </Td>
                            </TableRow>
                        ))}
                        {productAttributes.length === 0 && (
                            <TableEmpty message={t("productAttribute.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <FormField
                    label={t("productAttribute.form.attributeId")}
                    htmlFor="attributeId"
                    error={getFieldErrorMessage(t, errors.attributeId)}
                >
                    <AttributeSelect
                        id="attributeId"
                        hasError={!!errors.attributeId}
                        {...register("attributeId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                {dataType === "boolean" ? (
                    <div className="mb-5 flex items-end">
                        <Checkbox
                            id="valueBoolean"
                            label={t("productAttribute.form.valueBoolean")}
                            {...register("valueBoolean")}
                        />
                    </div>
                ) : dataType === "number" ? (
                    <FormField
                        label={t("productAttribute.form.valueNumber")}
                        htmlFor="valueNumber"
                        error={getFieldErrorMessage(t, errors.valueNumber)}
                    >
                        <Input
                            id="valueNumber"
                            type="number"
                            step="0.01"
                            hasError={!!errors.valueNumber}
                            {...register("valueNumber", { setValueAs: toOptionalNumber })}
                        />
                    </FormField>
                ) : (
                    <FormField
                        label={t("productAttribute.form.valueString")}
                        htmlFor="valueString"
                        error={getFieldErrorMessage(t, errors.valueString)}
                    >
                        <Input id="valueString" hasError={!!errors.valueString} {...register("valueString")} />
                    </FormField>
                )}

                <div className="flex gap-3 sm:col-span-2">
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                        {editingId ? t("common.save") : t("productAttribute.form.addButton")}
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
