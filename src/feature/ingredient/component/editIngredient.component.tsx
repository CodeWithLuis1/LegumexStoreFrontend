import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateIngredientInput } from "@/feature/ingredient/schema/ingredient.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Select } from "@/shared/component/select.component"
import { Checkbox } from "@/shared/component/checkbox.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { UnitSelect } from "@/feature/unit/component/unitSelect.component"

type EditIngredientFormProps = {
    register: UseFormRegister<UpdateIngredientInput>
    errors: FieldErrors<UpdateIngredientInput>
}

export function EditIngredientForm({ register, errors }: EditIngredientFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField
                label={t("ingredient.form.displayName")}
                htmlFor="displayName"
                error={getFieldErrorMessage(t, errors.displayName)}
            >
                <Input id="displayName" hasError={!!errors.displayName} {...register("displayName")} />
            </FormField>

            <FormField
                label={t("ingredient.form.ingredientType")}
                htmlFor="ingredientType"
                error={getFieldErrorMessage(t, errors.ingredientType)}
            >
                <Select id="ingredientType" hasError={!!errors.ingredientType} {...register("ingredientType")}>
                    <option value="fruit">{t("ingredient.form.ingredientTypeOptions.fruit")}</option>
                    <option value="vegetable">{t("ingredient.form.ingredientTypeOptions.vegetable")}</option>
                    <option value="pulp">{t("ingredient.form.ingredientTypeOptions.pulp")}</option>
                    <option value="other">{t("ingredient.form.ingredientTypeOptions.other")}</option>
                </Select>
            </FormField>

            <FormField
                label={t("ingredient.form.costPerUnit")}
                htmlFor="costPerUnit"
                error={getFieldErrorMessage(t, errors.costPerUnit)}
            >
                <Input
                    id="costPerUnit"
                    type="number"
                    step="0.0001"
                    hasError={!!errors.costPerUnit}
                    {...register("costPerUnit", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("ingredient.form.costUnitId")}
                htmlFor="costUnitId"
                error={getFieldErrorMessage(t, errors.costUnitId)}
            >
                <UnitSelect
                    id="costUnitId"
                    hasError={!!errors.costUnitId}
                    {...register("costUnitId", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <div className="mb-5 flex gap-6">
                <Checkbox
                    id="isOrganic"
                    label={t("ingredient.form.isOrganic")}
                    {...register("isOrganic")}
                />
                <Checkbox id="isMixable" label={t("ingredient.form.isMixable")} {...register("isMixable")} />
            </div>
            <p className="mb-5 -mt-3 text-sm text-texto-suave">{t("ingredient.form.isOrganicHint")}</p>
        </div>
    )
}
