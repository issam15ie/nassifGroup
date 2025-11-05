'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set public permissions for apartment API
    const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
    
    // Get the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Grant permissions for apartment API only (for now)
      const permissions = [
        {
          action: 'api::apartment.apartment.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.create',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.update',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.findFeatured',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.findByProject',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.findByProjectAndType',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.search',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::apartment.apartment.getStats',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::property-type.property-type.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::property-type.property-type.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::property-type.property-type.findByProject',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::property-type.property-type.findAllWithProjects',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::project.project.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::project.project.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::unit.unit.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::unit.unit.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::site-setting.site-setting.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
        {
          action: 'api::contact.contact.sendMessage',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRole.id,
        },
      ];

      // Create or update permissions
      for (const permission of permissions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: permission.action,
              role: permission.role,
            },
          });

        if (!existingPermission) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({ data: permission });
        }
      }

      console.log('✅ Public permissions set for apartment API');
    }
  },
};
