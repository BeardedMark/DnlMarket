<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- <link rel="stylesheet" href="css/bootstrap-grid.min.css"> -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="header.css">
    <link rel="stylesheet" href="bread.css">
    <link rel="stylesheet" href="footer.css">
    <link rel="stylesheet" href="popup.css">
    <link rel="stylesheet" href="menu.css">

    <link rel="stylesheet" href="about.css">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="fonts.css">

    <!-- <link rel="stylesheet" href="wireframe.css"> -->

    <title>MY DNL</title>
</head>

<body>
    <header id="header">
        <? include_once('elements/header.php') ?>
    </header>

    <main id="mains">

        <div class="container">
            <div class="row">
                <div class="col">

                    <? include('elements/bread.php') ?>
                    <? include_once('pages/home.php') ?>

                </div>
            </div>
        </div>

    </main>

    <footer id="footer">
        <? include_once('elements/footer.php') ?>
    </footer>

    <script src="script.js"></script>
</body>


</html>