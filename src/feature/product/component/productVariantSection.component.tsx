import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"
import { createProductVariantSchema } from "@/feature/product/schema/productVariant.schema"
import type { ProductVariantResponse } from "@/feature/product/schema/productVariant.schema"
import {
    createProductVariantAPI,
    deleteProductVariantAPI,
    getProductVariantsAPI,
    updateProductVariantAPI,
} from "@/feature/product/api/productVariant.api"
import { getPresentationsAPI } from "@/feature/presentation/api/presentation.api"
import { getPackagingsAPI } from "@/feature/packaging/api/packaging.api"
import { PresentationSelect } from "@/feature/presentation/component/presentationSelect.component"
import { PackagingSelect } from "@/feature/packaging/component/packagingSelect.component"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { Button } from "@/shared/component/button.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

const variantFormSchema = createProductVariantSchema.omit({ productId: true })
type VariantFormInput = z.infer<typeof variantFormSchema>

function toFormValues(variant: ProductVariantResponse): VariantFormInput {
    return {
        presentationId: variant.presentationId ?? undefined,
        packagingId: variant.packagingId ?? undefined,
        skuCode: variant.skuCode ?? undefined,
        unitPrice: variant.unitPrice !== null ? Number(variant.unitPrice) : undefined,
        unitCost: variant.unitCost !== null ? Number(variant.unitCost) : undefined,
        isPriceManual: variant.isPriceManual,
        minimumOrderQuantity: variant.minimumOrderQuantity ?? undefined,
    }
}

export function ProductVariantSection({ productId }: { productId: number }) {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [editingId, setEditingId] = useState<number | null>(null)

    const variantsQuery = useQuery({ queryKey: ["productVariants"], queryFn: getProductVariantsAPI })
    const presentationsQuery = useQuery({ queryKey: ["presentations"], queryFn: getPresentationsAPI })
    const packagingsQuery = useQuery({ queryKey: ["packagings"], queryFn: getPackagingsAPI })

    const variants = (variantsQuery.data?.data ?? []).filter((variant) => variant.productId === productId)
    const presentationNameById = new Map((presentationsQuery.data?.data ?? []).map((p) => [p.id, p.displayLabel]))
    const packagingNameById = new Map((packagingsQuery.data?.data ?? []).map((p) => [p.id, p.displayName]))

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VariantFormInput>({ resolver: zodResolver(variantFormSchema) })

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["productVariants"] })

    const createMutation = useMutation({
        mutationFn: createProductVariantAPI,
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: VariantFormInput }) =>
            updateProductVariantAPI(id, formData),
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            setEditingId(null)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProductVariantAPI,
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

    function startEdit(variant: ProductVariantResponse) {
        setEditingId(variant.id)
        reset(toFormValues(variant))
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
                            <Th>{t("productVariant.form.skuCode")}</Th>
                            <Th>{t("productVariant.form.presentationId")}</Th>
                            <Th>{t("productVariant.form.packagingId")}</Th>
                            <Th>{t("productVariant.form.unitPrice")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {variants.map((variant) => (
                            <TableRow key={variant.id}>
                                <Td>{variant.skuCode ?? "-"}</Td>
                                <Td>{variant.presentationId ? presentationNameById.get(variant.presentationId) ?? "-" : "-"}</Td>
                                <Td>{variant.packagingId ? packagingNameById.get(variant.packagingId) ?? "-" : "-"}</Td>
                                <Td>{variant.unitPrice ?? "-"}</Td>
                                <Td className="space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(variant)}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteMutation.mutate(variant.id)}
                                        className="font-medium text-error-fg underline underline-offset-4"
                                    >
                                        {t("common.delete")}
                                    </button>
                                </Td>
                            </TableRow>
                        ))}
                        {variants.length === 0 && <TableEmpty message={t("productVariant.table.empty")} colSpan={5} />}
                    </TableBody>
                </Table>
            </TableContainer>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <FormField
                    label={t("productVariant.form.presentationId")}
                    htmlFor="presentationId"
                    error={getFieldErrorMessage(t, errors.presentationId)}
                >
                    <PresentationSelect
                        id="presentationId"
                        hasError={!!errors.presentationId}
                        {...register("presentationId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productVariant.form.packagingId")}
                    htmlFor="packagingId"
                    error={getFieldErrorMessage(t, errors.packagingId)}
                >
                    <PackagingSelect
                        id="packagingId"
                        hasError={!!errors.packagingId}
                        {...register("packagingId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productVariant.form.skuCode")}
                    htmlFor="skuCode"
                    error={getFieldErrorMessage(t, errors.skuCode)}
                >
                    <Input id="skuCode" hasError={!!errors.skuCode} {...register("skuCode")} />
                </FormField>

                <FormField
                    label={t("productVariant.form.unitPrice")}
                    htmlFor="unitPrice"
                    error={getFieldErrorMessage(t, errors.unitPrice)}
                >
                    <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        hasError={!!errors.unitPrice}
                        {...register("unitPrice", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productVariant.form.unitCost")}
                    htmlFor="unitCost"
                    error={getFieldErrorMessage(t, errors.unitCost)}
                >
                    <Input
                        id="unitCost"
                        type="number"
                        step="0.01"
                        hasError={!!errors.unitCost}
                        {...register("unitCost", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <FormField
                    label={t("productVariant.form.minimumOrderQuantity")}
                    htmlFor="minimumOrderQuantity"
                    error={getFieldErrorMessage(t, errors.minimumOrderQuantity)}
                >
                    <Input
                        id="minimumOrderQuantity"
                        type="number"
                        hasError={!!errors.minimumOrderQuantity}
                        {...register("minimumOrderQuantity", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <div className="mb-5 sm:col-span-2">
                    <Checkbox
                        id="isPriceManual"
                        label={t("productVariant.form.isPriceManual")}
                        {...register("isPriceManual")}
                    />
                </div>

                <div className="flex gap-3 sm:col-span-2">
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                        {editingId ? t("common.save") : t("productVariant.form.addButton")}
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
