import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdatePackagingInput } from "@/feature/packaging/schema/packaging.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { UnitSelect } from "@/feature/unit/component/unitSelect.component"

type EditPackagingFormProps = {
    register: UseFormRegister<UpdatePackagingInput>
    errors: FieldErrors<UpdatePackagingInput>
}

export function EditPackagingForm({ register, errors }: EditPackagingFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("packaging.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("packaging.form.packagingMaterial")}
                htmlFor="packagingMaterial"
                error={getFieldErrorMessage(t, errors.packagingMaterial)}
            >
                <Input id="packagingMaterial" hasError={!!errors.packagingMaterial} {...register("packagingMaterial")} />
            </FormField>

            <FormField
                label={t("packaging.form.capacityValue")}
                htmlFor="capacityValue"
                error={getFieldErrorMessage(t, errors.capacityValue)}
            >
                <Input
                    id="capacityValue"
                    type="number"
                    step="0.0001"
                    hasError={!!errors.capacityValue}
                    {...register("capacityValue", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("packaging.form.capacityUnitId")}
                htmlFor="capacityUnitId"
                error={getFieldErrorMessage(t, errors.capacityUnitId)}
            >
                <UnitSelect
                    id="capacityUnitId"
                    hasError={!!errors.capacityUnitId}
                    {...register("capacityUnitId", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("packaging.form.unitCost")}
                htmlFor="unitCost"
                error={getFieldErrorMessage(t, errors.unitCost)}
            >
                <Input
                    id="unitCost"
                    type="number"
                    step="0.0001"
                    hasError={!!errors.unitCost}
                    {...register("unitCost", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
