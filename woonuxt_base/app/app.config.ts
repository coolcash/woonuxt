/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Vine & Dandy',
  shortDescription: 'T-shirts as delightfully odd and irresistibly charming as the people who wear them.',
  description: `Welcome to Vine & Dandy, home of T‑shirts as delightfully odd and irresistibly charming as the people who wear them. From Battle Unicorns and Whatever Floats Your Goat to The Mothman and Frog Prince, we blend comfort, chaos, and charisma in all the right ways. We also have a growing selection of singles, sealed, and graded cards available online, with more at our physical location.`,
  baseUrl: 'https://store.vine-and-dandy.com',
  siteImage: 'https://vine-and-dandy.com/wp-content/uploads/2025/logo.png',
  storeSettings: {
    autoOpenCart: false,
    // cartMode: 'optimistic' updates UI immediately; 'safe' waits for the server response.
    cartMode: 'optimistic',
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: false,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    productGalleryThumbnailsPosition: 'bottom', // 'bottom' or 'left'
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
    socialLoginsDisplay: 'buttons', // 'buttons' or 'icons'
  },
});
