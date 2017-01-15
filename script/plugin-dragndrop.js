/*global console, document, jQuery, XMLHttpRequest, upload */
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
            script: 'script/upload.php',
            clone: true
        };

        $.fn.dropfile = function (options) {
            if (options) {
                $.extend(defaults, options);
            }

            var msg = defaults.message;
            this.each(function () {
                $('<span>').addClass('msg').append(msg).appendTo(this);
                $('<div>').addClass('progress').appendTo(this);
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
                    log($(this));
                }, false);

                $('.jsp').change(function (evt) {
                    //                    alert($(this).val());
                    var files = evt.dataTransfer.files;
                    log(files);
                    upload(files, $(this), 0);
                });
            });

            /**
             * Permet de gérer les uploads de fichier One by One
             * @param {object} files [Les fichiers à uploader]
             * @param {object} area  [Dropzone sur laquelle est appelé le plugin]
             * @param {number} index [Index de l'objet files]
             */
            function upload(files, area, index) {
                var file = files[index],
                    xhr = new XMLHttpRequest(),
                    progress = area.find('.progress');

                // Evenements
                xhr.addEventListener('load', function (evt) {
                    // Convertit du texte en JSON
                    var json = jQuery.parseJSON(evt.target.responseText); // Retour JSON
                    area.removeClass('hover');

                    // Relancer un autre chargement
                    if (index < files.length - 1) {
                        upload(files, area, index + 1);
                    }
                    if (json.error) {
                        log(json.error);
                        return false;
                    }

                    area.append(json.content);
                    $('.msg').remove();
                    $('.progress').remove();
                    progress.addClass('hide');

                }, false);

                // Evenement chargement progressif
                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        var perc = evt.loaded / evt.total * 100 + '%';
                        progress.css({
                            width: perc
                        }).html(progress);
                    }
                }, false);

                xhr.open('post', defaults.script, true); // true = asynchronous
                xhr.setRequestHeader('content-type', 'multipart/form-data');
                xhr.setRequestHeader('x-file-type', file.type);
                xhr.setRequestHeader('x-file-size', file.size);
                xhr.setRequestHeader('x-file-name', file.name);
                xhr.send(file);
            }
            // Je retourne l'objet jQuery qui m'a permis de faire la fonction
            return this;
        };
    });
}(jQuery));
