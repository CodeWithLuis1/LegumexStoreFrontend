import { useTranslation } from "react-i18next"
import { SiteContainer } from "@/shared/component/siteContainer.component"
// import { SectionHeading } from "@/shared/component/sectionHeading.component"
import { HowWeWorkStep } from "@/feature/home/component/howWeWorkStep.component"
import { HOME_PROCESS_STEPS } from "@/feature/home/data/homeContent.data"

export function HowWeWorkSection() {
    const { t } = useTranslation()

    return (
        <section className="py-16 sm:py-24">
            <SiteContainer>
                {/* <SectionHeading eyebrow={t("home.process.eyebrow")} title={t("home.process.title")} /> */}

                <div className="mt-10 grid grid-cols-1 gap-10 border-t border-gris-campo pt-10 sm:grid-cols-3">
                    {HOME_PROCESS_STEPS.map((step) => (
                        <HowWeWorkStep
                            key={step.id}
                            stepNumber={step.stepNumber}
                            title={t(step.titleKey)}
                            description={t(step.descriptionKey)}
                        />
                    ))}
                </div>
            </SiteContainer>
        </section>
    )
}
