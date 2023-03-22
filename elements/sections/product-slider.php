<section class="section recommendations mb--negative">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col col-12 recommendations__title">
                <div class="col-inner">
                    <h2 class="mb-0">Рекомендуемые товары</h2>
                    <div class="arrows recommendations-slider__arrows">
                        <button type="button" class="arrow arrow_prev">
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.3576 23L15.5847 21.1439L5.67395 12.8848L30 12.8848L30 10.26L5.67395 10.26L15.5847 2.00096L13.3576 0.144906L-0.355498 11.5725L13.3576 23Z"
                                    fill="#1B1B1B" />
                            </svg>
                        </button>
                        <button type="button" class="arrow arrow_next">
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.6424 3.05176e-05L14.4153 1.85608L24.3261 10.1152L-1.37684e-07 10.1152L2.28396e-05 12.74L24.3261 12.74L14.4153 20.999L16.6424 22.8551L30.3555 11.4275L16.6424 3.05176e-05Z"
                                    fill="#1B1B1B" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row recommendations__slider">
            <div class="col col-12 pb-0">
                <div class="col-inner">
                    <div class="row recommendations-slider">
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
                        <?include('elements/category-item.php')?>
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
            </div>
        </div>
    </div>
</section>