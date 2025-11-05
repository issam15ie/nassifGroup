const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  // Production: Use PostgreSQL if DATABASE_CLIENT is set to 'postgres'
  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
        debug: false,
      },
    };
  }

  // Development: Use SQLite
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
