import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { UpdateCustomerInput } from "@/feature/customer/schema/customer.schema"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { toOptionalString } from "@/shared/form/toOptionalString"

type EditCustomerFormProps = {
    register: UseFormRegister<UpdateCustomerInput>
    errors: FieldErrors<UpdateCustomerInput>
}

export function EditCustomerForm({ register, errors }: EditCustomerFormProps) {
    const { t } = useTranslation()

    return (
        <div>
            <FormField label={t("customer.form.name")} htmlFor="name" error={getFieldErrorMessage(t, errors.name)}>
                <Input id="name" hasError={!!errors.name} {...register("name")} />
            </FormField>

            <FormField
                label={t("customer.form.companyName")}
                htmlFor="companyName"
                error={getFieldErrorMessage(t, errors.companyName)}
            >
                <Input id="companyName" hasError={!!errors.companyName} {...register("companyName")} />
            </FormField>

            <FormField label={t("customer.form.email")} htmlFor="email" error={getFieldErrorMessage(t, errors.email)}>
                <Input id="email" type="email" hasError={!!errors.email} {...register("email")} />
            </FormField>

            <FormField
                label={t("customer.form.newPassword")}
                htmlFor="password"
                error={getFieldErrorMessage(t, errors.password)}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("customer.form.newPasswordPlaceholder")}
                    hasError={!!errors.password}
                    {...register("password", { setValueAs: toOptionalString })}
                />
            </FormField>
        </div>
    )
}
