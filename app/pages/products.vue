<script setup lang="ts">
import type { Product } from '#types/gql';

const { setProducts, updateProductList } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const { data, error, status } = await useAsyncGql('getProducts');
const allProducts = computed<Product[]>(() => (data.value?.products?.nodes ?? []) as Product[]);
const pageInfo = ref(data.value?.products?.pageInfo || { hasNextPage: false, endCursor: null });
const isLoading = computed<boolean>(() => status.value === 'idle' || status.value === 'pending');
const hasError = computed<boolean>(() => Boolean(error.value));
const hasProducts = computed<boolean>(() => allProducts.value.length > 0);
const loadingMore = ref(false);

watchEffect(() => {
  setProducts(allProducts.value);
});

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

const woo = useWooGraphQL();
async function loadMore() {
  if (!pageInfo.value?.hasNextPage || loadingMore.value) return;
  loadingMore.value = true;
  try {
    const res = await woo.getProducts({ after: pageInfo.value.endCursor, first: 48 });
    const nodes = (res?.products?.nodes ?? []) as Product[];
    const newPage = res?.products?.pageInfo as any;
    // append to global product store
    setProducts([...(allProducts.value || []), ...nodes]);
    pageInfo.value = newPage || { hasNextPage: false, endCursor: null };
  } catch (e) {
    console.error('Failed to load more products', e);
  } finally {
    loadingMore.value = false;
  }
}

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useHead({
  title: `Products`,
  meta: [{ name: 'description', content: 'Discover our products' }],
});
</script>

<template>
  <main>
    <div v-if="isLoading" class="container flex items-center justify-center min-h-96">
      <LoadingIcon size="32" stroke="3" />
    </div>
    <div v-else-if="hasProducts" class="container flex items-start gap-16">
      <aside class="w-64 hidden md:block">
        <SidebarCategories />
      </aside>

      <div class="w-full">
        <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown v-if="storeSettings.showOrderByDropdown" class="hidden md:inline-flex" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
        <ProductGrid />
        <div class="mt-6 flex justify-center">
          <button v-if="pageInfo.hasNextPage" @click="loadMore" class="btn btn-primary" :disabled="loadingMore">
            <span v-if="!loadingMore">Load more</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>
    </div>
    <NoProductsFound v-else-if="hasError">Products could not be loaded. Please refresh or try again in a moment.</NoProductsFound>
    <NoProductsFound v-else>No products found. Please try adjusting your filters or check back later.</NoProductsFound>
  </main>
</template>