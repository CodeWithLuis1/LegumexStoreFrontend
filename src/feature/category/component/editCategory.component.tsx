import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateCategoryInput } from "@/feature/category/schema/category.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"

type EditCategoryFormProps = {
    register: UseFormRegister<UpdateCategoryInput>
    errors: FieldErrors<UpdateCategoryInput>
}

export function EditCategoryForm({ register, errors }: EditCategoryFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("category.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("category.form.fullDescription")}
                htmlFor="fullDescription"
                error={getFieldErrorMessage(t, errors.fullDescription)}
            >
                <Textarea
                    id="fullDescription"
                    hasError={!!errors.fullDescription}
                    {...register("fullDescription")}
                />
            </FormField>
        </div>
    )
}
