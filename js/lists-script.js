window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';
    // Скрипты для страницы списков

    const html = document.querySelector('html'),
        body = document.querySelector('body');


    const allListsBtn = document.querySelector('#all-items'),
        listItemCheck = document.querySelectorAll('.lists-page__item-checkbox'),
        optionBtns = document.querySelectorAll('.lists-page__options-buttons .option');
    
    
    // Начальное состояние
    start();

    function start() {
        let disabled = false;

        for(let i = 0; i < listItemCheck.length; i++) {
            // Если хотя бы один товар находится в активном списке
            if(listItemCheck[i].closest('.list-panel').classList.contains('active')) {
                disabled = true;
                break;
            }
        }

        if(disabled) {
            fullOn();
        } else {
            fullOff();
        }
    }

    // Фиксация шапки с опциональными кнопками
    const optionsHeader = document.querySelector('.lists-page__options'),
        optionsHeader_Height = window.getComputedStyle(optionsHeader).getPropertyValue('height').replace('px', '')*1,
        optionsHeader_Width = window.getComputedStyle(optionsHeader).getPropertyValue('width').replace('px', '')*1,

        optionsHeaderParent = optionsHeader.closest('.col-inner'),
        listsPageLeft = document.querySelector('.lists-page__left'),

        header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1;


    makeFixedOptions();

    function makeFixedOptions() {
        let newListItem = document.querySelectorAll('.lists-page__item');
        let index = 0;

        for(let i = 0; i < newListItem.length; i++) {
            // Считаем сколько товаров находится в текущей активной панели
            if(newListItem[i].closest('.list-panel').classList.contains('active')) {
                index++;
            }
        }

        // Если в активной панели 2 и больше товаров
        if(index >= 2) {
            optionsHeader.classList.add('can-be-fixed');
        } else {
            optionsHeader.classList.remove('can-be-fixed');
            optionsHeader.classList.remove('fixed');
            optionsHeader.classList.remove('bottom');

            optionsHeader.style.top = 'auto';
            optionsHeader.style.bottom = 'auto';

            listsPageLeft.style.paddingTop = 0;
        }
    }

    function setPenultimateс() {
        let activePanelItems = [];

        let newListItems = document.querySelectorAll('.lists-page__item');
        for(let j = 0; j < newListItems.length; j++) {
            if(newListItems[j].closest('.list-panel').classList.contains('active')) {
                activePanelItems.push(newListItems[j]);
            }
        }
        // предпоследний элемент
        return activePanelItems[activePanelItems.length - 2];
    }

    // Фиксация сайдбара со списками
    const listsPageSidebar = document.querySelector('.lists-page__sidebar_outer'),
        listsPageSidebarParent = document.querySelector('.lists-page__sidebar'),
        listsPageSidebar_Width = window.getComputedStyle(listsPageSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar();

    function makeFixedSidebar() {
        let listsPageSidebarHeight = window.getComputedStyle(listsPageSidebar).getPropertyValue('height').replace('px', '')*1,
            listsPageLeftHeight = window.getComputedStyle(listsPageLeft).getPropertyValue('height').replace('px', '')*1;

        if(listsPageSidebarHeight < listsPageLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight) > listsPageSidebarHeight
        ) {
            listsPageSidebar.classList.add('can-be-fixed');
        } else {
            listsPageSidebar.classList.remove('can-be-fixed');
            listsPageSidebar.classList.remove('fixed');
            listsPageSidebar.classList.remove('bottom');
            listsPageSidebar.style.top = 'auto';
            listsPageSidebar.style.bottom = 'auto';
        }
    }



    // если в текушей активной панели 2 и > товаров
    window.addEventListener('scroll', function() {
        if(optionsHeader.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            listsPageLeftTopPos = listsPageLeft.getBoundingClientRect().top + window.pageYOffset;
    
            // Нижняя точка родительского элемента, абсолютно кот. позиционируется опц. шапка классом "bottom"
            let optionsHeaderParentBottom = optionsHeaderParent.getBoundingClientRect().bottom + currentPos;
    
            //Нижняя точка предпоследнего товара в панели
            let penultimateсBottom = setPenultimateс().getBoundingClientRect().bottom + currentPos;
    
            // Расстояние между нижней точкой родителя и нижней точкой предпоследнего эл-та
            let bottom = optionsHeaderParentBottom - penultimateсBottom;
    
            // Тек. поз. + шапка
            let top = currentPos + headerHeight;
    
            if(top >= listsPageLeftTopPos) {
                optionsHeader.classList.add('fixed');
                optionsHeader.classList.remove('bottom');
    
                optionsHeader.style.top = headerHeight + 'px';
                optionsHeader.style.bottom = 'auto';
    
                optionsHeader.style.width = optionsHeader_Width + 'px';
    
                listsPageLeft.style.paddingTop = optionsHeader_Height + 'px';
    
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
                listsPageLeft.style.paddingTop = 0;
            }
        }
    });
    
    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(listsPageSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            listsPageSidebarTopPos = listsPageSidebarParent.getBoundingClientRect().top + window.pageYOffset,
            listsPageLeftBottom = listsPageLeft.getBoundingClientRect().bottom + window.pageYOffset,
            listsPageSidebar_Height = window.getComputedStyle(listsPageSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 10;

            if(top > listsPageSidebarTopPos) {
                listsPageSidebar.classList.add('fixed');
                listsPageSidebar.classList.remove('bottom');

                listsPageSidebar.style.width = listsPageSidebar_Width + 'px';
                listsPageSidebar.style.top = headerHeight + 10 + 'px';
                listsPageSidebar.style.bottom = 'auto';

                if((listsPageLeftBottom - listsPageSidebar_Height) <= top) {
                    listsPageSidebar.classList.add('bottom');
                    listsPageSidebar.classList.remove('fixed');

                    listsPageSidebar.style.top = 'auto';
                    listsPageSidebar.style.bottom = 0;
                }
            } else {
                listsPageSidebar.classList.remove('fixed');
                listsPageSidebar.style.top = 'auto';
            }
        }
        
    });


    // Задаём состояние кнопок
    function fullOff() {
        allListsBtn.classList.add('disabled');
        allListsBtn.checked = false;
        makeDisabledOrNotDisabled(0);
    }
    function fullOn() {
        allListsBtn.classList.remove('disabled');
    }


    // Выбор товаров посредством нажатия на кнопку "Выделить всё"
    allListsBtn.addEventListener('input', function() {
        // Обновленный массив чекбоксов и массив товаров
        let newlistItemCheck = document.querySelectorAll('.lists-page__item-checkbox');

        if(this.checked) {
            for(let i = 0; i < newlistItemCheck.length; i++) {
                // Если чекбокс находится в активной панели
                if(newlistItemCheck[i].closest('.list-panel').classList.contains('active')) {
                    // Выделяем товар
                    selected_Vs_notSelected(newlistItemCheck[i], true);
                } else {
                    // Убераем отметку с товара
                    selected_Vs_notSelected(newlistItemCheck[i], false);
                }
                // Снимаем с кнопок блокировку
                makeDisabledOrNotDisabled(1);
            }
        } else {
            // Убераем все отметки
            for(let i = 0; i < newlistItemCheck.length; i++) {
                selected_Vs_notSelected(newlistItemCheck[i], false);
            }
            // Блокируем кнопки
            makeDisabledOrNotDisabled(0);
        }
    });
    

    function selected_Vs_notSelected(checkbox, bool) {
        checkbox.checked = bool;
        if(bool) {
            checkbox.closest('.lists-page__item').classList.add('selected');
        } else {
            checkbox.closest('.lists-page__item').classList.remove('selected');
        }
    }


    // Выбор товаров вручную
    $(document).on('click', '.lists-page__item-checkbox', function() {
        handPick(this);
    });
    // for(let i = 0; i < listItemCheck.length; i++) {
    //     listItemCheck[i].addEventListener('input', function() {
    //         handPick(this);
            
    //     });
    // }

    function handPick(checkbox) {
        if(checkbox.checked) {
            checkbox.closest('.lists-page__item').classList.add('selected');
        } else {
            checkbox.closest('.lists-page__item').classList.remove('selected');
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
        let newlistItemCheck = document.querySelectorAll('.lists-page__item-checkbox');
        let thumblerArray = [], // Выбранные товары
            arrCheckbox = []; // Чекбоксы в активной панели

        for(let a = 0; a < newlistItemCheck.length; a++) {
            // Добавляем в массив arrCheckbox чекбоксы из активных панелей
            if(newlistItemCheck[a].closest('.list-panel').classList.contains('active')) {
                arrCheckbox.push(newlistItemCheck[a]);
            }

            // Если товар выбран, то попадает в массив thumblerArray
            if(newlistItemCheck[a].checked) {
                thumblerArray.push(newlistItemCheck[a]);
            }
        }

        // Если хотя бы один товар не выбран
        if(thumblerArray.length < arrCheckbox.length) {
            allListsBtn.checked = false;

            // Если все товары выбраны
        } else if(thumblerArray.length == arrCheckbox.length && arrCheckbox.length != 0) {
            allListsBtn.checked = true;
        }

        return thumblerArray;
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



    // Кнопка вызова попапа удаления
    const listItemDelete = document.querySelector('.delete-items-btn'),
        deleteListBtn = document.querySelectorAll('.lists-page__delete-list');

    const overlay = $('.overlay');

    // Попап для удаления товаров из списка
    listItemDelete.addEventListener('click', function() {
        openPopupToDelete();

        let popup = $('#popup-delete');
        popup.addClass('delete-items');
    });

    // Попап для удаления списка
    $(document).on('click', '.lists-page__delete-list', function() {
        deleteListPopup(this);
    });
    // for(let i = 0; i < deleteListBtn.length; i++) {
    //     deleteListBtn[i].addEventListener('click', function() {
    //         deleteListPopup(this);
    //     });
    // }

    // Открытие попапа конкретными кнопками
    function deleteListPopup(trigger) {
        openPopupToDelete();

        let popup = $('#popup-delete');
        popup.addClass('delete-list');
        popup.attr('data-delete', trigger.getAttribute('data-delete-tab'));
    }

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

        if(body.classList.contains('lists-page')) {
            if(popup.hasClass('delete-items')) {
                // Обновлённый массив товаров
                let newlistItem_1 = document.querySelectorAll('.lists-page__item');

                for(let j = 0; j < newlistItem_1.length; j++) {
                    let paretOuter = newlistItem_1[j].closest('.list-panel'),
                        parentInner = newlistItem_1[j].closest('.row');

                        // Удаляем выбранные товары из активной панели
                    if(paretOuter.classList.contains('active') && 
                        newlistItem_1[j].classList.contains('selected')) {
                        
                        parentInner.removeChild(newlistItem_1[j]);
                    }
                }

                allListsBtn.checked = false;

                // Проверяем оставлись ли хоть какие-нибудь товары в текущем списке
                // Обновлённый массив товаров
                let newlistItem_2 = document.querySelectorAll('.lists-page__item');
                let index = false;

                for(let i = 0; i < newlistItem_2.length; i++) {
                    if(newlistItem_2[i].closest('.list-panel').classList.contains('active')) {
                        index = true;
                        break;
                    }
                }

                if(!index) {
                    allListsBtn.classList.add('disabled');
                } else {
                    allListsBtn.classList.remove('disabled');
                }

                // Опциональные кнопки
                makeDisabledOrNotDisabled(0);

                makeFixedOptions();

            } else if(popup.hasClass('delete-list')) {
                // Родительский блок у табов
                let parent = document.querySelector('.lists-page__editing');
                // Родительский блок у панелей
                let parentPanel = document.querySelector('.lists-page__lists');

                // Таб, который хотим удалить
                let tab = document.querySelector('[data-tab="' + popup.attr('data-delete') + '"]');
                // Соотв. табу панель
                let panel = document.querySelector('[data-panel="' + popup.attr('data-delete') + '"]');

                // Удаление таба
                parent.removeChild(tab.closest('.lists-page__editing-item'));

                // Если в момент удаления таба, мы находились в его панели
                if(panel.classList.contains('active')) {
                    // Удаление панели
                    parentPanel.removeChild(panel);
                    // переход на первый таб
                    // document.querySelector('[data-tab="list-0"]').click();
                    clickTab(document.querySelector('[data-tab="list-0"]'), false);
                } else {
                    parentPanel.removeChild(panel);
                    if(!window.matchMedia('(max-width: 1024px)').matches) {
                        up();
                    }
                }
            }

            makeFixedSidebar();
        }
    });



    // Табы для списков
    let listTabs = document.querySelectorAll('.lists-page__editing-name');


    // Выбор таба
    $(document).on('click', '.lists-page__editing-name', function(e) {
        clickTab(this, true);
    });


    function clickTab(tab, bool) {
        // Таб меняется
        if(!tab.classList.contains('active')) {
            // Удаление галочек с чекбоксов и блокировка всех кнопок
            clearActiveListItemsForActivePanel();

            // Делаем новый таб и панель активными
            clearActivelistTabs();

            // Текущий таб
            tab.classList.add('active');

            // Соответствующая панель
            document.querySelector('[data-panel="' + tab.getAttribute('data-tab') + '"]').classList.add('active');

            let newlistItem = document.querySelectorAll('.lists-page__item'),
                thumbler = false;

            for(let j = 0; j < newlistItem.length; j++) {
                if(newlistItem[j].closest('.list-panel').classList.contains('active')) {
                    thumbler = true;
                }
            }

            if(thumbler) {
                // Включение кнопок
                fullOn();
            }
        }

        makeFixedOptions();
        makeFixedSidebar();

        if(window.matchMedia('(max-width: 1024px)').matches) {
            if(bool) {
                down();
            }
        } else {
            up();
        }
    }

    function down() {
        let listsPageLeftTopPos = listsPageLeft.getBoundingClientRect().top + window.pageYOffset;

        let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        let goal = listsPageLeftTopPos - headerHeight - 1;

        if(top < goal) {
            window.scrollBy(0, 10);
            let t = setTimeout(down, 2);
        } else {
            return false;
        }
    }

    function up() {
        let listsPageLeftTopPos = listsPageLeft.getBoundingClientRect().top + window.pageYOffset;

        let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        let goal = listsPageLeftTopPos - headerHeight - 1;

        if(top > goal) {
            window.scrollBy(0, -10);
            let t = setTimeout(up, 2);
        } else {
            return false;
        }
    }

    function clearActivelistTabs() {
        let newlistTabs = document.querySelectorAll('.list-tab'),
            newlistPanel = document.querySelectorAll('.list-panel');

        for(let j = 0; j < newlistTabs.length; j++) {
            newlistTabs[j].classList.remove('active');
            newlistPanel[j].classList.remove('active');
        }
    }

    function clearActiveListItemsForActivePanel() {
        // Обновленные массивы чекбоксов
        let newlistItemCheck = document.querySelectorAll('.lists-page__item-checkbox');
        for(let i = 0; i < newlistItemCheck.length; i++) {
            selected_Vs_notSelected(newlistItemCheck[i], false);
        }
        fullOff();
    }


    // Открытие редактирования названия существующего списка
    let editListBtn = document.querySelectorAll('.edit-list-btn'),
        newListName_edit = document.querySelector('#popup-edit-list input[name="newListName"]');

    $(document).on('click', '.edit-list-btn', function() {
        openPopupToEditList(this);
    });
    // for(let i = 0; i < editListBtn.length; i++) {
    //     editListBtn[i].addEventListener('click', function() {
    //         openPopupToEditList(this);
    //     });
    // }
    
    function openPopupToEditList(btn) {
        let popup = $('#popup-edit-list');
    
        overlay.fadeIn();
        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        html.classList.add('pum-open');

        // popup.addClass('editing');

        popup.attr('data-edit', btn.getAttribute('data-edit-tab'));

        newListName_edit.focus();
        newListName_edit.value = (document.querySelector('[data-tab="' + btn.getAttribute('data-edit-tab') + '"]')).textContent;

        if(newListName_edit.value != '' && newListName_edit.value.replace(/\s/g, '') != '') {
            editListSubmitBtn.classList.remove('disabled');
        } else {
            editListSubmitBtn.classList.add('disabled');
        }
    }


    // Создание списка на странице списков
    let createListSubmitBtn = document.querySelector('#popup-create-list .create-list-submit'),
        editListSubmitBtn = document.querySelector('#popup-edit-list .create-list-submit'),
        newListName_create = document.querySelector('#popup-create-list input[name="newListName"]'),
        parentPanels = document.querySelector('.lists-page__lists');

    // Cоздать список
    createListSubmitBtn.addEventListener('click', function() {
        let parent = document.querySelector('.lists-page__editing');

        // Новый список в сайдбаре (новый таб)
        let item = document.createElement('div'),
            itemInner = document.createElement('div'),
            name = document.createElement('p'), 
            quantity = document.createElement('p'), 
            icons = document.createElement('div'),
            editName = document.createElement('button'),
            deleteList = document.createElement('button');

        // Добавляем таб(список) в родительский блок
        parent.appendChild(item);

        // Сам список, его обёртка
        item.classList.add('col', 'col-12', 'lists-page__editing-item');
        itemInner.classList.add('col-inner');
        item.appendChild(itemInner);

        // Добавляем во внутреннюю обёртку списка прочие элементы
        itemInner.appendChild(name);
        itemInner.appendChild(quantity);
        itemInner.appendChild(icons);

        // Первосональный номер для нового таба и панели
        let newListTabs = document.querySelectorAll('.list-tab');
        let personalNumber = newListTabs[newListTabs.length - 1].getAttribute('data-tab').replace('list-', '')*1 + 1;


        // Название списка
        name.classList.add('lists-page__editing-name', 'list-tab');
        name.setAttribute('data-tab', 'list-' + personalNumber);
        name.textContent = newListName_create.value;

        name.addEventListener('click', function(e) {
            clickTab(this, true);
        });
        
        // Количество
        quantity.classList.add('mb-0');
        quantity.innerHTML = 'Кол-во позиций: <span class="lists-page__total-list-item">0</span>';

        // Иконки
        icons.classList.add('lists-page__editing-icons');
        icons.appendChild(editName);
        icons.appendChild(deleteList);

        // Иконка редактирования названия списка
        editName.classList.add('icon-btn', 'edit-list-btn', 'lists-page__edit-name');
        editName.setAttribute('data-edit-tab', 'list-' + personalNumber);
        editName.innerHTML = '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12399)"><path d="M0.567851 23.9395L0.567531 23.9395C0.554698 23.9427 0.546699 23.9415 0.540916 23.9398C0.533836 23.9377 0.525383 23.9332 0.517496 23.9254C0.50959 23.9176 0.504571 23.9088 0.50211 23.9009C0.500029 23.8943 0.498839 23.8857 0.501682 23.8729L1.53682 19.2219L5.14308 22.8302L0.567851 23.9395ZM3.27548 16.9023L14.9238 5.25139L19.0988 9.42634L7.44798 21.0772L3.27548 16.9023ZM20.9797 1.5431L23.157 3.72035C23.6143 4.17769 23.6143 4.91359 23.157 5.371C23.157 5.371 23.157 5.371 23.157 5.37101L21.0778 7.45016L16.9028 3.27513L18.6342 1.5437C18.6344 1.54355 18.6345 1.5434 18.6347 1.54325C19.2842 0.8964 20.334 0.897407 20.9797 1.5431Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12399"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>';

        // Икона удаления списка
        deleteList.classList.add('icon-btn', 'lists-page__delete-list');
        deleteList.setAttribute('data-delete-tab', 'list-' + personalNumber);
        deleteList.innerHTML = '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12378)"><path d="M6.66669 24C5.46945 24 4.5 23.0305 4.5 21.8333V6.33331H19.5V21.8333C19.5 23.0305 18.5305 24 17.3334 24H6.66669Z" stroke="#BBBBBB"></path><path d="M16.3125 2.18687L16.4589 2.33331H16.666H20.8326V4H3.16602V2.33331H7.33264H7.53974L7.68619 2.18687L8.87312 1H15.1255L16.3125 2.18687Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12378"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>';
        
        // Событие клика для иконки редактирования названия нового списка
        editName.addEventListener('click', function() {
            openPopupToEditList(this);
        });

        // Событие клика для иконки удаления нового списка
        deleteList.addEventListener('click', function() {
            deleteListPopup(this);
        });

        // Новая панель
        let panel = document.createElement('div');
        parentPanels.appendChild(panel);
        
        panel.classList.add('col', 'col-12', 'lists-page__list', 'pb-0', 'list-panel');
        panel.setAttribute('data-panel', 'list-' + personalNumber);
        panel.innerHTML = '<div class="col-inner"><div class="row"><div class="col col-12 lists-page__total"><div class="col-inner"><div class="prices lists-page__total-price"><div class="price price_new"><p class="mb-0">Итого:</p><p class="num">0,00</p><p class="symbol">₽</p></div></div></div></div></div></div>';

        
        makeFixedSidebar();
    });

    // Редактировать название существующего списка
    editListSubmitBtn.addEventListener('click', function() {
        let popup = $('#popup-edit-list');

        let editingListName = document.querySelector('[data-tab="' + popup.attr('data-edit') + '"]');

        editingListName.textContent = newListName_edit.value;

        makeFixedSidebar();
    });
    

    // Выбор списка при копировании/перемещении
    const submitChooseLists = document.querySelector('#submit-choose-lists');

    // Переход к активному табу (если такой есть)
    if(localStorage.getItem('activetab')) {
        // listTabs[localStorage.getItem('activetab')].click();
        clickTab(document.querySelectorAll('.lists-page__editing-name')[localStorage.getItem('activetab')], false);
        localStorage.removeItem('activetab');
    }

    submitChooseLists.addEventListener('click', function(e) {
        e.preventDefault();

        moveToActiveTab();
    });

    function moveToActiveTab() {
        let newlistTabs = document.querySelectorAll('.lists-page__editing-name');

        for(let i = 0; i < newlistTabs.length; i++) {
            if(newlistTabs[i].classList.contains('active')) {
                localStorage.setItem('activetab', i);
                
                // window.location.reload();
            }
        }
    }

    

    $(document).on("ajaxComplete", function(e) {
        console.log('ajax');
    });
});






