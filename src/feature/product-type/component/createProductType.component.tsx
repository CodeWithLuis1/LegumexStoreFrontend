import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateProductTypeInput } from "@/feature/product-type/schema/productType.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"

type CreateProductTypeFormProps = {
    register: UseFormRegister<CreateProductTypeInput>
    errors: FieldErrors<CreateProductTypeInput>
}

export function CreateProductTypeForm({ register, errors }: CreateProductTypeFormProps) {
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
