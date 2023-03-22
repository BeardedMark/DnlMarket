window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    // Главный слайдер
    /// Создание навигационного слайдера
    const mainSlider = document.querySelector('.main-slider'),
        mainSliderImage = document.querySelectorAll('.main-slider .main-slider__img'),
        mainSliderItems = mainSlider.children,
        mainSliderItemsLength = mainSliderItems.length,
        navSlider = document.querySelector('.main-slider-controll');

    for(let i = 0; i < mainSliderItemsLength; i++) {
        let navItem = document.createElement('div');
        navItem.classList.add('col', 'col-12', 'pb-0', 'main-slider-controll__item');
        navItem.innerHTML = '<div class="col-inner"><div class="main-slider-controll__img"></div></div>';
        navSlider.appendChild(navItem);

        let navItemImage = document.querySelectorAll('.main-slider-controll__item .main-slider-controll__img')[i];
        navItemImage.style.backgroundImage = 'url("' + mainSliderImage[i].getAttribute('src') + '")';
    }

    $(document).ready(function(){
        const controlls = document.querySelectorAll('.main-slider-controll__item'),
            emptyTopRight = document.querySelectorAll('.empty-top-right'),
            emptyBottomLeft = document.querySelectorAll('.empty-bottom-left');

        // controllAction(controlls[0], 'empty-top-first', 'empty-bottom-first');

        $('.main-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 600,
            arrows: false,
            asNavFor: '.main-slider-controll',
            infinite: true,
            autoplay: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            autoplaySpeed: 6000,
            adaptiveHeight: true
        });
        $('.main-slider-controll').slick({
            slidesToShow: mainSliderItemsLength,
            slidesToScroll: 1,
            asNavFor: '.main-slider',
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            infinite: true,
            // variableWidth: true
        });

        $('.main-slider-controll').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let slides = document.querySelectorAll('.main-slider-controll .slick-slide');
            slides.forEach(element => {
                element.style.pointerEvents = 'none';
            });
            setTimeout(() => {
                slides.forEach(element => {
                    element.style.pointerEvents = '';
                });
            }, 600);
            // clear();
            // controllAction(controlls[nextSlide], 'empty-top', 'empty-bottom');
        });

        // function controllAction(controll, top, bottom) {
        //     for(let i = 0; i < emptyTopRight.length; i++) {
        //         if(controll === emptyTopRight[i].closest('.main-slider-controll__item')) {
        //             emptyTopRight[i].classList.add(top);
        //             emptyBottomLeft[i].classList.add(bottom);
        //         }
        //     }
        // }

        // function clear() {
        //     for(let i = 0; i < emptyTopRight.length; i++) {
        //         emptyTopRight[i].classList.remove('empty-top', 'empty-top-first');
        //         emptyBottomLeft[i].classList.remove('empty-bottom', 'empty-bottom-first');
        //     }
        // }
    });

    
    
    

    // Слайдер с новинками

    if(window.matchMedia('(max-width: 1024px)').matches) {
        const noveltySlider = $('.novelty-slider');
        noveltySlider.slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        });

        // Progress-bar
        const progressBarNovelty = document.querySelector('.novelty .progress-bar'),
            progressRowNovelty = document.querySelector('.novelty .progress-bar__row'),
            currentProgressNovelty = document.querySelector('.novelty .progress-bar__current-progress');

        if(noveltySlider.slick("getSlick").slideCount <= noveltySlider.slick("getSlick").options.slidesToShow) {
            progressRowNovelty.classList.add('d-none');
        } else {
            let proggressPart = setLineWidth(noveltySlider, progressBarNovelty, currentProgressNovelty);

            $('.novelty-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressNovelty.style.left = proggressPart * nextSlide + 'px';
            });
        }
    }

    function setLineWidth(slider, progressBar, currentProgress) {
        let slidesToScroll = slider.slick("getSlick").options.slidesToScroll;
        let slidesToShow = slider.slick("getSlick").options.slidesToShow;
        let slideCount = slider.slick("getSlick").slideCount;

        let progressBarWidth = window.getComputedStyle(progressBar).getPropertyValue('width').replace('px', '') * 1;
        let currentProgressWidth = progressBarWidth / ((slideCount - slidesToShow) + 1);
        currentProgress.style.width = currentProgressWidth + 'px';
        return currentProgressWidth;
    }

    // Слайдер с историями

    if(window.matchMedia('(max-width: 1024px)').matches) {
        const storiesSlider = $('.stories-slider');
        storiesSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });


        // Progress-bar
        const progressBarStories = document.querySelector('.stories .progress-bar'),
            progressRowStories = document.querySelector('.stories .progress-bar__row'),
            currentProgressStories = document.querySelector('.stories .progress-bar__current-progress');

        if(storiesSlider.slick("getSlick").slideCount <= storiesSlider.slick("getSlick").options.slidesToShow) {
            progressRowStories.classList.add('d-none');
        } else {
            let proggressPart1 = setLineWidth(storiesSlider, progressBarStories, currentProgressStories);

            $('.stories-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressStories.style.left = proggressPart1 * nextSlide + 'px';
            });
        }

    }


    // Слайдер с подборкой товаров

    if(window.matchMedia('(max-width: 1024px)').matches) {
        const goodsSlider = $('.goods-slider');
        goodsSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        });

        // Progress-bar
        const progressBarGoods = document.querySelector('.goods .progress-bar'),
            progressRowGoods = document.querySelector('.goods .progress-bar__row'),
            currentProgressGoods = document.querySelector('.goods .progress-bar__current-progress');

        if(goodsSlider.slick("getSlick").slideCount <= goodsSlider.slick("getSlick").options.slidesToShow) {
            progressRowGoods.classList.add('d-none');
        } else {
            let proggressPart2 = setLineWidth(goodsSlider, progressBarGoods, currentProgressGoods);

            $('.goods-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressGoods.style.left = proggressPart2 * nextSlide + 'px';
            });
        }
    }


    // Слайдер с блогом

    if(window.matchMedia('(max-width: 1024px)').matches) {
        const blogSlider = $('.blog-slider');
        blogSlider.slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        });

        // Progress-bar
        const progressBarBlog = document.querySelector('.blog .progress-bar'),
            progressRowBlog = document.querySelector('.blog .progress-bar__row'),
            currentProgressBlog = document.querySelector('.blog .progress-bar__current-progress');

        if(blogSlider.slick("getSlick").slideCount <= blogSlider.slick("getSlick").options.slidesToShow) {
            progressRowBlog.classList.add('d-none');
        } else {
            let proggressPart3 = setLineWidth(blogSlider, progressBarBlog, currentProgressBlog);

            $('.blog-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressBlog.style.left = proggressPart3 * nextSlide + 'px';
            });
        }
    }

    // Слайдер с брендами

    if(window.matchMedia('(max-width: 1024px)').matches) {
        const brandsSlider = $('.brands-slider');
        brandsSlider.slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        });

        // Progress-bar
        const progressBarBrands = document.querySelector('.brands .progress-bar'),
            progressRowBrands = document.querySelector('.brands .progress-bar__row'),
            currentProgressBrands = document.querySelector('.brands .progress-bar__current-progress');

        if(brandsSlider.slick("getSlick").slideCount <= brandsSlider.slick("getSlick").options.slidesToShow) {
            progressRowBrands.classList.add('d-none');
        } else {
            let proggressPart4 = setLineWidth(brandsSlider, progressBarBrands, currentProgressBrands);

            $('.brands-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressBrands.style.left = proggressPart4 * nextSlide + 'px';
            });
        }
    }


    // Точки в секции "Готовые решения"
    const radyDots = document.querySelectorAll('.ready .dot'),
        readyDotsLinks = document.querySelectorAll('.ready .dot__name');

    if(window.matchMedia('(max-width: 849px)').matches) {
        for(let i = 0; i < radyDots.length; i++) {
            for(let j = 0; j < readyDotsLinks.length; j++) {
                // Получаем ссылку из названия товара
                let link = readyDotsLinks[i].getAttribute('href');
                if(i == j) {
                    // Делаем точку ссылкой
                    radyDots[i].innerHTML = '<a href="'+ link + '">' + radyDots[i].innerHTML + '</a>';
                }
            }
        }
    } else {
        for(let i = 0; i < radyDots.length; i++) {
            radyDots[i].addEventListener('click', function() {
                let currentPanelContent = this.closest('.panel__content');
                clearDots(i, currentPanelContent);
                this.classList.toggle('active');
            });
        }
    }

    function clearDots(i, panel) {
        for(let a = 0; a < radyDots.length; a++) {
            if(a != i && radyDots[a].closest('.panel__content') == panel) {
                radyDots[a].classList.remove('active');
            }
        }
    }

});