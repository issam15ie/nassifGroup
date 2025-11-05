// Embedded Static API - No fetch required, works with file:// protocol
class EmbeddedStaticAPI {
    constructor() {
        this.projects = EMBEDDED_PROJECTS;
        this.apartments = EMBEDDED_APARTMENTS;
        this.propertyTypes = EMBEDDED_PROPERTY_TYPES;
        console.log('✅ Embedded data loaded successfully');
        console.log(`📊 Loaded ${this.projects.length} projects, ${this.apartments.length} apartments, and ${this.propertyTypes.length} property types`);
    }

    // Simulate Strapi API response format
    async getProjects() {
        return {
            data: this.projects,
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 100,
                    pageCount: 1,
                    total: this.projects.length
                }
            }
        };
    }

    async getPropertyTypes() {
        return {
            data: this.propertyTypes,
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 100,
                    pageCount: 1,
                    total: this.propertyTypes.length
                }
            }
        };
    }

    async getFeaturedApartments(limit = 3) {
        const featured = this.apartments.filter(apt => apt.isFeatured).slice(0, limit);
        return {
            data: featured,
            meta: {
                pagination: {
                    page: 1,
                    pageSize: limit,
                    pageCount: 1,
                    total: featured.length
                }
            }
        };
    }

    async getApartmentsByProjectAndType(project, propertyType, page = 1, pageSize = 12, status = 'available') {
        console.log('🔍 Filtering apartments:', { project, propertyType, status, totalApartments: this.apartments.length });
        
        let filtered = this.apartments.filter(apt => {
            const matchesProject = !project || project === 'all' || apt.project === project;
            const matchesType = !propertyType || propertyType === 'all' || apt.propertyType === propertyType;
            const matchesStatus = !status || apt.status === status;
            
            console.log(`🏠 Apartment "${apt.name}":`, {
                project: apt.project,
                propertyType: apt.propertyType,
                status: apt.status,
                matchesProject,
                matchesType,
                matchesStatus,
                passes: matchesProject && matchesType && matchesStatus
            });
            
            return matchesProject && matchesType && matchesStatus;
        });
        
        console.log(`✅ Filtered ${filtered.length} apartments from ${this.apartments.length} total`);

        // Pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filtered.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            meta: {
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    pageCount: Math.ceil(filtered.length / pageSize),
                    total: filtered.length
                }
            }
        };
    }

    async getApartmentById(apartmentId) {
        const apartment = this.apartments.find(apt => apt.id == apartmentId);
        return apartment || null;
    }

    formatApartment(apartment) {
        return {
            id: apartment.id,
            name: apartment.name,
            project: apartment.project,
            propertyType: apartment.propertyType,
            status: apartment.status,
            price: apartment.price,
            currency: apartment.currency,
            bedrooms: apartment.bedrooms,
            bathrooms: apartment.bathrooms,
            area: apartment.area,
            areaUnit: apartment.areaUnit,
            description: apartment.description,
            isFeatured: apartment.isFeatured,
            mainImage: apartment.mainImage,
            amenities: apartment.amenities
        };
    }

    getPropertyTypeDisplayName(propertyType) {
        const type = this.propertyTypes.find(pt => pt.name === propertyType);
        return type ? type.displayName : propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
    }

    getDefaultImage(propertyType) {
        const defaultImages = {
            'simplex': 'uploads/colina_Simplex_870135b6ba.jpg',
            'duplex': 'uploads/bouar_84f7def137.jpg',
            'shops': 'uploads/depositphotos_45227311_stock_photo_modern_real_estate_6e12e07bdc.jpg'
        };
        return defaultImages[propertyType] || defaultImages['simplex'];
    }
}

// Make it globally available
window.EmbeddedStaticAPI = EmbeddedStaticAPI;
