import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateAddinInput } from "@/feature/addin/schema/addin.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Textarea } from "@/shared/component/textarea.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

type EditAddinFormProps = {
    register: UseFormRegister<UpdateAddinInput>
    errors: FieldErrors<UpdateAddinInput>
}

export function EditAddinForm({ register, errors }: EditAddinFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("addin.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("addin.form.fullDescription")}
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
                label={t("addin.form.costPerServing")}
                htmlFor="costPerServing"
                error={getFieldErrorMessage(t, errors.costPerServing)}
            >
                <Input
                    id="costPerServing"
                    type="number"
                    step="0.0001"
                    hasError={!!errors.costPerServing}
                    {...register("costPerServing", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
