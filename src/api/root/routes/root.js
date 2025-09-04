'use strict';

/**
 * root router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/api',
      handler: 'root.index',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
