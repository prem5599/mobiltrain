document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add shadow on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Hero Slider functionality
    const slides = document.querySelectorAll('.velo-slide');
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 3000; // 3 seconds

    function updateSlides(direction) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('is-active');
        
        // Calculate next slide index
        if (direction === 'up') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        } else {
            currentSlide = (currentSlide + 1) % slides.length;
        }
        
        // Add active class to new slide
        slides[currentSlide].classList.add('is-active');
    }

    function startAutoSlide() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(() => {
            updateSlides('down');
        }, autoSlideDelay);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Initialize auto-sliding
    startAutoSlide();

    // Add click events for navigation arrows
    const upArrow = document.querySelector('.nav-arrow.up');
    const downArrow = document.querySelector('.nav-arrow.down');

    upArrow.addEventListener('click', () => {
        updateSlides('up');
        stopAutoSlide();
        startAutoSlide(); // Reset the timer after manual navigation
    });

    downArrow.addEventListener('click', () => {
        updateSlides('down');
        stopAutoSlide();
        startAutoSlide(); // Reset the timer after manual navigation
    });

    // Pause auto-sliding when hovering over the slider
    const sliderContainer = document.querySelector('.velo-slides');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Touch Events for mobile swipe
    let touchStartY = 0;
    let touchEndY = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        stopAutoSlide();
    }, false);

    sliderContainer.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
    }, false);

    sliderContainer.addEventListener('touchend', () => {
        if (touchStartY - touchEndY > 50) {
            // Swipe Up
            updateSlides('down');
        } else if (touchEndY - touchStartY > 50) {
            // Swipe Down
            updateSlides('up');
        }
        startAutoSlide();
    }, false);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            updateSlides('up');
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowDown') {
            updateSlides('down');
            stopAutoSlide();
            startAutoSlide();
        }
    });
});


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the button and text elements
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    // Add click event listener to the button
    submitBtn.addEventListener('click', (e) => {
        // Prevent form submission
        e.preventDefault();

        // Change the button text
        btnText.textContent = 'Thanks';

        // Add 'active' class to trigger the animation
        submitBtn.classList.add('active');
    });
});