// Nassif Group Website JavaScript

// Global variables for Strapi data
let PROJECTS_DATA = {};
let PROPERTY_TYPES_DATA = {};

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Strapi integration
    initializeStrapiIntegration();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Property card hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Team card hover effects
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Value card hover effects
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.property-card, .team-card, .value-card, .highlight-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Form validation for contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Alert system
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
            
            // Auto-remove alert after 5 seconds
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }

    // Property search functionality
    const searchInput = document.querySelector('#propertySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const propertyCards = document.querySelectorAll('.property-card');
            
            propertyCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const project = card.querySelector('.property-location').textContent.toLowerCase();
                const propertyType = card.querySelector('.property-type').textContent.toLowerCase();
                const description = card.querySelector('.property-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || project.includes(searchTerm) || propertyType.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Property filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter properties
                const propertyCards = document.querySelectorAll('.property-card');
                const propertyColumns = document.querySelectorAll('.property-listings .col-lg-4');
                
                propertyCards.forEach((card, index) => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        if (propertyColumns[index]) {
                            propertyColumns[index].style.display = 'block';
                        }
                    } else {
                        card.style.display = 'none';
                        if (propertyColumns[index]) {
                            propertyColumns[index].style.display = 'none';
                        }
                    }
                });
                
                // Force left alignment after filtering using CSS Grid
                const propertyRow = document.querySelector('.property-listings .row:nth-child(2)');
                if (propertyRow) {
                    propertyRow.style.display = 'grid';
                    propertyRow.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
                    propertyRow.style.gap = '2rem';
                    propertyRow.style.justifyItems = 'start';
                    propertyRow.style.alignItems = 'start';
                }
                
                // Ensure all visible columns work with grid
                const visibleColumns = document.querySelectorAll('.property-listings .row:nth-child(2) .col-lg-4[style*="display: block"]');
                visibleColumns.forEach(col => {
                    col.style.width = '100%';
                    col.style.maxWidth = 'none';
                    col.style.flex = 'none';
                    col.style.margin = '0';
                    col.style.padding = '0';
                    col.style.float = 'none';
                });
            });
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--secondary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect for back to top button
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#2980b9';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--secondary-color)';
    });

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.href) {
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Remove loading state after a delay (simulate processing)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
                }, 500);
            }
        });
    });

    // Store original button text
    buttons.forEach(button => {
        button.setAttribute('data-original-text', button.innerHTML);
    });

    console.log('Nassif Group website initialized successfully!');
    
});

// Strapi Integration Functions
async function initializeStrapiIntegration() {
    try {
        // Load featured apartments on homepage
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            await loadFeaturedApartments();
        }
        
        // Load apartments on services page
        if (window.location.pathname === '/services.html' || window.location.pathname.endsWith('services.html')) {
            await loadApartmentsPage();
        }
        
        // Load apartment statistics
        // await loadApartmentStats(); // Temporarily disabled due to 404 error
        
    } catch (error) {
        console.error('Strapi integration failed:', error);
        // Fallback to static content if Strapi is not available
        console.log('Falling back to static content');
    }
}

async function loadFeaturedApartments() {
    try {
        const response = await strapiAPI.getFeaturedApartments(3);
        const featuredContainer = document.querySelector('.featured-properties .row:nth-child(2)');
        
        if (featuredContainer && response.data) {
            featuredContainer.innerHTML = '';
            
            response.data.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                featuredContainer.appendChild(apartmentCard);
            });
        }
    } catch (error) {
        console.error('Failed to load featured apartments:', error);
    }
}

