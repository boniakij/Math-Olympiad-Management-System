const runtimeConfig = window.__APP_CONFIG__ ?? {}

export const appConfig = {
  appName:
    runtimeConfig.appName ??
    import.meta.env.VITE_APP_NAME ??
    'Math Olympiad Management System',
  apiBaseUrl:
    runtimeConfig.apiBaseUrl ??
    import.meta.env.VITE_API_BASE_URL ??
    'http://localhost:8000/api/v1',
}
