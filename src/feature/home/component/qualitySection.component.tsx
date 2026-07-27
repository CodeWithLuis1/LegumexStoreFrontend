// import { useTranslation } from "react-i18next"
import { SiteContainer } from "@/shared/component/siteContainer.component"
// import { SectionHeading } from "@/shared/component/sectionHeading.component"
import { CertificationMark } from "@/feature/home/component/certificationMark.component"
import { HOME_CERTIFICATIONS } from "@/feature/home/data/homeContent.data"

export function QualitySection() {
    // const { t } = useTranslation()

    return (
        <section className="py-16 sm:py-24">
            <SiteContainer>
                {/* <SectionHeading eyebrow={t("home.quality.eyebrow")} title={t("home.quality.title")} align="center" /> */}

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                    {HOME_CERTIFICATIONS.map((certification) => (
                        <CertificationMark key={certification.id} name={certification.name} />
                    ))}
                </div>
            </SiteContainer>
        </section>
    )
}
