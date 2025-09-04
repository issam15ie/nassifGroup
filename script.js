// Nassif Group Website JavaScript
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
                const location = card.querySelector('.property-location').textContent.toLowerCase();
                const description = card.querySelector('.property-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || location.includes(searchTerm) || description.includes(searchTerm)) {
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
        if (window.location.pathname === '/services.html') {
            await loadApartmentsPage();
        }
        
        // Load apartment statistics
        await loadApartmentStats();
        
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
        // Load initial apartments
        await loadApartments();
        
        // Set up search functionality
        setupSearchFunctionality();
        
        // Set up filter functionality
        setupFilterFunctionality();
        
        // Set up pagination
        setupPagination();
        
    } catch (error) {
        console.error('Failed to load apartments page:', error);
    }
}

async function loadApartments(filters = {}, page = 1) {
    try {
        const response = await strapiAPI.getApartments(page, 12, filters);
        const apartmentsContainer = document.querySelector('.property-listings .row:nth-child(2)');
        
        if (apartmentsContainer && response.data) {
            apartmentsContainer.innerHTML = '';
            
            response.data.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                apartmentsContainer.appendChild(apartmentCard);
            });
            
            // Update pagination
            updatePagination(response.meta.pagination);
        }
    } catch (error) {
        console.error('Failed to load apartments:', error);
    }
}

function createApartmentCard(apartment) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-category', apartment.location);
    
    const imageUrl = apartment.mainImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop';
    const statusClass = strapiAPI.getStatusClass(apartment.status);
    const statusText = strapiAPI.getStatusDisplayName(apartment.status);
    const locationText = strapiAPI.getLocationDisplayName(apartment.location);
    const priceText = strapiAPI.formatPrice(apartment.price, apartment.currency);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${imageUrl}" alt="${apartment.name}" loading="lazy">
            <div class="property-status ${statusClass}">${statusText}</div>
        </div>
        <div class="property-content">
            <h3>${apartment.name}</h3>
            <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${locationText}, Lebanon</p>
            <p class="property-price">${priceText}</p>
            <p class="property-description">${apartment.description}</p>
            <div class="property-features mb-3">
                <span class="badge bg-light text-dark me-2"><i class="fas fa-bed"></i> ${apartment.bedrooms} Beds</span>
                <span class="badge bg-light text-dark me-2"><i class="fas fa-bath"></i> ${apartment.bathrooms} Baths</span>
                <span class="badge bg-light text-dark"><i class="fas fa-ruler-combined"></i> ${apartment.area} ${apartment.areaUnit}</span>
            </div>
            <div class="d-flex gap-2">
                <a href="#" class="btn btn-outline-primary flex-grow-1" onclick="viewApartmentDetails(${apartment.id})">View Details</a>
                <a href="https://wa.me/96178858784?text=${apartment.whatsappMessage}" class="btn btn-success" target="_blank" title="Contact via WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
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
                if (searchTerm.length >= 2 || searchTerm.length === 0) {
                    await performSearch(searchTerm);
                }
            }, 300);
        });
    }
}

async function performSearch(query) {
    try {
        const response = await strapiAPI.searchApartments(query, {}, 1, 12);
        const apartmentsContainer = document.querySelector('.property-listings .row:nth-child(2)');
        
        if (apartmentsContainer && response.data) {
            apartmentsContainer.innerHTML = '';
            
            if (response.data.length === 0) {
                apartmentsContainer.innerHTML = '<div class="col-12 text-center"><p>No apartments found matching your search.</p></div>';
                return;
            }
            
            response.data.forEach(apartment => {
                const formattedApartment = strapiAPI.formatApartment(apartment);
                const apartmentCard = createApartmentCard(formattedApartment);
                apartmentsContainer.appendChild(apartmentCard);
            });
            
            updatePagination(response.pagination);
        }
    } catch (error) {
        console.error('Search failed:', error);
    }
}

function setupFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Load apartments with filter
                const filters = filter === 'all' ? {} : { location: filter };
                await loadApartments(filters, 1);
            });
        });
    }
}

function setupPagination() {
    // Pagination will be handled by updatePagination function
}

function updatePagination(pagination) {
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
            highlightItems[1].textContent = '4'; // Locations
            highlightItems[2].textContent = `${stats.available}+`;
            highlightItems[3].textContent = '15+'; // Years experience
        }
    } catch (error) {
        console.error('Failed to load apartment stats:', error);
    }
}

function viewApartmentDetails(apartmentId) {
    // This function can be expanded to show detailed apartment view
    console.log('View apartment details:', apartmentId);
    // For now, you can redirect to a detail page or show a modal
    // window.location.href = `apartment-details.html?id=${apartmentId}`;
}