async function loadApartmentsPage() {
    try {
        // Load projects and property types from Strapi
        await loadProjectsAndPropertyTypes();
        
    } catch (error) {
        console.error('Failed to load from Strapi:', error);
        // Fallback to static content if Strapi is not available
        console.log('Falling back to static content');
        loadStaticProjectsData();
    }
    
    // Create dynamic project filter buttons
    createDynamicProjectButtons();
    
    // Set up functionality after data is loaded (either from Strapi or fallback)
    setupSearchFunctionality();
    setupFilterFunctionality();
    setupPagination();
    
    // Set first available project as default selected
    const projectKeys = Object.keys(PROJECTS_DATA);
    const defaultProject = projectKeys.length > 0 ? projectKeys[0] : null;
    
    if (defaultProject) {
        const defaultButton = document.querySelector(`[data-filter="${defaultProject}"]`);
        
        if (defaultButton) {
            // Add active class to default button
            defaultButton.classList.add('active');
            
            // Show property types for default project
            showPropertyTypes(defaultProject);
        } else {
            // Fallback: show initial message if button not found
            showInitialMessage();
        }
    } else {
        // Fallback: show initial message if no projects available
        showInitialMessage();
    }
    
    function showInitialMessage() {
        const sectionTitle = document.getElementById('section-title');
        const propertyTypeContainer = document.getElementById('property-type-container');
        
        if (sectionTitle) {
            sectionTitle.textContent = 'Select a Project to View Property Types';
            sectionTitle.style.display = 'block';
        }
        
        if (propertyTypeContainer) {
            propertyTypeContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <h4><i class="fas fa-info-circle"></i> Choose a Project</h4>
                        <p>Select one of the projects above to view available property types and their specifications.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Create dynamic project filter buttons from PROJECTS_DATA
function createDynamicProjectButtons() {
    const buttonsContainer = document.getElementById('project-filter-buttons');
    if (!buttonsContainer) return;
    
    // Clear existing buttons
    buttonsContainer.innerHTML = '';
    
    // Create buttons for each project
    Object.keys(PROJECTS_DATA).forEach(projectKey => {
        const project = PROJECTS_DATA[projectKey];
        const button = document.createElement('button');
        
        // Set button classes based on status
        const statusClass = project.status === 'available' ? 'btn-outline-success' : 'btn-outline-danger';
        button.className = `btn ${statusClass} filter-btn project-button`;
        button.setAttribute('data-filter', projectKey);
        
        // Create button content with status indicator
        const statusIcon = project.status === 'available' ? 'fas fa-check-circle' : 'fas fa-times-circle';
        const statusText = project.status === 'available' ? 'Available' : 'Sold Out';
        
        button.innerHTML = `
            <div class="project-button-content">
                <div class="project-name">${project.name}</div>
                <div class="project-status">
                    <i class="${statusIcon}"></i>
                    <span>${statusText}</span>
                </div>
            </div>
        `;
        
        buttonsContainer.appendChild(button);
    });
}

async function loadApartments(filters = {}, page = 1) {
    try {
        const response = await strapiAPI.getApartments(page, 12, filters);
        const apartmentsContainer = document.getElementById('apartments-container');
        
        if (apartmentsContainer && response.data) {
            apartmentsContainer.innerHTML = '';
            
            // Sort apartments: available first, then sold
            const sortedApartments = response.data.sort((a, b) => {
                if (a.attributes.status === 'available' && b.attributes.status === 'sold') return -1;
                if (a.attributes.status === 'sold' && b.attributes.status === 'available') return 1;
                return 0;
            });
            
            sortedApartments.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                apartmentsContainer.appendChild(apartmentCard);
            });
            
            // Update pagination
            updatePagination(response.meta.pagination);
        }
    } catch (error) {
        console.error('Failed to load apartments:', error);
        // Show error message
        const apartmentsContainer = document.getElementById('apartments-container');
        if (apartmentsContainer) {
            apartmentsContainer.innerHTML = '<div class="col-12 text-center"><p>Failed to load apartments. Please try again later.</p></div>';
        }
    }
}

// Load projects and property types from Strapi
async function loadProjectsAndPropertyTypes() {
    try {
        // Load projects with property types
        const projectsResponse = await strapiAPI.getProjects();
        const propertyTypesResponse = await strapiAPI.getPropertyTypes();
        
        if (projectsResponse.data && propertyTypesResponse.data) {
            // Process projects data
            PROJECTS_DATA = {};
            projectsResponse.data.forEach(project => {
                const projectData = {
                    id: project.id,
                    name: project.attributes.name,
                    status: project.attributes.status,
                    description: project.attributes.description,
                    propertyTypeInfo: project.attributes.propertyTypeInfo || {},
                    propertyTypes: {}
                };
                
                // Process property types for this project
                if (project.attributes.propertyTypes && project.attributes.propertyTypes.data) {
                    project.attributes.propertyTypes.data.forEach(pt => {
                        const propertyType = pt.attributes;
                        // Get range from project's propertyTypeInfo, not from property type
                        const range = projectData.propertyTypeInfo[propertyType.name]?.range || 'N/A';
                        
                        projectData.propertyTypes[propertyType.name] = {
                            id: pt.id,
                            name: propertyType.name,
                            displayName: propertyType.displayName,
                            range: range,
                            image: propertyType.image?.data?.attributes?.url || getDefaultImage(propertyType.name),
                            description: propertyType.description,
                            features: propertyType.features
                        };
                    });
                }
                
                PROJECTS_DATA[project.attributes.name] = projectData;
            });
            
            // Process property types data
            PROPERTY_TYPES_DATA = {};
            propertyTypesResponse.data.forEach(pt => {
                const propertyType = pt.attributes;
                PROPERTY_TYPES_DATA[propertyType.name] = {
                    id: pt.id,
                    name: propertyType.name,
                    displayName: propertyType.displayName,
                    range: `${propertyType.minSize}-${propertyType.maxSize}${propertyType.sizeUnit}`,
                    image: propertyType.image?.data?.attributes?.url || getDefaultImage(propertyType.name),
                    description: propertyType.description,
                    features: propertyType.features
                };
            });
            
        }
    } catch (error) {
        console.error('Failed to load projects and property types from Strapi:', error);
        throw error;
    }
}

// Fallback static data
function loadStaticProjectsData() {
    PROJECTS_DATA = {
        'bouar 638 (colina)': {
            name: 'Bouar 638 (Colina)',
            status: 'available',
            propertyTypeInfo: {
                simplex: {
                    range: '100-145m',
                    status: 'available'
                },
                duplex: {
                    range: '105-165m',
                    status: 'available'
                },
                shops: {
                    range: '50-130m',
                    status: 'available'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '100-145m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '105-165m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                },
                shops: { 
                    displayName: 'Shops',
                    range: '50-130m', 
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                    description: 'Commercial spaces perfect for retail and business use'
                }
            }
        },
        'shayle 93': {
            name: 'Shayle 93',
            status: 'available',
            propertyTypeInfo: {},
            propertyTypes: {}
        },
        'fat2a 315': {
            name: 'Fat2a 315',
            status: 'sold_out',
            propertyTypeInfo: {
                simplex: {
                    range: '80-150m',
                    status: 'sold_out'
                },
                duplex: {
                    range: '120-200m',
                    status: 'sold_out'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '80-150m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '120-200m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                }
            }
        },
        'mejlaya 246': {
            name: 'Mejlaya 246',
            status: 'sold_out',
            propertyTypeInfo: {
                simplex: {
                    range: '90-140m',
                    status: 'sold_out'
                },
                duplex: {
                    range: '130-180m',
                    status: 'sold_out'
                },
                shops: {
                    range: '60-120m',
                    status: 'sold_out'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '90-140m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '130-180m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                },
                shops: { 
                    displayName: 'Shops',
                    range: '60-120m', 
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                    description: 'Commercial spaces perfect for retail and business use'
                }
            }
        },
        'bouar 673': {
            name: 'Bouar 673',
            status: 'sold_out',
            propertyTypeInfo: {
                simplex: {
                    range: '100-180m',
                    status: 'sold_out'
                },
                duplex: {
                    range: '150-250m',
                    status: 'sold_out'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '100-180m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '150-250m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                }
            }
        },
        'zouk 111': {
            name: 'Zouk 111',
            status: 'sold_out',
            propertyTypeInfo: {
                simplex: {
                    range: '70-160m',
                    status: 'sold_out'
                },
                duplex: {
                    range: '140-220m',
                    status: 'sold_out'
                },
                shops: {
                    range: '40-100m',
                    status: 'sold_out'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '70-160m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '140-220m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                },
                shops: { 
                    displayName: 'Shops',
                    range: '40-100m', 
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                    description: 'Commercial spaces perfect for retail and business use'
                }
            }
        },
        'zouk 2324': {
            name: 'Zouk 2324',
            status: 'sold_out',
            propertyTypeInfo: {
                simplex: {
                    range: '85-150m',
                    status: 'sold_out'
                },
                duplex: {
                    range: '130-200m',
                    status: 'sold_out'
                }
            },
            propertyTypes: {
                simplex: { 
                    displayName: 'Simplex',
                    range: '85-150m', 
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
                    description: 'Modern simplex apartments with open layouts and contemporary design'
                },
                duplex: { 
                    displayName: 'Duplex',
                    range: '130-200m', 
                    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                    description: 'Spacious duplex apartments with two levels and premium finishes'
                }
            }
        }
    };
}

// Get default image for property type
function getDefaultImage(propertyType) {
    const defaultImages = {
        'simplex': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        'duplex': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        'shops': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    };
    return defaultImages[propertyType] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop';
}

// All apartments now loaded from database

// Create property type card
function createPropertyTypeCard(projectKey, propertyType, typeData) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const card = document.createElement('div');
    card.className = 'property-type-card property-card';
    card.setAttribute('data-project', projectKey);
    card.setAttribute('data-type', propertyType);
    
    const projectData = PROJECTS_DATA[projectKey];
    
    // Only override to sold if project is sold_out, otherwise use individual property type status
    let propertyTypeStatus = projectData.propertyTypeInfo[propertyType]?.status || projectData.status;
    
    // If project is sold out, override all property type statuses to sold out
    if (projectData.status === 'sold_out') {
        propertyTypeStatus = 'sold';
    }
    
    const statusClass = propertyTypeStatus === 'available' ? 'available' : 'sold';
    const statusText = propertyTypeStatus === 'available' ? 'Available' : 'Sold Out';
    
    // Use displayName from Strapi data or fallback to capitalized property type
    const typeDisplayName = typeData.displayName || propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${typeData.image}" alt="${typeDisplayName}" loading="lazy">
            <div class="property-status ${statusClass}">${statusText}</div>
        </div>
        <div class="property-content">
            <h3>${typeDisplayName}</h3>
            <p class="property-location"><i class="fas fa-building"></i> ${projectData.name}</p>
            <p class="property-range"><i class="fas fa-ruler-combined"></i> ${typeData.range}</p>
            <p class="property-description">${typeData.description || `Premium ${typeDisplayName.toLowerCase()} units with modern amenities and excellent location.`}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-primary flex-grow-1" onclick="viewPropertyTypeDetails('${projectKey}', '${propertyType}')">View Details</button>
                ${propertyTypeStatus === 'available' ? 
                    `<button class="btn btn-success" onclick="contactAboutProperty('${projectKey}', '${propertyType}')" title="Contact via WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>` : 
                    ''
                }
            </div>
        </div>
    `;
    
    col.appendChild(card);
    return col;
}

// Show property types for selected project
function showPropertyTypes(projectKey) {
    const projectData = PROJECTS_DATA[projectKey];
    
    if (!projectData) {
        return;
    }
    
    const container = document.getElementById('property-type-container');
    const apartmentsContainer = document.getElementById('apartments-container');
    const sectionTitle = document.getElementById('section-title');
    
    // Hide apartments container and show property type container
    if (apartmentsContainer) apartmentsContainer.style.display = 'none';
    if (container) {
        container.style.display = 'block';
        container.classList.add('d-block');
    }
    
    // Update section title with styled "Property Types" heading
    if (sectionTitle) {
        sectionTitle.innerHTML = `
            <div class="property-types-header">
                <div class="header-icon">
                    <i class="fas fa-home"></i>
                </div>
                <div class="header-content">
                    <h2>Property Types</h2>
                    <p>Choose from our available property options</p>
                </div>
            </div>
        `;
        sectionTitle.style.display = 'block';
    }
    
    // Clear container
    if (container) container.innerHTML = '';
    
    // Create property type cards
    if (Object.keys(projectData.propertyTypes).length > 0) {
        Object.entries(projectData.propertyTypes).forEach(([type, typeData]) => {
            const card = createPropertyTypeCard(projectKey, type, typeData);
            if (container) {
                container.appendChild(card);
            }
        });
    } else {
            // No property types available for this project
            if (container) {
                container.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-info">
                            <p>no properties available for ${projectData.name.toLowerCase()}</p>
                        </div>
                    </div>
                `;
            }
    }
}

