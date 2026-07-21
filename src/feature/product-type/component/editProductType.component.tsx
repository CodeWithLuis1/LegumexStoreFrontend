import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateProductTypeInput } from "@/feature/product-type/schema/productType.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"

type EditProductTypeFormProps = {
    register: UseFormRegister<UpdateProductTypeInput>
    errors: FieldErrors<UpdateProductTypeInput>
}

export function EditProductTypeForm({ register, errors }: EditProductTypeFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("productType.form.typeCode")}
                htmlFor="typeCode"
                error={getFieldErrorMessage(t, errors.typeCode)}
            >
                <Input id="typeCode" hasError={!!errors.typeCode} {...register("typeCode")} />
            </FormField>

            <FormField
                label={t("productType.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>
        </div>
    )
}
