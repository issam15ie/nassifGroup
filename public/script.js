// Nassif Group Website JavaScript

// Global WhatsApp function - MUST be at top
window.contactAboutProperty = function(projectKey, propertyType) {
    console.log('🟢 WhatsApp function called!', projectKey, propertyType);
    const message = `Hi! I'm interested in ${propertyType} units in ${projectKey}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/96178858784?text=${encodeURIComponent(message)}`;
    console.log('🟢 Opening WhatsApp URL:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
};

// Function to get proper image URL for both local and online (Pinggy) access
function getCleanImageUrl(imageUrl) {
    if (!imageUrl) return '/uploads/colina_Simplex_870135b6ba.jpg';
    
    // Remove localhost URLs and make them relative
    if (imageUrl.includes('localhost:1337')) {
        const match = imageUrl.match(/\/uploads\/[^?]+/);
        return match ? match[0] : '/uploads/colina_Simplex_870135b6ba.jpg';
    }
    
    // If it's already a clean local path, make it absolute
    if (imageUrl.startsWith('uploads/')) {
        return '/' + imageUrl;
    }
    
    // If it has Strapi transformation parameters, remove them and make absolute
    if (imageUrl.includes('?w=') || imageUrl.includes('?h=')) {
        const cleanUrl = imageUrl.split('?')[0];
        // Also remove localhost if present
        if (cleanUrl.includes('localhost:1337')) {
            const match = cleanUrl.match(/\/uploads\/[^?]+/);
            return match ? match[0] : '/uploads/colina_Simplex_870135b6ba.jpg';
        }
        return cleanUrl.startsWith('/') ? cleanUrl : '/' + cleanUrl;
    }
    
    // If it's a full Strapi URL, extract just the uploads path
    if (imageUrl.includes('/uploads/')) {
        const match = imageUrl.match(/\/uploads\/[^?]+/);
        return match ? match[0] : '/uploads/colina_Simplex_870135b6ba.jpg';
    }
    
    // Ensure it starts with / for absolute path
    return imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
}

// Simple mobile menu toggle (since Bootstrap JS is removed due to CSP)
window.toggleMobileMenu = function() {
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
        navbarNav.classList.toggle('show');
    }
};

// Show all projects - Back to main view
window.showAllProjects = function() {
    console.log('🔙 showAllProjects function called!');
    const container = document.getElementById('project-filter-buttons');
    const propertyTypeContainer = document.getElementById('property-type-container');
    const apartmentsContainer = document.getElementById('apartments-container');
    const sectionTitle = document.getElementById('section-title');
    const topNavigation = document.getElementById('top-navigation');
    const projectsHeader = document.getElementById('projects-header');
    
    // Hide other containers and top navigation
    if (apartmentsContainer) apartmentsContainer.style.display = 'none';
    if (propertyTypeContainer) propertyTypeContainer.style.display = 'none';
    if (topNavigation) {
        topNavigation.classList.remove('show');
        topNavigation.classList.add('d-none');
        console.log('🔙 Hiding top navigation');
    }
    
    // Show projects header and hide section title
    if (projectsHeader) {
        projectsHeader.style.display = 'block';
    }
    if (sectionTitle) {
        sectionTitle.style.display = 'none';
    }
    
    // Show the project cards container
    if (container) {
        container.style.display = 'flex';
        container.classList.add('row');
    }
    
    // Recreate project buttons
    createDynamicProjectButtons();
};

// Global variables for Strapi data
let PROJECTS_DATA = {};
let PROPERTY_TYPES_DATA = {};

