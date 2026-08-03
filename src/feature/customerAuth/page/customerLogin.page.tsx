import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import type { Location } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, LogIn, Mail, ShieldAlert } from "lucide-react"
import { customerLoginRequestSchema } from "@/feature/customerAuth/schema/customerLogin.schema"
import type { CustomerLoginRequest } from "@/feature/customerAuth/schema/customerLogin.schema"
import { customerLoginAPI, isCustomerLoginApiError } from "@/feature/customerAuth/api/customerLogin.api"
import { useCustomerAuth } from "@/shared/auth/customer/useCustomerAuth"
import { getFieldErrorMessage } from "@/shared/i18n/getFieldErrorMessage"
import { FormField } from "@/shared/component/formField.component"
import { Input } from "@/shared/component/input.component"
import { Button } from "@/shared/component/button.component"

const ACCOUNT_LOCKED_STATUS = 423

export function CustomerLoginPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useCustomerAuth()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerLoginRequest>({
        resolver: zodResolver(customerLoginRequestSchema),
        defaultValues: { email: "", password: "" },
    })

    const loginMutation = useMutation({
        mutationFn: customerLoginAPI,
        onSuccess: ({ data }) => {
            login(data)
            const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? "/solicitud"
            navigate(redirectTo, { replace: true })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((formData) => {
        loginMutation.mutate(formData)
    })

    const { error } = loginMutation
    const lockedError = isCustomerLoginApiError(error) && error.status === ACCOUNT_LOCKED_STATUS ? error : null

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-crema p-4">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brote/20 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-dorado/20 blur-3xl"
            />

            <div className="relative w-full max-w-sm">
                <div className="overflow-hidden rounded-card border border-gris-campo/60 bg-hueso shadow-card">
                    <div className="relative bg-linear-to-br from-verde-profundo to-verde-tinta px-6 py-10 text-center">
                        <div className="absolute inset-x-0 top-0 h-1 bg-dorado" />
                        <img
                            src={import.meta.env.VITE_IMAGE_LOGO}
                            alt="Legumex Logo"
                            className="mx-auto h-20 w-28 object-contain"
                        />
                        <p className="font-display text-2xl font-bold tracking-tight text-crema">
                            {t("auth.customerLogin.brand")}
                        </p>
                        <p className="mt-1 text-sm font-medium text-crema/70">{t("auth.customerLogin.brandSubtitle")}</p>
                    </div>

                    <form className="px-6 py-9" onSubmit={onSubmit} autoComplete="on" noValidate>
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold text-verde-profundo">{t("auth.customerLogin.title")}</h1>
                            <p className="text-sm text-texto-suave">{t("auth.customerLogin.subtitle")}</p>
                        </div>

                        {lockedError && (
                            <div className="mb-5 flex items-start gap-2 rounded-[10px] border border-aviso-bd bg-aviso-bg px-4 py-3 text-sm text-aviso-fg">
                                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{lockedError.message}</span>
                            </div>
                        )}

                        <FormField
                            label={t("auth.customerLogin.email")}
                            htmlFor="email"
                            error={getFieldErrorMessage(t, errors.email)}
                        >
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-texto-suave" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t("auth.customerLogin.emailPlaceholder")}
                                    autoComplete="email"
                                    autoFocus
                                    hasError={!!errors.email}
                                    className="pl-11"
                                    {...register("email")}
                                />
                            </div>
                        </FormField>

                        <FormField
                            label={t("auth.customerLogin.password")}
                            htmlFor="password"
                            error={getFieldErrorMessage(t, errors.password)}
                        >
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-texto-suave" />
                                <Input
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder={t("auth.customerLogin.passwordPlaceholder")}
                                    autoComplete="current-password"
                                    hasError={!!errors.password}
                                    className="pl-11 pr-11"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                                    aria-label={
                                        isPasswordVisible
                                            ? t("auth.customerLogin.hidePassword")
                                            : t("auth.customerLogin.showPassword")
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-texto-suave transition hover:text-verde-profundo"
                                >
                                    {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </FormField>

                        <Button type="submit" disabled={loginMutation.isPending} className="mt-2 w-full">
                            {loginMutation.isPending ? (
                                t("auth.customerLogin.submitting")
                            ) : (
                                <>
                                    <LogIn className="h-4 w-4" />
                                    {t("auth.customerLogin.submit")}
                                </>
                            )}
                        </Button>

                        <p className="mt-5 text-center text-sm text-texto-suave">{t("auth.customerLogin.noAccount")}</p>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm font-semibold text-verde-profundo underline decoration-dorado decoration-2 underline-offset-4">
                        {t("auth.customerLogin.backHome")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
