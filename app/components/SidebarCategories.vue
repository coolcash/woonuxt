<script setup lang="ts">
// SidebarCategories - show top categories excluding uncategorized and consignment
const { data } = await useAsyncGql('getProductCategories', { first: 20 });
const categories = computed(() => (data.value?.productCategories?.nodes || []).filter((c: any) => {
  const slug = (c.slug || '').toLowerCase();
  const name = (c.name || '').toLowerCase();
  return slug !== 'uncategorized' && slug !== 'consignment' && name !== 'consignment';
}).slice(0, 8));
</script>

<template>
  <div class="bg-white rounded-lg border p-4">
    <h3 class="font-semibold mb-3">Shop by Category</h3>
    <ul class="space-y-2 text-sm">
      <li v-for="cat in categories" :key="cat.databaseId">
        <NuxtLink :to="`/product-category/${cat.slug}/`" class="block hover:text-primary">{{ cat.name }} <span class="text-xs text-gray-400">({{ cat.count }})</span></NuxtLink>
      </li>
    </ul>
  </div>
</template>
