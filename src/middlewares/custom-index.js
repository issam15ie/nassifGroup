module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // If the request is for the root path "/"
    if (ctx.path === '/' && ctx.method === 'GET') {
      // Redirect to index.html
      ctx.redirect('/index.html');
      return;
    }
    await next();
  };
};
