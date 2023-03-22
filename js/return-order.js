window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Фиксация сайдбара
    const header = document.querySelector('.header'),
        headerHeight = window.getComputedStyle(header).getPropertyValue('height').replace('px', '')*1,
        returnOrderLeft = document.querySelector('.return-order__left'),
        returnOrderSidebar = document.querySelector('.return-order__sidebar_outer'),
        returnOrderSidebarParent = document.querySelector('.return-order__sidebar'),
        returnOrderSidebar_Width = window.getComputedStyle(returnOrderSidebar).getPropertyValue('width').replace('px', '');

    makeFixedSidebar();

    function makeFixedSidebar() {
        let returnOrderSidebarHeight = window.getComputedStyle(returnOrderSidebar).getPropertyValue('height').replace('px', '')*1,
            returnOrderLeftHeight = window.getComputedStyle(returnOrderLeft).getPropertyValue('height').replace('px', '')*1;

        if(returnOrderSidebarHeight < returnOrderLeftHeight && 
            window.matchMedia('(min-width: 1025px)').matches &&
            (window.innerHeight - headerHeight - 10) > returnOrderSidebarHeight
        ) {
            returnOrderSidebar.classList.add('can-be-fixed');
        } else {
            returnOrderSidebar.classList.remove('can-be-fixed');
            returnOrderSidebar.classList.remove('fixed');
            returnOrderSidebar.classList.remove('bottom');
            returnOrderSidebar.style.top = 'auto';
            returnOrderSidebar.style.bottom = 'auto';
        }
    }

    // Если сайдбар меньше левой области, размер экрана до 1024px и фиксацию позволяет высота экрана в целом
    window.addEventListener('scroll', function() {
        if(returnOrderSidebar.classList.contains('can-be-fixed')) {
            let currentPos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body),
                returnOrderSidebarTopPos = returnOrderSidebarParent.getBoundingClientRect().top + window.pageYOffset,
                returnOrderLeftBottom = returnOrderLeft.getBoundingClientRect().bottom + window.pageYOffset,
                returnOrderSidebar_Height = window.getComputedStyle(returnOrderSidebar).getPropertyValue('height').replace('px', '');

            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 20;

            if(top > returnOrderSidebarTopPos) {
                returnOrderSidebar.classList.add('fixed');
                returnOrderSidebar.classList.remove('bottom');

                returnOrderSidebar.style.width = returnOrderSidebar_Width + 'px';
                returnOrderSidebar.style.top = headerHeight + 20 + 'px';
                returnOrderSidebar.style.bottom = 'auto';

                if((returnOrderLeftBottom - returnOrderSidebar_Height) <= top) {
                    returnOrderSidebar.classList.add('bottom');
                    returnOrderSidebar.classList.remove('fixed');

                    returnOrderSidebar.style.top = 'auto';
                    returnOrderSidebar.style.bottom = 0;
                }
            } else {
                returnOrderSidebar.classList.remove('fixed');
                returnOrderSidebar.style.top = 'auto';
            }
        }
        
    });


    // Фиксация шапки
    const optionsHeader = document.querySelector('.return-order__title');

    let optionsHeader_Height, optionsHeader_Width, optionsHeaderParent;

    if(optionsHeader) {
        optionsHeader_Height = window.getComputedStyle(optionsHeader).getPropertyValue('height').replace('px', '')*1;
        optionsHeader_Width = window.getComputedStyle(optionsHeader).getPropertyValue('width').replace('px', '')*1;
        optionsHeaderParent = optionsHeader.closest('.col-inner');
    }

    function setPenultimateс() {
        let newPersonalItems;
        newPersonalItems = document.querySelectorAll('.return-order__good');

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
            returnOrderLeftTopPos = returnOrderLeft.getBoundingClientRect().top + window.pageYOffset;
    
            // Нижняя точка родительского элемента, абсолютно кот. позиционируется шапка классом "bottom"
            let optionsHeaderParentBottom = optionsHeaderParent.getBoundingClientRect().bottom + currentPos;
    
            // Нижняя точка предпоследнего товара
            let penultimateсBottom = setPenultimateс().getBoundingClientRect().bottom + currentPos;
    
            // Расстояние между нижней точкой родителя и нижней точкой предпоследнего эл-та
            let bottom = optionsHeaderParentBottom - penultimateсBottom + 2;
    
            // Тек. поз. + шапка
            let top = currentPos + headerHeight + 20;
    
            if(top >= returnOrderLeftTopPos) {
                optionsHeader.classList.add('fixed');
                optionsHeader.classList.remove('bottom');
    
                optionsHeader.style.top = headerHeight + 20 + 'px';
                optionsHeader.style.bottom = 'auto';
    
                optionsHeader.style.width = optionsHeader_Width + 'px';
    
                returnOrderLeft.style.paddingTop = optionsHeader_Height + 'px';
    
                if((penultimateсBottom - optionsHeader_Height - 2) <= top) {
                    optionsHeader.classList.remove('fixed');
                    optionsHeader.classList.add('bottom');
    
                    optionsHeader.style.top = 'auto';
                    optionsHeader.style.bottom = bottom + 'px';
                }
            } else {
                optionsHeader.classList.remove('fixed');
                optionsHeader.style.top = 'auto';
                optionsHeader.style.bottom = 'auto';
                returnOrderLeft.style.paddingTop = 0;
            }
        }
    });

});