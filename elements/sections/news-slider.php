<section class="section blog pb-0 mb-16--negative">
    <div class="bg">
        <div class="bg-overlay"></div>
    </div>
    <div class="container">
        <div class="row mb">
            <div class="col col-12 blog__title">
                <div class="col-inner">
                    <h2 class="mb-0">Блог</h2>
                    <a href="blog.html" class="button is-link"><span>Показать все</span></a>
                </div>
            </div>
        </div>
        <div class="row row-16 blog-slider">
            <?include('elements/news-item.php')?>
            <?include('elements/news-item.php')?>
            <?include('elements/news-item.php')?>
            <?include('elements/news-item.php')?>

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
</section>
