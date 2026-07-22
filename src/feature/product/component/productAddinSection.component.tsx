import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"
import { createProductAddinSchema } from "@/feature/product/schema/productAddin.schema"
import type { ProductAddinResponse } from "@/feature/product/schema/productAddin.schema"
import {
    createProductAddinAPI,
    deleteProductAddinAPI,
    getProductAddinsAPI,
    updateProductAddinAPI,
} from "@/feature/product/api/productAddin.api"
import { getAddinsAPI } from "@/feature/addin/api/addin.api"
import { AddinSelect } from "@/feature/addin/component/addinSelect.component"
import { FormField } from "@/shared/component/formField.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { Button } from "@/shared/component/button.component"
import { Table, TableBody, TableContainer, TableEmpty, TableHead, TableRow, Td, Th } from "@/shared/component/table.component"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

const addinFormSchema = createProductAddinSchema.omit({ productId: true })
type AddinFormInput = z.infer<typeof addinFormSchema>

function toFormValues(productAddin: ProductAddinResponse): AddinFormInput {
    return {
        addinId: productAddin.addinId,
        isDefault: productAddin.isDefault,
    }
}

export function ProductAddinSection({ productId }: { productId: number }) {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [editingId, setEditingId] = useState<number | null>(null)

    const productAddinsQuery = useQuery({ queryKey: ["productAddins"], queryFn: getProductAddinsAPI })
    const addinsQuery = useQuery({ queryKey: ["addins"], queryFn: getAddinsAPI })

    const productAddins = (productAddinsQuery.data?.data ?? []).filter(
        (productAddin) => productAddin.productId === productId
    )
    const addinNameById = new Map((addinsQuery.data?.data ?? []).map((a) => [a.id, a.displayName]))

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddinFormInput>({ resolver: zodResolver(addinFormSchema) })

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["productAddins"] })

    const createMutation = useMutation({
        mutationFn: createProductAddinAPI,
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: AddinFormInput }) => updateProductAddinAPI(id, formData),
        onSuccess: (data) => {
            invalidate()
            toast.success(data.message)
            setEditingId(null)
            reset({})
        },
        onError: (error) => toast.error(error.message),
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProductAddinAPI,
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

    function startEdit(productAddin: ProductAddinResponse) {
        setEditingId(productAddin.id)
        reset(toFormValues(productAddin))
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
                            <Th>{t("productAddin.form.addinId")}</Th>
                            <Th>{t("productAddin.form.isDefault")}</Th>
                            <Th>{t("common.actions")}</Th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productAddins.map((productAddin) => (
                            <TableRow key={productAddin.id}>
                                <Td>{addinNameById.get(productAddin.addinId) ?? "-"}</Td>
                                <Td>{productAddin.isDefault ? t("common.yes") : t("common.no")}</Td>
                                <Td className="space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(productAddin)}
                                        className="font-medium text-verde-profundo underline decoration-dorado underline-offset-4 hover:text-verde-tinta"
                                    >
                                        {t("common.edit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteMutation.mutate(productAddin.id)}
                                        className="font-medium text-error-fg underline underline-offset-4"
                                    >
                                        {t("common.delete")}
                                    </button>
                                </Td>
                            </TableRow>
                        ))}
                        {productAddins.length === 0 && (
                            <TableEmpty message={t("productAddin.table.empty")} colSpan={3} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <FormField
                    label={t("productAddin.form.addinId")}
                    htmlFor="addinId"
                    error={getFieldErrorMessage(t, errors.addinId)}
                >
                    <AddinSelect
                        id="addinId"
                        hasError={!!errors.addinId}
                        {...register("addinId", { setValueAs: toOptionalNumber })}
                    />
                </FormField>

                <div className="mb-5 flex items-end">
                    <Checkbox id="isDefault" label={t("productAddin.form.isDefault")} {...register("isDefault")} />
                </div>

                <div className="flex gap-3 sm:col-span-2">
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                        {editingId ? t("common.save") : t("productAddin.form.addButton")}
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
