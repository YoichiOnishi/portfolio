/**
 * Animations for Yoichi Onishi's Portfolio
 */

// Set up intersection observer for animations
document.addEventListener('DOMContentLoaded', function() {
    // Define the Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create the observer instance for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for standard animations
                entry.target.classList.add('visible');
                
                // Add specific animation classes if they exist
                if (entry.target.classList.contains('stagger-fade-in')) {
                    entry.target.classList.add('animated');
                }
                
                if (entry.target.classList.contains('grow-line')) {
                    entry.target.classList.add('animated');
                }
                
                if (entry.target.classList.contains('blur-in')) {
                    entry.target.classList.add('animated');
                }
                
                if (entry.target.classList.contains('fade-in-bottom') || 
                    entry.target.classList.contains('fade-in-top') || 
                    entry.target.classList.contains('fade-in-left') || 
                    entry.target.classList.contains('fade-in-right')) {
                    entry.target.classList.add('animated');
                }
                
                // Animate skill progress bars
                if (entry.target.classList.contains('skill-progress')) {
                    const percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.width = percentage + '%';
                }
                
                // Stop observing after animation is triggered
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.reveal-element, .stagger-fade-in, .grow-line, .blur-in, .fade-in-bottom, .fade-in-top, .fade-in-left, .fade-in-right, .skill-progress').forEach(element => {
        animationObserver.observe(element);
    });

    // Advanced animations for scrolling effects
    initParallaxEffect();
    initScrollProgress();
    initCounterAnimation();
});

/**
 * Initialize parallax scrolling effect
 */
function initParallaxEffect() {
    // Get all elements that should have parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Set up scroll listener for parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Initialize scroll progress indicators
 */
function initScrollProgress() {
    // Progress bar for entire page
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }
    
    // Progress indicators for sections
    const sectionProgressElements = document.querySelectorAll('.section-progress');
    
    sectionProgressElements.forEach(element => {
        const section = element.closest('section');
        
        if (section) {
            window.addEventListener('scroll', () => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.pageYOffset;
                const windowHeight = window.innerHeight;
                
                if (scrollPosition + windowHeight > sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const progress = ((scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight)) * 100;
                    element.style.width = Math.min(progress, 100) + '%';
                }
            });
        }
    });
}

/**
 * Initialize counter animations for numbers
 */
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration') || 2000);
                let start = 0;
                const startTime = performance.now();
                
                // Animation function for counting up
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Calculate current count using easing function
                    const count = Math.floor(progress * target);
                    counter.textContent = count;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Text splitting for letter-by-letter animations
 */
function initTextSplitting() {
    document.querySelectorAll('.split-text').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        // Split text into individual characters with spans
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text[i];
            charSpan.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(charSpan);
        }
    });
}

/**
 * Advanced hover effects for interactive elements
 */
function initHoverEffects() {
    // Magnetic effect for buttons
    document.querySelectorAll('.magnetic').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const position = this.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseout', function() {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // Reveal effect for images
    document.querySelectorAll('.image-reveal').forEach(container => {
        const image = container.querySelector('img');
        const overlay = document.createElement('div');
        overlay.classList.add('reveal-overlay');
        container.appendChild(overlay);
        
        container.addEventListener('mouseenter', () => {
            overlay.style.transform = 'translateX(100%)';
            image.style.transform = 'scale(1.1)';
        });
        
        container.addEventListener('mouseleave', () => {
            overlay.style.transform = 'translateX(0)';
            image.style.transform = 'scale(1)';
        });
    });
}
