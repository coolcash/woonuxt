import type { Product } from '#types/gql';

export function useProducts() {
  // Declare the state variables and the setter functions
  const products = useState<Product[]>('products');
  const allProducts = useState<Product[]>('allProducts', () => []);

  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    // If newProducts is not an array, reset products and allProducts
    // to empty arrays to avoid errors in the UI.
    if (!Array.isArray(newProducts)) {
      products.value = [];
      allProducts.value = [];
      return;
    }

      // Base excluded slugs
      const baseExcludes = ['uncategorized', 'consignment'];

      // Shared state for computed excluded slugs (including descendants)
      const excludedState = useState<string[]>('excludedCategorySlugs', () => []);

      // Helper to compute excluded slugs by fetching all categories and checking ancestors
      async function computeExcludedSlugs() {
        try {
          if (excludedState.value && excludedState.value.length) return excludedState.value;
          const runtime = useRuntimeConfig();
          const host = runtime.public?.['graphql-client']?.clients?.default?.host || process.env.GQL_HOST;
          if (!host) return baseExcludes;

          const query = `query AllCats($first: Int){ productCategories(first: $first) { nodes { slug ancestors { nodes { slug } } } } }`;

          const res = await $fetch(host, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { first: 200 } }),
          });

          const nodes = res?.data?.productCategories?.nodes || res?.productCategories?.nodes || [];
          const excluded = new Set<string>(baseExcludes.map((s) => s.toLowerCase()));

          for (const node of nodes) {
            const slug = (node?.slug || '').toLowerCase();
            const ancestors = (node?.ancestors?.nodes || []).map((a: any) => (a.slug || '').toLowerCase());
            // If node slug is in base excludes or any ancestor is in base excludes, exclude this slug
            if (baseExcludes.includes(slug) || ancestors.some((a: string) => baseExcludes.includes(a))) {
              excluded.add(slug);
            }
          }

          excludedState.value = Array.from(excluded);
          return excludedState.value;
        } catch (e) {
          // On failure, fall back to baseExcludes
          console.error('Failed to compute excluded category slugs:', e);
          excludedState.value = baseExcludes;
          return excludedState.value;
        }
      }

      // Filter products synchronously if excluded slugs already computed; otherwise compute then filter asynchronously
      const currentExcluded = excludedState.value && excludedState.value.length ? excludedState.value : baseExcludes;

      const applyFilter = (excludes: string[]) => {
        const filtered = newProducts.filter((p) => {
          const slugs = (p.productCategories?.nodes || []).map((n: any) => (n.slug || '').toLowerCase());
          return !slugs.some((s: string) => excludes.includes(s));
        });
        products.value = [...filtered];
        allProducts.value = [...filtered];
      };

      if (currentExcluded === baseExcludes) {
        // Compute excluded slugs asynchronously and then apply filter
        computeExcludedSlugs().then((excludes) => applyFilter(excludes)).catch(() => applyFilter(baseExcludes));
        // Meanwhile apply base filter to avoid empty UI
        applyFilter(baseExcludes);
      } else {
        applyFilter(currentExcluded);
      }
    }

  // Named function for product filtering pipeline
  function applyProductFilters(products: Product[]): Product[] {
    const { isSortingActive, sortProducts } = useSorting();
    const { isFiltersActive, filterProducts } = useFiltering();
    const { isSearchActive, searchProducts } = useSearching();

    let newProducts = [...products];
    if (isFiltersActive.value) newProducts = filterProducts(newProducts);
    if (isSearchActive.value) newProducts = searchProducts(newProducts);
    if (isSortingActive.value) newProducts = sortProducts(newProducts);

    return newProducts;
  }

  // Named async function for better performance and debugging
  async function updateProductList(): Promise<void> {
    const { scrollToTop } = useHelpers();
    const { isSortingActive } = useSorting();
    const { isFiltersActive } = useFiltering();
    const { isSearchActive } = useSearching();

    // scroll to top of page
    scrollToTop();

    // return all products if no filters are active
    if (!isFiltersActive.value && !isSearchActive.value && !isSortingActive.value) {
      products.value = [...allProducts.value];
      return;
    }

    // otherwise, apply filter, search and sorting in that order
    try {
      products.value = applyProductFilters(allProducts.value);
    } catch (error) {
      console.error(error);
    }
  }

  return { products, allProducts, setProducts, updateProductList };
}
