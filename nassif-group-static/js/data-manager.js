// Data Manager for Static Website
// This class manages data from JSON files and provides the same API as StrapiAPI

class DataManager {
    constructor() {
        this.projects = [];
        this.apartments = [];
        this.propertyTypes = [];
        this.loadData();
    }

    async loadData() {
        try {
            // Load projects
            const projectsResponse = await fetch('./data/projects.json');
            this.projects = await projectsResponse.json();
            
            // Load apartments
            const apartmentsResponse = await fetch('./data/apartments.json');
            this.apartments = await apartmentsResponse.json();
            
            // Load property types
            const propertyTypesResponse = await fetch('./data/property-types.json');
            this.propertyTypes = await propertyTypesResponse.json();
            
            console.log('✅ JSON data loaded successfully');
            console.log(`📊 Loaded ${this.projects.length} projects, ${this.apartments.length} apartments, and ${this.propertyTypes.length} property types`);
        } catch (error) {
            console.error('❌ Failed to load JSON data:', error);
            // Fallback to embedded data if JSON files fail
            this.loadEmbeddedData();
        }
    }

    loadEmbeddedData() {
        if (typeof EMBEDDED_PROJECTS !== 'undefined') {
            this.projects = EMBEDDED_PROJECTS;
            this.apartments = EMBEDDED_APARTMENTS;
            this.propertyTypes = EMBEDDED_PROPERTY_TYPES;
            console.log('✅ Fallback to embedded data successful');
        } else {
            console.error('❌ No data available - neither JSON nor embedded');
        }
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
        let filtered = this.apartments.filter(apt => {
            const matchesProject = !project || project === 'all' || apt.project === project;
            const matchesType = !propertyType || propertyType === 'all' || apt.propertyType === propertyType;
            const matchesStatus = !status || apt.status === status;
            return matchesProject && matchesType && matchesStatus;
        });

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
window.DataManager = DataManager;
