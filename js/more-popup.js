window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    // More popup

    // Инф.сообщение
    $(document).on('mouseenter', '.message-trigger', function() {
        $('.more__info .message').addClass('active');
    });
    $(document).on('mouseleave', '.more__info', function() {
        $('.more__info .message').removeClass('active');
    });

    // Открытие попапа
    $(document).on('click', '.more', function() {
        openMorePopup();

        if(window.matchMedia('(max-width: 1024px)').matches) {
            // Добавляем стрелки для выпадашек
            let paramsNames = document.querySelectorAll('.more__params-name'),
                paramsLists = document.querySelectorAll('.more__params-list ul');

            for(let i = 0; i < paramsLists.length; i++) {
                // Расчёт высоты списка paramsLists для отображения только двух рядов характеристик
                let height_2_rows = (paramsLists[i].children[0].getBoundingClientRect().height * 2) + (window.getComputedStyle(paramsLists[i].children[0]).getPropertyValue('margin-bottom').replace('px', '') * 2);
                let currentHeightParamsList = window.getComputedStyle(paramsLists[i]).getPropertyValue('height').replace('px', '') * 1;
                if(Math.ceil(currentHeightParamsList) > Math.ceil(height_2_rows)) {
                    paramsNames[i].innerHTML = '<span>' + paramsNames[i].innerHTML + '</span><svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/></svg>';
                    paramsNames[i].classList.add('dropping');
                    closeParamsList(paramsLists[i]);
                }
            }

            checkScroll();

        } else {
            checkScroll();
        }
    });

    function openMorePopup() {
        let popup = $('#popup-more');

        $('.overlay').fadeIn();
        scrollLock.addScrollableSelector('.more__params');
        scrollLock.addScrollableSelector('.more__left');
        scrollLock.disablePageScroll();

        popup.fadeIn('400');
        popup.addClass('active');
        $('html').addClass('pum-open');

        let popupMoreHeight = document.documentElement.clientHeight;
        let message = document.querySelector('.more__info .message');
        let moreInfoBottom = message.getBoundingClientRect().bottom;

        if(moreInfoBottom >= popupMoreHeight) {
            message.classList.add('up');
        } else {
            message.classList.remove('up');
        }
    }


    // Сворачивание/разворачивание выпадашек
    $(document).on('click', '.more__params-name', function() {
        if(this.classList.contains('dropping')) {
            this.classList.toggle('active');

            let parent = this.closest('.more__params-item');
            parent.classList.toggle('active');

            let paramsLists = document.querySelectorAll('.more__params-list ul');

            if(parent.classList.contains('active')) {
                for(let a = 0; a < paramsLists.length; a++) {
                    if(paramsLists[a].closest('.more__params-item') == parent) {
                        openParamsList(paramsLists[a]);
                    }
                }
            } else {
                for(let a = 0; a < paramsLists.length; a++) {
                    if(paramsLists[a].closest('.more__params-item') == parent) {
                        closeParamsList(paramsLists[a]);
                    }
                }
            }

            checkScroll();
        }
    });



    // Добавление отступа, если есть скроллбар
    function checkScroll() {
        let moreParams = document.querySelectorAll('.more__params');

        for(let i = 0; i < moreParams.length; i++) {
            moreParams[i].classList.remove('scrollable');
            if(moreParams[i].scrollHeight > moreParams[i].offsetHeight) {
                moreParams[i].classList.add('scrollable');
            } else {
                moreParams[i].classList.remove('scrollable');
            }
        }
    }


    // Выбор параметра в попапе "Больше вариантов"
    $(document).on('click', '.param-button', function() {
        let parent = this.closest('.more__params-list');

        if(!parent.classList.contains('selected-list')) {
            this.classList.add('selected');
            parent.classList.add('selected-list');

            let paramsBtn = document.querySelectorAll('.param-button');

            for(let a = 0; a < paramsBtn.length; a++) {
                if(paramsBtn[a].closest('.more__params-list').classList.contains('selected-list') && 
                    !paramsBtn[a].classList.contains('selected')) {
                    blockingParams(paramsBtn[a]);
                }
            }

            $('#reset-params').removeClass('disabled');
            $('#submit-params').removeClass('disabled');
        }
    });


    // Сброс параметров
    $(document).on('click', '#reset-params', function() {
        if(!this.classList.contains('disabled')) {
            resetParams();
            $('#reset-params').addClass('disabled');
            $('#submit-params').addClass('disabled');
        }
    });



    // Разворачивание
    function openParamsList(list) {
        list.style.maxHeight = 'none';
    }

    // Сворачивание
    function closeParamsList(list) {
        let height_2_rows = window.getComputedStyle(list.children[0]).getPropertyValue('height').replace('px', '') * 2 + window.getComputedStyle(list.children[0]).getPropertyValue('margin-bottom').replace('px', '') * 2;
        list.style.maxHeight = height_2_rows + 'px';
    }


    // Блокировка параметров
    function blockingParams(elem) {
        elem.classList.add('disabled');
    }

    // Сброс выбранных параметров
    function resetParams() {
        let paramsBtn = document.querySelectorAll('.param-button');

        for(let i = 0; i < paramsBtn.length; i++) {
            paramsBtn[i].classList.remove('selected', 'disabled');
            paramsBtn[i].closest('.more__params-list').classList.remove('selected-list');
        }
    }
});