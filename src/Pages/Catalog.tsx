import React, { useMemo } from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
  useSearchProducts,
  useTopBrands,
  useTopCategories,
  useGetCategoryCounts,
  useGetBrandsCounts,
} from "../Hooks/useFacets";
import Row from "../Components/Row";
import FacetsSidebar from "../Components/FacetsSidebar";
import ProductsList from "../Components/ProductsList";
import { Pagination } from "../Components/Pagination";
import {ITEMS_PER_PAGE} from "../Constants/constants.tsx";
import routers from "../Constants/routers.tsx";


const CatalogPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";

  if (!q){
    navigate(routers.home);
  }

  const brandIds = searchParams.get("brandIds")?.split(",").map(Number) || [];
  const categoryIds = searchParams.get("categoryIds")?.split(",").map(Number) || [];
  const page = Number(searchParams.get("page") || 1);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const apiParams = useMemo(
    () => ({ q, brand_ids: brandIds, category_ids: categoryIds, offset, limit: ITEMS_PER_PAGE }),
    [q, brandIds, categoryIds, offset]
  );

  const { topBrands, isLoading: areBrandsLoading } = useTopBrands(q);
  const { topCategories, isLoading: areCategoriesLoading } = useTopCategories(q);

  const topBrandIds = useMemo(() => topBrands.map((b) => b.brand_id), [topBrands]);
  const topCategoryIds = useMemo(() => topCategories.map((c) => c.category_id), [topCategories]);

  const brandCountsParams = useMemo(
    () => ({ q, brand_ids: topBrandIds, category_ids: categoryIds }),
    [q, topBrandIds, categoryIds]
  );

  const categoryCountsParams = useMemo(
    () => ({ q, brand_ids: brandIds, category_ids: topCategoryIds }),
    [q, brandIds, topCategoryIds]
  );

  const { products, isLoading: areProductsLoading, isError: isProductsError, total } = useSearchProducts(apiParams);
  const { categoryCounts, isLoading: categoryCountsLoading } = useGetCategoryCounts(categoryCountsParams, { enabled: topCategoryIds.length > 0 });
  const { brandsCounts, isLoading: brandCountsLoading } = useGetBrandsCounts(brandCountsParams, { enabled: topBrandIds.length > 0 });

  const totalPages = Math.ceil((total || 0) / ITEMS_PER_PAGE);
  const currentPage = page > totalPages ? totalPages : page;

  const isGlobalLoading = areProductsLoading;
  const isGlobalError = isProductsError;

  const updateFilters = (newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.length > 0 ? params.set(key, value.join(",")) : params.delete(key);
      } else if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const toggleBrand = (brandId: number) => {
    const newBrands = brandIds.includes(brandId)
      ? brandIds.filter((id) => id !== brandId)
      : [...brandIds, brandId];
    updateFilters({ brandIds: newBrands, page: 1 });
  };

  const toggleCategory = (categoryId: number) => {
    const newCategories = categoryIds.includes(categoryId)
      ? categoryIds.filter((id) => id !== categoryId)
      : [...categoryIds, categoryId];
    updateFilters({ categoryIds: newCategories, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Row>
      <FacetsSidebar
        brands={topBrands}
        brandCounts={brandsCounts}
        categories={topCategories}
        categoryCounts={categoryCounts}
        selectedBrands={brandIds}
        selectedCategories={categoryIds}
        onToggleBrand={toggleBrand}
        onToggleCategory={toggleCategory}
      />

      <div style={{ flex: 1 }}>
        <ProductsList products={products} isLoading={isGlobalLoading} isError={isGlobalError} />
        {!isGlobalLoading && !isGlobalError && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={total}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>
    </Row>
  );
};

export default CatalogPage;