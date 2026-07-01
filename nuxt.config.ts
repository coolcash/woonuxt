export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  nitro: {
    // ISR (Incremental Static Regeneration) for large catalogs
    // Product pages are generated on-first-request and cached, not pre-rendered
    prerender: {
      crawlLinks: true,
      failOnError: false,
      // Only pre-render these static routes (not product pages)
      routes: ['/sitemap.xml', '/robots.txt'],
    },
    routeRules: {
      // Product pages: revalidate every hour (3600 seconds)
      '/product/**': { swr: 3600 },
      '/products/**': { swr: 3600 },
      '/product-category/**': { swr: 3600 },
      // Home and category pages: revalidate every 24 hours
      '/': { swr: 86400 },
      '/categories/**': { swr: 86400 },
      // Static pages
      '/cart': { cache: { maxAge: 0 } },
      '/checkout': { cache: { maxAge: 0 } },
      '/account/**': { cache: { maxAge: 0 } },
    },
  },
});
