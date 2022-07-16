declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ID: string;
      FFLOGS_AUTHORIZE_URL: string;
      FFLOGS_TOKEN_URL: string;
      BASE_URL: string;
    }
  }
}

export {};