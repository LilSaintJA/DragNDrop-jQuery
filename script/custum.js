(function ($) {
    $(document).ready(function () {
        console.log('Dropfile Is Ready');
        $('.drop-container').dropfile({
            message: 'Drop file here, or click tu upload'
        });
    });
}(jQuery));