function createApartmentCard(apartment) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-category', apartment.project);
    
    const imageUrl = apartment.mainImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop';
    const statusClass = strapiAPI.getStatusClass(apartment.status);
    const statusText = strapiAPI.getStatusDisplayName(apartment.status);
    const projectText = strapiAPI.getProjectDisplayName(apartment.project);
    const propertyTypeText = strapiAPI.getPropertyTypeDisplayName(apartment.propertyType);
    const priceText = strapiAPI.formatPrice(apartment.price, apartment.currency);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${imageUrl}" alt="${apartment.name}" loading="lazy">
            <div class="property-status ${statusClass}">${statusText}</div>
        </div>
        <div class="property-content">
            <h3>${apartment.name}</h3>
            <p class="property-location"><i class="fas fa-building"></i> ${projectText}</p>
            <p class="property-type"><i class="fas fa-home"></i> ${propertyTypeText}</p>
            <p class="property-price">${priceText}</p>
            <p class="property-description">${apartment.description}</p>
            <div class="property-features mb-3">
                <span class="badge bg-light text-dark me-2"><i class="fas fa-bed"></i> ${apartment.bedrooms} Beds</span>
                <span class="badge bg-light text-dark me-2"><i class="fas fa-bath"></i> ${apartment.bathrooms} Baths</span>
                <span class="badge bg-light text-dark"><i class="fas fa-ruler-combined"></i> ${apartment.area} ${apartment.areaUnit}</span>
            </div>
            ${apartment.status === 'available' ? 
                `<div class="d-flex gap-2">
                    <a href="#" class="btn btn-outline-primary flex-grow-1" onclick="viewApartmentDetails(${apartment.id})">View Details</a>
                    <a href="https://wa.me/96178858784?text=${apartment.whatsappMessage}" class="btn btn-success" target="_blank" title="Contact via WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>` : 
                `<a href="#" class="btn btn-outline-primary w-100" onclick="viewApartmentDetails(${apartment.id})">View Details</a>`
            }
        </div>
    `;
    
    col.appendChild(card);
    return col;
}

function setupSearchFunctionality() {
    const searchInput = document.querySelector('#propertySearch');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                const searchTerm = this.value.trim();
                if (searchTerm.length >= 2) {
                    await performSearch(searchTerm);
                } else if (searchTerm.length === 0) {
                    // Clear search and load all apartments
                    await loadApartments();
                }
            }, 300);
        });
    }
}

async function performSearch(query) {
    try {
        const response = await strapiAPI.searchApartments(query, {}, 1, 12);
        const apartmentsContainer = document.getElementById('apartments-container');
        
        if (apartmentsContainer && response.data) {
            apartmentsContainer.innerHTML = '';
            
            if (response.data.length === 0) {
                apartmentsContainer.innerHTML = '<div class="col-12 text-center"><p>No apartments found matching your search.</p></div>';
                return;
            }
            
            // Sort search results: available first, then sold
            const sortedApartments = response.data.sort((a, b) => {
                if (a.attributes.status === 'available' && b.attributes.status === 'sold') return -1;
                if (a.attributes.status === 'sold' && b.attributes.status === 'available') return 1;
                return 0;
            });
            
            sortedApartments.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                apartmentsContainer.appendChild(apartmentCard);
            });
            
            updatePagination(response.meta.pagination);
        }
    } catch (error) {
        console.error('Search failed:', error);
        const apartmentsContainer = document.getElementById('apartments-container');
        if (apartmentsContainer) {
            apartmentsContainer.innerHTML = '<div class="col-12 text-center"><p>Search failed. Please try again later.</p></div>';
        }
    }
}

function setupFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectKey = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show property types for selected project
                showPropertyTypes(projectKey);
            });
        });
    }
}

function setupPagination() {
    // Pagination will be handled by updatePagination function
}

function updatePagination(pagination) {
    // Safety check for pagination object
    if (!pagination || typeof pagination !== 'object') {
        console.warn('Invalid pagination object:', pagination);
        return;
    }
    
    // Create or update pagination controls
    let paginationContainer = document.querySelector('.pagination-container');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container mt-4';
        document.querySelector('.property-listings .container').appendChild(paginationContainer);
    }
    
    if (pagination.pageCount > 1) {
        paginationContainer.innerHTML = createPaginationHTML(pagination);
        setupPaginationEvents();
    } else {
        paginationContainer.innerHTML = '';
    }
}

function createPaginationHTML(pagination) {
    const { page, pageCount } = pagination;
    let html = '<nav aria-label="Apartment pagination"><ul class="pagination justify-content-center">';
    
    // Previous button
    if (page > 1) {
        html += `<li class="page-item"><a class="page-link" href="#" data-page="${page - 1}">Previous</a></li>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(pageCount, page + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === page ? 'active' : '';
        html += `<li class="page-item ${activeClass}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
    
    // Next button
    if (page < pageCount) {
        html += `<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}">Next</a></li>`;
    }
    
    html += '</ul></nav>';
    return html;
}

