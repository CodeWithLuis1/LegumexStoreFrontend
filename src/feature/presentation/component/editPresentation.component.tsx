import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdatePresentationInput } from "@/feature/presentation/schema/presentation.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { CategorySelect } from "@/feature/category/component/categorySelect.component"

type EditPresentationFormProps = {
    register: UseFormRegister<UpdatePresentationInput>
    control: Control<UpdatePresentationInput>
    errors: FieldErrors<UpdatePresentationInput>
}

export function EditPresentationForm({ register, control, errors }: EditPresentationFormProps) {
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
                label={t("presentation.form.categoryId")}
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
        </div>
    )
}
