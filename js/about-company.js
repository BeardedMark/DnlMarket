window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Скролл секции "Что мы делаем?"
    const aboutDoingItems = document.querySelectorAll('.about-doing-item');
    
    window.addEventListener('scroll', function() {
        let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);

        for (let i = 0; i < aboutDoingItems.length; i++) {
            if(aboutDoingItems[i].getBoundingClientRect().top + window.pageYOffset <= (currentPos + document.documentElement.clientHeight/2)) {
                aboutDoingItems[i].classList.add('is-active');
                if(aboutDoingItems[i-1]) {
                    aboutDoingItems[i-1].classList.add('is-prev');
                }
            } else {
                aboutDoingItems[i].classList.remove('is-active');
                if(aboutDoingItems[i-1]) {
                    aboutDoingItems[i-1].classList.remove('is-prev');
                }
            }
        }
    });

    // Слайдер "Что вы получаете сотрудничая с нами?"
    const cooperationSlider = $('.cooperation-slider');
    cooperationSlider.slick({
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

    // Стрелки для сладера
    const arrowsCooperation = document.querySelectorAll('.about-cooperation-slider__arrows .arrow');
	
	for(let i = 0; i < arrowsCooperation.length; i++) {
		arrowsCooperation[i].addEventListener('click', function() {
			let currentSlide = $(cooperationSlider).slick('slickCurrentSlide');
			if(this.classList.contains('arrow_prev')) {
				$(cooperationSlider).slick('slickGoTo', currentSlide - 1);
			} else if(this.classList.contains('arrow_next')) {
				$(cooperationSlider).slick('slickGoTo', currentSlide + 1);
			}
		});
	}

    // Прогресс-бар
    if(window.matchMedia('(max-width: 1024px)').matches) {
        // Progress-bar
        const progressBarCooperation = document.querySelector('.about-cooperation__slider .progress-bar'),
            progressRowCooperation = document.querySelector('.about-cooperation__slider .progress-bar__row'),
            currentProgressCooperation = document.querySelector('.about-cooperation__slider .progress-bar__current-progress');

        if(cooperationSlider.slick("getSlick").slideCount <= cooperationSlider.slick("getSlick").options.slidesToShow) {
            progressRowCooperation.classList.add('d-none');
        } else {
            let proggressPart = setLineWidth(cooperationSlider, progressBarCooperation, currentProgressCooperation);

            $(cooperationSlider).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                currentProgressCooperation.style.left = proggressPart * nextSlide + 'px';
            });
        }
    }

    function setLineWidth(slider, progressBar, currentProgress) {
        let slidesToShow = slider.slick("getSlick").options.slidesToShow;
        let slideCount = slider.slick("getSlick").slideCount;

        let progressBarWidth = window.getComputedStyle(progressBar).getPropertyValue('width').replace('px', '') * 1;
        let currentProgressWidth = progressBarWidth / ((slideCount - slidesToShow) + 1);
        currentProgress.style.width = currentProgressWidth + 'px';
        return currentProgressWidth;
    }

    // Скролл секции "К чему мы стремимся?"
    const aboutPursuitItems = document.querySelectorAll('.about-pursuit-item');
    
    window.addEventListener('scroll', function() {
        let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);

        for (let i = 0; i < aboutPursuitItems.length; i++) {
            if(aboutPursuitItems[i].getBoundingClientRect().top + window.pageYOffset <= (currentPos + document.documentElement.clientHeight/2)) {
                aboutPursuitItems[i].classList.add('is-active');
                if(aboutPursuitItems[i-1]) {
                    aboutPursuitItems[i-1].classList.add('is-prev');
                }
            } else {
                aboutPursuitItems[i].classList.remove('is-active');
                if(aboutPursuitItems[i-1]) {
                    aboutPursuitItems[i-1].classList.remove('is-prev');
                }
            }
        }
    });
});