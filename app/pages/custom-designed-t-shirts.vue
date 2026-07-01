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
          Looking for a different color shirt or your own design? <NuxtLink to="/contact" class="text-primary hover:underline">Fill out our Custom T-Shirt Form</NuxtLink>.
        </p>
      </div>
    </div>

    <!-- Info Note -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <p class="text-sm text-blue-800">
        Browse our collection of unique, hand-designed t-shirts. Each shirt has its own personality!
      </p>
    </div>

    <!-- Link to Category -->
    <div class="flex justify-center mb-8">
      <NuxtLink 
        to="/product-category/custom/t-shirt/" 
        class="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
      >
        View All Custom T-Shirts →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Custom Designed T-Shirts - Vine & Dandy',
});
</script>


