'use strict';

/**
 * apartment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::apartment.apartment', ({ strapi }) => ({
  // Custom service method to generate WhatsApp message
  generateWhatsAppMessage(apartment) {
    const message = `Hi! I'm interested in this property: *${apartment.name}* - ${apartment.currency}${apartment.price.toLocaleString()} - ${apartment.bedrooms} beds, ${apartment.bathrooms} baths, ${apartment.area} ${apartment.areaUnit}. Location: ${apartment.location}, Lebanon. Description: ${apartment.description}`;
    return encodeURIComponent(message);
  },

  // Custom service method to format price
  formatPrice(price, currency = '$') {
    return `${currency}${price.toLocaleString()}`;
  },

  // Custom service method to get similar apartments
  async getSimilar(apartmentId, location, limit = 4) {
    try {
      const apartments = await strapi.entityService.findMany('api::apartment.apartment', {
        filters: {
          id: { $ne: apartmentId },
          location: location,
          publishedAt: { $notNull: true }
        },
        populate: ['mainImage'],
        sort: { priority: 'desc', createdAt: 'desc' },
        limit
      });

      return apartments;
    } catch (err) {
      strapi.log.error('Error getting similar apartments:', err);
      return [];
    }
  },

  // Custom service method to get featured apartments for homepage
  async getFeaturedForHomepage(limit = 3) {
    try {
      const apartments = await strapi.entityService.findMany('api::apartment.apartment', {
        filters: {
          isFeatured: true,
          status: 'available',
          publishedAt: { $notNull: true }
        },
        populate: ['mainImage'],
        sort: { priority: 'desc', createdAt: 'desc' },
        limit
      });

      return apartments;
    } catch (err) {
      strapi.log.error('Error getting featured apartments:', err);
      return [];
    }
  }
}));
