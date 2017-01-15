(function ($) {
    $(document).ready(function () {
        console.log('Dropfile Is Ready');
        $('.drop-container').dropfile({
            message: 'Mon msg perso'
        });
    });
}(jQuery));