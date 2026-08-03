import { useContext } from "react"
import { CustomerAuthContext } from "@/shared/auth/customer/CustomerAuthContext"

export function useCustomerAuth() {
    const context = useContext(CustomerAuthContext)
    if (!context) throw new Error("useCustomerAuth must be used within a CustomerAuthProvider")
    return context
}
