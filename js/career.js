window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // input file custom
    
    if ($('input[type="file"]').length) {
        let inputFile = $('input[type="file"]');
        inputFile.each(function(index, el) {
            $(this).change(function(event) {
                if( this.files && this.files.length > 0 ){
                    $(this).parent().addClass('file-active');
                }else{
                    $(this).parent().removeClass('file-active');
                }
            });
        });
    }
});