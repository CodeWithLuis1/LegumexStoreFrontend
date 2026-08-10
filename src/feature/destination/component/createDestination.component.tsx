import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateDestinationInput } from "@/feature/destination/schema/destination.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

type CreateDestinationFormProps = {
    register: UseFormRegister<CreateDestinationInput>
    errors: FieldErrors<CreateDestinationInput>
}

export function CreateDestinationForm({ register, errors }: CreateDestinationFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("destination.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("destination.form.baseCost")}
                htmlFor="baseCost"
                error={getFieldErrorMessage(t, errors.baseCost)}
            >
                <Input
                    id="baseCost"
                    type="number"
                    step="0.01"
                    hasError={!!errors.baseCost}
                    {...register("baseCost", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
