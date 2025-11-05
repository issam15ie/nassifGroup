// Static API for Nassif Group - No Strapi required!
class StaticAPI {
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
            
            // Load property types from exported file, or generate from projects
            try {
                const propertyTypesResponse = await fetch('./data/property-types.json');
                this.propertyTypes = await propertyTypesResponse.json();
            } catch (error) {
                // Fallback: generate property types from projects
                this.propertyTypes = this.generatePropertyTypes();
            }
            
            console.log('✅ Static data loaded successfully');
            console.log(`📊 Loaded ${this.projects.length} projects, ${this.apartments.length} apartments, and ${this.propertyTypes.length} property types`);
        } catch (error) {
            console.error('❌ Failed to load static data:', error);
        }
    }

    generatePropertyTypes() {
        const types = new Set();
        this.projects.forEach(project => {
            project.propertyTypes.forEach(type => types.add(type));
        });
        
        return Array.from(types).map(type => ({
            name: type,
            displayName: type.charAt(0).toUpperCase() + type.slice(1),
            description: `${type} units with modern amenities and excellent location`
        }));
    }

    // Get all projects
    getProjects() {
        return { data: this.projects };
    }

    // Get all property types
    getPropertyTypes() {
        return { data: this.propertyTypes };
    }


    // Get apartments by project and property type
    getApartmentsByProjectAndType(project, propertyType, page = 1, pageSize = 12, status = 'available') {
        let filtered = this.apartments.filter(apt => 
            apt.project === project && 
            apt.propertyType === propertyType
        );
        
        if (status) {
            filtered = filtered.filter(apt => apt.status === status);
        }
        
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginated = filtered.slice(start, end);
        
        return {
            data: paginated,
            meta: {
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    total: filtered.length,
                    pageCount: Math.ceil(filtered.length / pageSize)
                }
            }
        };
    }

    // Get apartment by ID
    getApartmentById(id) {
        const apartment = this.apartments.find(apt => apt.id === id);
        return apartment ? { attributes: apartment } : null;
    }

    // Format apartment for display
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
            amenities: apartment.amenities,
            whatsappMessage: `Hi! I'm interested in ${apartment.name}. Please provide more information.`
        };
    }

    // Get property type display name
    getPropertyTypeDisplayName(propertyType) {
        const type = this.propertyTypes.find(t => t.name === propertyType);
        return type ? type.displayName : propertyType;
    }

    // Search apartments
    searchApartments(query, filters = {}, page = 1, pageSize = 12) {
        let filtered = this.apartments;
        
        // Apply filters
        if (filters.project) {
            filtered = filtered.filter(apt => apt.project === filters.project);
        }
        if (filters.propertyType) {
            filtered = filtered.filter(apt => apt.propertyType === filters.propertyType);
        }
        if (filters.status) {
            filtered = filtered.filter(apt => apt.status === filters.status);
        }
        if (filters.minPrice) {
            filtered = filtered.filter(apt => apt.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(apt => apt.price <= filters.maxPrice);
        }
        if (filters.bedrooms) {
            filtered = filtered.filter(apt => apt.bedrooms >= filters.bedrooms);
        }
        if (filters.bathrooms) {
            filtered = filtered.filter(apt => apt.bathrooms >= filters.bathrooms);
        }
        
        // Apply search query
        if (query) {
            const searchTerm = query.toLowerCase();
            filtered = filtered.filter(apt => 
                apt.name.toLowerCase().includes(searchTerm) ||
                apt.description.toLowerCase().includes(searchTerm) ||
                apt.project.toLowerCase().includes(searchTerm)
            );
        }
        
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginated = filtered.slice(start, end);
        
        return {
            data: paginated,
            meta: {
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    total: filtered.length,
                    pageCount: Math.ceil(filtered.length / pageSize)
                }
            }
        };
    }

    // Get apartment statistics
    getStats() {
        const total = this.apartments.length;
        const available = this.apartments.filter(apt => apt.status === 'available').length;
        const sold = this.apartments.filter(apt => apt.status === 'sold').length;
        
        const byProject = {};
        this.projects.forEach(project => {
            byProject[project.name] = this.apartments.filter(apt => apt.project === project.name).length;
        });
        
        return {
            total,
            available,
            sold,
            byProject
        };
    }
}
