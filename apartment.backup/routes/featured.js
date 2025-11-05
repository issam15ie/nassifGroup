'use strict';

/**
 * featured router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/apartments/featured',
      handler: 'apartment.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
