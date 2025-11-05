// Site Settings Manager - Load dynamic site settings from Strapi
class SiteSettingsManager {
    constructor() {
        this.strapiAPI = new StrapiAPI();
        this.settings = null;
    }

    async loadSiteSettings() {
        try {
            console.log('🎨 Loading site settings...');
            const response = await this.strapiAPI.getSiteSettings();
            
            if (response && response.data) {
                this.settings = response.data.attributes;
                console.log('✅ Site settings loaded:', this.settings);
                return this.settings;
            } else {
                console.log('⚠️ No site settings found, using defaults');
                return null;
            }
        } catch (error) {
            console.error('❌ Failed to load site settings:', error);
            return null;
        }
    }

    // Apply homepage background image
    applyHomePageBackground() {
        console.log('🎨 Applying homepage background...');
        console.log('🎨 Settings:', this.settings);
        
        if (!this.settings || !this.settings.homePageBackgroundImage) {
            console.log('📷 No custom background found, using default homepage background');
            return;
        }

        console.log('🖼️ Background image data:', this.settings.homePageBackgroundImage);
        const backgroundImageUrl = this.settings.homePageBackgroundImage.data?.attributes?.url;
        
        if (backgroundImageUrl) {
            console.log('🖼️ Applying homepage background URL:', backgroundImageUrl);
            
            // Create or update CSS custom property for background
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const newBackgroundStyle = `linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)), url('${backgroundImageUrl}')`;
                heroSection.style.backgroundImage = newBackgroundStyle;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                
                console.log('✅ Homepage background applied:', newBackgroundStyle);
                console.log('✅ Hero section updated:', heroSection);
            } else {
                console.error('❌ Hero section not found!');
            }
        } else {
            console.log('❌ No background image URL found in data');
        }
    }

    // Apply page-specific background images
    applyPageBackground(pageName) {
        if (!this.settings) return;

        const backgroundMappings = {
            'services': 'servicesPageBackgroundImage',
            'about': 'aboutPageBackgroundImage', 
            'contact': 'contactPageBackgroundImage',
            'blog': 'blogPageBackgroundImage'
        };

        const backgroundField = backgroundMappings[pageName];
        if (!backgroundField || !this.settings[backgroundField]) return;

        const backgroundImageUrl = this.settings[backgroundField].data?.attributes?.url;
        if (backgroundImageUrl) {
            console.log(`🖼️ Applying ${pageName} page background:`, backgroundImageUrl);
            
            // Apply to page header
            const pageHeader = document.querySelector('.page-header');
            if (pageHeader) {
                pageHeader.style.backgroundImage = `linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)), url('${backgroundImageUrl}')`;
                console.log(`✅ ${pageName} page background applied`);
            }
        }
    }

    // Get current page name from URL
    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop().split('.')[0];
        
        if (fileName === 'index' || fileName === '') return 'home';
        return fileName;
    }

    // Update site name and tagline
    updateSiteInfo() {
        console.log('📝 Updating site info...');
        
        // Update page title
        if (this.settings.siteName) {
            const currentPage = this.getCurrentPageName();
            const pageNames = {
                'home': 'Home',
                'services': 'Services',
                'about': 'About',
                'contact': 'Contact', 
                'blog': 'Blog'
            };
            const pageName = pageNames[currentPage] || 'Page';
            document.title = `${this.settings.siteName} - ${pageName}`;
            console.log('✅ Updated page title:', document.title);
        }

        // Update navbar brand text (if any)
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand && this.settings.siteName) {
            // Don't replace logo, but you could add text next to it
            navbarBrand.setAttribute('title', this.settings.siteName);
        }

        // Update hero title and subtitle on homepage
        if (this.getCurrentPageName() === 'home') {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            
            if (heroTitle && this.settings.siteName) {
                // You can customize this logic
                heroTitle.textContent = `Welcome to ${this.settings.siteName}`;
                console.log('✅ Updated hero title');
            }
            
            if (heroSubtitle && this.settings.siteTagline) {
                heroSubtitle.textContent = this.settings.siteTagline;
                console.log('✅ Updated hero subtitle');
            }
        }

        // Update footer site name
        const footerBrand = document.querySelector('.footer-brand');
        if (footerBrand && this.settings.siteName) {
            footerBrand.textContent = this.settings.siteName;
            console.log('✅ Updated footer brand');
        }
    }

    // Update contact information throughout the site
    updateContactInfo() {
        console.log('📞 Updating contact info...');
        
        // Update contact email links
        if (this.settings.contactEmail) {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(link => {
                link.href = `mailto:${this.settings.contactEmail}`;
                if (link.textContent.includes('@') || link.textContent.toLowerCase().includes('email')) {
                    link.textContent = this.settings.contactEmail;
                }
            });
            console.log('✅ Updated email links:', emailLinks.length);
        }

        // Update phone number links
        if (this.settings.contactPhone) {
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.href = `tel:${this.settings.contactPhone}`;
                if (link.textContent.includes('+') || link.textContent.includes('phone')) {
                    link.textContent = this.settings.contactPhone;
                }
            });
            console.log('✅ Updated phone links:', phoneLinks.length);
        }

        // Update WhatsApp buttons
        if (this.settings.whatsappNumber) {
            // Update global WhatsApp function
            if (window.contactAboutProperty) {
                const originalFunction = window.contactAboutProperty;
                window.contactAboutProperty = function(project, propertyType) {
                    const whatsappNumber = siteSettingsManager.settings.whatsappNumber || '96171123456';
                    const message = `Hello! I'm interested in the ${propertyType} units in ${project}. Can you provide more information?`;
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                };
                console.log('✅ Updated WhatsApp function with number:', this.settings.whatsappNumber);
            }

            // Update any static WhatsApp links
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                const url = new URL(link.href);
                url.pathname = `/${this.settings.whatsappNumber}`;
                link.href = url.toString();
            });
            console.log('✅ Updated WhatsApp links:', whatsappLinks.length);
        }

        // Update contact page specific elements
        if (this.getCurrentPageName() === 'contact') {
            this.updateContactPageInfo();
        }
    }

    // Update contact page specific information
    updateContactPageInfo() {
        console.log('📄 Updating contact page info...');
        
        // Update contact details in contact page
        if (this.settings.contactEmail) {
            const emailElements = document.querySelectorAll('.contact-email, #contact-email');
            emailElements.forEach(el => {
                if (el.tagName === 'A') {
                    el.href = `mailto:${this.settings.contactEmail}`;
                }
                el.textContent = this.settings.contactEmail;
            });
        }

        if (this.settings.contactPhone) {
            const phoneElements = document.querySelectorAll('.contact-phone, #contact-phone');
            phoneElements.forEach(el => {
                if (el.tagName === 'A') {
                    el.href = `tel:${this.settings.contactPhone}`;
                }
                el.textContent = this.settings.contactPhone;
            });
        }
    }

    // Initialize site settings for current page
    async initializeForCurrentPage() {
        await this.loadSiteSettings();
        
        const currentPage = this.getCurrentPageName();
        console.log('📄 Current page:', currentPage);
        
        if (currentPage === 'home') {
            this.applyHomePageBackground();
        } else {
            this.applyPageBackground(currentPage);
        }

        // Update site title, tagline, and contact info
        if (this.settings) {
            this.updateSiteInfo();
            this.updateContactInfo();
        }
    }
}

// Global site settings manager
let siteSettingsManager = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    siteSettingsManager = new SiteSettingsManager();
    await siteSettingsManager.initializeForCurrentPage();
});
