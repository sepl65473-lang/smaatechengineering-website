export const config = {
  // TODO: Configure PLATFORM_DASHBOARD_URL and CONTACT_FORM_ENDPOINT via env vars for different environments
  platformDashboardUrl: import.meta.env.VITE_PLATFORM_DASHBOARD_URL || `http://${window.location.hostname}:3000`,
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/contact',
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
};
