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
    {
      method: 'GET',
      path: '/apartments/project/:project/type/:propertyType',
      handler: 'apartment.findByProjectAndType',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
