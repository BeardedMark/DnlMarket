window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Скрипты для страниц личного кабинета
    const overlay = $('.overlay'),
        body = document.querySelector('body'),
        html = document.querySelector('html');

    
    // Фиксация сайдбара
    const header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1,
        personalLeft = document.querySelector('.personal__left'),
        personalSidebar = document.querySelector('.personal__sidebar_outer'),
        personalSidebarParent = document.querySelector('.personal__sidebar'),
        personalSidebar_Width = window.getComputedStyle(personalSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar();

    function makeFixedSidebar() {
        

        let personalSidebarHeight = window.getComputedStyle(personalSidebar).getPropertyValue('height').replace('px', '')*1,
            personalLeftHeight = window.getComputedStyle(personalLeft).getPropertyValue('height').replace('px', '')*1;

        if(personalSidebarHeight < personalLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > personalSidebarHeight
        ) {
            personalSidebar.classList.add('can-be-fixed');
        } else {
            personalSidebar.classList.remove('can-be-fixed');
            personalSidebar.classList.remove('fixed');
            personalSidebar.classList.remove('bottom');
            personalSidebar.style.top = 'auto';
            personalSidebar.style.bottom = 'auto';
        }
    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(personalSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            personalSidebarTopPos = personalSidebarParent.getBoundingClientRect().top + window.pageYOffset,
            personalLeftBottom = personalLeft.getBoundingClientRect().bottom + window.pageYOffset,
            personalSidebar_Height = window.getComputedStyle(personalSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 20;

            if(top > personalSidebarTopPos) {
                personalSidebar.classList.add('fixed');
                personalSidebar.classList.remove('bottom');

                personalSidebar.style.width = personalSidebar_Width + 'px';
                personalSidebar.style.top = headerHeight + 20 + 'px';
                personalSidebar.style.bottom = 'auto';

                if((personalLeftBottom - personalSidebar_Height) <= top) {
                    personalSidebar.classList.add('bottom');
                    personalSidebar.classList.remove('fixed');

                    personalSidebar.style.top = 'auto';
                    personalSidebar.style.bottom = 0;
                }
            } else {
                personalSidebar.classList.remove('fixed');
                personalSidebar.style.top = 'auto';
            }
        }
        
    });

    // Попап Меню в ЛК
    const personalMenuBtn = document.querySelector('.personal-menu-btn');

    personalMenuBtn.addEventListener('click', function() {
        openPopup($('#popup-personal-menu'));

        overlay.fadeIn();
        scrollLock.addScrollableSelector('.popup .wrapper');
        makePaddingForScroll(document.querySelector('#popup-personal-menu .wrapper'));
    });
    
    function openPopup(popup) {
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        html.classList.add('pum-open');
    }

    function closePopup(popup) {
        popup.addClass('animate__slideOutRight');
        popup.fadeOut('400');

        scrollLock.enablePageScroll();
        html.classList.remove('pum-open');
        
        setTimeout(() => {
            popup.removeClass('animate__slideInRight animate__animated animate__slideOutRight');
            popup.removeClass('active');
        }, 400);
    }


    function makePaddingForScroll(wrapper) {
        checkWrappers(wrapper);
    }

    function checkWrappers(wrapper) {
        if(wrapper.scrollHeight > wrapper.offsetHeight) {
            wrapper.classList.add('scrollable');
        } else {
            wrapper.classList.remove('scrollable');
        }
        // console.log(wrapper.scrollHeight + '>' + wrapper.offsetHeight);
    }


    // Текущие страницы в попапе с меню для ЛК
    const personalLinks = document.querySelectorAll('.personal__sidebar .personal__link'),
        personalLinksMenu = document.querySelectorAll('.personal-menu .personal__link');

    for(let i = 0; i < personalLinks.length; i++) {
        if(personalLinks[i].classList.contains('current')) {
            personalLinksMenu[i].classList.add('current');
        }
    }


    // Попап Выбор пользователя

    // Вызов попапа
    $(document).on('click', '.user-select-btn', function() {
        openPopup($('#popup-select-user'));

        overlay.fadeIn();
        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        makePaddingForScroll(document.querySelector('#popup-select-user .wrapper__inner'));
    });

    // Выбор нового пользователя
    $(document).on('click', '.select-user__item', function() {
        // Выбираем
        highlightSelected(document.querySelectorAll('.select-user__item'), this);
        // Закрываем попап
        (document.querySelector('#popup-select-user .popup__close')).click();

        // Втстав. данные в карточку
        let user = {
            name: this.getAttribute('data-user-name'),
            phone: this.getAttribute('data-user-phone'),
            email: this.getAttribute('data-user-email')
        };

        fillingUserData(user);
    });


    function fillingUserData(obj) {
        document.querySelector('.user-name').textContent = obj.name;
        document.querySelector('.user-phone').textContent = obj.phone;
        document.querySelector('.user-email').textContent = obj.email;
    }

    function highlightSelected(mass, elem) {
        for(let i = 0; i < mass.length; i++) {
            mass[i].classList.remove('active');
        }

        elem.classList.add('active');
    }

    // Добавить нового пользователя
    const myAgentInputs = document.querySelectorAll('.add-agent__input'),
        addAgentSubmit = document.querySelector('.add-agent-submit'),
        addAgentCansel = document.querySelector('.add-agent-cansel');

    const addAgentFio = document.querySelector('.add-agent input[name="my_fio"]'),
        addAgentEmail = document.querySelector('.add-agent input[name="my_email"]'),
        addAgentTel = document.querySelector('.add-agent input[name="my_tel"]');

    // Открытие попапа
    $(document).on('click', '.add-user-btn', function() {
        closePopup($('#popup-select-user'));
        openPopup($('#popup-add-agent'));
        if(overlay.css('display') == "none") {
            overlay.fadeIn();
        }
    });

    // Ввод контактных данных
    for(let i = 0; i < myAgentInputs.length; i++) {
        myAgentInputs[i].addEventListener('input', function() {
            checkInputs(myAgentInputs, addAgentSubmit);
        });
    }

    // Кнопка отмены
    addAgentCansel.addEventListener('click', function() {
        document.querySelector("#popup-add-agent .popup__close").click();
        clearPopupFields(myAgentInputs, addAgentSubmit);
    });

    // Клик по кнопке "Добавить"
    addAgentSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        let result = this.getAttribute('data-result');
        // 'success' - Всё ок (попапа никакого не появляется)
        // 'not-success' - Адрес уже существует

        if(result == 'success') {
            if(body.classList.contains('users-page')) {
                addNewAgent_usersPage();

                makeFixedOptions();
                makeFixedSidebar();
            } else {
                addNewAgent_personalPage();
            }

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-agent-result'));
        }

        clearPopupFields(myAgentInputs, this);
        closePopup($('#popup-add-agent'));
    });

    function addNewAgent_personalPage() {
        // Втстав. данные в карточку
        let user = {
            name: addAgentFio.value,
            phone: addAgentEmail.value,
            email:  addAgentTel.value
        };

        fillingUserData(user);
    }

    function addNewAgent_usersPage() {
        let usersItemsParent = document.querySelector('.users__items');

        let user = {
            name: addAgentFio.value,
            phone: addAgentEmail.value,
            email:  addAgentTel.value
        };

        usersItemsParent.innerHTML += '<div class="col col-12 users__item"><div class="col-inner"><div class="users__photo default"><div class="img"><div class="image-cover"><img src="" alt=""></div><div class="users__default-photo"><svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1941_8808)"><circle cx="13" cy="6.5" r="5.5" stroke="#BBBBBB"></circle><rect x="2.5" y="16" width="21" height="9" rx="4.5" stroke="#BBBBBB"></rect></g><defs><clipPath id="clip0_1941_8808"><rect width="26" height="26" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg></div></div><div class="add-photo-btn"><form action=""><input type="file" name="" id=""><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12.5" fill="#F4F5F6"></circle><rect x="12" y="6" width="1" height="13" fill="#1B1B1B"></rect><rect x="19" y="12" width="1" height="13" transform="rotate(90 19 12)" fill="#1B1B1B"></rect></svg></form></div></div><div class="users__info"><div class="users__name"><h4 class="user-name">' + user.name + '</h4><button type="button" class="icon-btn edit-user-btn"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12399)"><path d="M0.567851 23.9395L0.567531 23.9395C0.554698 23.9427 0.546699 23.9415 0.540916 23.9398C0.533836 23.9377 0.525383 23.9332 0.517496 23.9254C0.50959 23.9176 0.504571 23.9088 0.50211 23.9009C0.500029 23.8943 0.498839 23.8857 0.501682 23.8729L1.53682 19.2219L5.14308 22.8302L0.567851 23.9395ZM3.27548 16.9023L14.9238 5.25139L19.0988 9.42634L7.44798 21.0772L3.27548 16.9023ZM20.9797 1.5431L23.157 3.72035C23.6143 4.17769 23.6143 4.91359 23.157 5.371C23.157 5.371 23.157 5.371 23.157 5.37101L21.0778 7.45016L16.9028 3.27513L18.6342 1.5437C18.6344 1.54355 18.6345 1.5434 18.6347 1.54325C19.2842 0.8964 20.334 0.897407 20.9797 1.5431Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12399"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg></button></div><p><span>Телефон:</span> <span class="user-phone">' + user.phone + '</span></p><p><span>E-mail:</span> <span class="user-email">' + user.email + '</span></p></div><div class="users__delete"><button class="button is-link user-delete-btn"><span>Удалить пользователя</span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12378)"><path d="M6.66669 24C5.46945 24 4.5 23.0305 4.5 21.8333V6.33331H19.5V21.8333C19.5 23.0305 18.5305 24 17.3334 24H6.66669Z" stroke="#BBBBBB"></path><path d="M16.3125 2.18687L16.4589 2.33331H16.666H20.8326V4H3.16602V2.33331H7.33264H7.53974L7.68619 2.18687L8.87312 1H15.1255L16.3125 2.18687Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12378"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg></button></div></div></div>';
    }

    function clearPopupFields(fields, btnSubmit) {
        for(let i = 0; i < fields.length; i++) {
            fields[i].value = '';
        }
        btnSubmit.classList.add('disabled');
    }

    function checkInputs(fields, btn) {
        let thumbler = false;

        for(let i = 0; i < fields.length; i++) {
            if(fields[i].value != '' && fields[i].value.replace(/\s/g, '') != '') {
                thumbler = true;
                break;
            }
        }

        if(thumbler) {
            btn.classList.remove('disabled');
        } else {
            btn.classList.add('disabled');
        }
    }

    // Попап Выбор компании
    // Вызов попапа Выбора компании
    $(document).on('click', '.company-select-btn', function() {
        openPopup($('#popup-select-company'));

        overlay.fadeIn();
        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        makePaddingForScroll(document.querySelector('#popup-select-company .wrapper__inner'));
    });

    // Выбор нового пользователя
    $(document).on('click', '.select-company__item', function() {
        // Выбираем
        highlightSelected(document.querySelectorAll('.select-company__item'), this);
        // Закрываем попап
        (document.querySelector('#popup-select-company .popup__close')).click();

        // Втстав. данные в карточку
        let company = {
            name: this.getAttribute('data-company-name'),
            inn: this.getAttribute('data-company-inn')
        };

        fillingCompanyData(company);
    });

    function fillingCompanyData(obj) {
        document.querySelector('.company-name').textContent = obj.name;
        document.querySelector('.company-inn').textContent = obj.inn;
    }

    // Добавить новую компанию
    const myCompanyName = document.querySelectorAll('.search-company__input'),
        addNewCompanyBtn = document.querySelector('.search-company-submit'),
        searchCompanyCansel = document.querySelector('.search-company-cansel');


    // Открытие попапа
    $(document).on('click', '.add-company-btn', function() {
        closePopup($('#popup-select-company'));
        openPopup($('#popup-search-company'));
        if(overlay.css('display') == "none") {
            overlay.fadeIn();
        }
    });

    // Кнопка отмены
    searchCompanyCansel.addEventListener('click', function() {
        document.querySelector("#popup-search-company .popup__close").click();
        // Отчистка полей внутри
        clearPopupFields(myCompanyName, addNewCompanyBtn);
    });
    
    // Ввод ИНН/Названия
    for(let i = 0; i < myCompanyName.length; i++) {
        myCompanyName[i].addEventListener('input', function() {
            // Проверка заполнения полей
            checkInputs(myCompanyName, addNewCompanyBtn);
        });
    }

    // Клик по кнопке "Добавить"
    addNewCompanyBtn.addEventListener('click', function() {
        let result = this.getAttribute('data-result');
        // 'success' - Компания добавлена
        // 'has-registration' - Компания уже зарегистрирована
        // 'not-found' - Компания не найдена
        // Добавление новой компании в выпадашку

        if(result == 'success') {
            // Добавляем новую компанию
            if(body.classList.contains('companies-page')) {
                addNewCompanyFunc_companiesPage();

                makeFixedOptions();
                makeFixedSidebar();
            } else {
                addNewCompanyFunc_personalPage();
            }
        }

        // Отчистка полей
        clearPopupFields(myCompanyName, this);
        // Закрытие текущего попапа
        closePopup($('#popup-search-company'));

        // Отображения в информационном попапе соответствующего рузельтату текста 
        resultMessage(result);
        // Открытие информационного попапа
        openPopup($('#popup-search-company-result'));
    });

    function addNewCompanyFunc_personalPage() {
        // Втстав. данные в карточку
        let company = {
            name: document.querySelector('input[name="my_company_name"]').value,
            inn: document.querySelector('input[name="my_company_inn"]').value
        };

        fillingCompanyData(company);
    }

    function addNewCompanyFunc_companiesPage() {
        let companiesItemsParent = document.querySelector('.companies__items');

        let company = {
            name: document.querySelector('input[name="my_company_name"]').value,
            inn: document.querySelector('input[name="my_company_inn"]').value
        };

        companiesItemsParent.innerHTML += '<div class="col col-12 companies__item"><div class="col-inner"><div class="companies__top"><div class="companies__name"><h3>' + company.name + '</h3><svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 15L13.5 1L1 15" stroke="#1B1B1B"/></svg></div><div class="companies__edit"><button class="button is-link companies-edit-btn"><span>Редактировать</span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12399)"><path d="M0.567851 23.9395L0.567531 23.9395C0.554698 23.9427 0.546699 23.9415 0.540916 23.9398C0.533836 23.9377 0.525383 23.9332 0.517496 23.9254C0.50959 23.9176 0.504571 23.9088 0.50211 23.9009C0.500029 23.8943 0.498839 23.8857 0.501682 23.8729L1.53682 19.2219L5.14308 22.8302L0.567851 23.9395ZM3.27548 16.9023L14.9238 5.25139L19.0988 9.42634L7.44798 21.0772L3.27548 16.9023ZM20.9797 1.5431L23.157 3.72035C23.6143 4.17769 23.6143 4.91359 23.157 5.371C23.157 5.371 23.157 5.371 23.157 5.37101L21.0778 7.45016L16.9028 3.27513L18.6342 1.5437C18.6344 1.54355 18.6345 1.5434 18.6347 1.54325C19.2842 0.8964 20.334 0.897407 20.9797 1.5431Z" stroke="#BBBBBB"/></g><defs><clipPath id="clip0_614_12399"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg></button></div></div><div class="companies__bottom"><div class="companies__descr"><p><span>ИНН: </span><span class="company-inn">'+ company.inn +'</span></p><p class="d-none"><span>Фактический адрес: </span><span class="company-address"></span></p><p class="d-none"><span>Телефон: </span><span class="company-phone"></span></p><p class="d-none"><span>E-mail: </span><span class="company-email"></span></p></div><div class="companies__addresses"><div class="companies__addresses-title"><h4>Адреса доставки</h4><div class="companies__add-address"><button class="button is-link companies-add-address-btn"><span>Добавить адрес</span><span>Добавить</span></button></div></div><table class="companies__table d-none"><thead><tr><th>Адрес</th><th>Кол-во контактов</th><th>Часы работы</th><th>Часы приемки</th><th>Перерыв</th><th></th></tr></thead><tbody></tbody></table></div></div></div></div>';
    }

    function resultMessage(result) {
        const searchCompanyHeaders = document.querySelectorAll('.search-company-result__header'),
            searchCompanyMessage = document.querySelectorAll('.search-company-result__message');

        displayResult(searchCompanyHeaders, result);
        displayResult(searchCompanyMessage, result);
    }

    function displayResult(mass, result) {
        for(let i = 0; i < mass.length; i++) {
            if(mass[i].classList.contains(result)) {
                mass[i].classList.remove('d-none');
            } else {
                mass[i].classList.add('d-none');
            }
        }
    }

    // Страница "Пользователи"

    // фиксация опциональной шапки
    // Фиксация шапки
    const optionsHeader = document.querySelector('.personal__options');

    let optionsHeader_Height, optionsHeader_Width, optionsHeaderParent;

    if(optionsHeader) {
        makeFixedOptions();

        optionsHeader_Height = window.getComputedStyle(optionsHeader).getPropertyValue('height').replace('px', '')*1;
        optionsHeader_Width = window.getComputedStyle(optionsHeader).getPropertyValue('width').replace('px', '')*1;
        optionsHeaderParent = optionsHeader.closest('.col-inner');
    }
    

    function makeFixedOptions() {
        let newPersonalItem;

        if(body.classList.contains('users-page')) {
            newPersonalItem = document.querySelectorAll('.users__item');
        } else if(body.classList.contains('companies-page')) {
            newPersonalItem = document.querySelectorAll('.companies__item');
        }

        // Если в активной панели 2 и больше товаров
        if(newPersonalItem.length >= 2) {
            optionsHeader.classList.add('can-be-fixed');
        } else {
            optionsHeader.classList.remove('can-be-fixed');
            optionsHeader.classList.remove('fixed');
            optionsHeader.classList.remove('bottom');

            optionsHeader.style.top = 'auto';
            optionsHeader.style.bottom = 'auto';
            personalLeft.style.paddingTop = 0;
        }
    }

    function setPenultimateс() {
        let newPersonalItems;
        
        if(body.classList.contains('users-page')) {
            newPersonalItems = document.querySelectorAll('.users__item');
        } else if(body.classList.contains('companies-page')) {
            newPersonalItems = document.querySelectorAll('.companies__item');
        }
        // предпоследний элемент
        return newPersonalItems[newPersonalItems.length - 2];
    }

    // если в корзине 2 и > товаров
    window.addEventListener('scroll', function() {
        if(optionsHeader && optionsHeader.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            personalLeftTopPos = personalLeft.getBoundingClientRect().top + window.pageYOffset;
    
            // Нижняя точка родительского элемента, абсолютно кот. позиционируется шапка классом "bottom"
            let optionsHeaderParentBottom = optionsHeaderParent.getBoundingClientRect().bottom + currentPos;
    
            // Нижняя точка предпоследнего товара
            let penultimateсBottom = setPenultimateс().getBoundingClientRect().bottom + currentPos;
    
            // Расстояние между нижней точкой родителя и нижней точкой предпоследнего эл-та
            let bottom = optionsHeaderParentBottom - penultimateсBottom;
    
            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 30;
    
            if(top >= personalLeftTopPos) {
                optionsHeader.classList.add('fixed');
                optionsHeader.classList.remove('bottom');
    
                optionsHeader.style.top = headerHeight + 30 + 'px';
                optionsHeader.style.bottom = 'auto';
    
                optionsHeader.style.width = optionsHeader_Width + 'px';
    
                personalLeft.style.paddingTop = optionsHeader_Height + 'px';
    
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
                personalLeft.style.paddingTop = 0;
            }
        }
    });


    // Удалить пользователя на стр "Пользователи"
    const deleteUserBtn = document.querySelector('#popup-delete .delete-btn');
    let deleteTrigger; // Переменная для хранения пользователя, которого нужно удалить

    // Открытие попапа удаления
    $(document).on('click', '.user-delete-btn', function() {
        openPopup($('#popup-delete'));
        overlay.fadeIn();

        deleteTrigger = this.closest('.users__item');
    });

    // Удаление
    deleteUserBtn.addEventListener('click', function() {
        let usersItemsParent = document.querySelector('.users__items');
        usersItemsParent.removeChild(deleteTrigger);

        makeFixedOptions();
        makeFixedSidebar();
    });


    // Редактировать данные пользователей
    let editTrigger;

    // Окрытие попапа
    $(document).on('click', '.edit-user-btn', function() {
        openPopup($('#popup-edit-agent'));
        overlay.fadeIn();

        editTrigger = this.closest('.users__item');
        // Перенос текущих значений в редактируемую область
        fieldFilling();

    });
    const editAgentBtn = document.querySelector('.edit-agent-submit'),
        editAgentCansel = document.querySelector('.edit-agent-cansel'),

        myeditAgentInputs = document.querySelectorAll('.edit-agent__input'),
        myAgentFio = document.querySelector('.edit-agent input[name="my_fio"]'),
        myAgentEmail = document.querySelector('.edit-agent input[name="my_email"]'),
        myAgentTel = document.querySelector('.edit-agent input[name="my_tel"]');

        

    function fieldFilling(userItem) {
        let userNames = document.querySelectorAll('.user-name'),
            usersPhones = document.querySelectorAll('.user-phone'),
            usersEmails = document.querySelectorAll('.user-email');

        for(let i = 0; i < userNames.length; i++) {
            if(userNames[i].closest('.users__item') == editTrigger) {
                myAgentFio.value = userNames[i].textContent;
                myAgentTel.value = usersPhones[i].textContent;
                myAgentEmail.value = usersEmails[i].textContent;
            }
        }
        editAgentBtn.classList.remove('disabled');
    }

    // Ввод контактных данных
    for(let i = 0; i < myeditAgentInputs.length; i++) {
        myeditAgentInputs[i].addEventListener('input', function() {
            checkInputs(myeditAgentInputs, editAgentBtn);
        });
    }

    // Кнопка отмены
    editAgentCansel.addEventListener('click', function() {
        document.querySelector("#popup-edit-agent .popup__close").click();
        clearPopupFields(myeditAgentInputs, editAgentBtn);
    });

    // Клик по кнопке "Добавить"
    editAgentBtn.addEventListener('click', function(e) {
        e.preventDefault();

        let result = this.getAttribute('data-result');
        // 'success' - Всё ок (попапа никакого не появляется)
        // 'not-success' - Адрес уже существует

        if(result == 'success') {
            changeMyAgent();

            makeFixedOptions();
            makeFixedSidebar();

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-agent-result'));
        }

        clearPopupFields(myeditAgentInputs, editAgentBtn);
        closePopup($('#popup-edit-agent'));
    });

    function changeMyAgent() {
        let newUserName = myAgentFio.value,
            newUserPhone = myAgentTel.value,
            newUserEmail = myAgentEmail.value;

        // Втстав. данные
        let user = {
            name: newUserName,
            phone: newUserPhone,
            email: newUserEmail
        };

        let userNames = document.querySelectorAll('.user-name'),
            usersPhones = document.querySelectorAll('.user-phone'),
            usersEmails = document.querySelectorAll('.user-email');

        for(let i = 0; i < userNames.length; i++) {
            if(userNames[i].closest('.users__item') == editTrigger) {
                userNames[i].textContent = user.name;
                usersPhones[i].textContent = user.phone;
                usersEmails[i].textContent = user.email;
            }
        }
    }


    // Стр "Компании". Скрытие/расркытие блока
    $(document).on('click', '.companies__name', function() {
        this.classList.toggle('active');

        let trigger = this;
        let parent = trigger.closest('.companies__item');

        $('.companies__bottom').each(function(i,elem) {
            if(elem.closest('.companies__item') == parent) {
                if(trigger.classList.contains('active')) {
                    $(elem).slideDown();
                } else {
                    $(elem).slideUp();
                }
            }
        });

        setTimeout(() => {
            makeFixedOptions();
            makeFixedSidebar();
        }, 400);
    });

    // Стр "Компании". Редактировать инф о компании
    const editCompanyCansel = document.querySelector('.edit-company-cansel'),
        editCompanyBtn = document.querySelector('.edit-company-submit'),

        myeditCompanyInputs = document.querySelectorAll('.edit-company__input'),
        myCompanyAddress = document.querySelector('.edit-company input[name="my_address"]'),
        myCompanyEmail = document.querySelector('.edit-company input[name="my_email"]'),
        myCompanyTel = document.querySelector('.edit-company input[name="my_tel"]');

    let editCompanyTrigger; // компания, инф о кот. будем редактировать 

    $(document).on('click', '.companies-edit-btn', function() {
        openPopup($('#popup-edit-company'));
        overlay.fadeIn();

        editCompanyTrigger = this.closest('.companies__item');

        // Перенос текущих значений в редактируемую область
        companyInfFieldFilling();

        // Активность кнопки "Добавить"
        checkInputs(myeditCompanyInputs, editCompanyBtn);
    });

    function companyInfFieldFilling() {
        // Адрес
        fieldPresenceCheck(document.querySelectorAll('.company-address'), myCompanyAddress, '.companies__item', editCompanyTrigger);
        // Почта
        fieldPresenceCheck(document.querySelectorAll('.company-email'), myCompanyEmail, '.companies__item', editCompanyTrigger);
        // Телефон
        fieldPresenceCheck(document.querySelectorAll('.company-phone'), myCompanyTel, '.companies__item', editCompanyTrigger);
    }

    // проверка наличия поля
    function fieldPresenceCheck(arr, popupField, triggerClass, trigger) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].closest(triggerClass) == trigger) {
                popupField.value = arr[i].textContent;
                break;
            }
        }
    }

    // Отмена редактирования
    editCompanyCansel.addEventListener('click', function() {
        document.querySelector("#popup-edit-company .popup__close").click();
        clearPopupFields(myeditCompanyInputs, editCompanyBtn);
    });

    // Ввод Фактич адреса, телефона, почты
    for(let i = 0; i < myeditCompanyInputs.length; i++) {
        myeditCompanyInputs[i].addEventListener('input', function() {
            // Проверка заполнения полей
            checkInputs(myeditCompanyInputs, editCompanyBtn);
        });
    }

    // Клик по кнопке "Добавить"
    editCompanyBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Переносим заполненные значения из попапа в карточку
        fillingCompanyInf([document.querySelectorAll('.company-address'), document.querySelectorAll('.company-email'), document.querySelectorAll('.company-phone')]);

        // Скрываем пустые блоки
        emptyFieldCheck([...document.querySelectorAll('.company-address'), ...document.querySelectorAll('.company-email'), ...document.querySelectorAll('.company-phone')]);

        makeFixedOptions();
        makeFixedSidebar();

        clearPopupFields(myeditCompanyInputs, editCompanyBtn);
        closePopup($('#popup-edit-company'));
        overlay.fadeOut();
    });

    function fillingCompanyInf(arrays) {
        for(let i = 0; i < myeditCompanyInputs.length; i++) {
            // Цикл по циклам
            for(let j = 0; j < arrays.length; j++) {
                let arr = arrays[j];
                // Цикл по конкретному циклу (адреса, почты, телефоны)
                for(let index = 0; index < arr.length; index++) {
                    if(arr[index].closest('.companies__item') == editCompanyTrigger) {
                        if(arr[index].classList.contains('company-address') && 
                            myeditCompanyInputs[i].getAttribute('name') == 'my_address' ||
                            arr[index].classList.contains('company-email') && 
                            myeditCompanyInputs[i].getAttribute('name') == 'my_email' ||
                            arr[index].classList.contains('company-phone') && 
                            myeditCompanyInputs[i].getAttribute('name') == 'my_tel'
                        ) {
                            arr[index].textContent = myeditCompanyInputs[i].value;
                        }
                    }
                }
            }
        }
    }

    function emptyFieldCheck(arr) {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].textContent != '' && arr[i].textContent.replace(/\s/g, '') != '') {
                arr[i].closest('p').classList.remove('d-none');
            } else if(arr[i].textContent == '' || arr[i].textContent.replace(/\s/g, '') == '') {
                arr[i].closest('p').classList.add('d-none');
            }
        }
    }

    // Добавление адреса
    const addDeliveryInfoInputs = document.querySelectorAll('.add-delivery-info__input'),
        deliveryAddress = document.querySelector('.add-delivery-info input[name="my_delivery_address"]'),
        deliveryOfficeHours = document.querySelector('.add-delivery-info input[name="my_office_hours"]'),
        deliveryReceiptHours = document.querySelector('.add-delivery-info input[name="my_receipt_hours"]'),
        deliveryBreakHours = document.querySelector('.add-delivery-info input[name="my_break_hours"]'),

        addDeliveryInfoSubmit = document.querySelector('.add-delivery-info-submit'),
        addDeliveryInfoCansel = document.querySelector('.add-delivery-info-cansel');

    let addDeliveryInfoTrigger;

    // Открытие попапа
    $(document).on('click', '.companies-add-address-btn', function() {
        overlay.fadeIn();
        openPopup($('#popup-add-delivery-info'));
        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        makePaddingForScroll(document.querySelector('#popup-add-delivery-info .wrapper__inner'));
        
        addDeliveryInfoTrigger = this.closest('.companies__item');
        // Назначение для кнопки
        addDeliveryInfoSubmit.setAttribute('data-use', 'add');
        // На всякий случай отчищаем поля в попапе
        clearPopupFields(addDeliveryInfoInputs, addDeliveryInfoSubmit);
    });

    // Ввод данных
    for(let i = 0; i < addDeliveryInfoInputs.length; i++) {
        addDeliveryInfoInputs[i].addEventListener('input', function() {
            checkInputs(addDeliveryInfoInputs, addDeliveryInfoSubmit);
        });
    }

    // Кнопка отмены
    addDeliveryInfoCansel.addEventListener('click', function() {
        document.querySelector("#popup-add-delivery-info .popup__close").click();
        clearPopupFields(addDeliveryInfoInputs, addDeliveryInfoSubmit);
    });

    // Клик по кнопке "Добавить"
    addDeliveryInfoSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        let result = this.getAttribute('data-result');
        // 'success' - Всё ок (попапа никакого не появляется)
        // 'not-success' - Адрес уже существует

        if(result == 'success') {
            if(this.getAttribute('data-use') == 'add') {
                // Добавление данныx в таблицу
                addDeliveryInfoFunc();
                // Показываем таблицу, если добавленный адрес был первым
                let tables = document.querySelectorAll('.companies__table');

                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].closest('.companies__item') == addDeliveryInfoTrigger) {
                        tableFullCheck(tables[i]);
                    }
                }

            } else if(this.getAttribute('data-use') == 'replace') {
                replaceDeliveryInfoFunc();
            }
            

            makeFixedOptions();
            makeFixedSidebar();

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-address-result'));
        }

        clearPopupFields(addDeliveryInfoInputs, this);
        closePopup($('#popup-add-delivery-info'));
    });

    function addDeliveryInfoFunc() {
        let infoParents = document.querySelectorAll('.companies__addresses tbody');

        let deliveryInf = {
            address: deliveryAddress.value,
            officeHours: deliveryOfficeHours.value,
            receiptHours: deliveryReceiptHours.value,
            breakHours: deliveryBreakHours.value
        };

        for (let i = 0; i < infoParents.length; i++) {
            if(infoParents[i].closest('.companies__item') == addDeliveryInfoTrigger) {
                infoParents[i].innerHTML += '<tr class="companies__main-tr"><td class="table-address"><span>' + deliveryInf.address + '</span><div class="table-address__arrow"><svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0.5L6.5 6.5L12 0.500002" stroke="#1B1B1B"/></svg></div></td><td class="table-amount-contacts">0</td><td class="table-office-hours">' + deliveryInf.officeHours + '</td><td class="table-receipt-hours">' + deliveryInf.receiptHours + '</td><td class="table-break-hours">' + deliveryInf.breakHours + '</td><td><div><button type="button" class="icon-btn company-delivery-address-edit"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3484_16629)"><path d="M2.84739 13.6687L12.4365 4.07745L15.7978 7.43872L6.20667 17.0299L2.84739 13.6687ZM4.12208 18.5625L0.512291 19.4378L1.32905 15.7679L4.12208 18.5625ZM17.4242 0.928276L19.2386 2.74265C19.5871 3.09122 19.5872 3.65171 19.2386 4.00034C19.2386 4.00034 19.2385 4.00035 19.2385 4.00035L17.5648 5.67405L14.2035 2.31271L15.5873 0.928875C15.5875 0.928717 15.5876 0.928559 15.5878 0.928401C16.0966 0.421816 16.9187 0.422833 17.4242 0.928276Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_3484_16629"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg></button><button type="button" class="icon-btn company-delivery-address-delete"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6.36328" y="7.13623" width="0.999999" height="19" transform="rotate(-45 6.36328 7.13623)" fill="#BBBBBB"></rect><rect x="19.7988" y="6.42871" width="1" height="19" transform="rotate(45 19.7988 6.42871)" fill="#BBBBBB"></rect></svg></button></div></td></tr><tr class="companies__sub-tr"><td colspan="6"><table class="companies__table-inner"><thead><tr><th>Контакты</th><th colspan="2"><div class="companies__add-contacts"><button class="button is-link companies-add-contacts-btn"><span>Добавить контакт</span><span>Добавить</span></button></div></th></tr></thead><tbody></tbody></table></td></tr>';
            }
        }
    }

    function replaceDeliveryInfoFunc() {
        let tableAddress = document.querySelectorAll('.table-address span'),
            tableOfficeHours = document.querySelectorAll('.table-office-hours'),
            tableReceiptHours = document.querySelectorAll('.table-receipt-hours'),
            tableBreakHours = document.querySelectorAll('.table-break-hours');

        let deliveryInf = {
            address: deliveryAddress.value,
            officeHours: deliveryOfficeHours.value,
            receiptHours: deliveryReceiptHours.value,
            breakHours: deliveryBreakHours.value
        };
        for(let i = 0; i < tableAddress.length; i++) {
            if(tableAddress[i].closest('tr') == replaceDeliveryInfoTrigger_tr) {
                tableAddress[i].textContent = deliveryInf.address;
                console.log(deliveryInf.address);
                tableOfficeHours[i].textContent = deliveryInf.officeHours;
                tableReceiptHours[i].textContent = deliveryInf.receiptHours;
                tableBreakHours[i].textContent = deliveryInf.breakHours;
            }
        }
    }

    // Удалить адрес из таблицы
    $(document).on('click', '.company-delivery-address-delete', function() {
        let table = this.closest('table'),
            tbody = this.closest('tbody'),
            tr = this.closest('tr'),
            nextTr = tr.nextElementSibling;

        // Удаляем строку
        tbody.removeChild(tr);
        tbody.removeChild(nextTr);
        // Проверяем осталось ли что-то в таблице
        tableFullCheck(table);

        makeFixedOptions();
        makeFixedSidebar();
    });

    function tableFullCheck(table) {
        let tableTbody = table.querySelector('tbody'),
            tableTr = tableTbody.querySelectorAll('tr');

        if(tableTr.length == 0) {
            table.classList.add('d-none');
        } else {
            table.classList.remove('d-none');
        }
    }

    // Редактировать адрес в таблице
    let replaceDeliveryInfoTrigger_tr;

    $(document).on('click', '.company-delivery-address-edit', function() {
        overlay.fadeIn();
        openPopup($('#popup-add-delivery-info'));

        scrollLock.addScrollableSelector('.popup .wrapper__inner');
        makePaddingForScroll(document.querySelector('#popup-add-delivery-info .wrapper__inner'));
        
        // Тригер - строка
        replaceDeliveryInfoTrigger_tr = this.closest('tr');

        // Заполняем попапа данными, кот. будем редактировать
        fillingDeliveryInf();
        // Активность кнопки "Добавить"
        checkInputs(addDeliveryInfoInputs, addDeliveryInfoSubmit);
        // Назначение для кнопки
        addDeliveryInfoSubmit.setAttribute('data-use', 'replace');
    });

    function fillingDeliveryInf() {
        // Адрес доставки
        fieldPresenceCheck(document.querySelectorAll('.table-address span'), deliveryAddress, 'tr', replaceDeliveryInfoTrigger_tr);
        // Часы работы
        fieldPresenceCheck(document.querySelectorAll('.table-office-hours'), deliveryOfficeHours, 'tr', replaceDeliveryInfoTrigger_tr);
        // Часы приемки
        fieldPresenceCheck(document.querySelectorAll('.table-receipt-hours'), deliveryReceiptHours, 'tr', replaceDeliveryInfoTrigger_tr);
        // Перерыв
        fieldPresenceCheck(document.querySelectorAll('.table-break-hours'), deliveryBreakHours, 'tr', replaceDeliveryInfoTrigger_tr);
    }

    // Контакты, прикреплённые к адресу
    // Расскрытие адреса
    $(document).on('click', '.table-address', function() {
        this.classList.toggle('is-active');
        this.closest('.companies__main-tr').nextElementSibling.classList.toggle('is-visible');
    });

    // Добавить контакт
    const addContactAddressInputs = document.querySelectorAll('.add-contact-address__input'),
        contactAddressName = document.querySelector('.add-contact-address input[name="my_fio"]'),
        contactAddressTel = document.querySelector('.add-contact-address input[name="my_tel"]'),
        addContactAddressSubmit = document.querySelector('.add-contact-address-submit'),
        addContactAddressCansel = document.querySelector('.add-contact-address-cansel');
    
    let addContactAddressTrigger;

    // Добавить адрес
    $(document).on('click', '.companies-add-contacts-btn', function() {
        overlay.fadeIn();
        openPopup($('#popup-add-contact-address'));

        addContactAddressTrigger = this.closest('.companies__sub-tr');
    });

    // Ввод данных
    for(let i = 0; i < addContactAddressInputs.length; i++) {
        addContactAddressInputs[i].addEventListener('input', function() {
            checkInputs(addContactAddressInputs, addContactAddressSubmit);
        });
    }

    // Кнопка отмены
    addContactAddressCansel.addEventListener('click', function() {
        document.querySelector("#popup-add-contact-address .popup__close").click();
        clearPopupFields(addContactAddressInputs, addContactAddressSubmit);
    });

    // Клик по кнопке "Добавить"
    addContactAddressSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        // Добавление сонтакта в таблицу
        addContactAddressFunc();

        clearPopupFields(addContactAddressInputs, this);
        closePopup($('#popup-add-contact-address'));


        makeFixedOptions();
        makeFixedSidebar();

        overlay.fadeOut();

        // Увеличение количества контактов
        increaseContactsAmount(addContactAddressTrigger);
    });

    function addContactAddressFunc() {
        let infoContactAddress = document.querySelectorAll('.companies__table-inner tbody');

        let contactAddress = {
            name: contactAddressName.value,
            tel: contactAddressTel.value
        };

        for (let i = 0; i < infoContactAddress.length; i++) {
            if(infoContactAddress[i].closest('.companies__sub-tr') == addContactAddressTrigger) {
                infoContactAddress[i].innerHTML += '<tr><td class="contact-name">' + contactAddress.name + '</td><td class="contact-tel">' + contactAddress.tel + '</td><td><div><button type="button" class="icon-btn company-contact-edit"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3484_16629)"><path d="M2.84739 13.6687L12.4365 4.07745L15.7978 7.43872L6.20667 17.0299L2.84739 13.6687ZM4.12208 18.5625L0.512291 19.4378L1.32905 15.7679L4.12208 18.5625ZM17.4242 0.928276L19.2386 2.74265C19.5871 3.09122 19.5872 3.65171 19.2386 4.00034C19.2386 4.00034 19.2385 4.00035 19.2385 4.00035L17.5648 5.67405L14.2035 2.31271L15.5873 0.928875C15.5875 0.928717 15.5876 0.928559 15.5878 0.928401C16.0966 0.421816 16.9187 0.422833 17.4242 0.928276Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_3484_16629"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg></button><button type="button" class="icon-btn company-contact-delete"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6.36328" y="7.13623" width="0.999999" height="19" transform="rotate(-45 6.36328 7.13623)" fill="#BBBBBB"></rect><rect x="19.7988" y="6.42871" width="1" height="19" transform="rotate(45 19.7988 6.42871)" fill="#BBBBBB"></rect></svg></button></div></td></tr>';}
        }
    }

    // Удаление контакта
    $(document).on('click', '.company-contact-delete', function() {
        let tbody = this.closest('.companies__table-inner tbody'),
            tr = this.closest('tr'),
            trParent = tr.closest('.companies__sub-tr');

        // Удаляем строку
        tbody.removeChild(tr);

        makeFixedOptions();
        makeFixedSidebar();
        // Уменьшение количества контактов
        decreaseContactsAmount(trParent);
    });

    // Редактирование контакта
    const editContactAddressName = document.querySelector('.edit-contact-address input[name="my_fio"]'),
        editContactAddressTel = document.querySelector('.edit-contact-address input[name="my_tel"]'),

        editContactAddressInputs = document.querySelectorAll('.edit-contact-address__input'),
        editContactAddressSubmit = document.querySelector('.edit-contact-address-submit'),
        editContactAddressCansel = document.querySelector('.edit-contact-address-cansel');

    let editContactAddressTrigger_tr;

    $(document).on('click', '.company-contact-edit', function() {
        overlay.fadeIn();
        openPopup($('#popup-edit-contact-address'));

        // Тригер - строка
        editContactAddressTrigger_tr = this.closest('tr');

        // Заполняем попапа данными, кот. будем редактировать
        fillingContactAddress();

        // Активность кнопки "Добавить"
        checkInputs(editContactAddressInputs, editContactAddressSubmit);
    });

    function fillingContactAddress() {
        // ФИО
        fieldPresenceCheck(document.querySelectorAll('.contact-name'), editContactAddressName, 'tr', editContactAddressTrigger_tr);
        // Тел
        fieldPresenceCheck(document.querySelectorAll('.contact-tel'), editContactAddressTel, 'tr', editContactAddressTrigger_tr);
    }

    // Ввод данных
    for(let i = 0; i < editContactAddressInputs.length; i++) {
        editContactAddressInputs[i].addEventListener('input', function() {
            checkInputs(editContactAddressInputs, editContactAddressSubmit);
        });
    }

    // Кнопка отмены
    editContactAddressCansel.addEventListener('click', function() {
        document.querySelector("#popup-add-contact-address .popup__close").click();
        clearPopupFields(editContactAddressInputs, editContactAddressSubmit);
    });

    // Клик по кнопке "Добавить"
    editContactAddressSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        // Изменения контакта
        replaceContactAddressFunc();

        clearPopupFields(editContactAddressInputs, this);
        closePopup($('#popup-edit-contact-address'));


        makeFixedOptions();
        makeFixedSidebar();

        overlay.fadeOut();
    });

    function replaceContactAddressFunc() {
        let contactName = document.querySelectorAll('.contact-name'),
            contactTel = document.querySelectorAll('.contact-tel');

        let editContactAddress = {
            name: editContactAddressName.value,
            tel: editContactAddressTel.value
        };

        for(let i = 0; i < contactName.length; i++) {
            if(contactName[i].closest('tr') == editContactAddressTrigger_tr) {
                contactName[i].textContent = editContactAddress.name;
                contactTel[i].textContent = editContactAddress.tel;
            }
        }
    }

    function increaseContactsAmount(addedTr) {
        let parent = addedTr.previousElementSibling,
            tableAmountContacts = document.querySelectorAll('.table-amount-contacts');
        
        for (let i = 0; i < tableAmountContacts.length; i++) {
            if(tableAmountContacts[i].closest('.companies__main-tr') == parent) {
                tableAmountContacts[i].textContent = tableAmountContacts[i].textContent*1 +1;
            }
        }
    }

    function decreaseContactsAmount(deletedTr) {
        let parent = deletedTr.previousElementSibling,
            tableAmountContacts = document.querySelectorAll('.table-amount-contacts');
        
        for (let i = 0; i < tableAmountContacts.length; i++) {
            if(tableAmountContacts[i].closest('.companies__main-tr') == parent) {
                tableAmountContacts[i].textContent = tableAmountContacts[i].textContent*1 -1;
            }
        }
    }
    // Добавление изменённых данных - в рамках обработчика на 795 строке !!!!


    // Страница "История заказов"

    // Шкала для табов
    const scale = document.querySelector('.personal-page__scale .scale');

    // Начальная ширина шкалы
    startPosScale();
    
    $(document).on('click', '.personal-page__tab', function() {
        deleteCurrentTab();
        this.classList.add('current');

        // Устанавливаем размеры и позицию шкалы
        setPosScale(this);
        // Переключаем панель
        panelSwitching();
        // Меняем заголовок страницы
        changeTitles(this.getAttribute('data-tab'));

        makeFixedSidebar();
    });

    function deleteCurrentTab() {
        let tabs = document.querySelectorAll('.personal-page__tab');

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('current');
        }
    }

    function startPosScale() {
        let tabs = document.querySelectorAll('.personal-page__tab');

        for (let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('current')) {
                scale.style.width = tabs[i].getBoundingClientRect().width + 'px';
                break;
            }
        }
    }

    function setPosScale(сurrentTab) {
        scale.style.width = сurrentTab.getBoundingClientRect().width + 'px';
        scale.style.left = сurrentTab.offsetLeft + 'px';
    }

    function panelSwitching() {
        let tabs = document.querySelectorAll('.personal-page__tab'),
            panels = document.querySelectorAll('.personal-page__panel');

        // Убираем активность со всех панелей, кроме той, кот. соответствует табу
        for (let i = 0; i < tabs.length; i++) {
            panels[i].classList.remove('active');
            if(tabs[i].classList.contains('current')) {
                panels[i].classList.add('active');
            }
        }
    }

    function changeTitles(attrValue) {
        let title = document.querySelectorAll('.personal-page__title');

        if(title.length > 0) {
            for (let i = 0; i < title.length; i++) {
                if(title[i].getAttribute('data-title') == attrValue) {
                    title[i].classList.remove('d-none');
                } else {
                    title[i].classList.add('d-none');
                }
            }
        }
    }

    // Временные периоды
    const periodCalendar = document.querySelectorAll('.period-calendar'),
        periodStart = document.querySelectorAll('.period-start'),
        periodEnd = document.querySelectorAll('.period-end');

    for (let i = 0; i < periodCalendar.length; i++) {
        periodCalendar[i].addEventListener('change', function() {
            let input = this,
                date = input.value.split('-').reverse().join('.');

            if(input.classList.contains('period-calendar_start')) {
                // Если "От"
                for (let j = 0; j < periodStart.length; j++) {
                    if(periodStart[j].closest('.periods__item') == input.closest('.periods__item')) {
                        periodStart[j].textContent = date;
                    }
                }
            } else if(input.classList.contains('period-calendar_end')) {
                // Если "До"
                for (let j = 0; j < periodEnd.length; j++) {
                    if(periodEnd[j].closest('.periods__item') == input.closest('.periods__item')) {
                        periodEnd[j].textContent = date;
                    }
                }
            }

        });
    }
    

    // Попап "Запрос акта сверки"
    const actRequestBtn = document.querySelector('.act-request-btn'),
        actRequestCansel = document.querySelector('.act-request-cansel'),
        actRequestSubmit = document.querySelector('.act-request-submit'),
        actRequestInputs = document.querySelectorAll('.act-request__input');

    // Открытие попапа
    if(actRequestBtn) {
        actRequestBtn.addEventListener('click', function() {
            overlay.fadeIn();
            openPopup($('#popup-act-request'));
        });
    }
    

    // Кнопка отмены
    if(actRequestCansel) {
        actRequestCansel.addEventListener('click', function() {
            document.querySelector("#popup-act-request .popup__close").click();
            clearPopupFields(actRequestInputs, actRequestSubmit);
    
            // Доп. отчистка дат
            clearDades();
        });
    }
    

    function clearDades() {
        for (let i = 0; i < periodStart.length; i++) {
            if(periodStart[i].closest('#popup-act-request')) {
                periodStart[i].textContent = '';
            }
        }

        for (let i = 0; i < periodEnd.length; i++) {
            if(periodEnd[i].closest('#popup-act-request')) {
                periodEnd[i].textContent = '';
            }
        }
    }

    // Ввод данных
    for(let i = 0; i < actRequestInputs.length; i++) {
        actRequestInputs[i].addEventListener('input', function() {
            checkInputs(actRequestInputs, actRequestSubmit);
        });
    }

    // Клик по кнопке "Запросить"
    if(actRequestSubmit) {
        actRequestSubmit.addEventListener('click', function(e) {
            e.preventDefault();
    
            openPopup($('#popup-act-request-result'));
    
            clearPopupFields(actRequestInputs, this);
            // Доп. отчистка дат
            clearDades();
    
            closePopup($('#popup-act-request'));
        });
    }
    

    // Стр "Персональный менеджер"
    // Тел менеджера на мобильках - вотсап
    if(window.matchMedia('(max-width: 1024px)').matches) {
        const managerTel = document.querySelector('.my-manager__tel');

        if(managerTel) {
            managerTel.setAttribute('href', managerTel.getAttribute('data-mobile-href'));
        }
    }

    // Страница "Загрузка товаров из Excel" (лучше перенести в excel-order.js)
    // Попап Правила
    $(document).on('click', '.excel-loading-info-btn', function() {
        overlay.fadeIn();
        openPopup($('#popup-loading-rules'));

        scrollLock.addScrollableSelector('.popup .wrapper');
        makePaddingForScroll(document.querySelector('#popup-loading-rules .wrapper'));
    });

    // Вставка табличных даннных вручную
    window.addEventListener('paste', function(e) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        let pasteArr = paste.replace(/\r/g, '').split(/[\t\n]/g);

        if(e.target && e.target.tagName.toLowerCase() == 'input' && e.target.closest('.excel-table')) {
            if(paste.match(/[\t\n]/g)) {
                let arr, index;
                arr = document.querySelectorAll('.excel-table input');

                for (let i = 0; i < arr.length; i++) {
                    if(arr[i] == e.target) {
                        index = i;
                    }
                }

                let tum = 1;
                if(index == 0 || index % 2 == 0){
                    tum = 0;
                }

                for (let j = 0; j < pasteArr.length; j++) {
                    console.log('-------------');
                    let myIndex = index + tum + j;
                    arr = document.querySelectorAll('.excel-table input');

                    if(arr[myIndex]) {
                        arr[myIndex].value = '';
                        arr[myIndex].value = pasteArr[j];
                    } else {
                        arr[myIndex-1].closest('tr').insertAdjacentHTML("afterEnd", '<tr><td class="num"></td><td><input name="art_excel_0" type="text" value="' + pasteArr[j] + '"></td><td><input name="count_excel_0" type="text"></td><td class="delete" id="art_excel_0"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6.36328" y="18.3848" width="1" height="17" transform="rotate(-135 6.36328 18.3848)" fill="#BBBBBB"/><rect x="5.65625" y="6.36395" width="1" height="17" transform="rotate(-45 5.65625 6.36395)" fill="#BBBBBB"/></svg></td></tr>');
                    }
                }
                recalculationNum();
                makeFixedSidebar();
                e.preventDefault();
            }

            checkInputs(document.querySelectorAll('.excel-table input'), createOrderBtn);
        }
    });

    // Добавление строки
    $(document).on('keydown', '.excel-table input', function (e){
        if(e.key == "Enter") {
            e.target.closest('tr').insertAdjacentHTML("afterEnd", '<tr><td class="num"></td><td><input name="art_excel_0" type="text"></td><td><input name="count_excel_0" type="text"></td><td class="delete" id="art_excel_0"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6.36328" y="18.3848" width="1" height="17" transform="rotate(-135 6.36328 18.3848)" fill="#BBBBBB"/><rect x="5.65625" y="6.36395" width="1" height="17" transform="rotate(-45 5.65625 6.36395)" fill="#BBBBBB"/></svg></td></tr>');

            recalculationNum();
            makeFixedSidebar();
        }
    });

    // Удаление строки
    $(document).on('click', '.excel-table .delete', function (e) {
        let arr = document.querySelectorAll('.excel-table tr');
        let currentTr = e.target.closest('tr');

        if(arr.length != 2) {
            document.querySelector('.excel-table tbody').removeChild(currentTr);
        } else {
            let currentInputs = document.querySelectorAll('.excel-table input');
            for (let i = 0; i < currentInputs.length; i++) {
                currentInputs[i].value = '';
            }

            createOrderBtn.classList.add('disabled');
        }

        recalculationNum();
        makeFixedSidebar();
        checkInputs(document.querySelectorAll('.excel-table input'), createOrderBtn);
    });

    // Пересчёт номеров строк и переопределение аттрибутов
    function recalculationNum() {
        let arrNum = document.querySelectorAll('.excel-table .num'),
            arrArt = document.querySelectorAll('.excel-table input[name^="art_excel"]'),
            arrCount = document.querySelectorAll('.excel-table input[name^="count_excel"]'),
            artDelete = document.querySelectorAll('.excel-table .delete[id^="art_excel"]');
        
        // Номер   
        for (let i = 0; i < arrNum.length; i++) {
            arrNum[i].textContent = i + 1;
        }
        // Артикул
        for (let i = 0; i < arrArt.length; i++) {
            arrArt[i].setAttribute('name', 'art_excel_' + (i + 1));
        }
        // Количество
        for (let i = 0; i < arrCount.length; i++) {
            arrCount[i].setAttribute('name', 'count_excel_' + (i + 1));
        }
        // Кнопка удаления строки
        for (let i = 0; i < artDelete.length; i++) {
            artDelete[i].setAttribute('id', 'art_excel_' + (i + 1));
        }
    }

    // Кнопка отчистки таблицы + Кнопка формирования заказа
    const clearTableBtn = document.querySelector('.clear-table-btn'),
        createOrderBtn = document.querySelector('.create-order-btn');

    if(clearTableBtn) {
        clearTableBtn.addEventListener('click', function() {
            let tableInputs = document.querySelectorAll('.excel-table input');
    
            for (let j = 0; j < tableInputs.length; j++) {
                tableInputs[j].value = '';
            }
    
            checkInputs(document.querySelectorAll('.excel-table input'), createOrderBtn);
        });
    }
    
    if(createOrderBtn) {
        createOrderBtn.addEventListener('click', function() {
            $('.excel-order-section').removeClass('d-none');
        });
    }
    

    $(document).on('input', '.excel-table input', function() {
        checkInputs(document.querySelectorAll('.excel-table input'), createOrderBtn);
    });

    // Кнопка Загрузить из Excel
    const excelLoadingFile = document.querySelector('.excel-loading__file'),
        loadToCartBtn = document.querySelector('.load-to-cart-btn');

    // Попапы
    if(excelLoadingFile) {
        excelLoadingFile.addEventListener('input', function() {
            overlay.fadeIn();
            openPopup($('#popup-loading-table'));
        });
    }
    
    if(loadToCartBtn) {
        loadToCartBtn.addEventListener('click', function() {
            overlay.fadeIn();
            openPopup($('#popup-loading-table-to-cart'));
        });
    }
    

    // Кнопки в попапах
    $(document).on('click', '.loading-table__buttons .button', function() {
        document.querySelector('#popup-loading-table .popup__close').click();
    });

    $(document).on('click', '.loading-table-to-cart__buttons .button', function() {
        document.querySelector('#popup-loading-table-to-cart .popup__close').click();
    });


    // Таблицы на страницу аналитика
    // Если у талицы есть скролл, то появляется шторка

    addShadowForTables('.analytics__table_inner');

    function addShadowForTables(tablesClass) {
        let tables = document.querySelectorAll(tablesClass);

        for (let i = 0; i < tables.length; i++) {
            if(tables[i].scrollWidth > tables[i].offsetWidth) {
                tables[i].children[1].classList.remove('d-none');
            } else {
                tables[i].children[1].classList.add('d-none');
            }
        }
    }
    
    $(document).on('touchmove', '.analytics__table_inner table', function() {
        let x0 = this.closest('.analytics__table_inner').getBoundingClientRect().left;
        let parentWidth = this.closest('.analytics__table_inner').getBoundingClientRect().width;
        let elemWidth = this.getBoundingClientRect().width;

        // 10 - запас (px)
        if(this.getBoundingClientRect().left-10 >= x0 - (elemWidth - parentWidth)) {
            this.nextElementSibling.classList.remove('op-0');
        } else {
            this.nextElementSibling.classList.add('op-0');
        }
    });

    // analytics select (выбор из выпадашки)
    $(document).on('click', '.analytics__select .select__item', function() {
        let analyticsContent = document.querySelectorAll('.analytics__content');

        for (let i = 0; i < analyticsContent.length; i++) {
            // Для таба и селекта в одной панели
            if(analyticsContent[i].closest('.personal-page__panel') == this.closest('.personal-page__panel')) {
                analyticsContent[i].classList.add('d-none');


                // Если селект не нулевой
                if(this.getAttribute('data-company-select') != 0) {
                    // Если совпадают значения аттрибутов
                    if(analyticsContent[i].getAttribute('data-company-tab') == this.getAttribute('data-company-select')) {
                        analyticsContent[i].classList.remove('d-none');
                    }
                } else {
                    analyticsContent[i].classList.remove('d-none');
                }
            }
        }

        makeFixedSidebar();

        if(document.querySelector('.purchases__panel').classList.contains('active')) {
            turningPurchasesPanel();
        }
    });



    // Заполнение круга

    const analyticsPanel = document.querySelectorAll('.analytics .personal-page__panel');

    // Переключение табов (график, сумма)
    $(document).on('click', '.analytics-page .personal-page__tab', function() {
        turningPurchasesPanel();
    });

    function turningPurchasesPanel() {
        removeCircles();

        if(document.querySelector('.purchases__panel').classList.contains('active')) {
            addCircles();

            let circles = document.querySelectorAll('.purchases__circle .circle');
            for (let i = 0; i < circles.length; i++) {
                let percent = circles[i].nextElementSibling.children[0].textContent.replace('%', '');
                let circle = circles[i];

                // Длительность анимации
                let dur = 1.5;

                // Основной круг
                circle.classList.add('circle-animation');

                // Внутренний круг
                circle.children[0].classList.add('circle-animation');

                setTimeout(function() {
                    circle.style.animationPlayState = 'paused';
                    circle.children[0].style.animationPlayState = 'paused';
                }, dur/100 * percent*1000);
            }
        }
    }

    function addCircles() {
        let purchasesCircles = document.querySelectorAll('.purchases__circle');

        purchasesCircles.forEach(function(circle) {
            circle.innerHTML = '<div class="circle_outer"></div><div class="circle"><div class="circle_inner"></div></div><div class="purchases__percent"><p>' + circle.getAttribute('data-percent') + '%' + '</p></div>';
        });
    }

    function removeCircles() {
        let purchasesCircles = document.querySelectorAll('.purchases__circle');

        purchasesCircles.forEach(function(circle) {
            circle.innerHTML = '';
        });
    }

    // История операций
    const operationsTitle = document.querySelector('.operations__title');

    if(operationsTitle) {
        operationsTitle.addEventListener('click', function() {
            this.classList.toggle('active');

            if(this.classList.contains('active')) {
                $('.loyalty__table').slideDown();
            } else {
                $('.loyalty__table').slideUp();
            }

            setTimeout(() => {
                makeFixedSidebar();

                // Таблица с операциями
                addShadowForTables('.operations__table_inner');
            }, 400);
        });
    }

    // Таблица с операциями
    $(document).on('touchmove', '.operations__table_inner table', function() {
        let x0 = this.closest('.operations__table_inner').getBoundingClientRect().left;
        let parentWidth = this.closest('.operations__table_inner').getBoundingClientRect().width;
        let elemWidth = this.getBoundingClientRect().width;

        // 10 - запас (px)
        if(this.getBoundingClientRect().left-10 >= x0 - (elemWidth - parentWidth)) {
            this.nextElementSibling.classList.remove('op-0');
        } else {
            this.nextElementSibling.classList.add('op-0');
        }
    });

});