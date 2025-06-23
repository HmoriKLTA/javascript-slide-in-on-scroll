// Debounce function: limits how often a function can fire.
// Useful for performance when listening to events like scroll or resize.
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Select all elements with the 'slide-in' class (images to animate)
const sliderImages = document.querySelectorAll('.slide-in');

// Function to check if images should slide in or out based on scroll position
const checkSlide = () => {
    sliderImages.forEach(slideImage => {
        // Calculate the point at which the image should start sliding in
        const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
        // Calculate the bottom position of the image
        const imageBottom = slideImage.offsetTop + slideImage.height;
        // Determine if the image is at least halfway shown
        const isHalfShown = slideInAt > slideImage.offsetTop;
        // Determine if the image has not been scrolled past
        const isNotScrolledPast = window.scrollY < imageBottom;

        // If image is in the viewport, add Tailwind classes for animation
        if (isHalfShown && isNotScrolledPast) {
            // Make image visible, move to original position, and scale to 100%
            slideImage.classList.add('opacity-100', 'translate-x-0', 'scale-100');
            // Remove initial offset and scale classes
            slideImage.classList.remove('-translate-x-[30%]', 'translate-x-[30%]', 'scale-95');
        } else {
            // Remove animation classes to reset image
            slideImage.classList.remove('opacity-100', 'translate-x-0', 'scale-100');
            // Add initial offset and scale classes based on alignment
            if (slideImage.classList.contains('align-left')) {
                slideImage.classList.add('-translate-x-[30%]', 'scale-95');
            } else {
                slideImage.classList.add('translate-x-[30%]', 'scale-95');
            }
        }
    });
}

// Listen for scroll events and run checkSlide with debounce for performance
window.addEventListener('scroll', debounce(checkSlide));