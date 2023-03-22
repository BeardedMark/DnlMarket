window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';
    // Скрипты для страницы сравнения

    // Начало работы //

    // Тумблер
    let thumbler = true;

    // Передаём текущий таб
    start(0);

    function start(tabIndex) {
        // Слайдеры в товарами
        sliderInit();
        sliderHeaderInit();

        if(window.matchMedia('(min-width: 1025px)').matches) {
            const pcTabs = document.querySelectorAll('.comparison__pc-tab');
            selectComparisonTab(pcTabs[tabIndex]);
            openComparisonPanel(pcTabs[tabIndex]);

            // Заголовки для строк в таблице
            movingTableHeaders();
            // Регулируем наличие стрелочек для слайдера
            turnArrows();
            // Регулируем высоту ячеек
            settingCellSizes();
        }
    }

    function movingTableHeaders() {
        const slides = document.querySelectorAll('.comparison-goods-slider .slick-slide');
        let myCurrentSlide;

        // Отчищаем все слайды от класса 'my-current'
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('my-current');
        }
        // Находим первый слайд из активной панели
        for (let i = 0; i < slides.length; i++) {
            if(slides[i].closest('.current-panel') && slides[i].getAttribute('aria-hidden') == 'false') {
                myCurrentSlide = slides[i];
                break;
            }
        }
        // Даём ему класс
        myCurrentSlide.classList.add('my-current');
    }

    function turnArrows() {
        const slides = document.querySelectorAll('.current-panel .comparison-goods-slider__item');
        slides.length > 4 ? $('.comparison-goods-slider__arrows').show() : $('.comparison-goods-slider__arrows').hide();
    }

    function settingCellSizes() {
        const tables = document.querySelectorAll('.current-panel table'), mass = [];

        // Цикл по таблицам
        for (let i = 0; i < tables.length; i++) {
            let mass_inner = [];

            // Получаем строки
            let tr_elems = tables[i].children[0].children;

            // Цикл по строкам
            for (let j = 0; j < tr_elems.length; j++) {
                mass_inner.push({index: j, element:tr_elems[j], height: tr_elems[j].getBoundingClientRect().height});
            }
            mass.push(mass_inner);
        }

        // По mass 
        // Массив таблиц с массивами объектов

        // Длина массива внутри таблицы
        let length = mass[0].length;

        // Цикл по объектам
        for (let index = 0; index < length; index++) {
            let max = 0;
            let currentHeightTemp = 0;

            // Цикл по таблицам
            for (let i = 0; i < mass.length; i++) {
                currentHeightTemp = (mass[i])[index].height;

                if(currentHeightTemp > max) {
                    max = currentHeightTemp;
                }
            }

            for (let i = 0; i < mass.length; i++) {
                (mass[i])[index].height = max;
                (mass[i])[index].element.style.height = max + 'px';
            }
        }
    }



    // Табы для ПК //

    $(document).on('click', '.comparison__pc-tab', function() {
        selectComparisonTab(this);
        openComparisonPanel(this);

        // Регулируем наличие стрелочек для слайдера
        turnArrows();
        // Регулируем высоту ячеек
        settingCellSizes();

        // Возвращает сладер в начальную позицию
        startPos();
    });

    function selectComparisonTab(currentTab) {
        const comparisonTabs = document.querySelectorAll('.comparison__pc-tab');
        comparisonTabs.forEach(element => {
            element == currentTab ? element.classList.add('current-tab') : element.classList.remove('current-tab');
        });
    }

    function openComparisonPanel(currentTab) {
        const comparisonPanels = document.querySelectorAll('.comparison__panel');
        comparisonPanels.forEach(element => {
            element.getAttribute('data-panel') == currentTab.getAttribute('data-tab') ? element.classList.add('current-panel') : element.classList.remove('current-panel');
        });
    }

    function startPos() {
        // Переходим к первому слайду
        $('.current-panel .comparison-goods-slider').slick('slickGoTo', 0);
        // Обнуляем тумблер
        thumbler = true;
    }

    // Фильтры (все характеритики, только отличия) //

    // ПК
    $(document).on('click', '.comparison__pc-filter', function() {
        selectComparisonFilter(this);
    });

    // Планшеты и мобилки
    $(document).on('click', '.comparison__mobile-filters .switch', function() {
        this.classList.toggle('switch-on');
    });

    $(document).on('click', '.comparison__mobile-filters p', function() {
        this.nextElementSibling.click();
    });

    function selectComparisonFilter(currentFilter) {
        const comparisonFilters = document.querySelectorAll('.comparison__pc-filter');
        comparisonFilters.forEach(element => {
            element == currentFilter ? element.classList.remove('not-selected') : element.classList.add('not-selected');
        });
    }


    // Слайдеры //

    function sliderInit() {
        // Слайдеры c товарами
        $('.comparison-goods-slider').each(function (i, node) {
            $(node).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                autoplay: false,
                arrows: false,
                swipe: false,
                speed: 300,
                adaptiveHeight: false,
                asNavFor: '.current-panel .comparison-header-slider',
                responsive: [
                    {
                        breakpoint: 1281,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            swipe: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2,
                            swipe: true
                        }
                    }
                ]
            });

            $(node).on('swipe', function(event, slick, direction) {
                thumbler = returnNewThumbler('.comparison-goods-slider', slick, direction);
            });

            $(node).on('afterChange', function(event, slick, currentSlide) {
                // Тумблер может поменяться только на планшетах и мобильных при свайпе
                if(!thumbler) {
                    setTimeout(() => {
                        // Переходим к первому видимому слайду
                        $('.current-panel .comparison-goods-slider').slick('slickGoTo', slick.slideCount - slick.options.slidesToShow);
                    }, 300);
                } else {
                    // Переносим заголовки строк в таблице
                    movingTableHeaders();
                }
            });
        });
    }

    function sliderHeaderInit() {
        // Слайдеры из верхней плашки
        $('.comparison-header-slider').each(function (i, node) {
            $(node).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                autoplay: false,
                arrows: false,
                swipe: false,
                speed: 300,
                adaptiveHeight: false,
                asNavFor: '.current-panel .comparison-goods-slider',
                responsive: [
                    {
                        breakpoint: 1281,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            swipe: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2,
                            swipe: true
                        }
                    }
                ]
            });

            $(node).on('swipe', function(event, slick, direction){
                thumbler = returnNewThumbler('.comparison-header-slider', slick, direction);
            });
        });
    }

    function returnNewThumbler(sliderClass, slick, direction) {
        thumbler = true;

        if(direction == 'left') {
            let temp = getLastSlideIndex();

            if($(`${sliderClass} .slick-slide:eq(${temp})`).attr('aria-hidden') == 'false') {
                // Вижу последний слайд
                (slick.slideCount - slick.options.slidesToShow) == slick.currentSlide  ? thumbler = thumbler : thumbler = !thumbler;
            }
        } 
        
        return thumbler;
    }

    function getLastSlideIndex() {
        // Индекс последнего слайда в текущем слайдере
        let temp;

        $('.comparison-goods-slider .slick-slide').each(function(index, slide) {
            if(slide.closest('.current-panel')) {
                temp = index;
            }
        });

        return temp;
    }

    // Стрелочки для слайдеров
    $(document).on('click', '.comparison-goods-slider__arrow', function() {
        if(this.classList.contains('prev')) {
            $('.current-panel .comparison-goods-slider').slick("slickPrev");
        } else if(this.classList.contains('next')) {
            // Если видим последний слайд
            if($('.comparison-goods-slider .slick-slide:eq(' + getLastSlideIndex() + ')').attr('aria-hidden') != 'false') {
                $('.current-panel .comparison-goods-slider').slick("slickNext");
            }
        }
    });


    
    // Шапка для слайдера при скролле //

    window.addEventListener('scroll', function() {
        const currentPanel = document.querySelector('.current-panel');

        if(currentPanel) {
            // Первая таблица в текущем слайдере и координата ее верхней точки
            const currentTable = document.querySelectorAll('.current-panel .comparison-goods-slider__table')[0],
                currentTableTop = currentTable.getBoundingClientRect().top + window.pageYOffset;

            // Текущ. позиция
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
                // Координата верхней точки последнй строки, до которой нужно дойти
                currentBottomPos;

            $('.comparison-goods-slider__table table').each(function(index, table) {
                if(table.closest('.comparison-goods-slider__table') == currentTable) {
                    currentBottomPos = table.children[0].children[table.children[0].children.length - 1].getBoundingClientRect().top + window.pageYOffset;
                }
            });

            // Высота верхней плашки/шапки
            let comparisonHeaderHeight = document.querySelector('.comparison__header').getBoundingClientRect().height + 30;

            if((currentTableTop - currentPos) <= comparisonHeaderHeight) {
                $('.current-panel .comparison__header').addClass('visible');
                if((currentBottomPos - currentPos) <= comparisonHeaderHeight - 30) {
                    $('.current-panel .comparison__header').removeClass('visible');
                }
            } else {
                $('.current-panel .comparison__header').removeClass('visible');
            }
        }
    });




    // Слайдер Похожие товары //

    const recommendationsSlider = $('.recommendations-slider');
    recommendationsSlider.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: false,
		swipe: true,
		adaptiveHeight: true,
		responsive: [
            {
				breakpoint: 1441,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 3
				}
			},
            {
				breakpoint: 550,
				settings: {
					slidesToShow: 2
				}
			}
		]
    });

    // if(window.matchMedia('(max-width: 1024px)').matches) {
    //     // Progress-bar
    //     const progressBarRecommendations = document.querySelector('.comparison__recommended-goods .progress-bar'),
    //         progressRowRecommendations = document.querySelector('.comparison__recommended-goods .progress-bar__row'),
    //         currentProgressRecommendations = document.querySelector('.comparison__recommended-goods .progress-bar__current-progress');

    //     if(recommendationsSlider.slick("getSlick").slideCount <= recommendationsSlider.slick("getSlick").options.slidesToShow) {
    //         progressRowRecommendations.classList.add('d-none');
    //     } else {
    //         let proggressPart = setLineWidth(recommendationsSlider, progressBarRecommendations, currentProgressRecommendations);

    //         $('.recommendations-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //             currentProgressRecommendations.style.left = proggressPart * nextSlide + 'px';
    //         });
    //     }
    // }

    // function setLineWidth(slider, progressBar, currentProgress) {
    //     let slidesToScroll = slider.slick("getSlick").options.slidesToScroll;
    //     let slidesToShow = slider.slick("getSlick").options.slidesToShow;
    //     let slideCount = slider.slick("getSlick").slideCount;

    //     let progressBarWidth = window.getComputedStyle(progressBar).getPropertyValue('width').replace('px', '') * 1;
    //     let currentProgressWidth = progressBarWidth / ((slideCount - slidesToShow) + 1);
    //     currentProgress.style.width = currentProgressWidth + 'px';
    //     return currentProgressWidth;
    // }


    // Табы для планшутов и мобильных //

    $(document).on('click', '.comparison__mobile-tab', function() {
        moveToMobileTab(this);
    });

    function moveToMobileTab(tab) {
        hidingTabs();
        openComparisonPanel(tab);
        // Возвращает сладер в начальную позицию
        startPos();
        // Пагинация для слайдов
        makeCurrentSliderPagination();
        // Регулируем высоту ячеек
        settingCellSizes();
    }

    function hidingTabs() {
        $('.comparison__mobile-tabs').hide();
        $('.head__title').hide();
    }

    function showTabs() {
        $('.comparison__mobile-tabs').show();
        $('.head__title').show();
    }

    function makeCurrentSliderPagination() {
        let sliderNumbers = document.querySelectorAll('.current-panel .comparison-goods-slider__numbers'),
            // Товары в основном слайдере
            slideNum = document.querySelectorAll('.current-panel .slider-num'),
            sliderLength = document.querySelectorAll('.current-panel .slider-length'),
            // Товары в верхней плашке
            slideNum_headerSlider = document.querySelectorAll('.current-panel .header-slider-num'),
            slideLength_headerSlider = document.querySelectorAll('.current-panel .header-slider-length');

        for (let i = 0; i < sliderNumbers.length; i++) {
            slideNum[i].textContent = i+1;
            sliderLength[i].textContent = sliderNumbers.length;

            slideNum_headerSlider[i].textContent = i+1;
            slideLength_headerSlider[i].textContent = sliderNumbers.length;
        }
    }

    
    
    // Переход к табам обратно (для мобильных)
    $(document).on('click', '.panel-title', function() {
        let comparisonPanels = document.querySelectorAll('.comparison__panel');
        comparisonPanels.forEach(element => {
            element.classList.remove('current-panel');
        });

        showTabs();
    });


});