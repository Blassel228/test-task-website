type FilterValues = Record<string, string | number | (number | string)[] | null | undefined>;

export const updateFilters = (
  currentParams: URLSearchParams,
  setParams: (params: URLSearchParams, options?: { replace?: boolean }) => void,
  newParams: FilterValues
) => {
  const params = new URLSearchParams(currentParams);

  Object.entries(newParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.length > 0 ? params.set(key, value.join(",")) : params.delete(key);
    } else if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
  });

  setParams(params, { replace: true });
};

export const toggleFilterValue = (currentIds: number[], valueId: number): number[] => {
  return currentIds.includes(valueId)
    ? currentIds.filter((id) => id !== valueId)
    : [...currentIds, valueId];
};

export const handlePageChange = (
  page: number,
  setParams: (params: URLSearchParams, options?: { replace?: boolean }) => void,
  currentParams: URLSearchParams
) => {
  const params = new URLSearchParams(currentParams);
  params.set("page", String(page));
  setParams(params, { replace: true });

  window.scrollTo({ top: 0, behavior: "smooth" });
};