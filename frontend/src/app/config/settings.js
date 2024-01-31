export const appSettings = {
  userStorageKey: process.env.NEXT_PUBLIC_USER_INFO_KEY || "cms_user",
  tokenStorageKey: process.env.NEXT_PUBLIC_USER_TOKEN_KEY || "cms_token",
  environment: process.env.environment || "development",
  api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
};