function setupPaginationEvents() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            await loadApartments({}, page);
        });
    });
}

async function loadApartmentStats() {
    try {
        const stats = await strapiAPI.getStats();
        
        // Update statistics in company highlights section
        const highlightItems = document.querySelectorAll('.highlight-item h4');
        if (highlightItems.length >= 4) {
            highlightItems[0].textContent = `${stats.total}+`;
            highlightItems[1].textContent = '7'; // Projects
            highlightItems[2].textContent = `${stats.available}+`;
            highlightItems[3].textContent = '15+'; // Years experience
        }
    } catch (error) {
        console.error('Failed to load apartment stats:', error);
    }
}

function viewApartmentDetails(apartmentId) {
    // This function can be expanded to show detailed apartment view
    // For now, you can redirect to a detail page or show a modal
    // window.location.href = `apartment-details.html?id=${apartmentId}`;
}

// View property type details
function viewPropertyTypeDetails(projectKey, propertyType) {
    const projectData = PROJECTS_DATA[projectKey];
    const typeData = projectData.propertyTypes[propertyType];
    const typeDisplayName = strapiAPI.getPropertyTypeDisplayName(propertyType);
    
    // Load apartments for this specific project and property type
    loadApartmentsByProjectAndType(projectKey, propertyType);
}