document.addEventListener('DOMContentLoaded', function() {
    
    // Add event listener for WhatsApp buttons and back button (using event delegation)
    document.addEventListener('click', function(e) {
        // WhatsApp button handler
        if (e.target.closest('.whatsapp-btn')) {
            const btn = e.target.closest('.whatsapp-btn');
            const projectKey = btn.getAttribute('data-project');
            const propertyType = btn.getAttribute('data-type');
            console.log('🟢 WhatsApp button clicked via event listener!', projectKey, propertyType);
            contactAboutProperty(projectKey, propertyType);
        }
        
        // Back to projects button handler
        if (e.target.closest('.back-to-projects-btn') || e.target.closest('[data-action="back"]')) {
            console.log('🔙 Back to projects button clicked!');
            showAllProjects();
        }
        
        // Accordion button handler (custom implementation since Bootstrap JS is removed due to CSP)
        if (e.target.closest('.accordion-button')) {
            const button = e.target.closest('.accordion-button');
            const targetId = button.getAttribute('data-bs-target');
            if (targetId) {
                const collapseElement = document.querySelector(targetId);
                if (collapseElement) {
                    // Toggle collapsed class on button
                    button.classList.toggle('collapsed');
                    
                    // Toggle show class on collapse element
                    collapseElement.classList.toggle('show');
                }
            }
        }
    });
    
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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            const subject = document.querySelector('#subject').value;
            const phone = document.querySelector('#phone').value.trim();
            
            if (!name || !email || !message) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                        subject,
                        phone,
                    }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showAlert('Thank you! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showAlert('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred. Please try again later.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
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
        const featuredContainer = document.querySelector('#featured-properties-container');
        
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
        showNoDataMessage();
    }
}

async function loadApartmentsPage() {
    try {
        // Load projects and property types from Strapi
        await loadProjectsAndPropertyTypes();
        
    } catch (error) {
        console.error('Failed to load from Strapi:', error);
        showNoDataMessage();
    }
    
    // Ensure top navigation is hidden when showing projects
    const topNavigation = document.getElementById('top-navigation');
    if (topNavigation) {
        topNavigation.style.display = 'none';
        console.log('🔙 Hiding top navigation on page load');
    }
    
    // Create dynamic project filter buttons
    console.log('🎯 About to create project buttons. PROJECTS_DATA keys:', Object.keys(PROJECTS_DATA));
    createDynamicProjectButtons();
    
    // Set up functionality after data is loaded (either from Strapi or fallback)
    setupSearchFunctionality();
    setupFilterFunctionality();
    setupPagination();
    
    // Set first available project as default selected
    const projectKeys = Object.keys(PROJECTS_DATA);
    const defaultProject = projectKeys.length > 0 ? projectKeys[0] : null;
    
    // Don't auto-select any project - show project cards for user to choose
    showInitialMessage();
    
    function showInitialMessage() {
        const sectionTitle = document.getElementById('section-title');
        const propertyTypeContainer = document.getElementById('property-type-container');
        const projectContainer = document.getElementById('project-filter-buttons');
        const topNavigation = document.getElementById('top-navigation');
        const projectsHeader = document.getElementById('projects-header');
        
        // Hide property type container and top navigation
        if (propertyTypeContainer) {
            propertyTypeContainer.style.display = 'none';
        }
        if (topNavigation) {
            topNavigation.classList.remove('show');
            topNavigation.classList.add('d-none');
        }
        
        // Show projects header and hide section title
        if (projectsHeader) {
            projectsHeader.style.display = 'block';
        }
        if (sectionTitle) {
            sectionTitle.style.display = 'none';
        }
        
        // Show project container
        if (projectContainer) {
            projectContainer.style.display = 'flex';
            projectContainer.classList.add('row');
        }
    }
}

