// Property Type Helper - Add this to Strapi admin for help button
(function() {
    'use strict';
    
    // Wait for Strapi admin to load
    function waitForStrapi() {
        if (typeof window.strapi !== 'undefined') {
            addPropertyTypeHelper();
        } else {
            setTimeout(waitForStrapi, 100);
        }
    }
    
    function addPropertyTypeHelper() {
        // Look for propertyTypeInfo field
        const propertyTypeField = document.querySelector('[name="propertyTypeInfo"]');
        if (!propertyTypeField) return;
        
        // Create help button
        const helpButton = document.createElement('button');
        helpButton.innerHTML = '📋 Property Type Guide';
        helpButton.style.cssText = `
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
            font-size: 14px;
        `;
        
        // Add click handler
        helpButton.onclick = function() {
            showPropertyTypeGuide();
        };
        
        // Find the field container and add button
        const fieldContainer = propertyTypeField.closest('.form-group, .field');
        if (fieldContainer) {
            const label = fieldContainer.querySelector('label');
            if (label) {
                label.appendChild(helpButton);
            }
        }
    }
    
    function showPropertyTypeGuide() {
        const exampleJSON = {
            "_guide": "PROPERTY TYPE INFO GUIDE - Define property types, sizes, status, and images. Fields: range (size range), status (available/sold_out), image (full URL). Order matters: first in JSON = first displayed on website.",
            "_example": "Copy this structure and replace with your actual property types",
            "_instructions": "1. Delete _guide, _example, and _instructions fields when done. 2. Replace simplex/duplex/shops with your actual property types. 3. Use exactly 'available' or 'sold_out' for status.",
            "simplex": {
                "range": "100-145m",
                "status": "available",
                "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
            },
            "duplex": {
                "range": "105-165m",
                "status": "available",
                "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
            },
            "shops": {
                "range": "50-130m",
                "status": "sold_out",
                "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
            }
        };
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #2c3e50;">Property Type Info Guide</h2>
                <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3>📋 Purpose</h3>
                <p>Define property types, sizes, status, and images for this project.</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3>🔧 Fields Explained</h3>
                <ul>
                    <li><strong>range:</strong> Size range (e.g., "100-145m")</li>
                    <li><strong>status:</strong> Must be exactly "available" or "sold_out"</li>
                    <li><strong>image:</strong> Full URL to property type image</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3>📋 Important Notes</h3>
                <ul>
                    <li>Order matters: First property type in JSON = First displayed on website</li>
                    <li>Use exactly "available" or "sold_out" for status</li>
                    <li>Images are optional but recommended</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3>📝 Example JSON</h3>
                <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${JSON.stringify(exampleJSON, null, 2)}</pre>
            </div>
            
            <div style="text-align: center;">
                <button onclick="copyExampleJSON()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">📋 Copy Example</button>
                <button onclick="this.closest('.modal').remove()" style="background: #95a5a6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add copy function
        window.copyExampleJSON = function() {
            navigator.clipboard.writeText(JSON.stringify(exampleJSON, null, 2)).then(function() {
                alert('Example JSON copied to clipboard!');
            });
        };
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForStrapi);
    } else {
        waitForStrapi();
    }
})();
