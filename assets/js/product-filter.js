(function () {
    // Run the script immediately if page is loaded, otherwise wait for load
    function initFilter() {
        // 1. Target all elements whose IDs start with "ww-btn-"
        const filterButtons = document.querySelectorAll('[id^="ww-btn-"]');

        // 2. Target the product grid card wrappers used by WooCommerce blocks
        const productCards = document.querySelectorAll('.wp-block-post, .wc-block-product, .product');

        if (filterButtons.length === 0 || productCards.length === 0) return;

        // Category slugs that should also match their singular/plural counterpart
        const slugSynonyms = {
            rugs: ['rug', 'rugs'],
            carpets: ['carpet', 'carpets'],
            stairrunners: ['stairrunner', 'stairrunners', 'stair-runner', 'stair-runners'],
            wood: ['wood', 'wood-flooring'],
            vinyl: ['vinyl', 'vinyl-flooring', 'luxury-vinyl-flooring', 'lvt'],
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

                    const synonyms = slugSynonyms[filterSlug];

                    const isMatch = Array.from(card.classList).some(function (cls) {
                        if (!cls.startsWith('product_cat-')) return false;
                        const catSlug = cls.replace('product_cat-', '');

                        if (synonyms) {
                            // Match whole hyphen-delimited words, eg "medium-rug" or "large-rugs"
                            return catSlug.split('-').some(word => synonyms.includes(word));
                        }

                        return catSlug === filterSlug;
                    });

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