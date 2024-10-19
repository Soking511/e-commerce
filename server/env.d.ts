declare namespace NodeJS{
  interface ProcessEnv {
    readonly PORT: number;
    readonly DB: string;
    readonly NODE_ENV: 'development' | 'product';
    readonly JWT_Expire: string;
    readonly JWT_RESET_EXPIRE: string;
    readonly JWT_KEY: string;
    readonly EMAIL_USERNAME: string;
    readonly EMAIL_PASSWORD: string;
    readonly EMAIL_HOST: string;
    readonly APP_NAME: string;
  }
}