// Create dynamic project filter buttons from PROJECTS_DATA
function createDynamicProjectButtons() {
    const buttonsContainer = document.getElementById('project-filter-buttons');
    const topNavigation = document.getElementById('top-navigation');
    const projectsHeader = document.getElementById('projects-header');
    
    // Force hide top navigation and show projects header when showing projects
    if (topNavigation) {
        topNavigation.classList.remove('show');
        topNavigation.classList.add('d-none');
        console.log('🔙 Force hiding top navigation in createDynamicProjectButtons');
    }
    if (projectsHeader) {
        projectsHeader.style.display = 'block';
        console.log('🏗️ Showing projects header');
    }
    
    if (!buttonsContainer) {
        console.error('❌ project-filter-buttons container not found!');
        return;
    }
    
    console.log('🏗️ Creating project buttons. Projects available:', Object.keys(PROJECTS_DATA).length);
    
    // Clear existing buttons
    buttonsContainer.innerHTML = '';
    
    if (Object.keys(PROJECTS_DATA).length === 0) {
        console.error('❌ No projects data available!');
        buttonsContainer.innerHTML = '<div class="col-12 text-center"><p>No projects available. Loading...</p></div>';
        return;
    }
    
    // Sort projects: available first, then sold_out
    const sortedProjectKeys = Object.keys(PROJECTS_DATA).sort((a, b) => {
        const projectA = PROJECTS_DATA[a];
        const projectB = PROJECTS_DATA[b];
        
        // Available projects first (status 'available'), then sold_out
        if (projectA.status === 'available' && projectB.status === 'sold_out') return -1;
        if (projectA.status === 'sold_out' && projectB.status === 'available') return 1;
        
        // If same status, maintain original order (by name)
        return projectA.name.localeCompare(projectB.name);
    });
    
    console.log('📊 Projects sorted - Available first, then sold out');
    
    // Create enhanced project cards with background images
    sortedProjectKeys.forEach(projectKey => {
        const project = PROJECTS_DATA[projectKey];
        const projectCard = document.createElement('div');
        projectCard.className = 'col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4';
        
        // Get project background image (from mainImage or default)
        const projectImage = getCleanImageUrl(project.mainImage) || '/uploads/large_depositphotos_45227311_stock_photo_modern_real_estate_6e12e07bdc.jpg';
        
        // Set status classes and content
        const statusClass = project.status === 'available' ? 'available' : 'sold-out';
        const statusIcon = project.status === 'available' ? 'fas fa-check-circle' : 'fas fa-times-circle';
        const statusText = project.status === 'available' ? 'Available' : 'Sold Out';
        
        projectCard.innerHTML = `
            <div class="project-card-enhanced ${statusClass}" data-filter="${projectKey}" style="background-image: url('${projectImage}');">
                <div class="project-card-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description || 'Premium real estate development in prime location'}</p>
                    <div class="project-stats">
                        <span class="stat-item">
                            <i class="fas fa-building"></i> 
                            ${Object.keys(project.propertyTypes).length} Property Types
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-map-marker-alt"></i> 
                            ${project.location || 'Lebanon'}
                        </span>
                    </div>
                    <div class="project-status-badge">
                        <span class="status-badge status-${project.status}">
                            <i class="${statusIcon}"></i> ${statusText}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        // Add click event listener
        const cardElement = projectCard.querySelector('.project-card-enhanced');
        cardElement.addEventListener('click', function() {
            // Debug: Check what status we actually have
            console.log('🔍 Project clicked:', project.name, 'Status:', project.status, 'Type:', typeof project.status);
            
            // Check if project is sold out
            if (project.status === 'sold_out') {
                showSoldOutModal(project.name);
                return;
            }
            
            // Remove active class from all project cards
            document.querySelectorAll('.project-card-enhanced').forEach(card => {
                card.classList.remove('active');
            });
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show property types for selected project
            showPropertyTypes(projectKey);
        });
        
        buttonsContainer.appendChild(projectCard);
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
            console.log('📊 Total projects from database:', projectsResponse.data.length);
            console.log('📋 All project names from API:', projectsResponse.data.map(p => p.attributes.name));
            projectsResponse.data.forEach(project => {
                console.log('📁 Processing project ID:', project.id, 'Name:', project.attributes.name);
                const projectData = {
                    id: project.id,
                    name: project.attributes.name,
                    status: project.attributes.status,
                    description: project.attributes.description,
                    location: project.attributes.location,
                    mainImage: project.attributes.mainImage?.data?.attributes?.url,
                    propertyTypes: {},
                    propertyTypesOrder: [] // Store the order of property types
                };
                
                // Debug: Log the status value
                console.log('📊 Project:', project.attributes.name, 'Status from API:', project.attributes.status, 'Type:', typeof project.attributes.status);
                
                // PRIORITY 1: Use Units table for project-specific property types (BEST approach)
                if (project.attributes.units && project.attributes.units.data && project.attributes.units.data.length > 0) {
                    console.log(`🏗️ Using UNITS table for ${project.attributes.name}:`, project.attributes.units.data.length, 'units');
                    
                    project.attributes.units.data.forEach(unit => {
                        const unitData = unit.attributes;
                        const propertyTypeName = unitData.type; // simplex, duplex, shop
                        
                        console.log(`🖼️ Unit "${unitData.name}" images:`, unitData.images);
                        const unitImageUrl = unitData.images?.data?.[0]?.attributes?.url;
                        console.log(`🖼️ Unit image URL:`, unitImageUrl);
                        
                        projectData.propertyTypes[propertyTypeName] = {
                            id: unit.id,
                            name: propertyTypeName,
                            displayName: unitData.name || propertyTypeName.charAt(0).toUpperCase() + propertyTypeName.slice(1),
                            range: `${unitData.size_min || 100}-${unitData.size_max || 200}m²`,
                            image: getCleanImageUrl(unitImageUrl) || getDefaultImage(propertyTypeName),
                            description: unitData.description || `Premium ${propertyTypeName} units with modern amenities.`,
                            features: [], // Units don't have features array yet
                            status: unitData.status || 'available',
                            priority: 0, // Units don't have priority yet
                            minSize: unitData.size_min,
                            maxSize: unitData.size_max,
                            sizeUnit: 'm²',
                            price: unitData.price
                        };
                        
                        console.log(`🖼️ Final image for ${propertyTypeName}:`, projectData.propertyTypes[propertyTypeName].image);
                        
                        // Store the order (units are already project-specific)
                        projectData.propertyTypesOrder.push(propertyTypeName);
                    });
                }
                // PRIORITY 2: Fallback to Property Types relation (if no units)
                else if (project.attributes.propertyTypes && project.attributes.propertyTypes.data) {
                    console.log(`📋 Using PROPERTY TYPES table for ${project.attributes.name}:`, project.attributes.propertyTypes.data.length, 'types');
                    
                    // Use ONLY Strapi property types relation - single source of truth
                    project.attributes.propertyTypes.data.forEach(pt => {
                        const propertyType = pt.attributes;
                        const propertyTypeName = propertyType.name;
                        
                        // Get project-specific overrides for this property type
                        const overrides = (project.attributes.propertyTypeOverrides && project.attributes.propertyTypeOverrides[propertyTypeName]) || {};
                        
                        projectData.propertyTypes[propertyTypeName] = {
                            id: pt.id,
                            name: propertyTypeName,
                            displayName: overrides.displayName || propertyType.displayName || propertyTypeName.charAt(0).toUpperCase() + propertyTypeName.slice(1),
                            range: overrides.priceRange || propertyType.priceRange || `${propertyType.minSize || 100}-${propertyType.maxSize || 200}${propertyType.sizeUnit || 'm²'}`,
                            image: getCleanImageUrl(overrides.image) || getCleanImageUrl(propertyType.image?.data?.attributes?.url) || getDefaultImage(propertyTypeName),
                            description: overrides.description || propertyType.description || `Premium ${propertyTypeName} units with modern amenities.`,
                            features: overrides.features || propertyType.features || [],
                            status: overrides.status || propertyType.status || 'available',
                            priority: overrides.priority || propertyType.priority || 0,
                            minSize: overrides.minSize || propertyType.minSize,
                            maxSize: overrides.maxSize || propertyType.maxSize,
                            sizeUnit: overrides.sizeUnit || propertyType.sizeUnit
                        };
                        
                        // Store the order based on priority (considering overrides)
                        projectData.propertyTypesOrder.push({
                            name: propertyTypeName,
                            priority: overrides.priority || propertyType.priority || 0
                        });
                    });
                    
                    // Sort property types by priority
                    projectData.propertyTypesOrder.sort((a, b) => a.priority - b.priority);
                    projectData.propertyTypesOrder = projectData.propertyTypesOrder.map(item => item.name);
                }
                
                PROJECTS_DATA[project.attributes.name] = projectData;
                console.log('✅ Added project:', project.attributes.name, 'with property types:', Object.keys(projectData.propertyTypes));
            });
            
            // Process property types data
            PROPERTY_TYPES_DATA = {};
            propertyTypesResponse.data.forEach(pt => {
                const propertyType = pt.attributes;
                const originalImageUrl = propertyType.image?.data?.attributes?.url;
                console.log('🖼️ Original image URL for', propertyType.name, ':', originalImageUrl);
                
                PROPERTY_TYPES_DATA[propertyType.name] = {
                    id: pt.id,
                    name: propertyType.name,
                    displayName: propertyType.displayName,
                    range: `${propertyType.minSize}-${propertyType.maxSize}${propertyType.sizeUnit}`,
                    image: getCleanImageUrl(propertyType.image?.data?.attributes?.url) || getDefaultImage(propertyType.name),
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

// Show message when no data is available
function showNoDataMessage() {
    const propertyListings = document.querySelector('.property-listings');
    const featuredProperties = document.querySelector('#featured-properties-container');
    
    const noDataMessage = `
        <div class="col-12 text-center py-5">
            <div class="alert alert-info">
                <h4><i class="fas fa-info-circle"></i> No Properties Available</h4>
                <p>We're currently updating our property listings. Please check back soon or contact us for more information.</p>
                <a href="contact.html" class="btn btn-primary">Contact Us</a>
            </div>
        </div>
    `;
    
    if (propertyListings) {
        propertyListings.innerHTML = noDataMessage;
    }
    
    if (featuredProperties) {
        featuredProperties.innerHTML = noDataMessage;
    }
}

// Get default image for property type
function getDefaultImage(propertyType) {
    const defaultImages = {
        'simplex': '/uploads/colina_Simplex_870135b6ba.jpg',
        'duplex': '/uploads/bouar_84f7def137.jpg',
        'shops': '/uploads/depositphotos_45227311_stock_photo_modern_real_estate_6e12e07bdc.jpg'
    };
    return defaultImages[propertyType] || '/uploads/colina_Simplex_870135b6ba.jpg';
}

// Helper function to get property type info from relations (clean structure)
function getPropertyTypeInfo(projectKey, propertyTypeName) {
    const projectData = PROJECTS_DATA[projectKey];
    if (!projectData || !projectData.propertyTypes) {
        return null;
    }
    
    return projectData.propertyTypes[propertyTypeName] || null;
}

// All apartments now loaded from database

// Create property type card
function createPropertyTypeCard(projectKey, propertyType, typeData) {
    const col = document.createElement('div');
    col.className = 'col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4';
    
    const card = document.createElement('div');
    card.className = 'property-type-card property-card';
    card.setAttribute('data-project', projectKey);
    card.setAttribute('data-type', propertyType);
    
    const projectData = PROJECTS_DATA[projectKey];
    
    // Only override to sold if project is sold_out, otherwise use individual property type status
    let propertyTypeStatus = projectData.propertyTypes[propertyType]?.status || projectData.status;
    
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
            <img src="${getCleanImageUrl(typeData.image)}" alt="${typeDisplayName}" loading="lazy">
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
                    `<button class="btn btn-success whatsapp-btn" data-project="${projectKey}" data-type="${propertyType}" title="Contact via WhatsApp">
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

// Show property types for selected project - Replace project cards
function showPropertyTypes(projectKey) {
    console.log('🏗️ showPropertyTypes called for:', projectKey);
    const projectData = PROJECTS_DATA[projectKey];
    
    if (!projectData) {
        console.error('❌ Project data not found for:', projectKey);
        return;
    }
    
    console.log('📋 Property types for', projectKey, ':', Object.keys(projectData.propertyTypes));
    
    // Use the same container as projects for seamless transition
    const container = document.getElementById('project-filter-buttons');
    const apartmentsContainer = document.getElementById('apartments-container');
    const sectionTitle = document.getElementById('section-title');
    const topNavigation = document.getElementById('top-navigation');
    const projectsHeader = document.getElementById('projects-header');
    
    // Hide apartments container and show property type container
    if (apartmentsContainer) apartmentsContainer.style.display = 'none';
    if (container) {
        container.style.display = 'flex';
        container.classList.add('row');
        container.classList.remove('d-block');
    }
    
    // Hide projects header and show top navigation with project info
    if (projectsHeader) {
        projectsHeader.style.display = 'none';
    }
    if (topNavigation) {
        topNavigation.classList.add('show');
        topNavigation.classList.remove('d-none');
        
        // Update the project title and subtitle in the top navigation
        const projectTitleTop = document.getElementById('project-title-top');
        const projectSubtitleTop = document.getElementById('project-subtitle-top');
        
        if (projectTitleTop) {
            projectTitleTop.textContent = `${projectData.name} - Property Types`;
        }
        if (projectSubtitleTop) {
            projectSubtitleTop.textContent = 'Choose from available property options';
        }
        
        // Smooth scroll to show back button with some padding above
        setTimeout(() => {
            const rect = topNavigation.getBoundingClientRect();
            const scrollTop = window.pageYOffset + rect.top - 100; // 100px padding above
            
            window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }, 100);
    }
    
    // Hide the section title since we moved it to top navigation
    if (sectionTitle) {
        sectionTitle.style.display = 'none';
    }
    
    // Clear container
    console.log('🧹 Clearing property type container');
    if (container) container.innerHTML = '';
    
    // Create property type cards
    if (Object.keys(projectData.propertyTypes).length > 0) {
        // Display property types in the stored order (from Strapi relations or JSON)
        if (projectData.propertyTypesOrder && projectData.propertyTypesOrder.length > 0) {
            projectData.propertyTypesOrder.forEach(propertyTypeName => {
                const typeData = projectData.propertyTypes[propertyTypeName];
                if (typeData) {
                    const card = createPropertyTypeCard(projectKey, propertyTypeName, typeData);
                    if (container) {
                        container.appendChild(card);
                    }
                }
            });
        } else {
            // Fallback: use Object.entries if no order is stored
            Object.entries(projectData.propertyTypes).forEach(([propertyTypeName, typeData]) => {
                const card = createPropertyTypeCard(projectKey, propertyTypeName, typeData);
                if (container) {
                    container.appendChild(card);
                }
            });
        }
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
    col.className = 'col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4';
    
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-category', apartment.project);
    
    const imageUrl = getCleanImageUrl(apartment.mainImage) || '/uploads/colina_Simplex_870135b6ba.jpg';
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

async function viewApartmentDetails(apartmentId) {
    try {
        // Get apartment details from Strapi
        const apartment = await strapiAPI.getApartmentById(apartmentId);
        
        if (!apartment) {
            alert('Apartment not found');
            return;
        }
        
        // Create and show modal
        showApartmentModal(apartment);
        
    } catch (error) {
        console.error('Failed to load apartment details:', error);
        alert('Failed to load apartment details');
    }
}

// New function to show apartment modal
function showApartmentModal(apartment) {
    // Remove existing modal if any
    const existingModal = document.getElementById('apartmentModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="apartmentModal" tabindex="-1" aria-labelledby="apartmentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="apartmentModalLabel">${apartment.attributes.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${apartment.attributes.mainImage?.url || getDefaultImage(apartment.attributes.propertyType)}" 
                                     class="img-fluid rounded mb-3" alt="${apartment.attributes.name}">
                            </div>
                            <div class="col-md-6">
                                <h4 class="text-primary">${apartment.attributes.currency}${apartment.attributes.price?.toLocaleString()}</h4>
                                <p class="text-muted">${apartment.attributes.location}</p>
                                <div class="row mb-3">
                                    <div class="col-4 text-center">
                                        <i class="fas fa-bed text-primary"></i>
                                        <div><strong>${apartment.attributes.bedrooms}</strong></div>
                                        <small>Bedrooms</small>
                                    </div>
                                    <div class="col-4 text-center">
                                        <i class="fas fa-bath text-primary"></i>
                                        <div><strong>${apartment.attributes.bathrooms}</strong></div>
                                        <small>Bathrooms</small>
                                    </div>
                                    <div class="col-4 text-center">
                                        <i class="fas fa-ruler-combined text-primary"></i>
                                        <div><strong>${apartment.attributes.area}</strong></div>
                                        <small>${apartment.attributes.areaUnit || 'sq ft'}</small>
                                    </div>
                                </div>
                                <p class="mb-3">${apartment.attributes.description || 'Premium property with modern amenities.'}</p>
                                
                                <div class="amenities mb-3">
                                    <h6>Amenities:</h6>
                                    <div class="row">
                                        ${apartment.attributes.parking ? '<div class="col-6"><i class="fas fa-car text-success"></i> Parking</div>' : ''}
                                        ${apartment.attributes.balcony ? '<div class="col-6"><i class="fas fa-home text-success"></i> Balcony</div>' : ''}
                                        ${apartment.attributes.pool ? '<div class="col-6"><i class="fas fa-swimming-pool text-success"></i> Pool</div>' : ''}
                                        ${apartment.attributes.gym ? '<div class="col-6"><i class="fas fa-dumbbell text-success"></i> Gym</div>' : ''}
                                        ${apartment.attributes.security ? '<div class="col-6"><i class="fas fa-shield-alt text-success"></i> Security</div>' : ''}
                                        ${apartment.attributes.elevator ? '<div class="col-6"><i class="fas fa-elevator text-success"></i> Elevator</div>' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ${apartment.attributes.status === 'available' ? 
                            `<a href="https://wa.me/96178858784?text=${encodeURIComponent(`Hi! I'm interested in ${apartment.attributes.name}. Please provide more information.`)}" 
                               class="btn btn-success" target="_blank">
                                <i class="fab fa-whatsapp"></i> Contact via WhatsApp
                            </a>` : 
                            `<span class="badge bg-danger fs-6">SOLD</span>`
                        }
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('apartmentModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    document.getElementById('apartmentModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// View property type details
function viewPropertyTypeDetails(projectKey, propertyType) {
    const projectData = PROJECTS_DATA[projectKey];
    const typeData = projectData.propertyTypes[propertyType];
    const typeDisplayName = strapiAPI.getPropertyTypeDisplayName(propertyType);
    
    // Load apartments for this specific project and property type
    loadApartmentsByProjectAndType(projectKey, propertyType);
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

// Simple modal for sold-out projects
function showSoldOutModal(projectName) {
    // Create modal HTML
    const modalHTML = `
        <div id="soldOutModal" class="custom-modal-overlay">
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <h4 class="custom-modal-title">Sorry, This Project is Sold Out</h4>
                    <button type="button" class="custom-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="custom-modal-body">
                    <p class="mb-4">All units in this project have been sold. Please check our other available projects.</p>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary close-modal-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('soldOutModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = document.getElementById('soldOutModal');
    modal.style.display = 'flex';
    
    // Add event listeners for close buttons
    const closeButton = modal.querySelector('.custom-modal-close');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    
    closeButton.addEventListener('click', closeSoldOutModal);
    closeModalBtn.addEventListener('click', closeSoldOutModal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSoldOutModal();
        }
    });

    // Add escape key to close
    const escapeHandler = function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeSoldOutModal();
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Store the handler so we can remove it later
    modal.escapeHandler = escapeHandler;
}

// Function to close the custom modal
function closeSoldOutModal() {
    console.log('🔴 closeSoldOutModal called');
    const modal = document.getElementById('soldOutModal');
    console.log('🔴 Modal found:', modal);
    
    if (modal) {
        // Remove escape key listener
        if (modal.escapeHandler) {
            document.removeEventListener('keydown', modal.escapeHandler);
        }
        
        modal.style.display = 'none';
        modal.remove();
        console.log('✅ Modal closed and removed');
    } else {
        console.log('❌ Modal not found');
    }
}

