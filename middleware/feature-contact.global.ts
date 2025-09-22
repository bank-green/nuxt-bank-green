export default defineNuxtRouteMiddleware(to => {
  if (to.path.startsWith('/contact/compose')) {
    const enabled = useFlag('FEATURE_CONTACT_EMAIL');
    if (!enabled.value) {
      return navigateTo('/');
    }
  }
});
