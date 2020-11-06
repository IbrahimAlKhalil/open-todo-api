export default function() {
  const { env } = process;

  return {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  };
};