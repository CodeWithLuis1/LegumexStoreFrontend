// import { useTranslation } from "react-i18next"

// const AVAILABLE_LANGUAGES = ["es", "en"] as const

// type LanguageSwitchTone = "light" | "dark"

// type LanguageSwitchProps = {
//     tone?: LanguageSwitchTone
// }

// const activeToneClasses: Record<LanguageSwitchTone, string> = {
//     light: "text-verde-profundo",
//     dark: "text-crema",
// }

// const inactiveToneClasses: Record<LanguageSwitchTone, string> = {
//     light: "text-texto-suave",
//     dark: "text-crema/60",
// }

// const dividerToneClasses: Record<LanguageSwitchTone, string> = {
//     light: "text-gris-campo",
//     dark: "text-crema/30",
// }

// export function LanguageSwitch({ tone = "light" }: LanguageSwitchProps) {
//     const { i18n } = useTranslation()
//     const currentLanguage = i18n.language.startsWith("en") ? "en" : "es"

//     return (
//         <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
//             {AVAILABLE_LANGUAGES.map((language, index) => (
//                 <span key={language} className="flex items-center gap-1">
//                     {index > 0 && <span className={dividerToneClasses[tone]}>/</span>}
//                     <button
//                         type="button"
//                         onClick={() => i18n.changeLanguage(language)}
//                         aria-current={currentLanguage === language}
//                         className={`transition hover:text-dorado-hover ${
//                             currentLanguage === language ? activeToneClasses[tone] : inactiveToneClasses[tone]
//                         }`}
//                     >
//                         {language}
//                     </button>
//                 </span>
//             ))}
//         </div>
//     )
// }
