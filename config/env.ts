interface EnvConfig {
  NODE_ENV: string;
  API_URL: string;
  APP_URL: string;
  ENVIRONMENT: string;
}

const getEnvConfig = (): EnvConfig => {
  // eslint-disable-next-line no-undef
  const nodeEnv = process.env.NODE_ENV || "development";

  const configs = {
    development: {
      NODE_ENV: "development",
      API_URL: "http://localhost:3000/api",
      APP_URL: "http://localhost:3000",
      ENVIRONMENT: "development",
    },
    production: {
      NODE_ENV: "production",
      API_URL: "https://your-domain.com/api",
      APP_URL: "https://your-domain.com",
      ENVIRONMENT: "production",
    },
    test: {
      NODE_ENV: "test",
      API_URL: "http://localhost:3000/api",
      APP_URL: "http://localhost:3000",
      ENVIRONMENT: "test",
    },
  };

  return configs[nodeEnv as keyof typeof configs] || configs.development;
};

export const envConfig = getEnvConfig();
