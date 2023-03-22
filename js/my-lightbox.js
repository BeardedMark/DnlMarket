window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let clickThumb = true; // на всякий случай предотвращаем двойной клик

    // Клик по тригеру
    $(document).on('click', '.my-lightbox-triger', function() {
        if(clickThumb) {
            createLightBox(this);
        }
        clickThumb = false;
        scrollLock.disablePageScroll();
    });

    function createLightBox(currentTriger) {
        const body = document.querySelector('body');

        // Создаём оверлей
        const lightBoxOverlay = document.createElement('div');
        lightBoxOverlay.classList.add('my-lightbox-overlay');

        // Помещаем в начало body
        body.insertBefore(lightBoxOverlay, body.firstChild);

        // Создаём структуру внутри оверлея
        lightBoxOverlay.innerHTML = '<div class="my-lightbox-overlay__inner"><div class="my-lightbox-slider_outer"><div class="my-lightbox-slider"></div></div><div class="my-lightbox-overlay__close"></div></div>';

        // Появление лайтбокса
        appearLightBox();

        // Создаём слайдер
        createLightBoxSlider(currentTriger);
    }

    function createLightBoxSlider(currentTriger) {
        createSliderItems(currentTriger);
        createSlider(Array.prototype.indexOf.call(currentTriger.closest('.my-lightbox-parent').querySelectorAll('.my-lightbox-triger'), currentTriger));
    }

    function appearLightBox() {
        $('.my-lightbox-overlay').fadeIn();
    }

    function createSlider(slideIndex) {
        $('.my-lightbox-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            arrows: true,
            speed: 300,
            adaptiveHeight: false,
            initialSlide: slideIndex,
            prevArrow: '<div class="prev"><svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3308_14505)"><path d="M13.3576 24L15.5847 22.1439L5.67395 13.8848L30 13.8848L30 11.26L5.67395 11.26L15.5847 3.00096L13.3576 1.14491L-0.355498 12.5725L13.3576 24Z" fill="#1B1B1B"></path></g><defs><clipPath id="clip0_3308_14505"><rect width="30" height="25" fill="white" transform="translate(30 25) rotate(-180)"></rect></clipPath></defs></svg></div>',
            nextArrow: '<div class="next"><svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3308_14507)"><path d="M16.6424 1.00003L14.4153 2.85608L24.3261 11.1152L-1.37684e-07 11.1152L2.28396e-05 13.74L24.3261 13.74L14.4153 21.999L16.6424 23.8551L30.3555 12.4275L16.6424 1.00003Z" fill="#1B1B1B"></path></g><defs><clipPath id="clip0_3308_14507"><rect width="30" height="25" fill="white"></rect></clipPath></defs></svg></div>'
        });
    }

    function createSliderItems(currentTriger) {
        const myLigtboxImg = document.querySelectorAll('.my-lightbox-img'),
            myLightboxSlider = document.querySelector('.my-lightbox-slider');

        for (let i = 0; i < myLigtboxImg.length; i++) {
            if(myLigtboxImg[i].closest('.my-lightbox-parent') == currentTriger.closest('.my-lightbox-parent')) {
                const myLightboxItem = myLigtboxImg[i].cloneNode(true);
                myLightboxSlider.appendChild(myLightboxItem);

                const pictureProportion = (myLightboxItem.getBoundingClientRect().height/myLightboxItem.getBoundingClientRect().width) * 100 + '%';

                myLightboxItem.outerHTML = '<div class="my-lightbox-slider__item"><div class="my-lightbox-slider__img"><div class="my-lightbox-slider__img-cover" style="padding-top: ' + pictureProportion + ';">' + myLightboxItem.outerHTML + '</div></div></div>';
            }
        }
    }

    // Закрутие лайтбокса
    $(document).on('click', '.my-lightbox-overlay__close', function() {
        disappearLightBox();
        scrollLock.enablePageScroll();
    });

    function disappearLightBox() {
        $('.my-lightbox-overlay').fadeOut();
        setTimeout(() => {
            const body = document.querySelector('body'), lightBoxOverlay = document.querySelector('.my-lightbox-overlay');
            body.removeChild(lightBoxOverlay);
            clickThumb = true;
        }, 300);
    }
});