window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const overlay = $('.overlay');
    
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
    const reconciliationRequestSubmit = document.querySelector('.reconciliation-request-submit'),
        reconciliationRequestInputs = document.querySelectorAll('.reconciliation-request__input');
    

    // Ввод данных
    for(let i = 0; i < reconciliationRequestInputs.length; i++) {
        reconciliationRequestInputs[i].addEventListener('input', function() {
            checkInputs(reconciliationRequestInputs, reconciliationRequestSubmit);
        });
    }

    // Клик по кнопке "Запросить"
    reconciliationRequestSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        overlay.fadeIn();
        openPopup($('#popup-act-request-result'));
    });


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

    function openPopup(popup) {
        scrollLock.disablePageScroll();
        popup.fadeIn('400');
        popup.addClass('animate__slideInRight animate__animated');
        popup.addClass('active');
        html.classList.add('pum-open');
    }
});