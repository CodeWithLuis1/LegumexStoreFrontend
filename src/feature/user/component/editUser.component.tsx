import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateUserInput } from "@/feature/user/schema/user.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { RoleSelect } from "@/feature/role/component/roleSelect.component"
import { toOptionalNumber } from "@/shared/form/toOptionalNumber"
import { toOptionalString } from "@/shared/form/toOptionalString"

type EditUserFormProps = {
    register: UseFormRegister<UpdateUserInput>
    errors: FieldErrors<UpdateUserInput>
}

export function EditUserForm({ register, errors }: EditUserFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField label={t("user.form.name")} htmlFor="name" error={getFieldErrorMessage(t, errors.name)}>
                <Input id="name" hasError={!!errors.name} {...register("name")} />
            </FormField>

            <FormField label={t("user.form.username")} htmlFor="username" error={getFieldErrorMessage(t, errors.username)}>
                <Input id="username" hasError={!!errors.username} preserveCase {...register("username")} />
            </FormField>

            <FormField label={t("user.form.roleId")} htmlFor="role_id" error={getFieldErrorMessage(t, errors.role_id)}>
                <RoleSelect
                    id="role_id"
                    hasError={!!errors.role_id}
                    {...register("role_id", { setValueAs: toOptionalNumber })}
                />
            </FormField>

            <FormField
                label={t("user.form.newPassword")}
                htmlFor="password"
                error={getFieldErrorMessage(t, errors.password)}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("user.form.newPasswordPlaceholder")}
                    hasError={!!errors.password}
                    {...register("password", { setValueAs: toOptionalString })}
                />
            </FormField>
        </div>
    )
}
