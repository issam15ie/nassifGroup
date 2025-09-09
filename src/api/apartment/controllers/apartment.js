'use strict';

/**
 * apartment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::apartment.apartment', ({ strapi }) => ({
  // Custom method to get featured apartments
  async findFeatured(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::apartment.apartment', {
        filters: {
          isFeatured: true,
          publishedAt: { $notNull: true }
        },
        populate: ['mainImage', 'images'],
        sort: { priority: 'desc', createdAt: 'desc' },
        limit: 6
      });

      return { data: entities };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Custom method to get apartments by project
  async findByProject(ctx) {
    try {
      const { project } = ctx.params;
      const { page = 1, pageSize = 12, status = 'available' } = ctx.query;

      const entities = await strapi.entityService.findMany('api::apartment.apartment', {
        filters: {
          project: project,
          status: status,
          publishedAt: { $notNull: true }
        },
        populate: ['mainImage', 'images', 'project'],
        sort: { priority: 'desc', createdAt: 'desc' },
        start: (page - 1) * pageSize,
        limit: pageSize
      });

      const total = await strapi.entityService.count('api::apartment.apartment', {
        filters: {
          project: project,
          status: status,
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

  // Custom method to get apartments by project and property type
  async findByProjectAndType(ctx) {
    try {
      const { project, propertyType } = ctx.params;
      const { page = 1, pageSize = 12, status = 'available' } = ctx.query;

      const entities = await strapi.entityService.findMany('api::apartment.apartment', {
        filters: {
          project: project,
          propertyType: propertyType,
          status: status,
          publishedAt: { $notNull: true }
        },
        populate: ['mainImage', 'images', 'project'],
        sort: { priority: 'desc', createdAt: 'desc' },
        start: (page - 1) * pageSize,
        limit: pageSize
      });

      const total = await strapi.entityService.count('api::apartment.apartment', {
        filters: {
          project: project,
          propertyType: propertyType,
          status: status,
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

  // Custom method to search apartments
  async search(ctx) {
    try {
      const { q, project, propertyType, minPrice, maxPrice, bedrooms, bathrooms, status } = ctx.query;
      const { page = 1, pageSize = 12 } = ctx.query;

      let filters = {
        publishedAt: { $notNull: true }
      };

      if (status) {
        filters.status = status;
      }
      // If no status specified, search all apartments (available and sold)

      if (project) {
        filters.project = project;
      }

      if (propertyType) {
        filters.propertyType = propertyType;
      }

      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
      }

      if (bedrooms) {
        filters.bedrooms = parseInt(bedrooms);
      }

      if (bathrooms) {
        filters.bathrooms = parseInt(bathrooms);
      }

      if (q) {
        filters.$or = [
          { name: { $containsi: q } },
          { description: { $containsi: q } },
          { address: { $containsi: q } }
        ];
      }

      const entities = await strapi.entityService.findMany('api::apartment.apartment', {
        filters,
        populate: ['mainImage', 'images', 'project'],
        sort: { priority: 'desc', createdAt: 'desc' },
        start: (page - 1) * pageSize,
        limit: pageSize
      });

      const total = await strapi.entityService.count('api::apartment.apartment', {
        filters
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

  // Custom method to get apartment statistics
  async getStats(ctx) {
    try {
      const total = await strapi.entityService.count('api::apartment.apartment', {
        filters: { publishedAt: { $notNull: true } }
      });

      const available = await strapi.entityService.count('api::apartment.apartment', {
        filters: { 
          status: 'available',
          publishedAt: { $notNull: true }
        }
      });

      const sold = await strapi.entityService.count('api::apartment.apartment', {
        filters: { 
          status: 'sold',
          publishedAt: { $notNull: true }
        }
      });

      const byProject = {};
      const projects = ['bouar 638 (colina)', 'shayle 93', 'fat2a 315', 'mejlaya 246', 'bouar 673', 'zouk 111', 'zouk 2324'];
      
      for (const project of projects) {
        byProject[project] = await strapi.entityService.count('api::apartment.apartment', {
          filters: { 
            project: project,
            publishedAt: { $notNull: true }
          }
        });
      }

      return {
        total,
        available,
        sold,
        byProject
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Override the default find method to include custom logic
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    
    // Note: View count increment removed as updateMany doesn't exist in Strapi v4
    // This can be implemented later with individual updates if needed
    
    return { data, meta };
  }
}));
