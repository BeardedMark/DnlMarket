<!-- Слайдер -->
<? //include('elements/sections/home-slider.php')
?>



<!-- Хиты продаж -->
<section class="section">
    <div class="row gy-3">
        <div class="col col-12">
            <h2>Хиты продаж</h2>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="img/blog1.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="img/blog2.jpg" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="img/blog3.jpg" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

        

        <div class="col col-12">
            <div class="note">
                <div class="row">
                    <div class="col col-12 col-lg-8">
                        <img src="https://new.dnlmarket.ru/local/templates/main/img/AboutBanner1.jpg" alt="">
                    </div>

                    <div class="col">
                        <div class="note-context">
                            <p class="note-title">Жидкое крем мыло Milana от Grass</p>
                            <p class="note-text">15 февраля 2022</p>
                            <p class="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus sed morbi adipiscing eget id nascetur.</p>
                            <a href="blog-single.html" class="button icon-button circle-btn">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="col col-12 col-lg-6">
            <div class="note">
                <img class="note-img" src="https://new.dnlmarket.ru/local/templates/main/img/AboutBanner1.jpg" alt="">
                <div class="note-context">
                    <p class="note-title">Жидкое крем мыло Milana от Grass</p>
                    <p class="note-text">15 февраля 2022</p>
                    <p class="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus sed morbi adipiscing eget id nascetur.</p>
                    <a href="blog-single.html" class="button icon-button circle-btn">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="col col-12 col-lg-6">
            <div class="note">
                <img class="note-img" src="https://new.dnlmarket.ru/local/templates/main/img/AboutBanner1.jpg" alt="">
                <div class="note-context">
                    <p class="note-title">Жидкое крем мыло Milana от Grass</p>
                    <p class="note-text">15 февраля 2022</p>
                    <p class="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus sed morbi adipiscing eget id nascetur.</p>
                    <a href="blog-single.html" class="button icon-button circle-btn">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Новоинки -->
<? include('elements/sections/news-slider.php') ?>

<!-- Истории -->
<? include('elements/sections/stories-slider.php') ?>

<!-- Подборка товаров -->
<? include('elements/sections/product-slider.php') ?>

<!-- Блог -->
<? include('elements/sections/news-slider.php') ?>

<!-- Форма обратной связи -->
<section class="section request pb-0 mb-16--negative">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row row-16 justify-content-between">
            <div class="col col-12 col-lg-5">
                <? include('elements/form.php') ?>
            </div>
            <div class="col col-12 col-lg-6 request__img hide-for-medium">
                <div class="col-inner">
                    <div class="img">
                        <div class="image-cover">
                            <img src="./img/request.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Бренды -->
<? include('elements/sections/news-slider.php') ?>

<!-- Готовые решения -->
<!-- <section class="section ready mb-16--negative">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row mb">
            <div class="col col-12 ready__title">
                <div class="col-inner">
                    <h2 class="mb-0">Готовые решения для вашего бизнеса</h2>
                </div>
            </div>
        </div>
        <div class="row tabbed-content">
            <div class="col col-12 tabs pb-0">
                <div class="col-inner">
                    <button class="button tab active"><span>Кофейня</span></button>
                    <button class="button tab"><span>Ресторан</span></button>
                    <button class="button tab"><span>Пищевое производство</span></button>
                    <button class="button tab"><span>Непищевое производство</span></button>
                </div>
            </div>
            <div class="col col-12 pb-0 tab-panels">
                <div class="row row-16 panel active">
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab1.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab2.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab3.jpg" alt="">
                                </div>
                            </div>
                            <div class="dot">
                                <div class="point">
                                    <div class="point_outer"><div class="point_inner"></div></div>
                                </div>
                                <div class="dot__descr">
                                    <a href="product.html" class="dot__name">
                                        <p>Крышка круглая к стакану бумажному</p>
                                    </a>
                                    <p class="dot__info">Пластик, черная, 62 мм,</p>
                                    <div class="prices">
                                        <div class="price price_new">
                                            <p class="num">1500,00</p>
                                            <p class="symbol">₽</p>
                                        </div>
                                    </div>
                                    <a href="product.html" class="dot__arrow">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 13H24M24 13L15.5 4.5M24 13L15.5 21.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-16 panel">
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab1.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab2.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab3.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-16 panel">
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab1.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab2.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab3.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-16 panel">
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab1.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12 col-md-6 col-lg-6">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab2.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-12">
                        <div class="col-inner panel__content">
                            <div class="img">
                                <div class="image-cover">
                                    <img src="./img/tab3.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</section> -->