'use strict';

/**
 * property-type project router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/property-types/project/:projectId',
      handler: 'property-type.findByProject',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/property-types/with-projects',
      handler: 'property-type.findAllWithProjects',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
