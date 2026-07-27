import { Leaf, Snowflake } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ColdChainCard } from "@/feature/home/component/coldChainCard.component"

export function ColdChainSection() {
    const { t } = useTranslation()

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">
            <ColdChainCard
                tintClassName="bg-cat-raices"
                icon={Leaf}
                title={t("home.coldChain.fresh.title")}
                description={t("home.coldChain.fresh.description")}
            />
            <ColdChainCard
                tintClassName="bg-cat-iqf"
                icon={Snowflake}
                title={t("home.coldChain.frozen.title")}
                description={t("home.coldChain.frozen.description")}
            />
        </section>
    )
}
