<header>
    <section class="header">
        <div class="container">
            <div class="row">
                <div class="col col-12">
                    <div class="header-content">

                        <a href=""><img src="img/svg/logo.svg" alt="Логотип"></a>

                        <a href="#header-catalog" class="header-btn mr-auto">
                            <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 3.5C12.5 3.5 14 2.5 17 1.5C20 0.5 22.5 0.5 22.5 0.5V18.5C22.5 18.5 20 18.5 17 19.5C14 20.5 12.5 21.5 12.5 21.5M12.5 3.5C12.5 3.5 11 2.5 8 1.5C5 0.5 2.5 0.5 2.5 0.5V18.5C2.5 18.5 5 18.5 8 19.5C11 20.5 12.5 21.5 12.5 21.5M12.5 3.5V21.5M12.5 21.5H24.5V3.5H22.5M12.5 21.5H0.5V3.5H2.5" stroke="#BBBBBB" />
                            </svg>
                            Каталог
                        </a>

                        <div class="header-city">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0006 24C13.0006 24 21.4621 15.1347 21.4621 10.4615C21.4621 5.78836 17.6738 2 13.0006 2C8.32742 2 4.53906 5.78836 4.53906 10.4615C4.53906 15.1347 13.0006 24 13.0006 24ZM13 13C14.402 13 15.5385 11.8635 15.5385 10.4615C15.5385 9.05959 14.402 7.92309 13 7.92309C11.5981 7.92309 10.4616 9.05959 10.4616 10.4615C10.4616 11.8635 11.5981 13 13 13Z" fill="transparent" stroke="#BBBBBB" />
                            </svg>

                            <div>
                                <!-- <p class="city">Новосибирск</p> -->
                                <a href="#branches" class="city link">Новосибирск</a>
                                <a href="tel:+7(383)2853311" class="phone link">+7 (383) 285-33-11</a>
                            </div>
                        </div>

                        <a href="#search"><img src="img/svg/search.svg" alt="Поиск">Поиск</a>
                        <a href="#user"><img src="img/svg/man.svg" alt="Пользователь"></a>
                        <a href="#order"><img src="img/svg/flag3.svg" alt="Корзина"></a>
                        <a href="#"><img src="img/svg/flag2.svg" alt="Сравнение"></a>
                        <a href="#favorite"><img src="img/svg/flag.svg" alt="Избранное"></a>
                        <a href="#menu"><img src="img/svg/category-icon.svg" alt="Меню"></a>
                        <!-- 
                        <div id="menu" class="header-popup">
                            <img src="img/svg/category-icon.svg" alt="Меню">
                        </div> -->

                    </div>
                </div>
            </div>
        </div>
    </section>

    <div id="menu" class="overlay">
        <? include('elements/popups/menu.php') ?>
    </div>
    <div id="branches" class="overlay">
        <? include('elements/popups/branches.php') ?>
    </div>
    <div id="header-catalog" class="overlay">
        <? include('elements/popups/header-catalog.php') ?>
    </div>
</header>