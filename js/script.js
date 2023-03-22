window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    // ШАПКА !!!
    const headerCatalogButton = document.querySelectorAll('.header__catalog-button'),
        header = document.querySelector('.header'),
        bottomHeader = document.querySelector('.bottom-header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '') * 1,
        firstSection = document.querySelector('main');
    
    // Отступ первой секции от начала документа
    firstSection.style.paddingTop = headerHeight + 'px';
    window.addEventListener('resize', function() {
        firstSection.style.paddingTop = headerHeight + 'px';
    });

    // Появление фильтра, сортировки и категорий в шапки при скролле
    const categoryOptions = document.querySelector('.category__options'),
    headerInner = document.querySelector('.header .col-inner');
    

    if(categoryOptions) {
        let newOptionsBlock = document.createElement('div');
        newOptionsBlock.classList.add('options', 'd-none');
        newOptionsBlock.innerHTML = '<div class="col-inner"><button data-id="cat" type="button" class="popup-btn"><span>Категории</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 5.5H23.5M9.5 12.5H23.5M9.5 19.5H23.5" stroke="#BBBBBB" stroke-linecap="round"/><circle cx="4.5" cy="5.5" r="1.5" fill="#C4C4C4"/><circle cx="4.5" cy="12.5" r="1.5" fill="#C4C4C4"/><circle cx="4.5" cy="19.5" r="1.5" fill="#C4C4C4"/></svg></button><button data-id="filter" type="button" class="popup-btn"><span>Фильтры</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 3.5H3.5V7.5H5.5L10.5 15.5V22.5L15.5 19.5V15.5L20.5 7.5H22.5V3.5Z" stroke="#BBBBBB" stroke-linejoin="round"/></svg></button><button data-id="sort" type="button" class="popup-btn"><span>Сортировка</span><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 5.5H22.5M3.5 12.5H15.5M3.5 19.5H8.5M19.5 19.5V12.5M19.5 19.5L22.5 17.5M19.5 19.5L16.5 17.5" stroke="#BBBBBB" stroke-linecap="round"/></svg></button></div>';
        headerInner.appendChild(newOptionsBlock);



        let oldPos;
        let newPos;

        newPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);
        oldPos = newPos;


        window.addEventListener('scroll', function(e) {
            let categoryOptionsTop = categoryOptions.getBoundingClientRect().top + window.pageYOffset,
                currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body);
            
            newPos = currentPos;
            
            if(currentPos >= categoryOptionsTop) {
                if(newPos >= oldPos) {
                    down();
                } else {
                    up();
                }
                oldPos = newPos;
            }
        });
    }

    
    function up() {
        $('.header-right').addClass('appear');
        $('.header .options').addClass('disappear');
        $('.header-right').removeClass('disappear');
        $('.header .options').removeClass('appear');
        


        setTimeout(() => {
            $('.header-right').removeClass('d-none');
            $('.header .options').addClass('d-none');
        }, 150);
    }

    function down() {
        $('.header-right').addClass('disappear');
        $('.header .options').addClass('appear');
        $('.header-right').removeClass('appear');
        $('.header .options').removeClass('disappear');



        setTimeout(() => {
            $('.header-right').addClass('d-none');
            $('.header .options').removeClass('d-none');
        }, 150);
    }

    // Плавающие лейблы в форме
    $(document).on('input', '.float-label-form input', function() {
        inputInField(this);
    });

    $(document).on('blur', "[name*='tel']", function() {
        inputInField(this);
    });

    function inputInField(elem) {
        const currentInput = elem, floatLabel = currentInput.closest('.float-label'), floatForm  = currentInput.closest('.float-label-form');
        
        // Фиксация плавающего лейбла
        if(floatLabel) {
            currentInput.value.replace(/\s/g, '') != '' ? floatLabel.classList.add('label-top') : floatLabel.classList.remove('label-top');
        }

        // Блокировка/разблокировка кнопки отправки формы
        const floatLabelFormSubmit = floatForm.querySelector('input[type="submit"]');
        
        blockingSubmitBtn(floatForm) ? floatLabelFormSubmit.disabled = false : floatLabelFormSubmit.disabled = true;

        console.log(elem.value);
    }

    function blockingSubmitBtn(form) {
        const floatInputs = form.querySelectorAll('input:not([type="submit"])[required]');

        for(let a = 0; a < floatInputs.length; a++) {
            if(!floatInputs[a].value.replace(/\s/g, '') || (floatInputs[a].type == 'checkbox' && !floatInputs[a].checked)) {
                return false;
            }
        }

        return true;
    }

    // Поле password
    $(document).on('click', '.password-visible-btn', function() {
        const passVisibleBtn = this, passwordInput = passVisibleBtn.closest('.float-label').querySelector('input');

        passVisibleBtn.classList.toggle('active');
        passVisibleBtn.classList.contains('active') ? passwordInput.type = 'text' : passwordInput.type = 'password';
    });



    // Табы
    const tabs = document.querySelectorAll('.tabbed-content .tab'),
        panels = document.querySelectorAll('.tabbed-content .panel');

    for(let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            clearTabs(i);
            clearPanels(i);
        });
    }

    function clearTabs(index) {
        for(let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
        tabs[index].classList.add('active');
    }

    function clearPanels(index) {
        for(let i = 0; i < panels.length; i++) {
            panels[i].classList.remove('active');
        }
        panels[index].classList.add('active');
    }


    // Попапы (каталог, сортировка, фильтр + количество + меню)

    $(document).on('click', '.popup-btn', function() {
        openPopup(this);
    });

    function openPopup(trigger) {
        let myId = trigger.getAttribute('data-id');
        let popup = $('#popup-' + myId);

        if(trigger.classList.contains('is-active')) {
            closePopup();
        } else{
            $('.overlay').fadeIn();

            if(myId == 'menu') {
                $('.overlay').addClass('overlay_transparent');
            }
            if(myId == 'cat' || myId == 'sort' || myId == 'menu') {
                scrollLock.addScrollableSelector('.popup .wrapper');
            } else if(myId == 'quantity') {
                scrollLock.addScrollableSelector('.popup .quantity__form_inner');

                let qSubmit = document.querySelector('#popup-quantity input[type="submit"]'),
                    qButton = document.querySelector('#popup-quantity input[type="button"]');
                    
                if(trigger.hasAttribute('data-type')) {
                    changeQuantityBtn(qButton);
                } else {
                    changeQuantityBtn(qSubmit);
                }
            }
            else if(myId == 'filter') {
                scrollLock.addScrollableSelector('.popup .wrapper__inner');
            }

            scrollLock.disablePageScroll();
            popup.fadeIn('400');
            popup.addClass('animate__slideInRight animate__animated');
            popup.addClass('active');
            makePaddingForScroll();
            $('html').addClass('pum-open');
        }
    }

    // Функция подмены кнопки в попапе с количеством
    function changeQuantityBtn(btn) {
        let qSubmit = document.querySelector('#popup-quantity input[type="submit"]'),
            qButton = document.querySelector('#popup-quantity input[type="button"]');

        if(btn == qButton) {
            qSubmit.classList.add('d-none');
            qButton.classList.remove('d-none');
        } else if(qSubmit) {
            qSubmit.classList.remove('d-none');
            qButton.classList.add('d-none');
        }
    }

    $(document).on('click', '.popup__close', function() {
        if($(this).closest('.popup').attr('id') == 'popup-quantity' ||
            $(this).closest('.popup').attr('id') == 'popup-create-list' ||
            $(this).closest('.popup').attr('id') == 'popup-success' || 
            $(this).closest('.popup').attr('id') == 'popup-in-cart'

        ) {
            // Если попытка закрыть любой из вышеперечисленных этапа

            let thumbler = false;
            
            let parentPopup = $(this).closest('.popup');

            // Проверка на то, открыт ли ещё какой-нибуль попап (например, "больше вариантов") отдновременно с попапов количества
            $('.popup').each(function(i,elem) {
                
                if($(elem).hasClass('active') && 
                    (
                        ($(elem).attr('id') != 'popup-quantity' && $(elem).attr('id') == 'popup-in-cart') || 
                        ($(elem).attr('id') != 'popup-quantity' && $(elem).attr('id') != 'popup-in-cart')
                    ) &&
                        $(elem).attr('id') != 'popup-create-list' &&
                        $(elem).attr('id') != 'popup-success' 
                    ) 
                {
                    thumbler = true;
                }
            });

            // Если открыт
            if(thumbler) {
                parentPopup.addClass('animate__slideOutRight');
                parentPopup.fadeOut('400');
                setTimeout(() => {
                    parentPopup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
                    parentPopup.removeClass('active');
                }, 400);

            } else {
                closePopup();
            }

            thumbler = false;

        } else {
            closePopup();
        }
    });

    function closePopup() {
        $('.popup').addClass('animate__slideOutRight');
        $('.popup').fadeOut('400');

        $('.overlay').fadeOut();
        $('.overlay1').fadeOut();

        
        scrollLock.enablePageScroll();
        // Без этого не получается разблокировать страницы при нажатии на оверлей с двумя открытыми попапами одновременно
        scrollLock.enablePageScroll();

        header.classList.remove('popup-active');
        bottomHeader.classList.remove('popup-active');

        header.classList.remove('popup-active-full');
        bottomHeader.classList.remove('popup-active-full');

        $('html').removeClass('pum-open');
        $('html').removeClass('pum-open-city');


        $('.header__wrapper_city').removeClass('active');
        $('.header__wrapper_catalog-button').removeClass('active');
        $('.header__wrapper_personal-button').removeClass('active');

        if(window.matchMedia('(max-width: 849px)').matches) {
            $('.personal-popup').addClass('animate__slideOutRight');
            $('.personal-popup').fadeOut('400');

            $('.city-popup').addClass('animate__slideOutRight');
            $('.city-popup').fadeOut('400');
        }

        // У попапа создания/редактирования списков убираем классы
        $('#popup-create-list').removeClass('creation');
        $('#popup-edit-list').removeClass('editing');
        $('#popup-edit-list').removeAttr('data-edit');

        $('#popup-delete').removeClass('delete-items');
        $('#popup-delete').removeClass('delete-list');
        $('#popup-delete').removeAttr('data-delete');

        setTimeout(() => {
            $('.popup').removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            $('.popup').removeClass('active');
            $('.personal-popup').removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            $('.personal-popup').removeClass('active');

            $('.city-popup').removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            $('.city-popup').removeClass('active');
            $('.overlay').removeClass('overlay_transparent');

        }, 400);

    }

    // Пооса прокрутки
    window.addEventListener('resize', function() {
        makePaddingForScroll();
    });


    // Клик по overlay (общий + в шапке)

    $(document).on('click', function(e) {
        if(e.target && 
            (e.target.classList.contains('overlay') || 
            e.target.classList.contains('overlay1'))) {
            closePopup();

            searchFormClearFunc(document.querySelector('#popup-search form'));
        }
    });

    // Сортировка
    const sortItems = document.querySelectorAll('.sort__item');

    for (let i = 0; i < sortItems.length; i++) {
        sortItems[i].addEventListener('click', function() {
            clearActiveSortItems(i);
        });
    }

    function clearActiveSortItems(index) {
        for(let a = 0; a < sortItems.length; a++) {
            sortItems[a].classList.remove('active');
        }
        sortItems[index].classList.add('active');
    }

    // Фильтр
    $(document).on('click', '.filter__name', function() {
        const elem = this;
        elem.classList.toggle('active');
        elem.nextElementSibling.classList.toggle('active');
        openFilter();
        setTimeout(() => {
            makePaddingForScroll();
        }, 300);
    });

    function openFilter() {
        $('.filter__inputs').each(function(i,elem) {
            if($(elem).hasClass("active")) {
                $(elem).slideDown('300');
            } else {
                $(elem).slideUp('300');
            }
        });
    }


    // При любом изменении инпутов
    $(document).on('change', '.filter input', function() {
        checkFilterInputs();
    });

    // При нажатии на сброс

    $(document).on('click', '.filter #reset-filter', function() {
        const filterForm = document.querySelector('#filterForm');
        makeDisabled();
        filterForm.reset();
    });

    if(window.matchMedia('(max-width: 549px)').matches) {
        $('.filter #reset-filter').attr('value', 'Отчистить');
    }
    

    function checkFilterInputs() {
        const inputsInFilter = document.querySelectorAll('.filter input');

        makeDisabled();
    
        for(let i = 0; i < inputsInFilter.length; i++) {
            if(inputsInFilter[i].getAttribute('type') == 'checkbox' && inputsInFilter[i].checked ) {
                makeNotDisabled();
            } else if(inputsInFilter[i].getAttribute('type') == 'number' && inputsInFilter[i].value != '') {
                makeNotDisabled();
            }
        }
    }

    function makeNotDisabled() {
        $('.filter #reset-filter').removeAttr('disabled');
        $('.filter #submit-filter').removeAttr('disabled');
    }

    function makeDisabled() {
        $('.filter #reset-filter').attr('disabled', 'disabled');
        ('.filter #submit-filter').attr('disabled', 'disabled');
    }

    function makePaddingForScroll() {
        let wrapper = document.querySelectorAll('.popup .wrapper'),
            wrapperInner = document.querySelectorAll('.popup .wrapper__inner');
        checkWrappers(wrapper);
        checkWrappers(wrapperInner);
    }

    function checkWrappers(wrapper) {
        for(let i = 0; i < wrapper.length; i++) {
            if(wrapper[i].scrollHeight > wrapper[i].offsetHeight || wrapper[i].scrollWidth > wrapper[i].offsetWidth) {
                wrapper[i].classList.add('scrollable');
            } else {
                wrapper[i].classList.remove('scrollable');
            }
        }
    }

    // Три кнопки над мини-карточкой
    $(document).on('click', '.product-btn', function() {
        this.classList.toggle('active');

        if(this.closest('.category__product')) {
            if(this.classList.contains('compare')) {
                this.closest('.category__product').classList.toggle('add-compare');
            } else if(this.classList.contains('save')) {
                this.closest('.category__product').classList.toggle('add-save');
            }
        }
        
        // Избранное
        if(this.classList.contains('save') && this.classList.contains('active') || 
            this.classList.contains('save') && this.classList.contains('option')) {
                
            openPopupLists();
            console.log('работает');
        }
    });


    function openPopupLists() {
        let popup = $('#popup-lists');

        $('.overlay').fadeIn();
        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        makePaddingForScroll();
        $('html').addClass('pum-open');
    }



    // Попап со списками
    let chooseListsItem = document.querySelectorAll('.choose-lists__item'),
        chooseItemCheckInputs = document.querySelectorAll('.choose-lists__item input[type="checkbox"]'),
        submitChoosBtn = document.querySelector('#submit-choose-lists');

    // Обёртка списка
    for(let i = 0; i < chooseListsItem.length; i++) {
        chooseListsItem[i].addEventListener('click', function(e) {
            clickToItem(e);
        });
    }
    
    // Кнопка внутри обёртки списка
    for(let i = 0; i < chooseItemCheckInputs.length; i++) {
        chooseItemCheckInputs[i].addEventListener('input', function() {
            clickToCheckbox(this);
        });
    }

    function clickToItem(e) {
        let elem = e.target;
        // т.к. событие клика всплывает на потомках добав. проверку на наличие класса
        if(elem && elem.classList.contains('choose-lists__item')) {
            elem.classList.toggle('active');

            if(elem.classList.contains('active')) {
                elem.children[0].checked = true;
            } else {
                elem.children[0].checked = false;
            }
            checkActiveItems();
        }
    }

    function clickToCheckbox(elem) {
        if(elem.checked) {
            elem.closest('.choose-lists__item').classList.add('active');
        } else {
            elem.closest('.choose-lists__item').classList.remove('active');
        }

        checkActiveItems();
    }

    function checkActiveItems() {
        let thumblerChoose = false;
        
        $.each($('.choose-lists__item'), function (index, elem) {
            if($(elem).hasClass('active')) {
                thumblerChoose = true;
            }
        });

        if(thumblerChoose) {
            submitChoosBtn.removeAttribute('disabled');
        } else {
            submitChoosBtn.setAttribute('disabled', 'disabled');
        }
    }


    // Создание нового списка
    let createListBtn = document.querySelectorAll('.create-list-btn'),
        newListName_create = document.querySelector('#popup-create-list input[name="newListName"]'),
        newListName_edit = document.querySelector('#popup-edit-list input[name="newListName"]'),

        createListSubmitBtn = document.querySelector('#popup-create-list .create-list-submit'),
        editListSubmitBtn = document.querySelector('#popup-edit-list .create-list-submit');

    // Открытие попапа с созданием нового списка
    for(let i = 0; i < createListBtn.length; i++) {
        createListBtn[i].addEventListener('click', function() {
            openPopupCreateList(this);
        });
    }

    function openPopupCreateList(btn) {
        let popup = $('#popup-create-list');

        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        makePaddingForScroll();


        newListName_create.focus();
        
        // Если попап создания списка открывается без попапа выбора списка
        if(btn.classList.contains('single-popup')) {
            $('.overlay').fadeIn();
            $('html').addClass('pum-open');

            newListName_create.focus();
        }
        // // Если задача попапа - изменить название существующего списка
        // if(btn.classList.contains('lists-page__edit-name')) {
        //     popup.addClass('editing');
        // } else {
        //     popup.addClass('creation');
        // }

        popup.addClass('creation');
    }

    // Ввод названия списка
    newListName_create.addEventListener('input', function() {
        if(this.value != '' && this.value.replace(/\s/g, '') != '') {
            createListSubmitBtn.classList.remove('disabled');
        } else {
            createListSubmitBtn.classList.add('disabled');
        }
    });

    newListName_edit.addEventListener('input', function() {
        if(this.value != '' && this.value.replace(/\s/g, '') != '') {
            editListSubmitBtn.classList.remove('disabled');
        } else {
            editListSubmitBtn.classList.add('disabled');
        }
    });


    // Добавление нового названия списка в список названий списков
    createListSubmitBtn.addEventListener('click', function() {
        let popup = $('#popup-create-list');

        // Получение нвоого значение и создание соответствеющего элемента в основном попапе списка
        let parent = document.querySelector('#choose-lists-form .wrapper__inner');
        let newListItem = document.createElement('div'), // обёртка
            newListInput = document.createElement('input'), // кнопка
            newListLabel = document.createElement('label'); // лейбл

        // Обёртка
        parent.appendChild(newListItem);
        newListItem.classList.add('choose-lists__item');

        // Кнопка
        newListItem.appendChild(newListInput);
        let chooseListsItemsLength = document.querySelectorAll('.choose-lists__item').length;
        newListInput.setAttribute('type', 'checkbox');
        newListInput.setAttribute('name', 'list-' + (chooseListsItemsLength-1));
        newListInput.setAttribute('id', 'list-' + (chooseListsItemsLength-1));
        // newListInput.setAttribute('checked', 'checked');

        // Лейбл
        newListItem.appendChild(newListLabel);
        newListLabel.setAttribute('for', 'list-' + (chooseListsItemsLength-1));
        newListLabel.textContent = newListName_create.value;
        
        createListSubmitBtn.classList.add('disabled');

        submitChoosBtn.removeAttribute('disabled', 'disabled');

        newListItem.addEventListener('click', function(e) {
            clickToItem(e);
        });

        newListInput.addEventListener('input', function(e) {
            clickToCheckbox(this);
        });

        makePaddingForScroll();
        
        newListName_create.value= '';
        // ЗАкрытие попапа с создание списка
        popup.addClass('animate__slideOutRight');
        popup.fadeOut('400');
        setTimeout(() => {
            popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            popup.removeClass('active');
        }, 400);
        
        scrollLock.enablePageScroll();

        // Если неактивен попап с выбором списка
        let parentPopup = document.querySelector('#popup-lists');
        if(!parentPopup.classList.contains('active')) {
            $('.overlay').fadeOut();
            $('html').removeClass('pum-open');
        } else {
            newListInput.setAttribute('checked', 'checked');
            newListItem.classList.add('active');
        }


        // У попапа создания/редактирования списков убираем классы
        popup.removeClass('creation');
    });

    editListSubmitBtn.addEventListener('click', function() {
        let popup = $('#popup-edit-list');
        
        newListName_edit.value= '';
        // ЗАкрытие попапа с создание списка
        popup.addClass('animate__slideOutRight');
        popup.fadeOut('400');
        setTimeout(() => {
            popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            popup.removeClass('active');
        }, 400);
        
        scrollLock.enablePageScroll();

        $('.overlay').fadeOut();
        $('html').removeClass('pum-open');


        // У попапа создания/редактирования списков убираем классы
        popup.removeClass('editing');
        popup.removeAttr('data-edit');
    });





    // Попап "Количество". +/-

    $(document).on('click', '.choose-quantity__sign', function() {
        let input, inputValue;

        if(this.classList.contains('choose-quantity__sign_minus')) {
            input = this.nextElementSibling;
            inputValue = input.getAttribute('value');
            let inputMin = input.getAttribute('min');

            if(inputValue != inputMin) {
                input.setAttribute('value', inputValue*1 - 1);
            }
        } else if(this.classList.contains('choose-quantity__sign_plus')) {
            input = this.previousElementSibling;
            inputValue = input.getAttribute('value');
            input.setAttribute('value', inputValue*1 + 1);
        }
    });



    

    // Свернуть/развернуть список свойств в попапе фильтры
    const allListBtn = document.querySelectorAll('.all-list');

    for(let i = 0; i < allListBtn.length; i++) {
        allListBtn[i].addEventListener('click', function() {
            this.children[0].classList.toggle('active');
            this.closest('.filter__inputs').classList.toggle('open');

            makePaddingForScroll();
        });
    }

    // Кнопка каталога в шапке
    const categoriesWrapper = document.querySelector('.popup-catalog__categories_inner'),
        subcategoriesWrapper = document.querySelector('.popup-catalog__subcategories_inner');

    for(let i = 0; i < headerCatalogButton.length; i++) {
        headerCatalogButton[i].addEventListener('click', function() {
            openCatalogPoup(this);
        });
    }

    function openCatalogPoup(btn) {
        let thisParent = btn.closest('.header__wrapper_catalog-button');
        thisParent.classList.toggle('active');
        header.classList.toggle('popup-active');
        header.classList.toggle('popup-active-full');

        let popup = $('#popup-catalog');

        if(thisParent.classList.contains('active')) {
            if(window.matchMedia('(max-width: 849px)').matches) {
                popup.css("top", 0);
            } else {
                popup.css("top", (headerHeight) + 'px');
            }
            

            $('.overlay').fadeIn('fast');
            $('.overlay1').fadeIn('fast');

            scrollLock.addScrollableSelector('.popup-catalog__categories_inner');
            scrollLock.addScrollableSelector('.popup-catalog__subcategories_inner');
            scrollLock.disablePageScroll();
            popup.fadeIn('400');
            popup.addClass('active');
            // makePaddingForScroll();
            if(searchResultWrapper.scrollHeight > searchResultWrapper.offsetHeight) {
                searchResultWrapper.classList.add('scrollable');
            } else {
                searchResultWrapper.classList.remove('scrollable');
            }
            $('html').addClass('pum-open');

        } else {

            $('html').removeClass('pum-open');

            $('.popup').addClass('animate__slideOutRight');
            $('.popup').fadeOut('400');
            $('.overlay').fadeOut('fast');
            // overlay1.fadeOut('fast');

            scrollLock.enablePageScroll();
            setTimeout(() => {
                $('.popup').removeClass('animate__slideInRight animate__animated animate__slideOutRight');
                $('.popup').removeClass('active');
            }, 400);
        }
    }



    // Категории и подкатегории
    const categories = document.querySelectorAll('.popup-catalog__categories-item'),
        subCategories = document.querySelectorAll('.popup-catalog__subcategories-item'),
        popupCatalog = document.querySelector('.popup-catalog'),
        mobilePopupClose = document.querySelectorAll('.mobile-popup-close'),
        subCategoriesClose = document.querySelector('.popup-catalog__subcategories-close');

    // Наведение на категории в попапе
    let timer;

    if (window.matchMedia("(min-width: 1025px)").matches) {
        for(let i = 0; i < categories.length; i++) {
            categories[i].addEventListener('mouseenter', function(e) {
                clearActiveCategoriesItems(i);
            });
            categories[i].addEventListener('mouseleave', function(e) {
                clearTimeout(timer);
            });
        }
    }
    
    function clearActiveCategoriesItems(index) {
        timer = setTimeout(() => {
            for(let j = 0; j < categories.length; j++) {
                categories[j].classList.remove('active');
            }
            categories[index].classList.add('active');

            if(categories[index].classList.contains('active')) {
                for(let j = 0; j < subCategories.length; j++) {
                    subCategories[j].classList.remove('active');
                }
                subCategories[index].classList.add('active');
            }
        }, 300);
    }

    if(window.matchMedia('(max-width: 1024px)').matches) {
        for(let i = 0; i < categories.length; i++) {
            categories[i].addEventListener('click', function(e) {
                for(let j = 0; j < categories.length; j++) {
                    categories[j].classList.remove('active');
                }
                this.classList.add('active');

                if(e.target && e.target.tagName != 'a' & !e.target.closest('a')) {
                    popupCatalog.classList.add('active');
                }
            });
        }

        for(let i = 0; i < categories.length; i++) {
            categories[i].innerHTML += '<svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/></svg>';
        }
    }

    subCategoriesClose.addEventListener('click', function() {
        popupCatalog.classList.remove('active');
    });

    for(let i = 0; i < mobilePopupClose.length; i++) {
        mobilePopupClose[i].addEventListener('click', function() {
            closePopup();
        });
        
    }


    // Кнопка с личным кабинетом
    const personalBtn = document.querySelectorAll('.header__personal-button');

    for(let i = 0; i < personalBtn.length; i++) {
        personalBtn[i].addEventListener('click', function() {
            openPersonalPopup(this);
        });
    }

    function openPersonalPopup(btn) {
        // Выделение родительского блока у кнопки
        let thisParent = btn.closest('.header__wrapper_personal-button');
        thisParent.classList.toggle('active');

        header.classList.toggle('popup-active');
        bottomHeader.classList.toggle('popup-active');


        let popup = $('.personal-popup');

        if(thisParent.classList.contains('active')) {
            $('.overlay').fadeIn('fast');
            $('.overlay1').fadeIn('fast');

            scrollLock.disablePageScroll();
            $('html').addClass('pum-open');

            // Выдвижение на планшетах
            if(window.matchMedia('(max-width: 849px)').matches && 
                window.matchMedia('(min-width: 550px)').matches) {
                    popup.fadeIn('400');
                    popup.addClass('active');
                    popup.addClass('animate__slideInRight animate__animated');
            }
            // Появление на мобильных
            if(window.matchMedia('(max-width: 549px)').matches) {
                popup.fadeIn('400');
                // popup.addClass('animate__slideInRight animate__animated');
                popup.addClass('active');
            }

        } else {
            $('html').removeClass('pum-open');
            $('.overlay').fadeOut('fast');
            // $('.overlay1').fadeOut();
            scrollLock.enablePageScroll();
        }
    }


    // Кнопка поиска
    const searchBtn = document.querySelector('.search-btn'),
        searchResultWrapper = document.querySelector('.popup-search__items_inner');

    searchBtn.addEventListener('click', function() {
        openSearchPopup();
    });

    function openSearchPopup() {
        let popup = $('#popup-search');

        $('.overlay').fadeIn();
        scrollLock.addScrollableSelector('.popup-search__items_inner');
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        // popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        makePaddingForScroll();
        $('html').addClass('pum-open');

        if(searchResultWrapper.scrollHeight > searchResultWrapper.offsetHeight) {
            searchResultWrapper.classList.add('scrollable');
        } else {
            searchResultWrapper.classList.remove('scrollable');
        }
    }


    // Форма в шапке
    const searchForm = document.querySelectorAll('.search-form'),
        searchFormClear = document.querySelectorAll('.search-form__clear'),
        inputSearch= document.querySelectorAll('input[type="search"]'),
        popupSearch = document.querySelector('#popup-search');

    // Фокус на поле поиска
    searchBtn.addEventListener('click', function() {
        for (let i = 0; i < inputSearch.length; i++) {
            if(inputSearch[i].closest('#popup-search')) {
                inputSearch[i].focus();
                break;
            }
        }
    });

    // Отчистка поля поиска/формы
    $(document).on('click', '.search-form__clear', function() {
        let currentForm = this.closest('form');

        // Отчистка
        if(this.closest('#popup-search')) {
            searchFormClearFunc(currentForm);
        } else {
            currentForm.reset();
        }

        // Фокус
        for (let i = 0; i < inputSearch.length; i++) {
            if(inputSearch[i].closest('form') == currentForm) {
                inputSearch[i].focus();
                break;
            }
        }
    });

    // Ввод в поле поиска
    $(document).on('input', 'input[type="search"]', function() {
        if(this.closest('#popup-search')) {
            if(this.value != '' && this.value.replace(/\s/g, '') != '') {
                popupSearch.classList.add('has-search-request');
                $('.popup-search__results').removeClass('d-none');
                $('.popup-search__categories').addClass('d-none');
            } else {
                popupSearch.classList.remove('has-search-request');
                $('.popup-search__results').addClass('d-none');
                $('.popup-search__categories').removeClass('d-none');
            }
        }
    });


    function searchFormClearFunc(form) {
        form.reset();
        popupSearch.classList.remove('has-search-request');
        $('.popup-search__results').addClass('d-none');
        $('.popup-search__categories').removeClass('d-none');
    }

    // Отчистка при закрытии

    $(document).on('click', '#popup-search .popup__close', function() {
        searchFormClearFunc(this.closest('form'));
    });

    // Попап с городами
    const cityBtn = document.querySelectorAll('.city-btn'),
        cityName = document.querySelector('.city-name'),
        cityPhone = document.querySelector('.city-phone');

    for(let i = 0; i < cityBtn.length; i++) {
        cityBtn[i].addEventListener('click', function() {
            openCityPopup(this);
        });
    }

    function openCityPopup(btn) {
        let thisParent = btn.closest('.header__wrapper_city');
        thisParent.classList.toggle('active');
        header.classList.toggle('popup-active');
        
        let popup = $('.city-popup');

        if(thisParent.classList.contains('active')) {
            $('.overlay').fadeIn('fast');
            $('.overlay1').fadeIn('fast');

            scrollLock.disablePageScroll();
            $('html').addClass('pum-open');
            $('html').addClass('pum-open-city');

            // Выдвижение на планшетах
            if(window.matchMedia('(max-width: 849px)').matches && 
                window.matchMedia('(min-width: 550px)').matches) {
                    popup.fadeIn('400');
                    popup.addClass('active');
                    popup.addClass('animate__slideInRight animate__animated');
            }
            // Появление на мобильных
            if(window.matchMedia('(max-width: 549px)').matches) {
                popup.fadeIn('400');
                // popup.addClass('animate__slideInRight animate__animated');
                popup.addClass('active');
            }

        } else {
            $('html').removeClass('pum-open');
            $('html').removeClass('pum-open-city');
            $('.overlay').fadeOut('fast');
            // $('.overlay1').fadeOut();
            scrollLock.enablePageScroll();
        }
    }

    // Выбор другого города
    const cities = document.querySelectorAll('.city-popup .city__name'),
        cityPhones = document.querySelectorAll('.city-popup .city__phone'),
        cityItems = document.querySelectorAll('.city-popup .city');

    for(let i = 0; i < cities.length; i++) {
        cities[i].addEventListener('click', function() {
            // Измнение данных о текущем городе
            cityName.textContent = this.textContent;
            cityPhone.textContent = cityPhones[i].textContent;
            cityPhone.setAttribute("href", cityPhones[i].getAttribute('href'));

            // Закрытие попапа
            $('.overlay1').fadeOut();
            $('.header__wrapper_city').removeClass('active');
            header.classList.remove('popup-active');
            closePopup();
        });
        
    }




    // Футер на мобильных
    const footerTitles = document.querySelectorAll('.footer__name'),
        footerLinks = document.querySelectorAll('.footer__links');

    if(window.matchMedia('(max-width: 549px)').matches) {
        for(let i = 0; i < footerTitles.length; i++) {
            footerTitles[i].innerHTML = '<span>' + footerTitles[i].innerHTML + '</span><svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/></svg>';
            
        }
        for(let i = 0; i < footerTitles.length; i++) {
            footerTitles[i].addEventListener('click', function() {
                this.classList.toggle('active');
                footerLinks[i].classList.toggle('active');
                let footerLinksMass = $('.footer__links');

                $.each(footerLinksMass, function (index, elem) {
                    if(index == i) {
                        if(footerLinks[i].classList.contains('active')) {
                            $(elem).slideDown();
                        } else {
                            $(elem).slideUp();
                        }
                    }
                });
            });
        }
    }


    // Попапы в шапке на мобильных
    // const cityPopup = document.querySelector('.city-popup');

    // if(window.matchMedia('(max-width: 849px)').matches) {
    //     // cityPopup.style.top = headerHeight + 'px';
    //     for(let i = 0; i < cityBtn.length; i++) {
    //         cityBtn[i].addEventListener('click', function() {
    //             // header.classList.toggle('popup-active-full');
    //         });
            
    //     }
    //     console.log('+++');
    // }


    




    


    





    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
                return false;
            } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
            }
        });
        }
    }
    });


    // Кнопки "Отмена" и "Удаление" в попапе удаления
    const deleteBtns = document.querySelectorAll('.delete-btns .button');

    for(let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function() {
            closePopup();
        });
    }


    // Попап "Запрос отправлен"
    const requestSubmitBtn = document.querySelectorAll('.request-btn');

    for(let i = 0; i < requestSubmitBtn.length; i++) {
        requestSubmitBtn[i].addEventListener('click', function(e) {
            e.preventDefault();
            sentRequest();
        });
    }

    function sentRequest() {
        let popup = $('#popup-success');

        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');

        setTimeout(() => {
            if(popup.hasClass('active')) {
                popup.addClass('animate__slideOutRight');
                popup.fadeOut('400');

                setTimeout(() => {
                    popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
                    popup.removeClass('active');
                }, 400);
            }
        }, 3000);
    }

    // Попап "Товар добавлен в кoрзину"
    const addInCartBtn = document.querySelectorAll('.add-in-cart');

    for(let i = 0; i < addInCartBtn.length; i++) {
        addInCartBtn[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            addedToCart();
        });
        
    }

    function addedToCart() {
        let popup = $('#popup-in-cart');

        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');

        setTimeout(() => {
            if(popup.hasClass('active')) {
                popup.addClass('animate__slideOutRight');
                popup.fadeOut('400');

                setTimeout(() => {
                    popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
                    popup.removeClass('active');
                }, 400);
            }
        }, 3000);
    }

    // Кастомный select
    // Сворачивание/разворот селекта
    $(document).on('click', '.select', function() {
        this.classList.toggle('active');

        if(this.classList.contains('active')) {
            $(this).next('.select__list').slideDown();
        } else {
            $(this).next('.select__list').slideUp();
        }
    });


    // Выбор из списка
    $(document).on('click', '.select__item', function() {
        // Если это не "Добавить новую компанию" и т.п.
        let trigger = this;
        if(!trigger.classList.contains('add-new')) {
            // Выбор элемента
            selectSelectItem(trigger);
            // Синхронизация работы кастомного и дефолтного селектов
            selectSynchronization(trigger);
        }
    });


    function selectSelectItem(item) {
        // Все элементы из текущего селекта
        let allItems = item.closest('.select__list').children;

        for(let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove('selected');
        }

        item.classList.add('selected');

        // Вставляем выбранный элемент в кнопку select
        const select = document.querySelectorAll('.select');

        for(let i = 0; i < select.length; i++) {
            if(item.closest('.select_wrapper') == select[i].closest('.select_wrapper')) {
                // Вставляем название в span
                select[i].children[0].textContent = item.id;
                select[i].classList.remove('active');
            }
        }
    }

    function selectSynchronization(item) {
        let defaultSelect = document.querySelectorAll('select');

        for(let i = 0; i < defaultSelect.length; i++) {
            // Берём только тот деф. селект, кот. соответствует выбранному элементу из кастомного селекта
            if(item.closest('.select_wrapper') == defaultSelect[i].closest('.select_wrapper')) {
                let optionsMass = defaultSelect[i].children;
            
                for(let j = 0; j < optionsMass.length; j++) {
                    optionsMass[j].select = false;
                    optionsMass[j].removeAttribute('selected');

                    if(optionsMass[j].value == item.id) {
                        optionsMass[j].select = true;
                        optionsMass[j].setAttribute('selected', 'selected');
                    }
                }
            }
        }
    }

    // Если клик мимо кнопки select (сюда входит ещё закрытие селекта при выборе варианта)
    window.addEventListener('click', function(e) {
        if(e.target) {
            if(!e.target.closest('.select') && !e.target.classList.contains('select')) {
                $('.select').removeClass('active');
                $('.select__list').slideUp();
            } else {
                $('.select__list').each(function(index, elem) {
                    if(elem.closest('.select_wrapper') != e.target.closest('.select_wrapper')) {
                        $(elem).slideUp();
                        $(elem).prev().removeClass('active');
                    }
                });
            }   
        }
    }); 


    // Работа аккордиона
    $('.accordion__title').click(function() {
        if(!$(this).hasClass('active')) {
            closeAllAccordions();

            $(this).toggleClass('active');
            $(this).next().slideDown();
            $(this).next().next().addClass('active');
        } else {
            closeAllAccordions();
        }
    });

    function closeAllAccordions() {
        $('.accordion__title').removeClass('active');
        $('.accordion__inner').slideUp();
        $('.accordion__btn').removeClass('active');
    }


    // Добавить в любиме бренды
    $(document).on('click', '.add-like', function() {
        this.classList.toggle('active');
    });

    // Sign in ЛК
    $(document).on('click', '.personal-login-submit', function(e) {
        e.preventDefault();
        let currentHost = window.location.host;
        let currentProtocol = window.location.protocol + '//';

        let newPathname = '/personal.html';

        // Редирект 
        window.location.href = currentProtocol + currentHost + newPathname;
    });

    // Регистрация 
    $(document).on('click', '.registration-next', function() {
        document.querySelector('.registration__step-1').classList.add('d-none');
        document.querySelector('.registration__step-2').classList.remove('d-none');
    });

    $(document).on('click', '.registration-prev', function() {
        document.querySelector('.registration__step-2').classList.add('d-none');
        document.querySelector('.registration__step-1').classList.remove('d-none');
    });


    // Попап Условия доставки 
    const deliveryInfoBtn = document.querySelector('.delivery-info');

    if(deliveryInfoBtn) {
        deliveryInfoBtn.addEventListener('click', function() {
            openDeliveryPopup();
        });
    }
    

    function openDeliveryPopup() {
        let popup = $('#popup-terms-delivery');

        $('.overlay').fadeIn();

        scrollLock.addScrollableSelector('.popup .wrapper');
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        makePaddingForScroll();
        $('html').addClass('pum-open');
    }

    // Кнопка Самовывоз
    const pickupBtn = document.querySelectorAll('.pickup-btn');

    const pickupBlock = $('.pickup-block');

    for(let i = 0; i < pickupBtn.length; i++) {
        pickupBtn[i].addEventListener('click', function() {
            this.classList.toggle('active');
            let childSpan = this.children[0];
            childSpan.classList.toggle('active');
    
            $.each(pickupBlock, function (index, elem) {
                if(index == i) {
                    if(childSpan.classList.contains('active')) {
                        $(elem).slideDown();
                    } else {
                        $(elem).slideUp();
                    }
                }
            });


            setTimeout(() => {
                makePaddingForScroll();
            }, 300);
        });
    }

    // Цвета подложек на банерах (гл стр, новости)
    const parents = document.querySelectorAll('[data-color-item="parent"]');

    for(let i = 0; i < parents.length; i++) {
        parents[i].children[0].style.backgroundColor = parents[i].getAttribute('data-color');
    }

    // Стр Новости и Блог
    const noteItem = document.querySelectorAll('.notes__item .col-inner'),
        noteBottom = document.querySelectorAll('.notes__bottom'),
        noteBottomInner = document.querySelectorAll('.notes__bottom_inner');

    // Фиксируем высоту новостей
    heightAlignment();
    window.addEventListener('resize', function() {
        heightAlignment();
    });

    for(let i = 0; i < noteItem.length; i++) {
        noteItem[i].addEventListener('mouseenter', function() {
            if(window.matchMedia('(min-width: 1025px)').matches) {
                noteBottom[i].style.height = noteBottomInner[i].getBoundingClientRect().height + 'px';
            }
        });
    }
    
    for(let i = 0; i < noteItem.length; i++) {
        noteItem[i].addEventListener('mouseleave', function() {
            if(window.matchMedia('(min-width: 1025px)').matches) {
                noteBottom[i].style.height = 0 + 'px';
            }
        });
    }

    function heightAlignment() {
        if(window.matchMedia('(min-width: 1025px)').matches) {
            for(let i = 0; i < noteItem.length; i++) {
                noteItem[i].style.minHeight = noteItem[i].getBoundingClientRect().height + 'px';
                noteItem[i].classList.add('abs');
            }
        }
    }


    // Классы для секций
    // Каталог
    if(document.querySelector('.catalog__content')) {
        document.querySelector('.catalog__content').closest('section').classList.add('catalog');
    }
    // Категория
    if(document.querySelector('.category__content')) {
        document.querySelector('.category__content').closest('section').classList.add('category');
    }
    // Корзина
    if(document.querySelector('.cat-page__content')) {
        document.querySelector('.cat-page__content').closest('section').classList.add('cat-page', 'mb--negative');
    }
    // Списки
    if(document.querySelector('.lists-page__content')) {
        document.querySelector('.lists-page__content').closest('section').classList.add('lists-page', 'mb--negative');
    }
    // Оформление заказа
    if(document.querySelector('.checkout__content')) {
        document.querySelector('.checkout__content').closest('section').classList.add('checkout', 'mb--negative');
    }
    // Стр контактов
    if(document.querySelector('.contacts__content')) {
        document.querySelector('.contacts__content').closest('section').classList.add('contacts', 'mb--negative');
    }
    // Бренды
    if(document.querySelector('.brands__content')) {
        document.querySelector('.brands__content').closest('section').classList.add('brands', 'mb--negative');
    }
    if(document.querySelector('.brand__content')) {
        document.querySelector('.brand__content').closest('section').classList.add('brand');
    }

    // Вопросы и ответы
    if(document.querySelector('.questions__content')) {
        document.querySelector('.questions__content').closest('section').classList.add('questions', 'mb--negative');
    }

    // Авторизация ЛК
    if(document.querySelector('.authorization__content')) {
        document.querySelector('.authorization__content').closest('section').classList.add('authorization', 'mb--negative');
    }

    // Регистрация
    if(document.querySelector('.registration__content')) {
        document.querySelector('.registration__content').closest('section').classList.add('registration', 'mb--negative');
    }

    // Личный кабинет
    if(document.querySelector('.personal__content')) {
        document.querySelector('.personal__content').closest('section').classList.add('personal', 'mb--negative');
    }

    // Восстановление пароля
    if(document.querySelector('.password-recovery__content')) {
        document.querySelector('.password-recovery__content').closest('section').classList.add('password-recovery', 'mb--negative');
    }

    // Новый пароль
    if(document.querySelector('.password__content')) {
        document.querySelector('.password__content').closest('section').classList.add('password', 'mb--negative');
    }

    // Сравнение
    if(document.querySelector('.comparison__content')) {
        document.querySelector('.comparison__content').closest('section').classList.add('comparison', 'mb--negative');
    }


    // // Для корректной работы скриптов после AJAX
    // $(document).on("ajaxComplete", function(e) {
    //     scripts();
    // });

    // Отправка формы для восстановления пароля 
    const passwordRecoverySubmit = document.querySelector('.password-recovery-submit');

    if(passwordRecoverySubmit) {
        passwordRecoverySubmit.addEventListener('click', function(e) {
            e.preventDefault();
            passwordSubmitFunc($('#popup-success-sending'));
        });
    }
    

    function passwordSubmitFunc(popup) {
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');

        setTimeout(() => {
            if(popup.hasClass('active')) {
                popup.addClass('animate__slideOutRight');
                popup.fadeOut('400');

                setTimeout(() => {
                    popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
                    popup.removeClass('active');
                }, 400);
            }
        }, 3000);
    }


    // Отправка формы с новым паролейм 

    const passwordSubmit = document.querySelector('.password-submit');

    if(passwordSubmit) {
        passwordSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            passwordSubmitFunc($('#popup-success-password-change'));
        });
    }


    /* Маска для email */
        $(document).on('focus', '[name*="email"]', function() {
            this.type = 'text';
            this.setSelectionRange(0, 0);
        });

        /* Плагин работает только на текстовых полях */
        $("[name*='email']").prop("type", "text");

        $("[name*='email']").inputmask("email", 
        {
            showMaskOnHover: false,
            showMaskOnFocus: true,
        }).blur(function() {
            this.type = 'email';
        });

        $("[name*='email']").each(function() {
            if(this.getAttribute('name') == 'my_email') {
                this.setAttribute('placeholder', '_@_._');
            }
        });

    /* */

    /* Маска для телефона */
    // $("[name*='tel']").mask("+7(999)999-99-99",{completed:function(){alert("You typed the following: "+this.val());}});


});