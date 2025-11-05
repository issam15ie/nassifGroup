'use strict';

/**
 * project router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/apartments/project/:project',
      handler: 'apartment.findByProject',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
