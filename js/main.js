/**
 * Main JavaScript file for Yoichi Onishi's Portfolio
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-container');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // Initialize all components and features
    initNavigation();
    initThemeToggle();
    initScrollAnimation();
    initTabSystem();
    initBackToTop();
    initTypingEffect();
    initTiltEffect();
    initContactForm();
    initGlitchEffect();

    // Start animations after a short delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
});

/**
 * Navigation Functionality
 */
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle navigation menu
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            
            // Animate links with delay
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // Close nav menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('nav-active')) {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[data-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            }
        });
    }
}

/**
 * Scroll Animation for Elements
 */
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.reveal-element');
    const windowHeight = window.innerHeight;
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Check for elements on scroll
    window.addEventListener('scroll', throttle(checkElementsInViewport, 100));
    
    // Function to check if elements are in viewport
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
        
        // Animate skill progress bars
        document.querySelectorAll('.skill-card').forEach(card => {
            if (isElementInViewport(card)) {
                const percentage = card.getAttribute('data-percentage');
                const progressBar = card.querySelector('.skill-progress');
                
                if (progressBar && !progressBar.style.width) {
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 100);
                }
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Throttle function to limit scroll event calls
    function throttle(func, delay) {
        let lastCall = 0;
        return function() {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, arguments);
            }
        };
    }
}

/**
 * Tab System Functionality
 */
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Show more publications
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        const hiddenItems = document.querySelectorAll('.publication-item.hidden');
        
        loadMoreBtn.addEventListener('click', () => {
            hiddenItems.forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('fade-in');
            });
            loadMoreBtn.style.display = 'none';
        });
    }
}

/**
 * Back To Top Button Functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show button when scrolled down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Typing Effect for Hero Text
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const phrases = [
            'AI Engineer',
            'System Developer',
            'Project Manager'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typePhrase() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if word is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of word
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typePhrase, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(typePhrase, 1000);
    }
}

/**
 * 3D Tilt Effect for Elements
 */
function initTiltEffect() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3
        });
    }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !email || !message) {
                alert('必須項目をすべて入力してください。');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }
            
            // Simulating form submission (in a real implementation, this would send data to a backend)
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = true;
            btnText.textContent = '送信中...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            // Simulate API call
            setTimeout(() => {
                // Success state
                btnText.textContent = '送信完了!';
                btnIcon.className = 'fas fa-check';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    btnText.textContent = '送信する';
                    btnIcon.className = 'fas fa-paper-plane';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Enhanced Glitch Effect
 */
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
        // Random glitch animation
        function randomGlitch() {
            glitchText.classList.add('active-glitch');
            
            setTimeout(() => {
                glitchText.classList.remove('active-glitch');
            }, 200);
            
            // Schedule next glitch
            const nextGlitch = Math.random() * 5000 + 2000; // 2-7 seconds
            setTimeout(randomGlitch, nextGlitch);
        }
        
        // Start random glitches
        setTimeout(randomGlitch, 3000);
    }
}

/**
 * Cursor Follower Effect
 */
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Check if hovering over links or buttons
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .work-card, .social-icon');
        let isHovering = false;
        
        hoverElements.forEach(el => {
            if (el.matches(':hover')) {
                isHovering = true;
                cursor.classList.add('mouse-hover');
            }
        });
        
        if (!isHovering) {
            cursor.classList.remove('mouse-hover');
        }
    }
});

// Hide cursor follower on mobile devices
if (window.innerWidth < 768) {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.display = 'none';
    }
}
