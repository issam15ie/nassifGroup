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
            'populate': 'mainImage,images,project',
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

    // Get apartments by project
    async getApartmentsByProject(project, page = 1, pageSize = 12, status = 'available') {
        return await this.apiCall(`/apartments/project/${project}?page=${page}&pageSize=${pageSize}&status=${status}`);
    }

    // Get apartments by project and property type
    async getApartmentsByProjectAndType(project, propertyType, page = 1, pageSize = 12, status = 'available') {
        return await this.apiCall(`/apartments/project/${project}/type/${propertyType}?page=${page}&pageSize=${pageSize}&status=${status}`);
    }

    // Search apartments using regular find endpoint with filters
    async searchApartments(query, filters = {}, page = 1, pageSize = 12) {
        // First get all apartments
        const allApartments = await this.getApartments(1, 100, {}); // Get more apartments for search
        
        if (!query) {
            return allApartments;
        }
        
        // Filter apartments on the client side
        const filteredData = allApartments.data.filter(apartment => {
            const name = apartment.attributes.name?.toLowerCase() || '';
            const description = apartment.attributes.description?.toLowerCase() || '';
            const address = apartment.attributes.address?.toLowerCase() || '';
            const searchTerm = query.toLowerCase();
            
            return name.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   address.includes(searchTerm);
        });
        
        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        return {
            data: paginatedData,
            meta: {
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    pageCount: Math.ceil(filteredData.length / pageSize),
                    total: filteredData.length
                }
            }
        };
    }

    // Get apartment statistics
    async getStats() {
        return await this.apiCall('/apartments/stats');
    }

    // Get all projects
    async getProjects() {
        return await this.apiCall('/projects?populate=propertyTypes,mainImage,images');
    }

    // Get project by ID or slug
    async getProject(id) {
        return await this.apiCall(`/projects/${id}?populate=propertyTypes,mainImage,images`);
    }

    // Get all property types
    async getPropertyTypes() {
        return await this.apiCall('/property-types?populate=image,projects');
    }

    // Get property types by project
    async getPropertyTypesByProject(projectId) {
        return await this.apiCall(`/property-types/project/${projectId}?populate=image,projects`);
    }

    // Get all property types with project information
    async getPropertyTypesWithProjects() {
        return await this.apiCall('/property-types/with-projects');
    }

    // Get single apartment by ID
    async getApartment(id) {
        return await this.apiCall(`/apartments/${id}?populate=mainImage,images,floorPlan,documents`);
    }

    // Get similar apartments
    async getSimilarApartments(apartmentId, project, limit = 4) {
        return await this.apiCall(`/apartments?filters[project]=${project}&filters[id][$ne]=${apartmentId}&pagination[limit]=${limit}&populate=mainImage,project`);
    }

    // Format apartment data for display
    formatApartment(apartment) {
        return {
            id: apartment.id,
            name: apartment.attributes.name,
            slug: apartment.attributes.slug,
            project: apartment.attributes.project?.data?.attributes?.name || apartment.attributes.project,
            propertyType: apartment.attributes.propertyType,
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
        const projectName = apartment.project?.data?.attributes?.name || apartment.project || 'Unknown Project';
        const message = `Hi! I'm interested in this property: *${apartment.name}* - ${apartment.currency}${apartment.price.toLocaleString()} - ${apartment.bedrooms} beds, ${apartment.bathrooms} baths, ${apartment.area} ${apartment.areaUnit || 'sq ft'}. Project: ${projectName}. Description: ${apartment.description}`;
        return encodeURIComponent(message);
    }

    // Format price for display
    formatPrice(price, currency = '$') {
        return `${currency}${price.toLocaleString()}`;
    }

    // Get project display name
    getProjectDisplayName(project) {
        const projects = {
            'bouar 638 (colina)': 'Bouar 638 (Colina)',
            'shayle 93': 'Shayle 93',
            'fat2a 315': 'Fat2a 315',
            'mejlaya 246': 'Mejlaya 246',
            'bouar 673': 'Bouar 673',
            'zouk 111': 'Zouk 111',
            'zouk 2324': 'Zouk 2324'
        };
        return projects[project] || project;
    }

    // Get property type display name
    getPropertyTypeDisplayName(propertyType) {
        const types = {
            'simplex': 'Simplex',
            'duplex': 'Duplex',
            'shops': 'Shops'
        };
        return types[propertyType] || propertyType;
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
