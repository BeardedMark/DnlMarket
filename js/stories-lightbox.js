window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    $(document).on('click', '.stories-lightbox-btn', function() {
        scrollLock.disablePageScroll();
        enableSlider();
        $('.stories-overlay').fadeIn();
    });

    $(document).on('click', '.stories-lightbox__close', function() {
        $('.stories-overlay').fadeOut();
        scrollLock.enablePageScroll();
    });

    $(document).on('click', '.stories-lightbox__arrow', function() {
        if(this.classList.contains('next')) {
            switchingForward();
        } else if(this.classList.contains('prev')) {
            switchingBack();
        }
    });

    function switchingForward() {
        let storiesLightboxItem = document.querySelectorAll('.stories-lightbox__item');

        for (let i = 0; i < storiesLightboxItem.length; i++) {
            if(storiesLightboxItem[i].classList.contains('current-item')) {
                if(i != storiesLightboxItem.length-1) {
                    storiesLightboxItem[i].classList.remove('current-item');
                    switchingSlide(i+1);
                }
                break;
            }
        }
    }

    function switchingBack() {
        let storiesLightboxItem = document.querySelectorAll('.stories-lightbox__item');

        for (let i = 0; i < storiesLightboxItem.length; i++) {
            if(storiesLightboxItem[i].classList.contains('current-item')) {
                if(i != 0) {
                    storiesLightboxItem[i].classList.remove('current-item');
                    switchingSlide(i-1);
                }
                break;
            }
        }
    }

    function switchingSlide(currentIndex) {
        let storiesLightboxItem = document.querySelectorAll('.stories-lightbox__item');

        for (let j = 0; j < storiesLightboxItem.length; j++) {
            if(j == currentIndex) {
                storiesLightboxItem[j].classList.add('current-item');
                storiesLightboxItem[j].setAttribute('data-item', 0);
            } else {
                storiesLightboxItem[j].setAttribute('data-item', j - currentIndex);
            }
        }

        timeLine();
    }

    function enableSlider() {
        let storiesLightboxItem = document.querySelectorAll('.stories-lightbox__item');

        for (let i = 0; i < storiesLightboxItem.length; i++) {
            storiesLightboxItem[i].setAttribute('data-item', i);
            if(i == 0) {
                storiesLightboxItem[i].classList.add('current-item');
            }
        }

        timeLine();
    }

    function timeLine() {
        setTimeout(() => {
            const timeLine = document.querySelector('.current-item .stories-lightbox__time-line'),
                timeLineInner = document.querySelector('.current-item .stories-lightbox__time-line_inner');

            if(timeLine.getBoundingClientRect().width == timeLineInner.getBoundingClientRect().width) {
                switchingForward();
            }
        }, 5800);
    }
});