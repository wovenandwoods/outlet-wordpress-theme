(function () {
    // Run the script immediately if page is loaded, otherwise wait for load
    function initFilter() {
        // 1. Target all elements whose IDs start with "ww-btn-"
        const filterButtons = document.querySelectorAll('[id^="ww-btn-"]');

        // 2. Target the product grid card wrappers used by WooCommerce blocks
        const productCards = document.querySelectorAll('.wp-block-post, .wc-block-product, .product');

        if (filterButtons.length === 0 || productCards.length === 0) return;

        filterButtons.forEach(function (btnWrapper) {
            const btnLink = btnWrapper.querySelector('a');
            if (!btnLink) return;

            btnLink.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                filterButtons.forEach(b => b.classList.remove('active'));
                btnWrapper.classList.add('active');

                const filterSlug = btnWrapper.id.replace('ww-btn-', '').toLowerCase();

                productCards.forEach(function (card) {
                    if (filterSlug === 'all') {
                        card.style.display = '';
                        return;
                    }

                    const isMatch = card.classList.contains('product_cat-' + filterSlug);

                    card.style.display = isMatch ? '' : 'none';
                });
            });
        });
    }

    if (document.readyState === 'complete') {
        initFilter();
    } else {
        window.addEventListener('load', initFilter);
    }
})();