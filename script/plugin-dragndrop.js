/*global console, document, jQuery */
(function ($) {
    'use strict';
    $(document).ready(function () {
        console.log('jQuery Is Ready');

        function log(d) {
            console.log(d);
        }

        // Options par défaults
        var defaults = {
            message: 'Déposez vos fichiers ici',
            script: 'script/upload.php'
        };

        $.fn.dropfile = function (options) {
            if (options) {
                $.extend(defaults, options);
            }

            var msg = defaults.message,
                script = defaults.script;
            return this.each(function () {
                $('<span>').addClass('msg').append(msg).appendTo(this);
                $(this).bind({
                    dragenter: function (evt) {
                        evt.preventDefault();
                        console.log('dragenter');
                    },
                    dragover: function (evt) {
                        evt.preventDefault();
                        $(this).addClass('hover');
                        console.log('dragover');
                    },
                    dragleave: function (evt) {
                        evt.preventDefault();
                        $(this).removeClass('hover');
                        console.log('dragleave');
                    }
                });

                // Lancer l'événement à la main pour bien récupérer les fichiers dans le navigateur
                this.addEventListener('drop', function (evt) {
                    evt.preventDefault();
                    var files = evt.dataTransfer.files;
                    upload(files, $(this), 0);
                }, false);
            });

            /**
             * Permet de gérer les uploads de fichier One by One
             * @param {[[Type]]} files [[Description]]
             * @param {[[Type]]} area  [[Description]]
             * @param {[[Type]]} index [[Description]]
             */
            function upload(files, area, index) {
                var file = files[index],
                    xhr = new XMLHttpRequest();
                xhr.open('post', script, true); // true = asynchronous
                xhr.setRequestHeader('content-type', 'multipart/form-data');
                xhr.setRequestHeader('x-file-type', file.type);
                xhr.setRequestHeader('x-file-type', file.fileSize);
                xhr.setRequestHeader('x-file-type', file.fileName);
                xhr.send(file);
            }
        };
    });
}(jQuery));