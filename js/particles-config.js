/**
 * Particles.js Configuration
 */

document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6366f1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.25,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });

        // Adjust particle colors based on theme
        function updateParticleColors() {
            if (document.body.classList.contains('dark-mode')) {
                pJSDom[0].pJS.particles.color.value = "#818cf8";
                pJSDom[0].pJS.particles.line_linked.color = "#818cf8";
            } else {
                pJSDom[0].pJS.particles.color.value = "#6366f1";
                pJSDom[0].pJS.particles.line_linked.color = "#6366f1";
            }
            pJSDom[0].pJS.fn.particlesRefresh();
        }

        // Check for theme changes to update particle colors
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                setTimeout(updateParticleColors, 100);
            });
        }

        // Initial particle color based on current theme
        if (document.body.classList.contains('dark-mode') && typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            setTimeout(() => {
                pJSDom[0].pJS.particles.color.value = "#818cf8";
                pJSDom[0].pJS.particles.line_linked.color = "#818cf8";
                pJSDom[0].pJS.fn.particlesRefresh();
            }, 500);
        }
    } else {
        console.warn("particles.js is not loaded");
    }
});

// Optimize particle animation on low-performance devices
function detectLowPerformance() {
    // Simple FPS counter
    let fps = 0;
    let lastLoop = performance.now();
    
    function countFPS() {
        const thisLoop = performance.now();
        fps = 1000 / (thisLoop - lastLoop);
        lastLoop = thisLoop;
        requestAnimationFrame(countFPS);
    }
    
    requestAnimationFrame(countFPS);
    
    // Check FPS after a short period
    setTimeout(() => {
        // If FPS is consistently low, reduce particle count
        if (fps < 30 && typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            pJSDom[0].pJS.particles.number.value = 30;
            pJSDom[0].pJS.particles.move.speed = 0.5;
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }, 2000);
}

// Run performance check only on lower-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    window.addEventListener('load', detectLowPerformance);
}
