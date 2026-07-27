import { useTranslation } from "react-i18next"
import { SiteContainer } from "@/shared/component/siteContainer.component"
import { CredentialItem } from "@/feature/home/component/credentialItem.component"
import { HOME_CREDENTIAL_ITEMS } from "@/feature/home/data/homeContent.data"

export function CredentialStrip() {
    const { t } = useTranslation()

    return (
        <section className="bg-verde-profundo py-12">
            <SiteContainer className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {HOME_CREDENTIAL_ITEMS.map((credential) => (
                    <CredentialItem key={credential.id} value={credential.value} label={t(credential.labelKey)} />
                ))}
            </SiteContainer>
        </section>
    )
}
