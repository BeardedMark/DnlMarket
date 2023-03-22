window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';
    // Скрипты для страницы оформления заказа

    const overlay = $('.overlay'),
        html = document.querySelector('html');

    // Фиксация сайдбара
    const checkoutSidebar = document.querySelector('.checkout__sidebar_outer'),
        checkoutSidebarParent = document.querySelector('.checkout__sidebar'),
        checkoutSidebar_Width = window.getComputedStyle(checkoutSidebar).getPropertyValue('width').replace('px', ''),
        checkoutLeft = document.querySelector('.checkout__left'),
        header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1;

    makeFixedSidebar();

    function makeFixedSidebar() {
        let checkoutSidebarHeight = window.getComputedStyle(checkoutSidebar).getPropertyValue('height').replace('px', '')*1,
            checkoutLeftHeight = window.getComputedStyle(checkoutLeft).getPropertyValue('height').replace('px', '')*1;

        if(checkoutSidebarHeight < checkoutLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > checkoutSidebarHeight
        ) {
            checkoutSidebar.classList.add('can-be-fixed');
        } else {
            checkoutSidebar.classList.remove('can-be-fixed', 'fixed', 'bottom');
            checkoutSidebar.style.top = 'auto';
            checkoutSidebar.style.bottom = 'auto';
        }
    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(checkoutSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            checkoutSidebarTopPos = checkoutSidebarParent.getBoundingClientRect().top + window.pageYOffset,
            checkoutLeftBottom = checkoutLeft.getBoundingClientRect().bottom + window.pageYOffset,
            checkoutSidebar_Height = window.getComputedStyle(checkoutSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 10;

            if(top > checkoutSidebarTopPos) {
                checkoutSidebar.classList.add('fixed');
                checkoutSidebar.classList.remove('bottom');

                checkoutSidebar.style.width = checkoutSidebar_Width + 'px';
                checkoutSidebar.style.top = headerHeight + 10 + 'px';
                checkoutSidebar.style.bottom = 'auto';

                if((checkoutLeftBottom - checkoutSidebar_Height) <= top) {
                    checkoutSidebar.classList.add('bottom');
                    checkoutSidebar.classList.remove('fixed');

                    checkoutSidebar.style.top = 'auto';
                    checkoutSidebar.style.bottom = 0;
                }
            } else {
                checkoutSidebar.classList.remove('fixed');
                checkoutSidebar.style.top = 'auto';
            }
        }
        
    });

    // Клик по этапу "Товары в заказе"
    $(document).on('click', '.checkout__tab_goods .checkout__tab-name', function() {
        // Сворачивание и разворачивание этапа
        this.classList.toggle('unfolded');

        if(this.classList.contains('unfolded')) {
            $('.checkout__tab_goods .checkout__tab-content').slideDown();
        } else {
            $('.checkout__tab_goods .checkout__tab-content').slideUp();
        }

        // Перерасчёт для фиксированного сайдабара
        setTimeout(() => {
            makeFixedSidebar();
        }, 300);
    });


    // ПЕРЕХОД МЕЖДУ ЭТАПАМИ !!!!!!!!!!!

    // Следующий этап
    $(document).on('click', '.checkout-next-tab', function() {
        let checkoutTabs = document.querySelectorAll('.checkout__tab');
        
        // Таб, в котором находимся
        let tab = this.closest('.checkout__tab');

        if(tab.id == 'step-1') {
            // Если pодительский таб - "Товары в заказе", поворачиваем стрелку
            let checkoutTabGoods = document.querySelector('.checkout__tab_goods .checkout__tab-name');
            checkoutTabGoods.classList.remove('unfolded');
        } 
        
        // Переход к след. табу
        // Проверка является ли текущий таб последним
        if(tab != checkoutTabs[checkoutTabs.length - 1]) {
            // Смена таба
            let index = Array.prototype.indexOf.call(document.querySelectorAll('.checkout-next-tab'), this);
            activationTab(index+1, 'next');
        }  else {
            // Последний этап
            // Если выбрана доставка
            let radio1 = document.querySelector('#radio1');
            
            if(radio1.checked) {
                // Открытие попапа с подтверждение адреса
                openPopup($('#popup-address-confirmation'));
                overlay.fadeIn();

                // Поле с адресом
                let buyerAddress = document.querySelector('.buyer_address');
                document.querySelector('.address-confirmation__input').value = buyerAddress.textContent;
            } else {
                // Если самовывоз
                moveToOrderReadyPage();
            }
        }
    });

    // Предыдущий этап
    $(document).on('click', '.checkout-prev-tab', function() {
        // Смена таба
        let index = Array.prototype.indexOf.call(document.querySelectorAll('.checkout-prev-tab'), this);
        activationTab(index, 'prev');
    });

    // Редактировать таб
    $(document).on('click', '.checkout__tab-edit', function() {
        // Смена таба
        let index = Array.prototype.indexOf.call(document.querySelectorAll('.checkout__tab-edit'), this);
        activationTab(index+1, 'curr');
    });

    function activationTab(index, str) {
        let checkoutTabs = document.querySelectorAll('.checkout__tab');

        for(let i = 0; i < checkoutTabs.length; i++) {
            checkoutTabs[i].classList.remove('current');
        }

        // Новый активный и текущий таб
        let newTab = checkoutTabs[index];
        newTab.classList.add('active', 'current');

        // Если он предыдущий
        if(str == 'prev') {
            for(let i = 0; i < checkoutTabs.length; i++) {
                // Убираем активность со всех табов, расположенных после текущего таба
                if(i > index) {
                    checkoutTabs[i].classList.remove('active');
                }
            }

            // Если предыдущий таб - "Товары в заказе"
            if(newTab.id == 'step-1') {
                let checkoutTabGoods = document.querySelector('.checkout__tab_goods .checkout__tab-name');
                checkoutTabGoods.classList.add('unfolded');
            }
        }

        // Заполняемая часть
        $('.checkout__tab-content').each(function(i,elem) {
            if($(elem).closest('.checkout__tab').hasClass('current')) {
                $(elem).slideDown();
            } else {
                $(elem).slideUp();
            }
        });

        // Результирующая
        $('.checkout__tab-content-filled').each(function(i,elem) {
            if($(elem).closest('.checkout__tab').hasClass('current') || !$(elem).closest('.checkout__tab').hasClass('active')) {
                $(elem).slideUp();
            } else {
                // Отображение только заполненной информации
                if($(elem).closest('.checkout__tab').attr('id') == 'step-3') {
                    let buyerName = document.querySelector('.buyer_name'),
                        buyerAddress = document.querySelector('.buyer_address'),
                        buyerAgent = document.querySelector('.buyer_agent'),
                        buyerEmail = document.querySelector('.buyer_email'),
                        buyerTel = document.querySelector('.buyer_tel'),
                        buyerMessage = document.querySelector('.buyer_message');

                    fieldСheck(buyerName, buyerAddress, buyerAgent, buyerEmail, buyerTel, buyerMessage);
                } else if($(elem).closest('.checkout__tab').attr('id') == 'step-4') {
                    let deliveryDate = document.querySelector('.addition_date-1'),
                        deliveryTime = document.querySelector('.addition_time-1'),
                
                        pickupDate = document.querySelector('.addition_date-2'),
                        pickupTime = document.querySelector('.addition_time-2'),
                
                        tk = document.querySelector('.addition_tk'),
                        tkDelivery = document.querySelector('.addition_tk-delivery'),
                        tkMessage = document.querySelector('.addition_tk-message');

                    fieldСheck(deliveryDate, deliveryTime, pickupDate, pickupTime, tk, tkDelivery, tkMessage);
                }

                $(elem).slideDown();
            }
        });


        // Появление/скрытие кнопки "Редактировать" для активных табов (исключение - текущий)
        addEditBtn();

        // Сворачивание всех селектов
        allSelectСlosing();

        // Перерасчёт для фиксированного сайдабара
        setTimeout(() => {
            makeFixedSidebar();
        }, 300);
    }

    function addEditBtn() {
        let checkoutTabEdit = document.querySelectorAll('.checkout__tab-edit');

        for(let i = 0; i < checkoutTabEdit.length; i++) {
            if(checkoutTabEdit[i].closest('.checkout__tab').classList.contains('active') && !checkoutTabEdit[i].closest('.checkout__tab').classList.contains('current')) {
                checkoutTabEdit[i].classList.remove('d-none');
            } else {
                checkoutTabEdit[i].classList.add('d-none');
            }
        }
    }

    function allSelectСlosing() {
        $('.select').removeClass('active');
        $('.select__list').slideUp();
    }


    // Изменение способа доставки
    $(document).on('input', '#step-2 input[type="radio"]', function() {
        if(this.id == 'radio2' && this.checked) {
            // Если выбран Самовывоз
            makePickUp();
        } else {
            // Если выбрана Доставка
            makeDelivery();
        }

        // Изменения текста для результирующей части
        setDeliveryResultText();

        // Обязательность полей в этапе "Покупатель"  и "Доп. информация"
        makeRequiredInputInRequiredFields_Buyer();
        makeRequiredInputInRequiredFields_Addition();
    });

    function makePickUp() {
        // АДРЕС ДОСТАВКИ
        // Блокируем поле с адресом доставки
        let checkoutFieldAddress = document.querySelector('.checkout__field_address');
        checkoutFieldAddress.classList.add('disabled');
        // Снимаем флаг
        checkoutFieldAddress.classList.remove('required');
        // Убираем это поле из результирующей части
        let buyerAddress = document.querySelector('.buyer_address');
        buyerAddress.parentElement.classList.add('d-none', 'disabled');

        // Результир часть этапа "Доп инф"

        // Доставка
        $('#step-4 .delivery-method-1').addClass('d-none');
        $('#step-4 .delivery-method-1').removeClass('required');
        // Доставка в др город
        $('#step-4 .delivery-method-3').addClass('d-none');
        $('#step-4 .delivery-method-3').removeClass('required');
        // Самовывоз
        $('#step-4 .delivery-method-2').removeClass('d-none');
        $('#step-4 .delivery-method-2').addClass('required');
    }

    function makeDelivery() {
        // АДРЕС ДОСТАВКИ
        // Разблок. поле с адресом доставки
        let checkoutFieldAddress = document.querySelector('.checkout__field_address');
        checkoutFieldAddress.classList.remove('disabled');
        // Возвращаем флаг
        checkoutFieldAddress.classList.add('required');
        // Добавляем это поле в резyльтирующую часть
        let buyerAddress = document.querySelector('.buyer_address');
        buyerAddress.parentElement.classList.remove('disabled');
        fieldСheck(buyerAddress);

        // Результир часть этапа "Доп инф"

        // Самовывоз
        $('#step-4 .delivery-method-2').addClass('d-none');
        $('#step-4 .delivery-method-2').removeClass('required');
        // Доставка в др город
        $('#step-4 .delivery-method-3').addClass('d-none');
        $('#step-4 .delivery-method-3').removeClass('required');
        // Доставка
        $('#step-4 .delivery-method-1').removeClass('d-none');
        $('#step-4 .delivery-method-1').addClass('required');

        // Проверка города
        checkCity();
    }

    function setDeliveryResultText() {
        let deliveryResult = document.querySelector('.delivery-result'),
            deliveryMethods = document.querySelectorAll('#step-2 input[type="radio"]');

        for (let i = 0; i < deliveryMethods.length; i++) {
            if(deliveryMethods[i].checked) {
                deliveryResult.textContent = deliveryMethods[i].nextElementSibling.textContent;
                deliveryMethods[i].id == "radio2" ? deliveryResult.nextElementSibling.classList.remove('d-none') : deliveryResult.nextElementSibling.classList.add('d-none');
            }
        }
    }

    function makeRequiredInputInRequiredFields_Buyer() {
        const selects = document.querySelectorAll('#step-3 select');

        for(let i = 0; i < selects.length; i++) {
            if(selects[i].closest('.checkout__field').classList.contains('required')) {
                selects[i].setAttribute('required', 'required');
            } else {
                selects[i].removeAttribute('required');
            }
        }
    }

    function makeRequiredInputInRequiredFields_Addition() {
        const additionSelects = document.querySelectorAll('#step-4 select'),
            additionInputs = document.querySelectorAll('#step-4 input');

        let arr = [...additionSelects, ...additionInputs];

        for (let i = 0; i < arr.length; i++) {
            if(arr[i].closest('.checkout__field').classList.contains('required')) {
                arr[i].setAttribute('required', 'required');
            } else {
                arr[i].removeAttribute('required');
            }
        }
    }


    // ДОБАВИТЬ НОВУЮ КОМПАНИЮ !!!!!!!!!!!

    const myCompanyName = document.querySelectorAll('.search-company__input'),
        addNewCompanyBtn = document.querySelector('.search-company-submit'),
        searchCompanyCansel = document.querySelector('.search-company-cansel');


    // Открытие попапа
    $(document).on('click', '.add-new_company', function() {
        openPopup($('#popup-search-company'));
        overlay.fadeIn();
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

    // Действия внутри попапа
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

    // Клик по кнопке "Добавить"
    addNewCompanyBtn.addEventListener('click', function() {
        let result = this.getAttribute('data-result');
        // 'success' - Компания добавлена
        // 'has-registration' - Компания уже зарегистрирована
        // 'not-found' - Компания не найдена
        // Добавление новой компании в выпадашку

        if(result == 'success') {
            // Добавляем новую компанию
            addNewCompanyFunc();
            // Вносим изменения в результирующую часть
            updateResult_company();
        }

        // Отчистка полей
        clearPopupFields(myCompanyName, this);
        // Закрытие текущего попапа
        closePopup($('#popup-search-company'));

        // Отображения в информационном попапе соответствующего рузельтату текста 
        resultMessage(result);
        // Открытие информационного попапа
        openPopup($('#popup-search-company-result'));

        allSelectСlosing();
    });

    function addNewCompanyFunc() {
        let newCompany = document.querySelector('input[name="my_company_name"]').value;

        if(newCompany != '' && newCompany.replace(/\s/g, '') != '') {
            // Добавление в дефолтный селект
            let defaultCompanyNameSelect = document.querySelector('.checkout__field_company select'),
                defaultCompanyNameOptions = document.querySelectorAll('.checkout__field_company option');

            // Отчищаем текущие эл-ты деф селекта
            for(let i = 0; i < defaultCompanyNameOptions.length; i++) {
                defaultCompanyNameOptions[i].removeAttribute('selected');
                defaultCompanyNameOptions[i].select = false;
            }

            // Создаём новый эл-т деф селекта и выбираем его
            let newCompanyNameOption = document.createElement('option');
            defaultCompanyNameSelect.appendChild(newCompanyNameOption);

            newCompanyNameOption.value = newCompany;
            newCompanyNameOption.textContent = newCompany;
            newCompanyNameOption.select = true;
            newCompanyNameOption.setAttribute('selected', 'selected');


            // Добавление в кастомный селект
            let customCompanyNameSelectBtn = document.querySelector('.checkout__field_company .select'),
                customCompanyNameSelectList = document.querySelector('.checkout__field_company .select__list'),
                customCompanyNameSelectItems = document.querySelectorAll('.checkout__field_company .select__item');

            // Добавление в кнопку
            customCompanyNameSelectBtn.children[0].textContent = newCompany;

            // Отчистка текущих элементов кастомного селекта
            for(let i = 0; i < customCompanyNameSelectItems.length; i++) {
                customCompanyNameSelectItems[i].classList.remove('selected');
            }

            // Создание элемента
            let newCompanyNameItem = document.createElement('li');
            customCompanyNameSelectList.insertBefore(newCompanyNameItem, customCompanyNameSelectItems[customCompanyNameSelectItems.length - 1]);

            newCompanyNameItem.classList.add('select__item', 'selected');
            newCompanyNameItem.textContent = newCompany;
            newCompanyNameItem.id = newCompany;
        }
    }
    
    function clearPopupFields(fields, btnSubmit) {
        for(let i = 0; i < fields.length; i++) {
            fields[i].value = '';
        }
        btnSubmit.classList.add('disabled');
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


    // ДОБАВЛЕНИЕ НОВОГО АДРЕСА

    const myAddress = document.querySelector('.add-address__input'),
        addAddressBtn = document.querySelector('.add-address-submit'),
        addAddressCansel = document.querySelector('.add-address-cansel');

    // Открытие попапа
    $(document).on('click', '.add-new_address', function(){
        openPopup($('#popup-add-address'));
        overlay.fadeIn();

        myAddress.focus();
    }); 

    // Действия внутри попапа
    // Кнопка отмены
    addAddressCansel.addEventListener('click', function() {
        document.querySelector("#popup-add-address .popup__close").click();
        clearPopupFields([myAddress], addAddressBtn);
    });
    
    // Ввод Адреса
    myAddress.addEventListener('input', function() {
        checkInputs([myAddress], addAddressBtn);
    });

    // Клик по кнопке "Добавить"
    addAddressBtn.addEventListener('click', function() {
        let result = this.getAttribute('data-result');
        // 'success' - Всё ок (попапа никакого не появляется)
        // 'not-success' - Адрес уже существует

        if(result == 'success') {
            addNewAddressFunc();
            // изменения в результирующую часть
            updateResult_address();
            // Доп инф для не Новосиба
            checkCity();
            // Обязательность полей в этапе "Доп. информация"
            makeRequiredInputInRequiredFields_Addition();

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-address-result'));
        }

        clearPopupFields([myAddress], this);
        closePopup($('#popup-add-address'));
        allSelectСlosing();
    });

    function addNewAddressFunc() {
        let newAddress = myAddress.value;

        // Добавление в дефолтный селект
        let defaultAddressSelect = document.querySelector('.checkout__field_address select'),
            defaultAddressOptions = document.querySelectorAll('.checkout__field_address option');

        // Отчищаем текущие эл-ты деф селекта
        for(let i = 0; i < defaultAddressOptions.length; i++) {
            defaultAddressOptions[i].removeAttribute('selected');
            defaultAddressOptions[i].select = false;
        }

        // Создаём новый эл-т деф селекта и выбираем его
        let newAddressOption = document.createElement('option');
        defaultAddressSelect.appendChild(newAddressOption);

        newAddressOption.value = newAddress;
        newAddressOption.textContent = newAddress;
        newAddressOption.select = true;
        newAddressOption.setAttribute('selected', 'selected');

        // Добавление в кастомный селект
        let customAddressSelectBtn = document.querySelector('.checkout__field_address .select'),
            customAddressSelectList = document.querySelector('.checkout__field_address .select__list'),
            customAddressSelectItems = document.querySelectorAll('.checkout__field_address .select__item');

        // Добавление в кнопку
        customAddressSelectBtn.children[0].textContent = newAddress;

        // Отчистка текущих элементов кастомного селекта
        for(let i = 0; i < customAddressSelectItems.length; i++) {
            customAddressSelectItems[i].classList.remove('selected');
        }

        // Создание элемента
        let newAddressItem = document.createElement('li');
        customAddressSelectList.insertBefore(newAddressItem, customAddressSelectItems[customAddressSelectItems.length - 1]);
        newAddressItem.classList.add('select__item', 'selected');

        // Создание параграфа внутри
        newAddressItem.id = newAddress;
        let newAddressItem_p = document.createElement('p');
        newAddressItem.appendChild(newAddressItem_p);
        newAddressItem_p.textContent = newAddress;

        // Создание кнопки редактирования
        newAddressItem.innerHTML += '<button type="button" class="icon-btn edit-address-btn"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12399)"><path d="M0.567851 23.9395L0.567531 23.9395C0.554698 23.9427 0.546699 23.9415 0.540916 23.9398C0.533836 23.9377 0.525383 23.9332 0.517496 23.9254C0.50959 23.9176 0.504571 23.9088 0.50211 23.9009C0.500029 23.8943 0.498839 23.8857 0.501682 23.8729L1.53682 19.2219L5.14308 22.8302L0.567851 23.9395ZM3.27548 16.9023L14.9238 5.25139L19.0988 9.42634L7.44798 21.0772L3.27548 16.9023ZM20.9797 1.5431L23.157 3.72035C23.6143 4.17769 23.6143 4.91359 23.157 5.371C23.157 5.371 23.157 5.371 23.157 5.37101L21.0778 7.45016L16.9028 3.27513L18.6342 1.5437C18.6344 1.54355 18.6345 1.5434 18.6347 1.54325C19.2842 0.8964 20.334 0.897407 20.9797 1.5431Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12399"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg></button>';
    }

    function checkCity() {
        let selectedAddress = processingSelectedValue(document.querySelectorAll('.checkout__field_address .select__item'));
        // Доставка

        // Доставка в др город
        $('#step-4 .delivery-method-3').addClass('d-none');
        $('#step-4 .delivery-method-3').removeClass('required');

        // Доставка
        $('#step-4 .delivery-method-1').removeClass('d-none');
        $('#step-4 .delivery-method-1').addClass('required');

        if(selectedAddress && !selectedAddress.children[0].textContent.match(/новосибирск/i)) {
            // Доставка в др город

            // Доставка
            $('#step-4 .delivery-method-1').addClass('d-none');
            $('#step-4 .delivery-method-1').removeClass('required');
            // Доставка в др город
            $('#step-4 .delivery-method-3').removeClass('d-none');
            $('#step-4 .delivery-method-3').addClass('required');
        }
    }


    // РЕДАКТИРОВАТЬ АДРЕС

    const editAddressBtn = document.querySelector('.edit-address-submit'),
        editAddressCansel = document.querySelector('.edit-address-cansel'),
        myEditAddress = document.querySelector('.edit-address__input');

    // Открытие попапа
    $(document).on('click', '.edit-address-btn', function() {
        openPopup($('#popup-edit-address'));
        overlay.fadeIn();

        // Перенос текущего адреса в редактируемую область
        fieldFilling1(this);
    });

    function fieldFilling1(btn) {
        myEditAddress.value = btn.previousElementSibling.textContent;
        myEditAddress.focus();
        editAddressBtn.classList.remove('disabled');
    }

    // Действия внтури попапа
    // Ввод Адреса
    myEditAddress.addEventListener('input', function() {
        checkInputs([myEditAddress], editAddressBtn);
    });

    // Кнопка отмены
    editAddressCansel.addEventListener('click', function() {
        document.querySelector("#popup-edit-address .popup__close").click();
        clearPopupFields([myEditAddress], editAddressBtn);
    });

    // Клик по кнопке "Добавить"
    editAddressBtn.addEventListener('click', function() {
        let result = this.getAttribute('data-result');
        // 'success' - Всё ок (попапа никакого не появляется)
        // 'not-success' - Адрес уже существует

        if(result == 'success') {
            changeMyAddress();
            // изменения в результирующую часть
            updateResult_address();
            // Доп инф для не Новосиба
            checkCity();
            // Обязательность полей в этапе "Доп. информация"
            makeRequiredInputInRequiredFields_Addition();

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-address-result'));
        }

        clearPopupFields([myEditAddress], editAddressBtn);
        closePopup($('#popup-edit-address'));
        allSelectСlosing();
    });

    function changeMyAddress() {
        let editAddress = myEditAddress.value;

        // Меняем адрес в дефолтном селекте
        let defaultAddressOptions = document.querySelectorAll('.checkout__field_address option');

        for(let i = 0; i < defaultAddressOptions.length; i++) {
            if(defaultAddressOptions[i].getAttribute('selected') == 'selected') {
                defaultAddressOptions[i].value = editAddress;
                defaultAddressOptions[i].textContent = editAddress;
            }
        }

        // Меняем адрес в кастомном селекте
        let customAddressSelectBtn = document.querySelector('.checkout__field_address .select'),
            customAddressSelectItems = document.querySelectorAll('.checkout__field_address .select__item');

        // Меняем в кнопке
        customAddressSelectBtn.children[0].textContent = editAddress;

        // В селекте
        for(let i = 0; i < customAddressSelectItems.length; i++) {
            if(customAddressSelectItems[i].classList.contains('selected')) {
                customAddressSelectItems[i].children[0].textContent = editAddress;
                customAddressSelectItems[i].id = editAddress;
            }
        }
    }


    // ДОБАВЛЕНИЕ КОНТАКТНОГО ЛИЦА
    const myAgentInputs = document.querySelectorAll('.add-agent__input'),
        addAgentSubmit = document.querySelector('.add-agent-submit'),
        addAgentCansel = document.querySelector('.add-agent-cansel'),

        addAgentFio = document.querySelector('.add-agent input[name="my_fio"]'),
        addAgentEmail = document.querySelector('.add-agent input[name="my_email"]'),
        addAgentTel = document.querySelector('.add-agent input[name="my_tel"]');


    // Открытие попапа
    $(document).on('click', '.add-new_agent', function() {
        openPopup($('#popup-add-agent'));
        overlay.fadeIn();
    });


    // Действия внтури попапа
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
            addNewAgent();
            // изменения в результирующую часть
            updateResult_agent();

            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-agent-result'));
        }

        clearPopupFields(myAgentInputs, this);
        closePopup($('#popup-add-agent'));
        allSelectСlosing();
    });

    function addNewAgent() {
        let newAgent = addAgentFio.value,
            newAgentEmail = addAgentEmail.value,
            newAgentTel = addAgentTel.value;

        // Добавление в дефолтный селект
        let defaultAgentSelect = document.querySelector('.checkout__field_agent select'),
            defaultAgentOptions = document.querySelectorAll('.checkout__field_agent option');

        // Отчищаем текущие эл-ты деф селекта
        for(let i = 0; i < defaultAgentOptions.length; i++) {
            defaultAgentOptions[i].removeAttribute('selected');
            defaultAgentOptions[i].select = false;
        }

        // Создаём новый эл-т деф селекта и выбираем его
        let newAgentOption = document.createElement('option');
        defaultAgentSelect.appendChild(newAgentOption);

        newAgentOption.value = newAgent;
        newAgentOption.textContent = newAgent;
        newAgentOption.select = true;
        newAgentOption.setAttribute('selected', 'selected');

        // Добавление в кастомный селект
        let customAgentSelectBtn = document.querySelector('.checkout__field_agent .select'),
            customAgentSelectList = document.querySelector('.checkout__field_agent .select__list'),
            customAgentSelectItems = document.querySelectorAll('.checkout__field_agent .select__item');

        // Добавление в кнопку
        customAgentSelectBtn.children[0].textContent = newAgent;

        // Отчистка текущих элементов кастомного селекта
        for(let i = 0; i < customAgentSelectItems.length; i++) {
            customAgentSelectItems[i].classList.remove('selected');
        }

        // Создание элемента
        let newAgentItem = document.createElement('li');
        customAgentSelectList.insertBefore(newAgentItem, customAgentSelectItems[customAgentSelectItems.length - 1]);
        
        newAgentItem.classList.add('select__item', 'selected');
        newAgentItem.setAttribute('data-email', newAgentEmail);
        newAgentItem.setAttribute('data-tel', newAgentTel);
        newAgentItem.id = newAgent;
        
        // Создание параграфа внутри
        let newAgentItem_p = document.createElement('p');
        newAgentItem.appendChild(newAgentItem_p);
        newAgentItem_p.textContent = newAgent;

        // Создание кнопки редактирования
        newAgentItem.innerHTML += '<button type="button" class="icon-btn edit-agent-btn"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_614_12399)"><path d="M0.567851 23.9395L0.567531 23.9395C0.554698 23.9427 0.546699 23.9415 0.540916 23.9398C0.533836 23.9377 0.525383 23.9332 0.517496 23.9254C0.50959 23.9176 0.504571 23.9088 0.50211 23.9009C0.500029 23.8943 0.498839 23.8857 0.501682 23.8729L1.53682 19.2219L5.14308 22.8302L0.567851 23.9395ZM3.27548 16.9023L14.9238 5.25139L19.0988 9.42634L7.44798 21.0772L3.27548 16.9023ZM20.9797 1.5431L23.157 3.72035C23.6143 4.17769 23.6143 4.91359 23.157 5.371C23.157 5.371 23.157 5.371 23.157 5.37101L21.0778 7.45016L16.9028 3.27513L18.6342 1.5437C18.6344 1.54355 18.6345 1.5434 18.6347 1.54325C19.2842 0.8964 20.334 0.897407 20.9797 1.5431Z" stroke="#BBBBBB"></path></g><defs><clipPath id="clip0_614_12399"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg></button>';
    }


    // РЕДАКТИРОВАТЬ КОНТАКТНОЕ ЛИЦО
    const editAgentBtn = document.querySelector('.edit-agent-submit'),
        editAgentCansel = document.querySelector('.edit-agent-cansel'),

        myeditAgentInputs = document.querySelectorAll('.edit-agent__input'),
        myAgentFio = document.querySelector('.edit-agent input[name="my_fio"]'),
        myAgentEmail = document.querySelector('.edit-agent input[name="my_email"]'),
        myAgentTel = document.querySelector('.edit-agent input[name="my_tel"]');


    // Открытие попапа
    $(document).on('click', '.edit-agent-btn', function() {
        openPopup($('#popup-edit-agent'));
        overlay.fadeIn();

        // Перенос текущих значений в редактируемую область
        fieldFilling2(this);
    });

    function fieldFilling2(btn) {
        let currentSelectedItem = btn.closest('.select__item');

        myAgentFio.value = currentSelectedItem.children[0].textContent;
        myAgentFio.focus();

        myAgentEmail.value = currentSelectedItem.getAttribute('data-email');
        myAgentTel.value = currentSelectedItem.getAttribute('data-tel');

        editAgentBtn.classList.remove('disabled');
    }

    // Действия внутри попапа
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
            updateResult_agent();
            overlay.fadeOut();
        } else {
            openPopup($('#popup-add-agent-result'));
        }

        clearPopupFields(myeditAgentInputs, editAgentBtn);
        closePopup($('#popup-edit-agent'));
        allSelectСlosing();
    });

    function changeMyAgent() {
        let editAgent = myAgentFio.value,
            editAgentEmail = myAgentEmail.value,
            editAgentTel = myAgentTel.value;

        // Вносим изменения в дефолтном селекте
        let defaultAgentOptions = document.querySelectorAll('.checkout__field_agent option');

        for(let i = 0; i < defaultAgentOptions.length; i++) {
            if(defaultAgentOptions[i].getAttribute('selected') == 'selected') {
                defaultAgentOptions[i].value = editAgent;
                defaultAgentOptions[i].textContent = editAgent;
            }
        }

        // Изменения в кастомном селекте
        let customAgentSelectBtn = document.querySelector('.checkout__field_agent .select'),
            customAgentSelectItems = document.querySelectorAll('.checkout__field_agent .select__item');

        // Изменения в кнопке
        customAgentSelectBtn.children[0].textContent = editAgent;


        // В селекте
        for(let i = 0; i < customAgentSelectItems.length; i++) {
            if(customAgentSelectItems[i].classList.contains('selected')) {
                customAgentSelectItems[i].children[0].textContent = editAgent;
                customAgentSelectItems[i].setAttribute('data-email', editAgentEmail);
                customAgentSelectItems[i].setAttribute('data-tel', editAgentTel);
                customAgentSelectItems[i].id = editAgent;
            }
        }
    }


    // Результирующая часть в этапе "Покупатель"

    $(document).on('click', '.checkout__field_company .select__item', function() {
        updateResult_company();
    });

    $(document).on('click', '.checkout__field_address .select__item', function() {
        if(!this.classList.contains('add-new')) {
            updateResult_address();
            // Доп инф для не Новосиба
            checkCity();
            // Обязательность полей в этапе "Доп. информация"
            makeRequiredInputInRequiredFields_Addition();
        }
    });

    $(document).on('click', '.checkout__field_agent .select__item', function() {
        if(!this.classList.contains('add-new')) {
            updateResult_agent();
        }
    });

    $(document).on('change', '#step-3 input[name="message"]', function() {
        let buyerMessage = document.querySelector('.buyer_message');
        buyerMessage.textContent = this.value;
    });


    function updateResult_company() {
        let companySelectItems = document.querySelectorAll('.checkout__field_company .select__item'),
            buyerName = document.querySelector('.buyer_name');

        buyerName.textContent = processingSelectedValue(companySelectItems).textContent;
    }

    function updateResult_address() {
        let addressSelectItems = document.querySelectorAll('.checkout__field_address .select__item'),
            buyerAddress = document.querySelector('.buyer_address');

        buyerAddress.textContent = processingSelectedValue(addressSelectItems).children[0].textContent;
    }

    function updateResult_agent() {
        let agentSelectItems = document.querySelectorAll('.checkout__field_agent .select__item'),
            selectedItem = processingSelectedValue(agentSelectItems),
            buyerAgent = document.querySelector('.buyer_agent');

        buyerAgent.textContent = selectedItem.children[0].textContent;

        let email = document.querySelector('#step-3 input[name="email"]'),
            tel = document.querySelector('#step-3 input[name="tel"]');

        email.value = selectedItem.getAttribute('data-email');
        tel.value = selectedItem.getAttribute('data-tel');

        let buyerEmail = document.querySelector('.buyer_email'),
            buyerTel = document.querySelector('.buyer_tel');

        buyerEmail.textContent = email.value;
        buyerTel.textContent = tel.value;
    }


    // Результирующая часть в этапе "Доп. информация"

    // Дата доставки
    $(document).on('change', '#step-4 input[name="date2"]', function() {
        let deliveryDate = document.querySelector('.addition_date-1');
        deliveryDate.textContent = (this.value).split('-').reverse().join('.');
    });

    // Дата самовывоза
    $(document).on('change', '#step-4 input[name="date1"]', function() {
        let pickupDate = document.querySelector('.addition_date-2');
        pickupDate.textContent = (this.value).split('-').reverse().join('.');
    });

    $(document).on('click', '.checkout__field_time .select__item', function() {
        updateResult_time();
    });

    $(document).on('click', '.checkout__field_tk .select__item', function() {
        updateResult_tk();
    });

    $(document).on('click', '.checkout__field_tk-delivery .select__item', function() {
        updateResult_tkDelivery();
    });

    // Комментарий для ТК
    $(document).on('change', '#step-4 input[name="message1"]', function() {
        let tkMessage = document.querySelector('.addition_tk-message');
        tkMessage.textContent = this.value;
    });


    function updateResult_time() {
        let timeSelectItems = document.querySelectorAll('.checkout__field_time .select__item'),
            deliveryTime = document.querySelector('.addition_time-1'),
            pickupTime = document.querySelector('.addition_time-2');

        deliveryTime.textContent = processingSelectedValue(timeSelectItems).textContent;
        pickupTime.textContent = processingSelectedValue(timeSelectItems).textContent;
    }

    function updateResult_tk() {
        let tkSelectItems = document.querySelectorAll('.checkout__field_tk .select__item'),
            tk = document.querySelector('.addition_tk');

        tk.textContent = processingSelectedValue(tkSelectItems).textContent;
    }

    function updateResult_tkDelivery() {
        let tkDeliverySelectItems = document.querySelectorAll('.checkout__field_tk-delivery .select__item'),
            tkDelivery = document.querySelector('.addition_tk-delivery');

        tkDelivery.textContent = processingSelectedValue(tkDeliverySelectItems).textContent;
    }

    function processingSelectedValue(arr) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].classList.contains('selected')) {
                return arr[i];
            }
        }
    }

    function fieldСheck(...arr) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].textContent != '' && arr[i].textContent.replace(/\s/g, '') != '') {
                if(!arr[i].parentElement.classList.contains('disabled')) {
                    arr[i].parentElement.classList.remove('d-none');
                }
            } else {
                arr[i].parentElement.classList.add('d-none');
            }
        }
    }


    // Контрольное подтверждение адреса
    const confirmationBtn = document.querySelector('.confirmation-btn');

    confirmationBtn.addEventListener('click', function() {
        moveToOrderReadyPage();
    });

    function moveToOrderReadyPage() {
        let currentHost = window.location.host;
        let currentProtocol = window.location.protocol + '//';

        let newPathname = '/order-ready-1.html';

        // Редирект 
        window.location.href = currentProtocol + currentHost + newPathname;
    }

    // Клик по кнопке "Редактировать" в попапе с контрольным подтверждением адреса
    const addressConfirmationCansel = document.querySelector('.address-confirmation-cansel');

    addressConfirmationCansel.addEventListener('click', function() {
        closePopup($('#popup-address-confirmation'));
        overlay.fadeOut();
        // Открытие таба, в кот. находится поле адрес
        document.querySelector('#step-3 .checkout__tab-edit').click();
    });


    // Возвращаемся к текущему табу после ajax

    function goToCurrentTab(tabIndex) {
        let checkoutTabs = document.querySelectorAll('.checkout__tab');

        for (let i = 0; i < checkoutTabs.length; i++) {
            checkoutTabs[i].classList.remove('current');
            // Добавляем активность для табов, расположенных до текущего таба
            if(i < tabIndex) {
                checkoutTabs[i].classList.add('active');
            }
        }

        // Новый активный и текущий таб
        let newTab = checkoutTabs[tabIndex];
        newTab.classList.add('active', 'current');


        // Для таба "Товары в заказе"
        if(newTab.id != 'step-1') {
            let checkoutTabGoods = document.querySelector('.checkout__tab_goods .checkout__tab-name');
            checkoutTabGoods.classList.remove('unfolded');
        }

        // Заполняемая часть
        $('.checkout__tab-content').each(function(i,elem) {
            if($(elem).closest('.checkout__tab').hasClass('current')) {
                $(elem).slideDown();
            } else {
                $(elem).slideUp();
            }
        });

        // Результирующая
        $('.checkout__tab-content-filled').each(function(i,elem) {
            if($(elem).closest('.checkout__tab').hasClass('current') || !$(elem).closest('.checkout__tab').hasClass('active')) {
                $(elem).slideUp();
            } else {
                // Отображение только заполненной информации
                if($(elem).closest('.checkout__tab').attr('id') == 'step-3') {
                    let buyerName = document.querySelector('.buyer_name'),
                        buyerAddress = document.querySelector('.buyer_address'),
                        buyerAgent = document.querySelector('.buyer_agent'),
                        buyerEmail = document.querySelector('.buyer_email'),
                        buyerTel = document.querySelector('.buyer_tel'),
                        buyerMessage = document.querySelector('.buyer_message');

                    fieldСheck(buyerName, buyerAddress, buyerAgent, buyerEmail, buyerTel, buyerMessage);
                } else if($(elem).closest('.checkout__tab').attr('id') == 'step-4') {
                    let deliveryDate = document.querySelector('.addition_date-1'),
                        deliveryTime = document.querySelector('.addition_time-1'),
                
                        pickupDate = document.querySelector('.addition_date-2'),
                        pickupTime = document.querySelector('.addition_time-2'),
                
                        tk = document.querySelector('.addition_tk'),
                        tkDelivery = document.querySelector('.addition_tk-delivery'),
                        tkMessage = document.querySelector('.addition_tk-message');

                    fieldСheck(deliveryDate, deliveryTime, pickupDate, pickupTime, tk, tkDelivery, tkMessage);
                }

                $(elem).slideDown();
            }
        });

        // Появление/скрытие кнопки "Редактировать" для активных табов (исключение - текущий)
        addEditBtn();

        // Перерасчёт для фиксированного сайдабара
        setTimeout(() => {
            makeFixedSidebar();
        }, 300);
    }


});




