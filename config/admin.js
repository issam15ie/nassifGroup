module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'nassif-group-admin-jwt-secret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'nassif-group-api-token-salt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'nassif-group-transfer-token-salt'),
    },
  },
});
