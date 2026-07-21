import { lazy, Suspense } from "react"
import { Navigate, Route } from "react-router-dom"
import { AppLayout } from "@/shared/layout/AppLayout"
import { Spinner } from "@/shared/component/spinner.component"
import { NotFoundPage } from "@/shared/page/notFound.page"

const AddinListPage = lazy(() =>
    import("@/feature/addin/page/addin.page").then((m) => ({ default: m.AddinListPage }))
)
const CreateAddinPage = lazy(() =>
    import("@/feature/addin/page/createAddin.page").then((m) => ({ default: m.CreateAddinPage }))
)
const EditAddinPage = lazy(() =>
    import("@/feature/addin/page/editAddin.page").then((m) => ({ default: m.EditAddinPage }))
)

const AttributeListPage = lazy(() =>
    import("@/feature/attribute/page/attribute.page").then((m) => ({ default: m.AttributeListPage }))
)
const CreateAttributePage = lazy(() =>
    import("@/feature/attribute/page/createAttribute.page").then((m) => ({ default: m.CreateAttributePage }))
)
const EditAttributePage = lazy(() =>
    import("@/feature/attribute/page/editAttribute.page").then((m) => ({ default: m.EditAttributePage }))
)

const CategoryListPage = lazy(() =>
    import("@/feature/category/page/category.page").then((m) => ({ default: m.CategoryListPage }))
)
const CreateCategoryPage = lazy(() =>
    import("@/feature/category/page/createCategory.page").then((m) => ({ default: m.CreateCategoryPage }))
)
const EditCategoryPage = lazy(() =>
    import("@/feature/category/page/editCategory.page").then((m) => ({ default: m.EditCategoryPage }))
)

const ProductTypeListPage = lazy(() =>
    import("@/feature/product-type/page/productType.page").then((m) => ({ default: m.ProductTypeListPage }))
)
const CreateProductTypePage = lazy(() =>
    import("@/feature/product-type/page/createProductType.page").then((m) => ({ default: m.CreateProductTypePage }))
)
const EditProductTypePage = lazy(() =>
    import("@/feature/product-type/page/editProductType.page").then((m) => ({ default: m.EditProductTypePage }))
)

const UnitListPage = lazy(() =>
    import("@/feature/unit/page/unit.page").then((m) => ({ default: m.UnitListPage }))
)
const CreateUnitPage = lazy(() =>
    import("@/feature/unit/page/createUnit.page").then((m) => ({ default: m.CreateUnitPage }))
)
const EditUnitPage = lazy(() =>
    import("@/feature/unit/page/editUnit.page").then((m) => ({ default: m.EditUnitPage }))
)

const IngredientListPage = lazy(() =>
    import("@/feature/ingredient/page/ingredient.page").then((m) => ({ default: m.IngredientListPage }))
)
const CreateIngredientPage = lazy(() =>
    import("@/feature/ingredient/page/createIngredient.page").then((m) => ({ default: m.CreateIngredientPage }))
)
const EditIngredientPage = lazy(() =>
    import("@/feature/ingredient/page/editIngredient.page").then((m) => ({ default: m.EditIngredientPage }))
)

const routes = [
    { path: "/addins", component: AddinListPage },
    { path: "/addins/create", component: CreateAddinPage },
    { path: "/addins/:addinId/edit", component: EditAddinPage },

    { path: "/attributes", component: AttributeListPage },
    { path: "/attributes/create", component: CreateAttributePage },
    { path: "/attributes/:attributeId/edit", component: EditAttributePage },

    { path: "/categories", component: CategoryListPage },
    { path: "/categories/create", component: CreateCategoryPage },
    { path: "/categories/:categoryId/edit", component: EditCategoryPage },

    { path: "/product-types", component: ProductTypeListPage },
    { path: "/product-types/create", component: CreateProductTypePage },
    { path: "/product-types/:productTypeId/edit", component: EditProductTypePage },

    { path: "/units", component: UnitListPage },
    { path: "/units/create", component: CreateUnitPage },
    { path: "/units/:unitId/edit", component: EditUnitPage },

    { path: "/ingredients", component: IngredientListPage },
    { path: "/ingredients/create", component: CreateIngredientPage },
    { path: "/ingredients/:ingredientId/edit", component: EditIngredientPage },
]

export default function AdminRoutes() {
    return (
        <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/addins" replace />} />
            <Route
                path="*"
                element={
                    <Suspense fallback={<Spinner />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />

            {routes.map(({ path, component: Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={<Spinner />}>
                            <Component />
                        </Suspense>
                    }
                />
            ))}
        </Route>
    )
}
