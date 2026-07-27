import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateProductInput } from "@/feature/product/schema/product.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { ImageUploadField } from "@/shared/component/imageUploadField.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { SubCategorySelect } from "@/feature/category/component/subCategorySelect.component"
import { ProductTypeSelect } from "@/feature/product-type/component/productTypeSelect.component"

type EditProductFormProps = {
    register: UseFormRegister<UpdateProductInput>
    errors: FieldErrors<UpdateProductInput>
    setValue: UseFormSetValue<UpdateProductInput>
    watch: UseFormWatch<UpdateProductInput>
}

export function EditProductForm({ register, errors, setValue, watch }: EditProductFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("product.form.subCategoryId")}
                htmlFor="subCategoryId"
                error={getFieldErrorMessage(t, errors.subCategoryId)}
            >
                <SubCategorySelect
                    id="subCategoryId"
                    hasError={!!errors.subCategoryId}
                    {...register("subCategoryId", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("product.form.productTypeId")}
                htmlFor="productTypeId"
                error={getFieldErrorMessage(t, errors.productTypeId)}
            >
                <ProductTypeSelect
                    id="productTypeId"
                    hasError={!!errors.productTypeId}
                    {...register("productTypeId", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("product.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("product.form.urlSlug")}
                htmlFor="urlSlug"
                error={getFieldErrorMessage(t, errors.urlSlug)}
            >
                <Input id="urlSlug" hasError={!!errors.urlSlug} {...register("urlSlug")} />
            </FormField>

            <FormField
                label={t("product.form.fullDescription")}
                htmlFor="fullDescription"
                error={getFieldErrorMessage(t, errors.fullDescription)}
            >
                <Textarea id="fullDescription" hasError={!!errors.fullDescription} {...register("fullDescription")} />
            </FormField>

            <ImageUploadField
                label={t("product.form.imageUrl")}
                htmlFor="imageUrl"
                value={watch("imageUrl")}
                onChange={(value) => setValue("imageUrl", value, { shouldValidate: true, shouldDirty: true })}
                error={getFieldErrorMessage(t, errors.imageUrl)}
            />

            <FormField
                label={t("product.form.displayOrder")}
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

            <div className="mb-5 flex gap-6">
                <Checkbox id="isOrganic" label={t("product.form.isOrganic")} {...register("isOrganic")} />
                <Checkbox
                    id="isCustomizable"
                    label={t("product.form.isCustomizable")}
                    {...register("isCustomizable")}
                />
            </div>
        </div>
    )
}
