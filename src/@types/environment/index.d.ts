declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGPORT: number | undefined;
    }
  }
}

export {};
