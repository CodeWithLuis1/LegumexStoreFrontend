import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateUnitInput } from "@/feature/unit/schema/unit.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Select } from "@/shared/component/select.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"

type CreateUnitFormProps = {
    register: UseFormRegister<CreateUnitInput>
    errors: FieldErrors<CreateUnitInput>
}

export function CreateUnitForm({ register, errors }: CreateUnitFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("unit.form.unitCode")}
                htmlFor="unitCode"
                error={getFieldErrorMessage(t, errors.unitCode)}
            >
                <Input id="unitCode" hasError={!!errors.unitCode} {...register("unitCode")} />
            </FormField>

            <FormField
                label={t("unit.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("unit.form.unitType")}
                htmlFor="unitType"
                error={getFieldErrorMessage(t, errors.unitType)}
            >
                <Select id="unitType" hasError={!!errors.unitType} defaultValue="" {...register("unitType")}>
                    <option value="" disabled>
                        {t("common.selectPlaceholder")}
                    </option>
                    <option value="weight">{t("unit.form.unitTypeOptions.weight")}</option>
                    <option value="volume">{t("unit.form.unitTypeOptions.volume")}</option>
                    <option value="count">{t("unit.form.unitTypeOptions.count")}</option>
                </Select>
            </FormField>

            <FormField
                label={t("unit.form.baseFactor")}
                htmlFor="baseFactor"
                error={getFieldErrorMessage(t, errors.baseFactor)}
            >
                <Input
                    id="baseFactor"
                    type="number"
                    step="0.000001"
                    hasError={!!errors.baseFactor}
                    {...register("baseFactor", { setValueAs: toOptionalNumber })}
                />
            </FormField>
        </div>
    )
}
