(function () {
    const header = document.querySelector(".ww-header");
    if (!header) {
        return
    };
    function update() {
        header.classList.toggle("is-scrolled", window.scrollY > 41);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
})();