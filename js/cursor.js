/**
 * Custom Cursor Effect - Simplified Version
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768 && !isTouchDevice()) {
        initCustomCursor();
    }
});

/**
 * Initialize custom cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show custom cursor
    cursor.style.display = 'block';
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Position cursor - direct positioning for responsiveness
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Detect interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, .skill-card, .work-card, .social-icon, [data-cursor="pointer"]');
    
    interactiveElements.forEach(el => {
        // Hover effect
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
        
        // Handle clicking state
        el.addEventListener('mousedown', () => {
            cursor.classList.add('cursor-click');
        });
        
        el.addEventListener('mouseup', () => {
            cursor.classList.remove('cursor-click');
        });
        
        // Hide default cursor on interactive elements
        el.style.cursor = 'none';
    });
    
    // Detect elements that need a different cursor style
    document.querySelectorAll('[data-cursor-text]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-text');
            const text = el.getAttribute('data-cursor-text');
            if (text) {
                const textElement = document.createElement('span');
                textElement.className = 'cursor-custom-text';
                textElement.textContent = text;
                cursor.appendChild(textElement);
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-text');
            const textElement = cursor.querySelector('.cursor-custom-text');
            if (textElement) {
                cursor.removeChild(textElement);
            }
        });
    });
    
    // Handle cursor leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Handle cursor on page load
    cursor.style.opacity = '0';
    setTimeout(() => {
        cursor.style.opacity = '1';
    }, 500);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            document.body.style.cursor = '';
            
            // Reset cursor styles on interactive elements
            interactiveElements.forEach(el => {
                el.style.cursor = '';
            });
        } else {
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
            
            // Re-apply cursor styles
            interactiveElements.forEach(el => {
                el.style.cursor = 'none';
            });
        }
    });
}

/**
 * Detect if device is touch-enabled
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

/**
 * Add custom cursor behavior for specific elements
 */
function addCustomCursorEffects() {
    // Magnetic effect on buttons
    document.querySelectorAll('.btn, .social-icon-large').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const cursor = document.querySelector('.cursor-follower');
            if (!cursor || window.innerWidth <= 768) return;
            
            const rect = this.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to button center
            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            
            // Add subtle magnetic effect to cursor
            const magnetX = e.clientX - distanceX * 0.2;
            const magnetY = e.clientY - distanceY * 0.2;
            cursor.style.left = `${magnetX}px`;
            cursor.style.top = `${magnetY}px`;
            
            // Apply style changes
            cursor.style.width = '60px';
            cursor.style.height = '60px';
        });
        
        button.addEventListener('mouseleave', function() {
            const cursor = document.querySelector('.cursor-follower');
            if (!cursor) return;
            
            cursor.style.width = '30px';
            cursor.style.height = '30px';
        });
    });
    
    // Custom effects for different sections
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            const cursor = document.querySelector('.cursor-follower');
            if (!cursor) return;
            
            const sectionId = this.id;
            
            // Apply different cursor styles based on section
            switch(sectionId) {
                case 'hero':
                    cursor.style.mixBlendMode = 'difference';
                    break;
                case 'skills':
                    cursor.style.mixBlendMode = 'normal';
                    break;
                default:
                    cursor.style.mixBlendMode = '';
            }
        });
    });
}

// Initialize additional cursor effects
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768 && !isTouchDevice()) {
        addCustomCursorEffects();
    }
});
