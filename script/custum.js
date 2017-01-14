(function ($) {
    $(document).ready(function () {
        console.log('Dropfile Is Ready');
        $('.dropfile').dropfile({
            message: 'Mon msg perso'
        });
    });
}(jQuery));