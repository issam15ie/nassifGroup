module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contact',
      handler: 'contact.sendMessage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
