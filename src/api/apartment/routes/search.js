'use strict';

/**
 * search router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/apartments/search',
      handler: 'apartment.search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
