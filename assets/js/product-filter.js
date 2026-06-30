(function () {
    // Run the script immediately if page is loaded, otherwise wait for load
    function initFilter() {
        // 1. Target all elements whose IDs start with "ww-btn-"
        const filterButtons = document.querySelectorAll('[id^="ww-btn-"]');

        // 2. Target the product grid card wrappers used by WooCommerce blocks
        const productCards = document.querySelectorAll('.wp-block-post, .wc-block-product, .product');

        if (filterButtons.length === 0 || productCards.length === 0) return;

        // 3. Map your category slugs to keywords found in your product titles
        const categoryMap = {
            'shirts': ['blouse', 'shirt', 'top'],
            'carpet': ['carpet', 'carpets'],
            'rugs': ['rug', 'rugs'],
            'stair runners': ['stair runner', 'stair'],
            'wood': ['wood', 'wood flooring'],
            'vinyl flooring': ['vinyl', 'vinyl flooring'],
        };

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

                    const cardText = card.innerText.toLowerCase();
                    const keywords = categoryMap[filterSlug] || [filterSlug];

                    const isMatch = keywords.some(keyword => cardText.includes(keyword));

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