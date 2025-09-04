'use strict';

/**
 * stats router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/apartments/stats',
      handler: 'apartment.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
