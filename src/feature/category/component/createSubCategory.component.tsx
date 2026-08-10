import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateSubCategoryInput } from "@/feature/category/schema/subCategory.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"
import { CategorySelect } from "@/feature/category/component/categorySelect.component"

type CreateSubCategoryFormProps = {
    register: UseFormRegister<CreateSubCategoryInput>
    control: Control<CreateSubCategoryInput>
    errors: FieldErrors<CreateSubCategoryInput>
}

export function CreateSubCategoryForm({ register, control, errors }: CreateSubCategoryFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("subCategory.form.categoryId")}
                htmlFor="categoryId"
                error={getFieldErrorMessage(t, errors.categoryId)}
            >
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        <CategorySelect
                            inputId="categoryId"
                            hasError={!!errors.categoryId}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormField>

            <FormField
                label={t("subCategory.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("subCategory.form.fullDescription")}
                htmlFor="fullDescription"
                error={getFieldErrorMessage(t, errors.fullDescription)}
            >
                <Textarea id="fullDescription" hasError={!!errors.fullDescription} {...register("fullDescription")} />
            </FormField>
        </div>
    )
}