// Contact about property
function contactAboutProperty(projectKey, propertyType) {
    const projectData = PROJECTS_DATA[projectKey];
    const typeData = projectData.propertyTypes[propertyType];
    const typeDisplayName = strapiAPI.getPropertyTypeDisplayName(propertyType);
    
    const message = `Hi! I'm interested in ${typeDisplayName} units in ${projectData.name}. Size range: ${typeData.range}. Please provide more information about available units and pricing.`;
    const whatsappUrl = `https://wa.me/96178858784?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Load apartments by project and property type
async function loadApartmentsByProjectAndType(projectKey, propertyType) {
    try {
        const response = await strapiAPI.getApartmentsByProjectAndType(projectKey, propertyType, 1, 12);
        const apartmentsContainer = document.getElementById('apartments-container');
        const propertyTypeContainer = document.getElementById('property-type-container');
        const sectionTitle = document.getElementById('section-title');
        
        // Hide property type container and show apartments container
        propertyTypeContainer.style.display = 'none';
        apartmentsContainer.style.display = 'block';
        
        // Update section title
        const projectData = PROJECTS_DATA[projectKey];
        const typeDisplayName = strapiAPI.getPropertyTypeDisplayName(propertyType);
        sectionTitle.textContent = `${projectData.name} - ${typeDisplayName} Units`;
        
        if (apartmentsContainer && response.data) {
            apartmentsContainer.innerHTML = '';
            
            if (response.data.length === 0) {
                apartmentsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p>No ${typeDisplayName.toLowerCase()} units available in ${projectData.name} at the moment.</p>
                        <button class="btn btn-primary" onclick="showPropertyTypes('${projectKey}')">Back to Property Types</button>
                    </div>
                `;
                return;
            }
            
            // Sort apartments: available first, then sold
            const sortedApartments = response.data.sort((a, b) => {
                if (a.attributes.status === 'available' && b.attributes.status === 'sold') return -1;
                if (a.attributes.status === 'sold' && b.attributes.status === 'available') return 1;
                return 0;
            });
            
            sortedApartments.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                apartmentsContainer.appendChild(apartmentCard);
            });
            
            // Add back button
            const backButton = document.createElement('div');
            backButton.className = 'col-12 text-center mt-4';
            backButton.innerHTML = `<button class="btn btn-outline-secondary" onclick="showPropertyTypes('${projectKey}')">Back to Property Types</button>`;
            apartmentsContainer.appendChild(backButton);
            
            // Update pagination
            updatePagination(response.meta.pagination);
        }
    } catch (error) {
        console.error('Failed to load apartments by project and type:', error);
        const apartmentsContainer = document.getElementById('apartments-container');
        if (apartmentsContainer) {
            apartmentsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p>Failed to load apartments. Please try again later.</p>
                    <button class="btn btn-primary" onclick="showPropertyTypes('${projectKey}')">Back to Property Types</button>
                </div>
            `;
        }
    }
}

