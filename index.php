<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/bootstrap-grid.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="header.css">
    <link rel="stylesheet" href="bread.css">
    <link rel="stylesheet" href="footer.css">
    <link rel="stylesheet" href="popup.css">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="fonts.css">

    <!-- <link rel="stylesheet" href="wireframe.css"> -->

    <title>dnlmarket</title>
</head>

<body>
    <header id="header">
        <!-- include header -->
        <? include_once('elements/header.php') ?>
    </header>

    <main id="main">
        <!-- include content -->
        <nav>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <? include_once('elements/bread.php') ?>
                    </div>
                </div>
            </div>
        </nav>

        <? include_once('pages/empty.php') ?>
    </main>

    <footer id="footer">
        <!-- include footer -->
        <? include_once('elements/footer.php') ?>
    </footer>
    
    <script src="script.js"></script>
</body>


</html>