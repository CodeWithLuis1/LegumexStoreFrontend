import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateAttributeInput } from "@/feature/attribute/schema/attribute.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Select } from "@/shared/component/select.component"

type CreateAttributeFormProps = {
    register: UseFormRegister<CreateAttributeInput>
    errors: FieldErrors<CreateAttributeInput>
}

export function CreateAttributeForm({ register, errors }: CreateAttributeFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("attribute.form.attributeName")}
                htmlFor="attributeName"
                error={getFieldErrorMessage(t, errors.attributeName)}
            >
                <Input id="attributeName" hasError={!!errors.attributeName} {...register("attributeName")} />
            </FormField>

            <FormField
                label={t("attribute.form.dataType")}
                htmlFor="dataType"
                error={getFieldErrorMessage(t, errors.dataType)}
            >
                <Select id="dataType" hasError={!!errors.dataType} defaultValue="" {...register("dataType")}>
                    <option value="" disabled>
                        {t("common.selectPlaceholder")}
                    </option>
                    <option value="string">{t("attribute.form.dataTypeOptions.string")}</option>
                    <option value="number">{t("attribute.form.dataTypeOptions.number")}</option>
                    <option value="boolean">{t("attribute.form.dataTypeOptions.boolean")}</option>
                    <option value="date">{t("attribute.form.dataTypeOptions.date")}</option>
                </Select>
            </FormField>

            <FormField
                label={t("attribute.form.unitLabel")}
                htmlFor="unitLabel"
                error={getFieldErrorMessage(t, errors.unitLabel)}
            >
                <Input id="unitLabel" hasError={!!errors.unitLabel} {...register("unitLabel")} />
            </FormField>
        </div>
    )
}
