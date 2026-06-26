// Watches to see if the user scrolls down the page at least 33px.
function headerScroll() {
    const header = document.querySelector(".ww-header"); 
    if (!header) {
        return
    }; 
    function update() {
        header.classList.toggle("is-scrolled", window.scrollY > 33);
    }
    window.addEventListener("scroll", update, { passive: true});
    update();
}

headerScroll();