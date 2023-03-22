<section class="section pt-0">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row">
            <!-- Сортировка -->
<div id="popup-sort" class="popup">
<div class="popup__wrapper_outer">
<div class="popup__wrapper_inner">
    <div class="popup__wrapper">
        <div class="popup__close"></div>
        <h3 class="pb">Сортировка</h3>
        <div class="wrapper sort">
            <button type="button" class="sort__item">
                <span>По умолчанию</span>
            </button>
            <button type="button" class="sort__item">
                <span>По алфавиту: от А до Я</span>
            </button>
            <button type="button" class="sort__item">
                <span>По алфавиту: от Я до А</span>
            </button>
            <button type="button" class="sort__item">
                <span>По цене: сначала дешевле</span>
            </button>
            <button type="button" class="sort__item">
                <span>По цене: сначала дороже</span>
            </button>
        </div>
    </div>
</div>
</div>
</div>

<!-- Категории -->
<div id="popup-cat" class="popup">
<div class="popup__wrapper_outer">
<div class="popup__wrapper_inner">
    <div class="popup__wrapper">
        <div class="popup__close"></div>
        <h3 class="pb">Категории</h3>
        <div class="wrapper cat">
            <ul class="cat__list">
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Гигиена</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Канцелярия</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Кондитерский инвентарь</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Красота</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Оборудование</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Одноразовая посуда</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Перчатки и СИЗы</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Приготовление пищи</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Продукты</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Уборка</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Упаковка пищевая</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Упаковка непищевая</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Химия</h4>
                    </a>
                </li>
                <li class="cat__item">
                    <a href="#">
                        <h4 class="cat__name">Хоз инвентарь</h4>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
</div>

<!-- Фильтр -->
<div id="popup-filter" class="popup">
<div class="popup__wrapper_outer">
<div class="popup__wrapper_inner">
    <div class="popup__wrapper">
        <div class="popup__close"></div>
        <h3 class="pb">Фильтры</h3>
        <div class="wrapper filter">
            <form action="" id="filterForm">
                <div class="wrapper__inner">
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Розничная цена</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="price_from" name="price_from" min="0" max="9999" placeholder="0">
                                <div class="filter__separator"></div>
                                <input type="number" id="price_to" name="price_to" min="0" max="9999" placeholder="9999">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Высота, мм</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="height_from" name="height_from" min="20" max="80" placeholder="20">
                                <div class="filter__separator"></div>
                                <input type="number" id="height_to" name="height_to" min="20" max="80" placeholder="80">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Ширина, мм</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="width_from" name="width_from" min="0" max="200" placeholder="0">
                                <div class="filter__separator"></div>
                                <input type="number" id="width_to" name="width_to" min="0" max="200" placeholder="200">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Диаметр нижний, мм</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="diameter_from" name="diameter_from" min="0" max="200" placeholder="0">
                                <div class="filter__separator"></div>
                                <input type="number" id="diameter_to" name="diameter_to" min="0" max="200" placeholder="200">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Длина, м</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="length_from" name="length_from" min="0" max="200" placeholder="0">
                                <div class="filter__separator"></div>
                                <input type="number" id="length_to" name="length_to" min="0" max="200" placeholder="200">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Толщина, мм</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs nums">
                            <div>
                                <input type="number" id="thickness_from" name="thickness_from" min="0" max="200" placeholder="0">
                                <div class="filter__separator"></div>
                                <input type="number" id="thickness_to" name="thickness_to" min="0" max="200" placeholder="200">
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Вид (особенности конструкции)</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs">
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="view" name="view">
                                <label for="view">двусторонняя</label>
                            </div>
                        </div>
                    </div>
                    <div class="filter__item">
                        <div class="filter__name">
                            <h5>Цвет</h5>
                            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9.5L8.5 1.5L0.999999 9.5" stroke="#1B1B1B"/>
                            </svg>
                        </div>
                        <div class="filter__inputs">
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-1" name="beige">
                                <label for="color-1">Бежевый</label>
                            </div>
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-2" name="beige-green">
                                <label for="color-2">Бежевый, зеленый</label>
                            </div>
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-3" name="beige-brown">
                                <label for="color-3">Бежевый, коричневый</label>
                            </div>
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-4" name="beige-brown">
                                <label for="color-4">Бежевый, коричневый</label>
                            </div>
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-5" name="beige-brown">
                                <label for="color-5">Бежевый, коричневый</label>
                            </div>
                            <div class="filter__inputs-wrapper">
                                <input type="checkbox" id="color-6" name="beige-brown">
                                <label for="color-6">Бежевый, коричневый</label>
                            </div>
                            <button type="button" class="button is-link expand-btn all-list">
                                <span>Весь список</span>
                                <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L8.5 9L16 1" stroke="#BA8258"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="filter__buttons">
                    <input type="button" id="reset-filter" class="button light-btn" value="Очистить фильтры" disabled readonly>
                    <input type="submit" id="submit-filter" class="button dark-btn" value="Применить" disabled readonly>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
</div>

            <!-- Фильтр, сортировка -->
            <div class="col col-12 pb-0 category__options options">
                <div class="col-inner">
                    <button data-id="cat" type="button" class="popup-btn">
                        <span>Категории</span>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 5.5H23.5M9.5 12.5H23.5M9.5 19.5H23.5" stroke="#BBBBBB" stroke-linecap="round"/>
                            <circle cx="4.5" cy="5.5" r="1.5" fill="#C4C4C4"/>
                            <circle cx="4.5" cy="12.5" r="1.5" fill="#C4C4C4"/>
                            <circle cx="4.5" cy="19.5" r="1.5" fill="#C4C4C4"/>
                        </svg>
                    </button>
                    <button data-id="filter" type="button" class="popup-btn">
                        <span>Фильтры</span>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 3.5H3.5V7.5H5.5L10.5 15.5V22.5L15.5 19.5V15.5L20.5 7.5H22.5V3.5Z" stroke="#BBBBBB" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button data-id="sort" type="button" class="popup-btn">
                        <span>Сортировка</span>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 5.5H22.5M3.5 12.5H15.5M3.5 19.5H8.5M19.5 19.5V12.5M19.5 19.5L22.5 17.5M19.5 19.5L16.5 17.5" stroke="#BBBBBB" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Товары -->
            <div class="col col-12 category__content pb-0">
                <div class="col-inner">
                    <div class="row category__row">
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
