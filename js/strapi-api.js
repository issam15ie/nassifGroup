// Nassif Group Strapi API Integration
class StrapiAPI {
    constructor(baseURL = 'http://localhost:1337/api') {
        this.baseURL = baseURL;
    }

    // Generic API call method
    async apiCall(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Get all apartments with pagination
    async getApartments(page = 1, pageSize = 12, filters = {}) {
        const params = new URLSearchParams({
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'populate': 'mainImage,images',
            'sort': 'priority:desc,createdAt:desc'
        });

        // Add filters
        Object.keys(filters).forEach(key => {
            if (filters[key] !== undefined && filters[key] !== '') {
                params.append(`filters[${key}]`, filters[key]);
            }
        });

        return await this.apiCall(`/apartments?${params}`);
    }

    // Get featured apartments for homepage
    async getFeaturedApartments(limit = 3) {
        return await this.apiCall(`/apartments/featured?limit=${limit}`);
    }

    // Get apartments by location
    async getApartmentsByLocation(location, page = 1, pageSize = 12, status = 'available') {
        return await this.apiCall(`/apartments/location/${location}?page=${page}&pageSize=${pageSize}&status=${status}`);
    }

    // Search apartments
    async searchApartments(query, filters = {}, page = 1, pageSize = 12) {
        const params = new URLSearchParams({
            page: page,
            pageSize: pageSize,
            ...filters
        });

        if (query) {
            params.append('q', query);
        }

        return await this.apiCall(`/apartments/search?${params}`);
    }

    // Get apartment statistics
    async getStats() {
        return await this.apiCall('/apartments/stats');
    }

    // Get single apartment by ID
    async getApartment(id) {
        return await this.apiCall(`/apartments/${id}?populate=mainImage,images,floorPlan,documents`);
    }

    // Get similar apartments
    async getSimilarApartments(apartmentId, location, limit = 4) {
        return await this.apiCall(`/apartments?filters[location]=${location}&filters[id][$ne]=${apartmentId}&pagination[limit]=${limit}&populate=mainImage`);
    }

    // Format apartment data for display
    formatApartment(apartment) {
        return {
            id: apartment.id,
            name: apartment.attributes.name,
            slug: apartment.attributes.slug,
            location: apartment.attributes.location,
            price: apartment.attributes.price,
            currency: apartment.attributes.currency || '$',
            description: apartment.attributes.description,
            shortDescription: apartment.attributes.shortDescription,
            status: apartment.attributes.status,
            bedrooms: apartment.attributes.bedrooms,
            bathrooms: apartment.attributes.bathrooms,
            area: apartment.attributes.area,
            areaUnit: apartment.attributes.areaUnit || 'sq ft',
            isFeatured: apartment.attributes.isFeatured,
            mainImage: apartment.attributes.mainImage?.data?.attributes?.url,
            images: apartment.attributes.images?.data?.map(img => img.attributes.url) || [],
            whatsappMessage: this.generateWhatsAppMessage(apartment.attributes),
            features: apartment.attributes.features,
            createdAt: apartment.attributes.createdAt,
            updatedAt: apartment.attributes.updatedAt
        };
    }

    // Generate WhatsApp message
    generateWhatsAppMessage(apartment) {
        const message = `Hi! I'm interested in this property: *${apartment.name}* - ${apartment.currency}${apartment.price.toLocaleString()} - ${apartment.bedrooms} beds, ${apartment.bathrooms} baths, ${apartment.area} ${apartment.areaUnit || 'sq ft'}. Location: ${apartment.location}, Lebanon. Description: ${apartment.description}`;
        return encodeURIComponent(message);
    }

    // Format price for display
    formatPrice(price, currency = '$') {
        return `${currency}${price.toLocaleString()}`;
    }

    // Get location display name
    getLocationDisplayName(location) {
        const locations = {
            'bouar': 'Bouar',
            'adma': 'Adma',
            'zalka': 'Zalka',
            'ghazir': 'Ghazir'
        };
        return locations[location] || location;
    }

    // Get status display name
    getStatusDisplayName(status) {
        const statuses = {
            'available': 'Available',
            'sold': 'Sold',
            'reserved': 'Reserved',
            'pending': 'Pending'
        };
        return statuses[status] || status;
    }

    // Get status CSS class
    getStatusClass(status) {
        const classes = {
            'available': 'available',
            'sold': 'sold',
            'reserved': 'reserved',
            'pending': 'pending'
        };
        return classes[status] || 'available';
    }
}

// Initialize API instance
const strapiAPI = new StrapiAPI();

// Export for use in other files
window.StrapiAPI = StrapiAPI;
window.strapiAPI = strapiAPI;
