<section id="stories-section" class="section stories pb-0 mb-16--negative">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row mb">
            <div class="col col-12 stories__title">
                <div class="col-inner">
                    <h2 class="mb-0">Истории</h2>
                    <button type="button" class="button is-link stories-lightbox-btn"><span>Показать все</span></button>
                </div>
            </div>
        </div>
        <div class="row row-16 stories__items stories-slider">
            <?include('elements/stories-item.php')?>
            <?include('elements/stories-item.php')?>
            <?include('elements/stories-item.php')?>
            <?include('elements/stories-item.php')?>
            <?include('elements/stories-item.php')?>
        </div>
        <!-- Progress-bar -->
        <div class="row row-16 progress-bar__row show-for-medium">
            <div class="col col-12">
                <div class="col-inner">
                    <div class="progress-bar">
                        <div class="progress-bar__current-progress"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Лайтбокс с историями -->
    <!-- <div class="stories-overlay">
        <div class="stories-overlay__inner">
            <div class="stories-lightbox">
                <button type="button" class="stories-lightbox__arrow prev">
                    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4298_19489)">
                        <path d="M15.1386 26.8799L17.6627 24.8011L6.43047 15.5509L34 15.5509L34 12.6111L6.43047 12.6111L17.6627 3.36099L15.1386 1.28221L-0.4029 14.0811L15.1386 26.8799Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_4298_19489">
                        <rect width="34" height="28" fill="white" transform="translate(34 28) rotate(-180)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <div class="stories-lightbox__wrapper">
                    <div class="stories-lightbox__item">
                        <a href="story-delivery.html" style="background-color: #DEBC8F;">
                            <div class="stories-lightbox__time-line">
                                <div class="stories-lightbox__time-line_inner"></div>
                            </div>
                            <div class="stories-lightbox__img">
                                <div class="img">
                                    <div class="image-contain">
                                        <img src="./img/story.png" alt="">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="stories-lightbox__text">
                                <div class="stories-lightbox__name">
                                    <p class="h3">Бесплатная доставка от 1000 ₽</p>
                                </div>
                                <div class="stories-lightbox__text-arrow">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="stories-lightbox__item">
                        <a href="#" style="background-color: #B7E9FE;">
                            <div class="stories-lightbox__time-line">
                                <div class="stories-lightbox__time-line_inner"></div>
                            </div>
                            <div class="stories-lightbox__img">
                                <div class="img">
                                    <div class="image-contain">
                                        <img src="./img/story 1.png" alt="">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="stories-lightbox__text">
                                <div class="stories-lightbox__name">
                                    <p class="h3">Цена по прайсу производителей</p>
                                </div>
                                <div class="stories-lightbox__text-arrow">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="stories-lightbox__item">
                        <a href="#" style="background-color: #D9DBF1;">
                            <div class="stories-lightbox__time-line">
                                <div class="stories-lightbox__time-line_inner"></div>
                            </div>
                            <div class="stories-lightbox__img">
                                <div class="img">
                                    <div class="image-contain">
                                        <img src="./img/story 2.png" alt="">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="stories-lightbox__text">
                                <div class="stories-lightbox__name">
                                    <p class="h3">Предоставляем диспенсеры в пользование</p>
                                </div>
                                <div class="stories-lightbox__text-arrow">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="stories-lightbox__item">
                        <a href="#" style="background-color: #FCF2B8;">
                            <div class="stories-lightbox__time-line">
                                <div class="stories-lightbox__time-line_inner"></div>
                            </div>
                            <div class="stories-lightbox__img">
                                <div class="img">
                                    <div class="image-contain">
                                        <img src="./img/story 3.png" alt="">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="stories-lightbox__text">
                                <div class="stories-lightbox__name">
                                    <p class="h3">Отсрочка платежа с первой отгрузки</p>
                                </div>
                                <div class="stories-lightbox__text-arrow">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="stories-lightbox__item">
                        <a href="#" style="background-color: #89ACC0;">
                            <div class="stories-lightbox__time-line">
                                <div class="stories-lightbox__time-line_inner"></div>
                            </div>
                            <div class="stories-lightbox__img">
                                <div class="img">
                                    <div class="image-contain">
                                        <img src="./img/story 4.png" alt="">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="stories-lightbox__text">
                                <div class="stories-lightbox__name">
                                    <p class="h3">Брендирование упаковки</p>
                                </div>
                                <div class="stories-lightbox__text-arrow">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <button type="button" class="stories-lightbox__arrow next">
                    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4298_19487)">
                        <path d="M18.8614 1.12012L16.3373 3.19889L27.5695 12.4491L-1.56042e-07 12.4491L2.58849e-05 15.3889L27.5695 15.3889L16.3373 24.639L18.8614 26.7178L34.4029 13.9189L18.8614 1.12012Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_4298_19487">
                        <rect width="34" height="28" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <div class="stories-lightbox__close"></div>
            </div>
        </div>
    </div> -->
</section>
