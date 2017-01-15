/*global console, document, jQuery */
(function ($) {
    'use strict';
    $(document).ready(function () {
        console.log('Dropfile Is Ready');
        $('.drop-container').dropfile({
            message: 'Drop file here'
        });
    });
}(jQuery));