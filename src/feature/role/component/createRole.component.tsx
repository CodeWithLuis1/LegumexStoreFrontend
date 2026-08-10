import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { CreateRoleInput } from "@/feature/role/schema/role.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"

type CreateRoleFormProps = {
    register: UseFormRegister<CreateRoleInput>
    errors: FieldErrors<CreateRoleInput>
}

export function CreateRoleForm({ register, errors }: CreateRoleFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField label={t("role.form.name")} htmlFor="name" error={getFieldErrorMessage(t, errors.name)}>
                <Input id="name" hasError={!!errors.name} {...register("name")} />
            </FormField>
        </div>
    )
}
