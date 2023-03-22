window.addEventListener('DOMContentLoaded', function() {
    'use strict';


    // $(document).on('click', '.video__video', function() {
    //     videoStart(this);
    //     stopVideos(this);
    // });

    // $('.video__video video').on('ended', function() {
    //     this.closest('.video__video').classList.remove('is-start');
    // });


    // function videoStart(trigger) {
    //     if(!trigger.classList.contains('is-start')) {
    //         trigger.classList.add('is-start');
    //         trigger.querySelector('video').play();
    //     }
    // }

    // function stopVideos(trigger) {
    //     const video = document.querySelectorAll('.video__video video');

    //     for (let i = 0; i < video.length; i++) {
    //         if(video[i].closest('.video__video') != trigger && video[i].closest('.video__video').classList.contains('is-start')) {
    //             video[i].pause();
    //             video[i].currentTime = 0;
    //             video[i].closest('.video__video').classList.remove('is-start');
    //         }
    //     }
    // }
});