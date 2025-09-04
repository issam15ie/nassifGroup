'use strict';

/**
 * location router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/apartments/location/:location',
      handler: 'apartment.findByLocation',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
