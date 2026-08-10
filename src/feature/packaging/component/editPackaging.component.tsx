import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdatePackagingInput } from "@/feature/packaging/schema/packaging.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Select } from "@/shared/component/select.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

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
                label={t("packaging.form.packagingRole")}
                htmlFor="packagingRole"
                error={getFieldErrorMessage(t, errors.packagingRole)}
            >
                <Select id="packagingRole" hasError={!!errors.packagingRole} defaultValue="unit" {...register("packagingRole")}>
                    <option value="unit">{t("packaging.form.packagingRoleOptions.unit")}</option>
                    <option value="pallet">{t("packaging.form.packagingRoleOptions.pallet")}</option>
                </Select>
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
