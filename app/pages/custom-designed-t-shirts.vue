<template>
  <div class="py-12">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-4">Custom Designed T-Shirts</h1>
      <div class="space-y-4 text-lg leading-relaxed">
        <p>
          Welcome to <strong>Vine & Dandy</strong>, home of T‑shirts as delightfully odd and irresistibly charming as the people who wear them. Here, <em>Battle Unicorns</em> gallop triumphantly across cotton plains, <em>Whatever Floats Your Goat</em> becomes a fully valid life philosophy, and <em>The Mothman</em> offers his cryptic nod of approval from the shadows.
        </p>
        <p>
          Whether you're boldly announcing <em>I Smell Fear On You</em>, rallying the quiet masses with <em>Introverts Unite (Separately)</em>, or embracing your inner <em>Frog Prince</em>, our shirts blend comfort, chaos, and charisma in all the right ways. Slip one on and step into a world where whimsy wins and even the <em>Mullets of the Multiverse</em> make perfect sense.
        </p>
        <p>
          Looking for a different color shirt or your own design? Feel free to <NuxtLink to="/contact" class="text-primary hover:underline">fill out our Custom T-Shirt Form</NuxtLink>.
        </p>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="!loading && products.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading custom t-shirts...</p>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500">No t-shirts found. Check back soon!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '#app';

definePageMeta({
  title: 'Custom Designed T-Shirts - Vine & Dandy',
});

const { getProducts } = useProducts();

const loading = ref(true);
const products = ref([]);

onMounted(async () => {
  try {
    // Fetch t-shirt products from the custom-designed-t-shirts category
    const allProducts = await getProducts({
      first: 100,
      where: {
        // This will need adjustment based on your GraphQL schema
        // Typically filter by category slug
      },
    });

    // Filter and randomize
    if (allProducts) {
      const shuffled = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 42);
      products.value = shuffled;
    }
  } catch (error) {
    console.error('Failed to fetch t-shirts:', error);
  } finally {
    loading.value = false;
  }
});
</script>
