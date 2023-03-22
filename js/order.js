window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Фиксация сайдбара
    const header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1,
        orderLeft = document.querySelector('.order-page__left'),
        orderSidebar = document.querySelector('.order-page__sidebar_outer'),
        orderSidebarParent = document.querySelector('.order-page__sidebar'),
        orderSidebar_Width = window.getComputedStyle(orderSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar();

    function makeFixedSidebar() {
        let orderSidebarHeight = window.getComputedStyle(orderSidebar).getPropertyValue('height').replace('px', '')*1,
            orderLeftHeight = window.getComputedStyle(orderLeft).getPropertyValue('height').replace('px', '')*1;

        if(orderSidebarHeight < orderLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > orderSidebarHeight
        ) {
            orderSidebar.classList.add('can-be-fixed');
        } else {
            orderSidebar.classList.remove('can-be-fixed');
            orderSidebar.classList.remove('fixed');
            orderSidebar.classList.remove('bottom');
            orderSidebar.style.top = 'auto';
            orderSidebar.style.bottom = 'auto';
        }
    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(orderSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
                orderSidebarTopPos = orderSidebarParent.getBoundingClientRect().top + window.pageYOffset,
                orderLeftBottom = orderLeft.getBoundingClientRect().bottom + window.pageYOffset,
                orderSidebar_Height = window.getComputedStyle(orderSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 20;

            if(top > orderSidebarTopPos) {
                orderSidebar.classList.add('fixed');
                orderSidebar.classList.remove('bottom');

                orderSidebar.style.width = orderSidebar_Width + 'px';
                orderSidebar.style.top = headerHeight + 20 + 'px';
                orderSidebar.style.bottom = 'auto';

                if((orderLeftBottom - orderSidebar_Height) <= top) {
                    orderSidebar.classList.add('bottom');
                    orderSidebar.classList.remove('fixed');

                    orderSidebar.style.top = 'auto';
                    orderSidebar.style.bottom = 0;
                }
            } else {
                orderSidebar.classList.remove('fixed');
                orderSidebar.style.top = 'auto';
            }
        }
        
    });


    // Фиксация шапки
    const optionsHeader = document.querySelector('.order-page__title');

    let optionsHeader_Height, optionsHeader_Width, optionsHeaderParent;

    if(optionsHeader) {
        optionsHeader_Height = window.getComputedStyle(optionsHeader).getPropertyValue('height').replace('px', '')*1;
        optionsHeader_Width = window.getComputedStyle(optionsHeader).getPropertyValue('width').replace('px', '')*1;
        optionsHeaderParent = optionsHeader.closest('.col-inner');
    }

    function setPenultimateс() {
        let newPersonalItems;
        newPersonalItems = document.querySelectorAll('.order-page__good');

        // предпоследний элемент
        if(newPersonalItems.length > 1) {
            return newPersonalItems[newPersonalItems.length - 2];
        } else {
            return newPersonalItems[newPersonalItems.length - 1].previousElementSibling;
        }
        
    }

    window.addEventListener('scroll', function() {
        if(optionsHeader) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
            orderLeftTopPos = orderLeft.getBoundingClientRect().top + window.pageYOffset;
    
            // Нижняя точка родительского элемента, абсолютно кот. позиционируется шапка классом "bottom"
            let optionsHeaderParentBottom = optionsHeaderParent.getBoundingClientRect().bottom + currentPos;
    
            // Нижняя точка предпоследнего товара
            let penultimateсBottom = setPenultimateс().getBoundingClientRect().bottom + currentPos;
    
            // Расстояние между нижней точкой родителя и нижней точкой предпоследнего эл-та
            let bottom = optionsHeaderParentBottom - penultimateсBottom;
    
            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 20;
    
            if(top >= orderLeftTopPos) {
                optionsHeader.classList.add('fixed');
                optionsHeader.classList.remove('bottom');
    
                optionsHeader.style.top = headerHeight + 20 + 'px';
                optionsHeader.style.bottom = 'auto';
    
                optionsHeader.style.width = optionsHeader_Width + 'px';
    
                orderLeft.style.paddingTop = optionsHeader_Height + 'px';
    
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
                orderLeft.style.paddingTop = 0;
            }
        }
    });


    // Попап "Заявка на возврат оформлена"
    $(document).on('click', '.return-request-btn', function() {
        requestSent();
        if(this.classList.contains('return-request-btn-all')) {
            $('.return-request-btn').addClass('disabled');
        } else {
            this.classList.add('disabled');
        }
    });

    function requestSent() {
        let popup = $('#popup-return-request');

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
});