import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreatePresentationInput } from "@/feature/presentation/schema/presentation.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { UnitSelect } from "@/feature/unit/component/unitSelect.component"
import { CategorySelect } from "@/feature/category/component/categorySelect.component"

type CreatePresentationFormProps = {
    register: UseFormRegister<CreatePresentationInput>
    errors: FieldErrors<CreatePresentationInput>
}

export function CreatePresentationForm({ register, errors }: CreatePresentationFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("presentation.form.displayLabel")}
                htmlFor="displayLabel"
                error={getFieldErrorMessage(t, errors.displayLabel)}
            >
                <Input id="displayLabel" hasError={!!errors.displayLabel} {...register("displayLabel")} />
            </FormField>

            <FormField
                label={t("presentation.form.netWeightGrams")}
                htmlFor="netWeightGrams"
                error={getFieldErrorMessage(t, errors.netWeightGrams)}
            >
                <Input
                    id="netWeightGrams"
                    type="number"
                    step="0.01"
                    hasError={!!errors.netWeightGrams}
                    {...register("netWeightGrams", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("presentation.form.displayValue")}
                htmlFor="displayValue"
                error={getFieldErrorMessage(t, errors.displayValue)}
            >
                <Input
                    id="displayValue"
                    type="number"
                    step="0.01"
                    hasError={!!errors.displayValue}
                    {...register("displayValue", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("presentation.form.displayUnitId")}
                htmlFor="displayUnitId"
                error={getFieldErrorMessage(t, errors.displayUnitId)}
            >
                <UnitSelect
                    id="displayUnitId"
                    hasError={!!errors.displayUnitId}
                    {...register("displayUnitId", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("presentation.form.categoryId")}
                htmlFor="categoryId"
                error={getFieldErrorMessage(t, errors.categoryId)}
            >
                <CategorySelect
                    id="categoryId"
                    hasError={!!errors.categoryId}
                    {...register("categoryId", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
