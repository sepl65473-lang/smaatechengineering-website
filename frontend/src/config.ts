const rawDashboardUrl =
  import.meta.env.VITE_PLATFORM_DASHBOARD_URL || "https://portal.smaatechengineering.com/panel/";
const rawCareersAdminUrl =
  import.meta.env.VITE_CAREERS_ADMIN_URL || '/admin/login';

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
  careersAdminUrl: rawCareersAdminUrl,
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/contact',
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
};
