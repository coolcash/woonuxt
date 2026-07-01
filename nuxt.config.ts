export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  /**
   * For 2400+ products, pre-render only essential pages to keep build fast.
   * Add important category pages here to be cached during build.
   */
  nitro: {
    prerender: {
      // Only pre-render static pages and key categories
      crawlLinks: false,
      routes: [
        '/',
        '/sitemap.xml',
        '/robots.txt',
        // Pre-render important category pages
        '/product-category/pokemon/',
        '/product-category/custom/t-shirt/',
        '/products',
      ],
      failOnError: false,
    },
  },
});
