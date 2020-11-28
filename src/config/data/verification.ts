export default function() {
  const { env } = process;

  return {
    subject: env.VERIFICATION_SUBJECT,
    from: env.VERIFICATION_FROM,
    tokenLifetime: env.VERIFICATION_TOKEN_LIFETIME,
  };
};