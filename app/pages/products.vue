<script setup>
// Redirect legacy /products to /shop
if (process.server) {
  // Server-side redirect during SSR
  const event = useNitroEvent();
  event.res.statusCode = 301;
  event.res.setHeader('Location', '/shop');
  event.res.end();
} else {
  // Client-side redirect
  onMounted(() => navigateTo('/shop'));
}
</script>

<template>
  <div />
</template>