// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight the active page in the navigation bar
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const currentPage = window.location.pathname;

    navLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});
