<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="script/jquery-3.1.1.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Great+Vibes|Indie+Flower|Tangerine:400,700|Overpass+Mono" rel="stylesheet">
        <link rel="stylesheet/less" href="styles/less/zing.less">
        <script src="script/less.min.js"></script>
        <title>Drag N Drop</title>
    </head>
    <body>
        <div id="page-wrapper">
            <section id="drop-container">
                <h1 class="main-title">
                    Plugin Drag'n'Drop
                </h1>
                <div class="droparea">
                    <div class="dropzone">
                        <span class="drop-title">Drag'n'Drop</span>
                        <div class="drop-container">
                            <?php foreach(glob('assets/imgs/*') as $file): ?>
                            <div class="">
                                <img src="<?= $file; ?>" alt="">
                            </div>
                            <?php endforeach; ?>
                            <div class="dropfile"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </body>
</html>