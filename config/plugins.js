module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 10000000, // 10MB
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.privateemail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: true, // true for 465, false for other ports
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM'),
        defaultReplyTo: env('EMAIL_REPLY_TO'),
      },
    },
  },
});
