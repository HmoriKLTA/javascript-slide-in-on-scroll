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

const sliderImages = document.querySelectorAll('.slide-in');

const checkSlide = () => {
    sliderImages.forEach(slideImage => {
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
        // bottom of the image
        const imageBottom = slideImage.offsetTop + slideImage.height;
        const isHalfShown = slideInAt > slideImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            slideImage.classList.add('opacity-100', 'translate-x-0', 'scale-100');
            slideImage.classList.remove('-translate-x-[30%]', 'translate-x-[30%]', 'scale-95');
        } else {
            slideImage.classList.remove('opacity-100', 'translate-x-0', 'scale-100');
            if (slideImage.classList.contains('align-left')) {
                slideImage.classList.add('-translate-x-[30%]', 'scale-95');
            } else {
                slideImage.classList.add('translate-x-[30%]', 'scale-95');
            }
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));