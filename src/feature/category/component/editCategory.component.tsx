import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateCategoryInput } from "@/feature/category/schema/category.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

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
                label={t("category.form.urlSlug")}
                htmlFor="urlSlug"
                error={getFieldErrorMessage(t, errors.urlSlug)}
            >
                <Input id="urlSlug" hasError={!!errors.urlSlug} {...register("urlSlug")} />
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

            <FormField
                label={t("category.form.displayOrder")}
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

            <FormField
                label={t("category.form.defaultMargin")}
                htmlFor="defaultMargin"
                error={getFieldErrorMessage(t, errors.defaultMargin)}
            >
                <Input
                    id="defaultMargin"
                    type="number"
                    step="0.01"
                    hasError={!!errors.defaultMargin}
                    {...register("defaultMargin", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
