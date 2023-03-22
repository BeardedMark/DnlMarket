window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Скрипты для страницы корзины
    const html = document.querySelector('html'),
        body = document.querySelector('body');

	
	// Закрузить заказ из Excel
    // const fileInput = document.querySelector('.cat-page__buttons input[type="file"]'),
    //     fileParent = document.querySelector('.your-file'),
    //     fileName = document.querySelector('.your-file__name'),
    //     fileClear = document.querySelector('.your-file__close');

    // fileInput.addEventListener('input', function(e) {
    //     processingFile(this.files[0]);
    // });

    // fileClear.addEventListener('click', function() {
    //     fileParent.classList.remove('has-file');
    //     fileInput.value = '';
    //     fileName.textContent = '';
    //     checkoutBtn.classList.add('disabled');
    // });

    // function processingFile(file) {
    //     fileParent.classList.add('has-file');
    //     fileName.textContent = file.name;
    //     checkoutBtn.classList.remove('disabled');
    // }

    // Анимация появления/скрытия поиска
    const catSearch = document.querySelector('.cat-search'),
        catSearchClose = document.querySelector('.search-form__close'),
        catSearchForm = document.querySelector('.cat-page__search-form'),
        catSearchInput = document.querySelector('#cat-search-input');

    catSearch.addEventListener('click', function() {
        catSearchForm.classList.remove('rolled');
        catSearchForm.classList.add('unfolded');
    });

    catSearchClose.addEventListener('click', function() {
        roll();
        catSearchForm.reset();
    });

    

    function roll() {
        if(catSearchForm.classList.contains('unfolded')) {
            catSearchForm.classList.add('rolled');
            setTimeout(() => {
                catSearchForm.classList.remove('unfolded');
            }, 600);
        }
    }

    catSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });



    // Манипуляции с товарами в корзине
    const allGoodsBtn = document.querySelector('#all-items'),
        allGoodsLabel = document.querySelector('label[for="all-items"]'),
        catItemCheck = document.querySelectorAll('.cat-page__item-checkbox'),
        optionBtns = document.querySelectorAll('.cat-page__options-buttons .option'),
        checkoutBtn = document.querySelector('.checkout-button');

    if(window.matchMedia('(max-width: 549px)').matches) {
        allGoodsLabel.textContent = "Все";
    }
    

    // Начальное состояние
    start();

    function start() {
        // Если в корзине присутствует хотя бы один товар
        if(catItemCheck.length > 0) {
            // for(let i = 0; i < catItemCheck.length; i++) {
            //     selected_Vs_notSelected(catItemCheck[i], true);
            // }
            fullOn();
        } else {
            fullOff();
            catSearch.classList.add('disabled');
            checkoutBtn.classList.add('disabled');
        }
    }

    // Задаём состояние кнопок
    function fullOff() {
        allGoodsBtn.classList.add('disabled');
        allGoodsBtn.checked = false;
        makeDisabledOrNotDisabled(0);
    }

    function fullOn() {
        allGoodsBtn.classList.remove('disabled');
        // allGoodsBtn.checked = true;
        // makeDisabledOrNotDisabled(1);
    }

    function selected_Vs_notSelected(checkbox, bool) {
        checkbox.checked = bool;
        if(bool) {
            checkbox.closest('.cat-page__item').classList.add('selected');
        } else {
            checkbox.closest('.cat-page__item').classList.remove('selected');
        }
    }

    function makeDisabledOrNotDisabled(num) {
        // 0(false) - блокируем кнопки
        // 1(true) - снимаем блокировку
        
        // Опциональные кнопки
        for(let b = 0; b < optionBtns.length; b++) {
            if(num) {
                optionBtns[b].classList.remove('disabled');
            } else {
                optionBtns[b].classList.add('disabled');
            }
        }
    }

    // Фиксация шапки
    const optionsHeader = document.querySelector('.cat-page__options'),
        optionsHeader_Height = window.getComputedStyle(optionsHeader).getPropertyValue('height').replace('px', '')*1,
        optionsHeader_Width = window.getComputedStyle(optionsHeader).getPropertyValue('width').replace('px', '')*1,

        optionsHeaderParent = optionsHeader.closest('.col-inner'),
        catPageLeft = document.querySelector('.cat-page__left'),

        header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1;




    makeFixedOptions();

    function makeFixedOptions() {
        let newCatItem = document.querySelectorAll('.cat-page__item');

        // Если в активной панели 2 и больше товаров
        if(newCatItem.length >= 2) {
            optionsHeader.classList.add('can-be-fixed');
        } else {
            optionsHeader.classList.remove('can-be-fixed');
            optionsHeader.classList.remove('fixed');
            optionsHeader.classList.remove('bottom');

            optionsHeader.style.top = 'auto';
            optionsHeader.style.bottom = 'auto';
            catPageLeft.style.paddingTop = 0;
        }
    }

    function setPenultimateс() {
        let newCatItems = document.querySelectorAll('.cat-page__item');
        
        // предпоследний элемент
        return newCatItems[newCatItems.length - 2];
    }

    // если в корзине 2 и > товаров
    window.addEventListener('scroll', function() {
        if(optionsHeader.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            catPageLeftTopPos = catPageLeft.getBoundingClientRect().top + window.pageYOffset;
    
            // Нижняя точка родительского элемента, абсолютно кот. позиционируется шапка классом "bottom"
            let optionsHeaderParentBottom = optionsHeaderParent.getBoundingClientRect().bottom + currentPos;
    
            // Нижняя точка предпоследнего товара
            let penultimateсBottom = setPenultimateс().getBoundingClientRect().bottom + currentPos;
    
            // Расстояние между нижней точкой родителя и нижней точкой предпоследнего эл-та
            let bottom = optionsHeaderParentBottom - penultimateсBottom;
    
            // Тек. поз. + шапка
            let top = currentPos + headerHeight;
    
            if(top >= catPageLeftTopPos) {
                optionsHeader.classList.add('fixed');
                optionsHeader.classList.remove('bottom');
    
                optionsHeader.style.top = headerHeight + 'px';
                optionsHeader.style.bottom = 'auto';
    
                optionsHeader.style.width = optionsHeader_Width + 'px';
    
                catPageLeft.style.paddingTop = optionsHeader_Height + 'px';
    
                if((penultimateсBottom - optionsHeader_Height + 1) <= top) {
                    optionsHeader.classList.remove('fixed');
                    optionsHeader.classList.add('bottom');
    
                    optionsHeader.style.top = 'auto';
                    optionsHeader.style.bottom = bottom + 'px';
                }
            } else {
                optionsHeader.classList.remove('fixed');
                optionsHeader.style.top = 'auto';
                optionsHeader.style.bottom = 'auto';
                catPageLeft.style.paddingTop = 0;
            }
        }
    });

    // Фиксация сайдбара
    const catPageSidebar = document.querySelector('.cat-page__sidebar_outer'),
        catPageSidebarParent = document.querySelector('.cat-page__sidebar'),
        catPageSidebar_Width = window.getComputedStyle(catPageSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar();

    function makeFixedSidebar() {
        let catPageSidebarHeight = window.getComputedStyle(catPageSidebar).getPropertyValue('height').replace('px', '')*1,
            catPageLeftHeight = window.getComputedStyle(catPageLeft).getPropertyValue('height').replace('px', '')*1;

        if(catPageSidebarHeight < catPageLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > catPageSidebarHeight
        ) {
            catPageSidebar.classList.add('can-be-fixed');
        } else {
            catPageSidebar.classList.remove('can-be-fixed');
            catPageSidebar.classList.remove('fixed');
            catPageSidebar.classList.remove('bottom');
            catPageSidebar.style.top = 'auto';
            catPageSidebar.style.bottom = 'auto';
        }



    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(catPageSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            catPageSidebarTopPos = catPageSidebarParent.getBoundingClientRect().top + window.pageYOffset,
            catPageLeftBottom = catPageLeft.getBoundingClientRect().bottom + window.pageYOffset,
            catPageSidebar_Height = window.getComputedStyle(catPageSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight;

            if(top > catPageSidebarTopPos) {
                catPageSidebar.classList.add('fixed');
                catPageSidebar.classList.remove('bottom');

                catPageSidebar.style.width = catPageSidebar_Width + 'px';
                catPageSidebar.style.top = headerHeight + 'px';
                catPageSidebar.style.bottom = 'auto';

                if((catPageLeftBottom - catPageSidebar_Height) <= top) {
                    catPageSidebar.classList.add('bottom');
                    catPageSidebar.classList.remove('fixed');

                    catPageSidebar.style.top = 'auto';
                    catPageSidebar.style.bottom = 0;
                }
            } else {
                catPageSidebar.classList.remove('fixed');
                catPageSidebar.style.top = 'auto';
            }
        }
        
    });


    // Ввод текста в поле поиска
    catSearchInput.addEventListener('input', function() {
        up();
        makeFixedSidebar();
        makeFixedOptions();
    });

    // Выбор товаров посредством нажатия на кнопку "Выделить всё"
    allGoodsBtn.addEventListener('input', function() {
        // Обновленный массив чекбоксов и массив товаров
        let newCatItemCheck = document.querySelectorAll('.cat-page__item-checkbox');

        if(this.checked) {
            for(let i = 0; i < newCatItemCheck.length; i++) {
                // Выделяем товар
                selected_Vs_notSelected(newCatItemCheck[i], true);

                // Снимаем с кнопок блокировку
                makeDisabledOrNotDisabled(1);
            }
        } else {
            // Убераем все отметки
            for(let i = 0; i < newCatItemCheck.length; i++) {
                selected_Vs_notSelected(newCatItemCheck[i], false);
            }
            // Блокируем кнопки
            makeDisabledOrNotDisabled(0);
        }
    });

    // Выбор товаров вручную
    for(let i = 0; i < catItemCheck.length; i++) {
        catItemCheck[i].addEventListener('input', function() {
            handPick(this);
        });
    }

    function handPick(checkbox) {
        if(checkbox.checked) {
            checkbox.closest('.cat-page__item').classList.add('selected');
        } else {
            checkbox.closest('.cat-page__item').classList.remove('selected');
        }

        // Определяем текущее состояние кнопки "Выбрать всё"
        let returnResult = checkAllCheckedInputs();

        // Опциональные кнопки
        // Если товаров выбрано != 0
        if(returnResult.length != 0) {
            // Снимаем с кнопок блокировку
            makeDisabledOrNotDisabled(1);
        } else {
            // Блокируем кнопки
            makeDisabledOrNotDisabled(0);
        }
    }

    function checkAllCheckedInputs() {
        // Обновлённый массив чекбоксов
        let newCatItemCheck = document.querySelectorAll('.cat-page__item-checkbox');
        let thumblerArray = []; // Выбранные товары

        for(let a = 0; a < newCatItemCheck.length; a++) {
            // Если товар выбран, то попадает в массив thumblerArray
            if(newCatItemCheck[a].checked) {
                thumblerArray.push(newCatItemCheck[a]);
            }
        }

        // Если хотя бы один товар не выбран
        if(thumblerArray.length < newCatItemCheck.length) {
            allGoodsBtn.checked = false;

            // Если все товары выбраны
        } else if(thumblerArray.length == newCatItemCheck.length && newCatItemCheck.length != 0) {
            allGoodsBtn.checked = true;
        }

        return thumblerArray;
    }

    // Кнопка вызова попапа удаления
    const catItemDelete = document.querySelector('.delete-items-btn');
    const overlay = $('.overlay');

    // Попап для удаления товаров из корзины
    catItemDelete.addEventListener('click', function() {
        openPopupToDelete();

        let popup = $('#popup-delete');
        popup.addClass('delete-items');
    });

    // Открытие попапа в целом
    function openPopupToDelete() {
        let popup = $('#popup-delete');

        overlay.fadeIn();
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        html.classList.add('pum-open');
    }


    // Кнопка удаления товара/списка
    const deleteBtn = document.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', function() {
        let popup = $('#popup-delete');

        if(body.classList.contains('cat-page')) {
            if(popup.hasClass('delete-items')) {
                // Обновлённый массив товаров
                let newCatItem_1 = document.querySelectorAll('.cat-page__item'),
                    parent = document.querySelector('.cat-page__list');

                for(let j = 0; j < newCatItem_1.length; j++) {
                    // Удаляем выбранные товары
                    if(newCatItem_1[j].classList.contains('selected')) {
                        parent.removeChild(newCatItem_1[j]);
                    }
                }

                allGoodsBtn.checked = false;

                // Проверяем оставлись ли хоть какие-нибудь товары в корзине
                // Обновлённый массив товаров
                let newCatItem_2 = document.querySelectorAll('.cat-page__item');
                
                if(newCatItem_2.length > 0) {
                    allGoodsBtn.classList.remove('disabled');
                } else {
                    allGoodsBtn.classList.add('disabled');
                    // Закрываем поиск, если тот был открыт
                    roll();
                    
                    // Блокируем кнопку поиска
                    catSearch.classList.add('disabled');

                    // Блокируем кнопку оформления заказа
                    checkoutBtn.classList.add('disabled');
                }

                // Опциональные кнопки
                makeDisabledOrNotDisabled(0);

                makeFixedOptions();

            }

            makeFixedSidebar();

        }
    });

    function up() {
        let catPageLeftTopPos = catPageLeft.getBoundingClientRect().top + window.pageYOffset;

		let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        let goal = catPageLeftTopPos - headerHeight - 1;

		if(top > goal) {
			window.scrollBy(0, -10);
			let t = setTimeout(up, 2);
		} else {
            return false;
        }
    }

    
});