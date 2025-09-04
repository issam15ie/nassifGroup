'use strict';

/**
 * root controller
 */

module.exports = {
  async index(ctx) {
    ctx.body = {
      message: 'Nassif Group Real Estate API',
      version: '1.0.0',
      endpoints: {
        apartments: '/api/apartments',
        featured: '/api/apartments/featured',
        search: '/api/apartments/search',
        stats: '/api/apartments/stats'
      }
    };
  }
};
