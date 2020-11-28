export default function() {
  const { env } = process;

  return {
    env: env.NODE_ENV,
    secret: env.APP_SECRET,
    clientURL: env.APP_CLIENT_URL,
    apiURL: env.APP_API_URL,
    logo: env.APP_LOGO,
  };
};