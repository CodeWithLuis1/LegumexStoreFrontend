import { HeroSection } from "@/feature/home/component/heroSection.component"
import { CredentialStrip } from "@/feature/home/component/credentialStrip.component"
import { CategoryShowcaseSection } from "@/feature/home/component/categoryShowcaseSection.component"
import { ColdChainSection } from "@/feature/home/component/coldChainSection.component"
import { HowWeWorkSection } from "@/feature/home/component/howWeWorkSection.component"
import { FeaturedProductsSection } from "@/feature/home/component/featuredProductsSection.component"
import { QualitySection } from "@/feature/home/component/qualitySection.component"
import { FinalCtaSection } from "@/feature/home/component/finalCtaSection.component"

export function HomePage() {
    return (
        <>
            <HeroSection />
            <CredentialStrip />
            <CategoryShowcaseSection />
            <ColdChainSection />
            <HowWeWorkSection />
            <FeaturedProductsSection />
            <QualitySection />
            <FinalCtaSection />
        </>
    )
}
