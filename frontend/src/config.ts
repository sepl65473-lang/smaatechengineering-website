const rawDashboardUrl =
  import.meta.env.VITE_PLATFORM_DASHBOARD_URL || "https://portal.smaatechengineering.com/panel/";

const normalizeDashboardLoginUrl = (url: string) => {
  const trimmedUrl = url.trim().replace(/\/+$/, ''); // removes trailing slash

  if (trimmedUrl.includes('#/')) {
    return trimmedUrl;
  }

  // Pure clean directory URL result: e.g. ".../panel/#/login"
  return `${trimmedUrl}/#/login`;
};

export const config = {
  platformDashboardUrl: normalizeDashboardLoginUrl(rawDashboardUrl),
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/contact',
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
};
