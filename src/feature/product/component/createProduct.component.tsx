import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateProductInput } from "@/feature/product/schema/product.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Select } from "@/shared/component/select.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { toBoolean } from "@/shared/form/toBoolean"
import { SubCategorySelect } from "@/feature/category/component/subCategorySelect.component"
import { ProductTypeSelect } from "@/feature/product-type/component/productTypeSelect.component"

type CreateProductFormProps = {
    register: UseFormRegister<CreateProductInput>
    control: Control<CreateProductInput>
    errors: FieldErrors<CreateProductInput>
}

export function CreateProductForm({ register, control, errors }: CreateProductFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("product.form.subCategoryId")}
                htmlFor="subCategoryId"
                error={getFieldErrorMessage(t, errors.subCategoryId)}
            >
                <Controller
                    name="subCategoryId"
                    control={control}
                    render={({ field }) => (
                        <SubCategorySelect
                            inputId="subCategoryId"
                            hasError={!!errors.subCategoryId}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
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

            <div className="mb-5 flex gap-6">
                <Checkbox id="isOrganic" label={t("product.form.isOrganic")} {...register("isOrganic")} />
            </div>

            <FormField
                label={t("product.form.isCustomizable")}
                htmlFor="isCustomizable"
                error={getFieldErrorMessage(t, errors.isCustomizable)}
            >
                {/* Select con dos opciones fijas en código (no un catálogo con CRUD): no hay
                    fila que un admin pueda borrar/editar y romper el flag en los productos. */}
                <Select
                    id="isCustomizable"
                    hasError={!!errors.isCustomizable}
                    defaultValue="false"
                    {...register("isCustomizable", { setValueAs: toBoolean })}
                >
                    <option value="false">{t("product.form.isCustomizableFinished")}</option>
                    <option value="true">{t("product.form.isCustomizableCustom")}</option>
                </Select>
            </FormField>
            <p className="mb-5 -mt-3 text-sm text-texto-suave">{t("product.form.isCustomizableHint")}</p>
        </div>
    )
}
