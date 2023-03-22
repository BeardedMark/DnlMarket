// Скрипты для карточки товара (product.html)

window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    // Слайдер совместимые товары

    const compatibleSlider = $('.compatible-slider');
    compatibleSlider.slick({
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

    // Стрелки для слайдера "совместимые товары"
    const arrowsCompatible = document.querySelectorAll('.compatible-slider__arrows .arrow');
	
	for(let i = 0; i < arrowsCompatible.length; i++) {
		arrowsCompatible[i].addEventListener('click', function() {
			let currentSlide = $('.compatible-slider').slick('slickCurrentSlide');
			if(this.classList.contains('arrow_prev')) {
				$('.compatible-slider').slick('slickGoTo', currentSlide - 1);
			} else if(this.classList.contains('arrow_next')) {
				$('.compatible-slider').slick('slickGoTo', currentSlide + 1);
			}
		});
	}

    if(window.matchMedia('(max-width: 1024px)').matches) {
        // Progress-bar
        const progressBarCompatible = document.querySelector('.product__compatible .progress-bar'),
            progressRowCompatible = document.querySelector('.product__compatible .progress-bar__row'),
            currentProgressCompatible = document.querySelector('.product__compatible .progress-bar__current-progress');

        if(compatibleSlider.slick("getSlick").slideCount <= compatibleSlider.slick("getSlick").options.slidesToShow) {
            progressRowCompatible.classList.add('d-none');
        } else {
            let proggressPart = setLineWidth(compatibleSlider, progressBarCompatible, currentProgressCompatible);

            $('.compatible-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressCompatible.style.left = proggressPart * nextSlide + 'px';
            });
        }
    }



    // Слайдер рекомендуемые товары
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

    // Стрелки для сладера "рекомендуемые товары"
    const arrowsRecommendations = document.querySelectorAll('.recommendations-slider__arrows .arrow');
	
	for(let i = 0; i < arrowsRecommendations.length; i++) {
		arrowsRecommendations[i].addEventListener('click', function() {
			let currentSlide = $('.recommendations-slider').slick('slickCurrentSlide');
			if(this.classList.contains('arrow_prev')) {
				$('.recommendations-slider').slick('slickGoTo', currentSlide - 1);
			} else if(this.classList.contains('arrow_next')) {
				$('.recommendations-slider').slick('slickGoTo', currentSlide + 1);
			}
		});
	}

    if(window.matchMedia('(max-width: 1024px)').matches) {
        // Progress-bar
        const progressBarRecommendations = document.querySelector('.recommendations .progress-bar'),
            progressRowRecommendations = document.querySelector('.recommendations .progress-bar__row'),
            currentProgressRecommendations = document.querySelector('.recommendations .progress-bar__current-progress');

        if(recommendationsSlider.slick("getSlick").slideCount <= recommendationsSlider.slick("getSlick").options.slidesToShow) {
            progressRowRecommendations.classList.add('d-none');
        } else {
            let proggressPart = setLineWidth(recommendationsSlider, progressBarRecommendations, currentProgressRecommendations);

            $('.recommendations-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressRecommendations.style.left = proggressPart * nextSlide + 'px';
            });
        }
    }

    // Фиксация сайдбара

    const productContainer = document.querySelector('.product .container'),
        prodictSideBar = document.querySelector('.product__right'),
        header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1;
        
    if(window.matchMedia('(min-width: 1025px)').matches && (window.innerHeight - headerHeight) > window.getComputedStyle(prodictSideBar).getPropertyValue('height').replace('px', '')) {
        window.addEventListener('scroll', function() {
            let productContainerTop = productContainer.getBoundingClientRect().top + window.pageYOffset,
                productLeftBottom = productContainer.getBoundingClientRect().bottom + window.pageYOffset,
                prodictSideBarHeight = window.getComputedStyle(prodictSideBar).getPropertyValue('height').replace('px', ''),
                currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);
            
            let top = currentPos + (headerHeight + 8);
            if(top >= productContainerTop) {
                prodictSideBar.classList.add('fixed');
                prodictSideBar.classList.remove('bottom');
                prodictSideBar.style.top = (headerHeight + 8) + 'px';
                if((productLeftBottom - prodictSideBarHeight) <= top) {
                    prodictSideBar.classList.add('bottom');
                    prodictSideBar.classList.remove('fixed');
                    prodictSideBar.style.top = 'auto';
                }
            } else {
                prodictSideBar.classList.remove('fixed');
                prodictSideBar.style.top = 'auto';
            }
        });
    }


    // Развернуть/свернуть описание и характеристики
    const expandBtn = document.querySelectorAll('.expand-btn'),
        productDescr = document.querySelectorAll('.product__descr'),
        characteristicWrapper = document.querySelectorAll('.characteristic__wrapper');

	for(let i = 0; i < expandBtn.length; i++) {
		expandBtn[i].addEventListener('click', function() {
            if(this.classList.contains('expand-btn_descr')) {
                for(let j = 0; j < productDescr.length; j++) {
                    productDescr[j].classList.toggle('open');
                } 

                this.children[0].classList.toggle('active');
                changeContent(this.children[0]);
            } else if(this.classList.contains('expand-btn_characteristic')) {
                for(let j = 0; j < characteristicWrapper.length; j++) {
                    characteristicWrapper[j].classList.toggle('open');
                }

                this.children[0].classList.toggle('active');
                changeContent(this.children[0]);
            }
		});
	}


    // Кнопка характеристики
    const characteristicsBtn = document.querySelector('.characteristics'),
        characteristicsClose = document.querySelector('.product__characteristics-close');

    characteristicsBtn.addEventListener('click', function() {
        // Характеристики на ПК
        if(window.matchMedia('(min-width: 1025px)').matches) {
            if(this.classList.contains('opened')) {
                characteristicsCloseFunc();
                characteristicsBtn.innerHTML = '<span>Характеристики</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

            } else {
                characteristicsBtn.innerHTML = '<span>Характеристики</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3L3 23M3 3L23 23" stroke="#565252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

                $('.product__images').fadeOut('80');
                setTimeout(() => {
                    $('.product__characteristics').fadeIn('250');
                }, 400);
            }
            this.classList.toggle('opened');
        }
    });

    characteristicsClose.addEventListener('click', function() {
        characteristicsCloseFunc();
        characteristicsBtn.classList.remove('opened');
        characteristicsBtn.innerHTML = '<span>Характеристики</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });

    function characteristicsCloseFunc() {
        for(let i = 0; i < expandBtn.length; i++) {
            expandBtn[i].children[0].classList.remove('active');
            for(let j = 0; j < productDescr.length; j++) {
                productDescr[j].classList.remove('open');
            }
            for(let j = 0; j < characteristicWrapper.length; j++) {
                characteristicWrapper[j].classList.remove('open');
            }
            changeContent(expandBtn[i].children[0]);
        }
        $('.product__characteristics').fadeOut('80');
        setTimeout(() => {
            $('.product__images').fadeIn('250');
        }, 400);
    }

    function changeContent(elem) {
        if(elem.classList.contains('active')) {
            elem.textContent = 'Свернуть';
        } else {
            elem.textContent = 'Развернуть';
        }
    }

    


    // Если фотка товара одна
    const productImagesItems = document.querySelectorAll('.product__images .col');

    if(productImagesItems.length == 1) {
        productImagesItems[0].classList.add('single');
        productImagesItems[0].classList.remove('col-lg-6'); 
    }

    if(window.matchMedia('(min-width: 1025px)').matches && productImagesItems.length >= 1) {
        $('.zoom').zoom({
            magnify: 1.5,
        });
    }
    
    // Слайдер с фотографиями товара на мобильных
    if(window.matchMedia('(max-width: 1024px)').matches && productImagesItems.length > 1) {
        const productImages = $('.product__images');

        productImages.slick({
            dots: false,
            // arrows: false,
            slidesToScroll: 1,
            infinite: false,
            slidesToShow: 1,
            // prevArrow: '<button type="button" class="arrow arrow_prev"><svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3576 23L15.5847 21.1439L5.67395 12.8848L30 12.8848L30 10.26L5.67395 10.26L15.5847 2.00096L13.3576 0.144906L-0.355498 11.5725L13.3576 23Z" fill="#1B1B1B"/></svg></button>',
            // nextArrow: '<button type="button" class="arrow arrow_next"><svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6424 3.05176e-05L14.4153 1.85608L24.3261 10.1152L-1.37684e-07 10.1152L2.28396e-05 12.74L24.3261 12.74L14.4153 20.999L16.6424 22.8551L30.3555 11.4275L16.6424 3.05176e-05Z" fill="#1B1B1B"/></svg></button>',
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        // Progress-bar
        const progressBarImages = document.querySelector('.product .progress-bar'),
            progressRowImages = document.querySelector('.product .progress-bar__row'),
            currentProgressImages = document.querySelector('.product .progress-bar__current-progress');

        if(productImages.slick("getSlick").slideCount <= productImages.slick("getSlick").options.slidesToShow) {
            progressRowImages.classList.add('d-none');
        } else {
            let proggressPart = setLineWidth(productImages, progressBarImages, currentProgressImages);

            $('.product__images').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressImages.style.left = proggressPart * nextSlide + 'px';
            });
        }
    } else if(productImagesItems.length <= 1) {
        document.querySelector('.product .progress-bar__row').classList.add('d-none');
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



    // Добавление якоря на совместимые товары
    const productCompatible = document.querySelectorAll('.product__compatible');

    if(window.matchMedia('(max-width: 1024px)').matches) {
        productCompatible[1].setAttribute('id', 'compatible');
    } else {
        productCompatible[0].setAttribute('id', 'compatible');
    }


    

    // Фиксированная шапка у таблицы

    // Создаём клона, которого будем фиксировать
    const tableWrapper = document.querySelector('.table__wrapper_1'),
        tableWrapperParent = document.querySelector('.table__wrapper'),
        tableLastTr = document.querySelectorAll('.table tr')[(document.querySelectorAll('.table tr')).length - 1],
        tableLastTrHeight = window.getComputedStyle(tableLastTr).getPropertyValue('height').replace('px', '');

    
    if(window.matchMedia('(min-width: 550px)').matches) {
        let tableWrapperClone = tableWrapper.cloneNode(true);
        tableWrapperClone.classList.add('clone');
        tableWrapperParent.appendChild(tableWrapperClone);

        window.addEventListener('scroll', function() {
            let tableWrapperParentTop = tableWrapperParent.getBoundingClientRect().top + window.pageYOffset,
                tableWrapperParentBottom = tableWrapperParent.getBoundingClientRect().bottom + window.pageYOffset,
                tableWrapperCloneHeight = window.getComputedStyle(tableWrapperClone).getPropertyValue('height').replace('px', ''),
                currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);

            let top = currentPos + headerHeight;
            if(top >= tableWrapperParentTop) {
                tableWrapperClone.classList.add('fixed');
                tableWrapperClone.classList.remove('bottom');
                tableWrapperClone.style.top = headerHeight + 'px';
                if((tableWrapperParentBottom - tableLastTrHeight - tableWrapperCloneHeight) <= top) {
                    tableWrapperClone.classList.add('bottom');
                    tableWrapperClone.classList.remove('fixed');
                    tableWrapperClone.style.top = 'auto';
                }
            } else {
                tableWrapperClone.classList.remove('fixed');
                tableWrapperClone.style.top = '0';
            }

            addStyleBottomClass(tableWrapperClone);
        });
    }

    // Создание стиля для класса bottom
    function addStyleBottomClass(elem) {
        if(elem.classList.contains('bottom')) {
            elem.style.bottom = (tableLastTrHeight - 1) + 'px';
            // 1  = 1px border-bottom
        } else {
            elem.style.bottom = 'auto';
        }
    }

    // Фиксированный заголовок для таблицы на мобильных
    const listsTitle = document.querySelector('.lists__title'); // Настоящий заголовок

    if(window.matchMedia('(max-width: 549px)').matches) {
        // Фейковый заголовок в шапке
        let newHeaderBlockTitle = document.createElement('div');
        newHeaderBlockTitle.classList.add('container', 'header__list-title');
        newHeaderBlockTitle.innerHTML = '<div class="row"><div class="col col-12">' + listsTitle.innerHTML + '</div></div>';
        header.appendChild(newHeaderBlockTitle);

        // Высота фейкового заголовка
        let newHeaderBlockTitleHeight = newHeaderBlockTitle.getBoundingClientRect().height * 1;

        window.addEventListener('scroll', function() {
            // Нижняя точка настоящей шапки
            let listsTitleBottom = listsTitle.getBoundingClientRect().bottom + window.pageYOffset,
                // Нижняя точка таблицы
                tableWrapperParentBottom = tableWrapperParent.getBoundingClientRect().bottom + window.pageYOffset,
                currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);

            if(currentPos >= (listsTitleBottom - headerHeight)) {
                newHeaderBlockTitle.classList.add('down');
                if(currentPos >= (tableWrapperParentBottom - headerHeight -  newHeaderBlockTitleHeight - tableLastTrHeight)) {
                    newHeaderBlockTitle.classList.remove('down');
                }
            } else {
                newHeaderBlockTitle.classList.remove('down');
            }
            addStyleBottomClass(listsTitle);
        });
    }



    // Выровнивание по центру числовой ячейки в таблице + соответствующей ячейки в шапке
    const tableTr = document.querySelectorAll('.table tr');
    let numIndex = []; // Массив для индексов

    // Проходимся по всем строкам
    for (let i = 0; i < tableTr.length; i++) {
        let tableTrTh = tableTr[i].children;

        // Проходимся по ячейкам в рамках каждой строки
        for (let j = 0; j < tableTrTh.length; j++) {
            let tableTrThContent = tableTrTh[j].textContent;

            // Находим числовую ячейку
            if(tableTrThContent/tableTrThContent == 1) {
                tableTrTh[j].style.textAlign = 'center';
                // Записываем в массив ее индекс
                numIndex.push(j);
            }
        }
    }

    // Ячейки в фиксированной шапке
    const tableWrapperCloneTh = document.querySelectorAll('.clone th');

    for (let i = 0; i < tableWrapperCloneTh.length; i++) {
        for (let j = 0; j < numIndex.length; j++) {
            if(i == numIndex[j]) {
                tableWrapperCloneTh[i].classList.add('is-center');
            }
        }
    }


    // Якоря в карточке товара
    const compatible = document.getElementById('compatible'),
        characteristics = document.getElementById('characteristics'),
        lists = document.getElementById('lists');
    
    makeAnchor(compatible);
    makeAnchor(characteristics);
    makeAnchor(lists);

    function makeAnchor(elem) {
        elem.style.paddingTop = (headerHeight + 30) + 'px';
        elem.style.marginTop = (headerHeight + 30)*-1 + 'px';
    }


    // Фильтрация в таблице "Смотреть списком"
    $(document).on('click', '.characteristic-filter', function() {
        const filter = this, characteristicFilters = document.querySelectorAll('.characteristic-filter');

        characteristicFilters.forEach(function(item) {
            if(item == filter) {
                item.classList.contains('filtered') ? 
                item.classList.contains('filtered-up') ? removeFilter(item) : item.classList.add('filtered-up') :
                item.classList.add('filtered');
            } else {
                removeFilter(item);
            }
        });
    });

    function removeFilter(elem) {
        elem.classList.remove('filtered', 'filtered-up');
    }
});