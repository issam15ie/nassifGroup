module.exports = ({ env }) => ({
  proxy: true,
  url: env('HOST_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

