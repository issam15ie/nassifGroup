// Website Data Manager - Single JSON File Management
// This class manages all website data from a single JSON file

class WebsiteDataManager {
    constructor() {
        this.data = null;
        this.projects = [];
        this.apartments = [];
        this.propertyTypes = [];
        this.settings = {};
        this.loadData();
    }

    async loadData() {
        try {
            // Load website data from single JSON file
            const response = await fetch('./data/website-data.json');
            this.data = await response.json();
            
            // Extract data sections
            this.projects = this.data.projects || [];
            this.apartments = this.data.apartments || [];
            this.propertyTypes = this.data.propertyTypes || [];
            this.settings = this.data.settings || {};
            
            console.log('✅ Website data loaded successfully');
            console.log(`📊 Loaded ${this.projects.length} projects, ${this.apartments.length} apartments, and ${this.propertyTypes.length} property types`);
        } catch (error) {
            console.error('❌ Failed to load website data:', error);
            // Fallback to embedded data if JSON file fails
            this.loadEmbeddedData();
        }
    }

    loadEmbeddedData() {
        if (typeof EMBEDDED_WEBSITE_DATA !== 'undefined') {
            this.projects = EMBEDDED_WEBSITE_DATA.projects;
            this.apartments = EMBEDDED_WEBSITE_DATA.apartments;
            this.propertyTypes = EMBEDDED_WEBSITE_DATA.propertyTypes;
            this.settings = EMBEDDED_WEBSITE_DATA.settings;
            console.log('✅ Fallback to embedded data successful');
        } else if (typeof EMBEDDED_PROJECTS !== 'undefined') {
            this.projects = EMBEDDED_PROJECTS;
            this.apartments = EMBEDDED_APARTMENTS;
            this.propertyTypes = EMBEDDED_PROPERTY_TYPES;
            console.log('✅ Fallback to legacy embedded data successful');
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

    // Get website settings
    getSettings() {
        return this.settings;
    }

    // Get contact information
    getContactInfo() {
        return {
            phone: this.settings.contactPhone || '+961 78 858 784',
            whatsapp: this.settings.whatsappNumber || '96178858784',
            currency: this.settings.defaultCurrency || '$'
        };
    }
}

// Make it globally available
window.WebsiteDataManager = WebsiteDataManager;
