
const sidebarMenu = document.querySelector('.sidebar-menu');

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.header__menu')) {
        sidebarMenu.classList.add('show')
        document.body.classList.add('hidden');
    }

    if ((target.closest('.sidebar-menu') && !target.closest('.sidebar-menu__content')) || target.closest('.close-btn')) {
        sidebarMenu.classList.remove('show')
        document.body.classList.remove('hidden');
    }


    if ((target.closest('.card-modal') && !target.closest('.card-modal__inner')) || target.closest('.card-modal__close')) {
        target.closest('.show').classList.remove('show')
    }


    if (target.closest('[data-open-modal]')) {
        const modalType = target.closest('[data-open-modal]').getAttribute('data-open-modal');

        const currentModal = document.querySelector(`[data-modal="${modalType}"]`);
        console.log(currentModal);

        currentModal && currentModal.classList.add('show');
    }
})

function initTwentytwenty() {
    $(function () {
        $(".images-container").twentytwenty(
            {
                no_overlay: true,
            }
        );
    });
};
initTwentytwenty();


document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider_block');

    sliders.forEach((sliderBlock) => {
        const sliderEl = sliderBlock.querySelector('.slider');
        const nextBtn = sliderBlock.querySelector('.swiper-button-next');
        const prevBtn = sliderBlock.querySelector('.swiper-button-prev');
        const pagination = sliderBlock.querySelector('.swiper-pagination');

        new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 600,
            watchOverflow: true,

            pagination: {
                el: pagination,
                dynamicBullets: true,
            },

            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
        });
    });
});
const items = document.querySelectorAll('.family_block_content .item');
const menuItems = document.querySelectorAll('.menu_block li');

let visibleMap = new Map();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.dataset.item;

        if (entry.isIntersecting) {
            visibleMap.set(entry.target, id);
        } else {
            visibleMap.delete(entry.target);
        }
    });

    if (visibleMap.size === 0) return;

    // берем последний видимый элемент 
    const lastVisible = Array.from(visibleMap.values()).pop();

    menuItems.forEach(li => li.classList.remove('active'));

    const activeItem = document.querySelector(`.menu_block li[data-item="${lastVisible}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

}, {
    rootMargin: '-40% 0px -40% 0px'
});

items.forEach(item => observer.observe(item));



if ($('.player_video').length) {
    const players = Array.from(document.querySelectorAll('.player_video')).map(
        (p) =>
            new Plyr(p, {
                autoplay: false,
            })
    );
}