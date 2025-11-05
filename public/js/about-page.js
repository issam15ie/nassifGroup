// About Page Specific Functions
function toggleHistory() {
    console.log('toggleHistory function called');
    
    // Try multiple ways to find elements
    let fullHistory = document.getElementById('full-history');
    let btnText = document.getElementById('history-btn-text');
    let chevron = document.getElementById('history-chevron');
    
    // Fallback: try querySelector
    if (!fullHistory) fullHistory = document.querySelector('#full-history');
    if (!btnText) btnText = document.querySelector('#history-btn-text');
    if (!chevron) chevron = document.querySelector('#history-chevron');
    
    console.log('Elements found:', {
        fullHistory: !!fullHistory,
        btnText: !!btnText,
        chevron: !!chevron
    });
    
    if (!fullHistory || !btnText || !chevron) {
        console.error('Required elements not found after fallback:', {
            fullHistory: fullHistory,
            btnText: btnText,
            chevron: chevron
        });
        return;
    }
    
    // Get current display state
    const isHidden = fullHistory.style.display === 'none' || fullHistory.style.display === '' || getComputedStyle(fullHistory).display === 'none';
    
    console.log('Current state - isHidden:', isHidden);
    
    // Show popup modal instead of expanding inline
    showHistoryModal();
}

// Function to show history modal
function showHistoryModal() {
    console.log('showHistoryModal function called');
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.id = 'history-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        background: white;
        border-radius: 10px;
        padding: 20px;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Our Full Story</h3>
            <button id="history-modal-close" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
        </div>
        <div style="margin-bottom: 20px;">
            <p>"Nassif Group developments come complete with luxurious finishes, fittings and open spaces. It is little wonder why we have been successful in offering spectacular living environments and outstanding investment opportunities. At Nassif Group, we build wealth through our proven research techniques and understanding of the market. Nassif Group ensures each development has a defined reason for growth in capital value. We have always taken a partnering approach, developing relationships whilst working with asset owners, architects and designers, to understand investor/owner needs and goals, and identify optimal solutions. Nassif Group has been building quality luxury apartments and retail centers for over 11 years in Lebanon. During that time, Nassif Group has become one of Lebanese most respected property developers."</p>
        </div>
        <div style="text-align: right;">
            <button id="history-modal-close-btn" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners for closing
    const closeModal = () => {
        console.log('Closing modal');
        modalOverlay.remove();
        document.removeEventListener('keydown', handleEscape);
    };
    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    
    setTimeout(() => {
        const closeBtn = document.getElementById('history-modal-close');
        const closeBtn2 = document.getElementById('history-modal-close-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        if (closeBtn2) {
            closeBtn2.addEventListener('click', closeModal);
        }
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        document.addEventListener('keydown', handleEscape);
    }, 100);
    
    console.log('History modal shown');
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('About page loaded, setting up event listeners');
    
    // Multiple event listener approaches for reliability
    const toggleButton = document.getElementById('toggle-history-btn');
    
    console.log('Toggle button found:', !!toggleButton);
    console.log('Button element:', toggleButton);
    
    if (toggleButton) {
        // Direct event listener
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle button clicked directly');
            toggleHistory();
        });
        console.log('Direct event listener attached');
    } else {
        console.error('Toggle button not found!');
    }
    
    // Also use event delegation as backup
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'toggle-history-btn' || e.target.closest('#toggle-history-btn'))) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle button clicked via event delegation');
            toggleHistory();
        }
    });
    
    console.log('Event listeners set up');
});
