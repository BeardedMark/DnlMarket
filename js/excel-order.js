window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    const header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1;
    // Фиксированная шапка у таблицы

    // Создаём клона, которого будем фиксировать
    const tableWrapper = document.querySelector('.table__wrapper_1'),
        tableWrapperParent = document.querySelector('.table__wrapper'),
        tableLastTr = document.querySelectorAll('.table tr')[(document.querySelectorAll('.table tr')).length - 1],
        tableLastTrHeight = window.getComputedStyle(tableLastTr).getPropertyValue('height').replace('px', '');

    
    if(window.matchMedia('(min-width: 850px)').matches) {
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
                tableWrapperClone.style.width = window.getComputedStyle(tableWrapper).getPropertyValue('width');

                if((tableWrapperParentBottom - tableLastTrHeight - tableWrapperCloneHeight) <= top) {
                    tableWrapperClone.classList.add('bottom');
                    tableWrapperClone.classList.remove('fixed');
                    tableWrapperClone.style.top = 'auto';
                    tableWrapperClone.style.width = 'auto';
                }
            } else {
                tableWrapperClone.classList.remove('fixed');
                tableWrapperClone.classList.remove('bottom');
                tableWrapperClone.style.top = '0';
                tableWrapperClone.style.width = 'auto';
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



    // Фиксация сайдбара
    const excelOrderSidebar = document.querySelector('.excel-order-section__sidebar_outer'),
    excelOrderLeft = document.querySelector('.excel-order-section__left'),
    excelOrderSidebarParent = document.querySelector('.excel-order-section__sidebar'),
    excelOrderSidebar_Width = window.getComputedStyle(excelOrderSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar_1();

    function makeFixedSidebar_1() {
        let excelOrderSidebarHeight = window.getComputedStyle(excelOrderSidebar).getPropertyValue('height').replace('px', '')*1,
            excelOrderLeftHeight = window.getComputedStyle(excelOrderLeft).getPropertyValue('height').replace('px', '')*1;

        if(excelOrderSidebarHeight < excelOrderLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > excelOrderSidebarHeight
        ) {
            excelOrderSidebar.classList.add('can-be-fixed');
        } else {
            excelOrderSidebar.classList.remove('can-be-fixed');
            excelOrderSidebar.classList.remove('fixed');
            excelOrderSidebar.classList.remove('bottom');
            excelOrderSidebar.style.top = 'auto';
            excelOrderSidebar.style.bottom = 'auto';
        }
    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(excelOrderSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            excelOrderSidebarTopPos = excelOrderSidebarParent.getBoundingClientRect().top + window.pageYOffset,
            excelOrderLeftBottom = excelOrderLeft.getBoundingClientRect().bottom + window.pageYOffset,
            excelOrderSidebar_Height = window.getComputedStyle(excelOrderSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 10;

            if(top > excelOrderSidebarTopPos) {
                excelOrderSidebar.classList.add('fixed');
                excelOrderSidebar.classList.remove('bottom');

                excelOrderSidebar.style.width = excelOrderSidebar_Width + 'px';
                excelOrderSidebar.style.top = headerHeight + 10 + 'px';
                excelOrderSidebar.style.bottom = 'auto';

                if((excelOrderLeftBottom - excelOrderSidebar_Height) <= top) {
                    excelOrderSidebar.classList.add('bottom');
                    excelOrderSidebar.classList.remove('fixed');

                    excelOrderSidebar.style.top = 'auto';
                    excelOrderSidebar.style.bottom = 0;
                }
            } else {
                excelOrderSidebar.classList.remove('fixed');
                excelOrderSidebar.style.top = 'auto';
            }
        }
        
    });

    // Удаление строк из таблицы
    $(document).on('click', '.delete-tr-btn', function() {
        document.querySelector('.table tbody').removeChild(this.closest('tr'));

        makeFixedSidebar_1();
    });

    // Удаление неидентифицированного артикула
    $(document).on('click', '.delete-unidentified-btn', function() {
        document.querySelector('.unidentified').removeChild(this.closest('.unidentified__item'));

        checkNum();
        makeFixedSidebar_1();
    });

    function checkNum() {
        let unidentifiedNums = document.querySelectorAll('.unidentified__num');

        for (let i = 0; i < unidentifiedNums.length; i++) {
            unidentifiedNums[i].textContent = i+1;
        }
    }

    // Нажмите для исправления (открытие поиска)
    $(document).on('click', '.correction-btn', function() {
        // Закрытие всех
        deleteSearch();

        // Открытие нужного
        $(this.closest('.unidentified__item_inner')).next().fadeIn('200');

        // Фокус на поле ввода
        let inputs = document.querySelectorAll('input[type="search"');

        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].closest('.unidentified__item_form') == this.closest('.unidentified__item_inner').nextElementSibling) {
                inputs[i].focus();
                break;
            }
        }
    });

    // Закрытие поиска
    $(document).on('click', '.search-form__close', function() {
        $(this.closest('.unidentified__item_form')).fadeOut('200');
        $(this.closest('form')).next().hide();
        this.closest('form').reset();
    });

    function deleteSearch() {
        // Закрытие полей ввода
        $('.unidentified__item_form').fadeOut('200');
        // Закрытие выпадашек
        $('.art-list').hide();
        // Отчистка форм
        let unidentifiedForms = document.querySelectorAll('.unidentified__item_form form');

        for (let i = 0; i < unidentifiedForms.length; i++) {
            unidentifiedForms[i].reset();
        }
    }

    // Ввод в поле поиска
    $(document).on('input', '.unidentified__item_form input[type="search"]', function() {
        checkINputSearch(this);
    });

    function checkINputSearch(elem) {
        if(elem.value != '' && elem.value.replace(/\s/g, '') != '') {
            $(elem.closest('form')).next().slideDown('200');
        } else {
            $(elem.closest('form')).next().slideUp('200');
        }
    }

    // Выбор правильного артикула 
    $(document).on('click', '.art-list__item', function() {
        selectArt(this);

        $(this.closest('.unidentified__item_form')).hide();
        this.closest('.unidentified__item').classList.add('animate__fadeOutRight', 'animate__animated', 'disabled');

        setTimeout(() => {
            let parent = document.querySelector('.unidentified');
            parent.removeChild(this.closest('.unidentified__item'));

            checkNum();
            makeFixedSidebar_1();
        }, 1000);
    });

    function selectArt(trigger) {
        let incorrectArts = document.querySelectorAll('.unidentified__art span');
        let correctArts = document.querySelectorAll('.art-list__product-art span');
        let art;

        for (let i = 0; i < correctArts.length; i++) {
            if(correctArts[i].closest('.art-list__item') == trigger) {
                art = correctArts[i].textContent;
                break;
            }
        }

        for (let i = 0; i < incorrectArts.length; i++) {
            if(incorrectArts[i].closest('.unidentified__item') == trigger.closest('.unidentified__item')) {
                incorrectArts[i].textContent = art;
                incorrectArts[i].classList.add('primary-text');
            }
        }
    }

    // Отчистка
    $(document).on('click', '.unidentified__item_form .search-form__clear', function() {
        $(this.closest('form')).next().slideUp('200');
    });

    // Якорь для блока с неидентифицированными артикулами
    const unidentifiedAnchor = document.getElementById('unidentified');
    makeAnchor(unidentifiedAnchor);

    function makeAnchor(elem) {
        elem.style.paddingTop = (headerHeight + 30) + 'px';
        elem.style.marginTop = (headerHeight + 30)*-1 + 'px';
    }
});