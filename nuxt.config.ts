export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  /**
   * For 2400+ products, pre-render only essential static pages.
   * Dynamic routes (categories, products) are generated on-demand from GraphQL.
   */
  nitro: {
    prerender: {
      // Only pre-render static pages that don't depend on external data
      crawlLinks: false,
      routes: [
        '/',
        '/custom-designed-t-shirts',
      ],
      failOnError: false,
    },
  },
});
