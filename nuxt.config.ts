export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  /**
   * For 2400+ products, optimize prerendering to avoid timeouts.
   * Consider upgrading to Vercel or adding a server-side platform for true ISR.
   * For now, we generate only essential pages and let others 404 gracefully.
   */
  nitro: {
    prerender: {
      // Only pre-render static pages, not all products
      crawlLinks: false,
      routes: [
        '/',
        '/sitemap.xml',
        '/robots.txt',
      ],
      failOnError: false,
    },
  },
});
