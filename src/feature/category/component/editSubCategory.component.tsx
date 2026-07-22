import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateSubCategoryInput } from "@/feature/category/schema/subCategory.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { CategorySelect } from "@/feature/category/component/categorySelect.component"

type EditSubCategoryFormProps = {
    register: UseFormRegister<UpdateSubCategoryInput>
    errors: FieldErrors<UpdateSubCategoryInput>
}

export function EditSubCategoryForm({ register, errors }: EditSubCategoryFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("subCategory.form.categoryId")}
                htmlFor="categoryId"
                error={getFieldErrorMessage(t, errors.categoryId)}
            >
                <CategorySelect
                    id="categoryId"
                    hasError={!!errors.categoryId}
                    {...register("categoryId", { setValueAs: toOptionalNumber })}
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
                label={t("subCategory.form.urlSlug")}
                htmlFor="urlSlug"
                error={getFieldErrorMessage(t, errors.urlSlug)}
            >
                <Input id="urlSlug" hasError={!!errors.urlSlug} {...register("urlSlug")} />
            </FormField>

            <FormField
                label={t("subCategory.form.fullDescription")}
                htmlFor="fullDescription"
                error={getFieldErrorMessage(t, errors.fullDescription)}
            >
                <Textarea id="fullDescription" hasError={!!errors.fullDescription} {...register("fullDescription")} />
            </FormField>

            <FormField
                label={t("subCategory.form.displayOrder")}
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
        </div>
    )
}
