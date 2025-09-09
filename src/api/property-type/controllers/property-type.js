'use strict';

/**
 * property-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::property-type.property-type', ({ strapi }) => ({
  // Custom method to get property types by project
  async findByProject(ctx) {
    try {
      const { projectId } = ctx.params;
      const { page = 1, pageSize = 12 } = ctx.query;

      const entities = await strapi.entityService.findMany('api::property-type.property-type', {
        filters: {
          projects: projectId,
          publishedAt: { $notNull: true }
        },
        populate: ['image', 'projects'],
        sort: { priority: 'desc', createdAt: 'desc' },
        start: (page - 1) * pageSize,
        limit: pageSize
      });

      const total = await strapi.entityService.count('api::property-type.property-type', {
        filters: {
          projects: projectId,
          publishedAt: { $notNull: true }
        }
      });

      return {
        data: entities,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total,
          pageCount: Math.ceil(total / pageSize)
        }
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Custom method to get all property types with project information
  async findAllWithProjects(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::property-type.property-type', {
        filters: {
          publishedAt: { $notNull: true }
        },
        populate: ['image', 'projects'],
        sort: { priority: 'desc', createdAt: 'desc' }
      });

      return { data: entities };
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));
