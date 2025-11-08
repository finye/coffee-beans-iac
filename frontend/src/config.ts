interface AppConfig {
  apiBaseUrl: string;
  cdnUrl: string;
}

let cachedConfig: AppConfig | null = null;

export async function getConfig(): Promise<AppConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch("/config.json");
    if (!response.ok) {
      throw new Error("Failed to load configuration");
    }

    const config: AppConfig = await response.json();
    cachedConfig = config;
    return config;
  } catch (error) {
    console.error("Failed to load config:", error);
    return {
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
      cdnUrl: import.meta.env.VITE_CDN_URL || "",
    };
  }
}
