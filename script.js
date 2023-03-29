// const catalogElement = document.querySelector('#menu');
// catalogElement.addEventListener('click', loadCatalogPopup);

// function loadCatalogPopup() {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', 'elements/popups/branches.php', true);

//   xhr.onload = function() {
//     if (xhr.status === 200) {
//       const overlay = document.createElement('div');
//       overlay.classList.add('overlay');

//       const content = document.createElement('div');
//       content.classList.add('popup-right');

//       const close = document.createElement('div');
//       close.classList.add('popup-close');

//       content.innerHTML = xhr.responseText;
//       content.appendChild(close);

//       overlay.appendChild(content);
//       document.body.appendChild(overlay);

//       close.addEventListener('click', function() {
//         overlay.remove();
//       });
//     }
//   };
//   xhr.send();
// }



// const alert = document.querySelector('#alert');
// alert.addEventListener('click', throwAlert);

// function throwAlert(){
//   const alert = document.createElement('div');
//   alert.classList.add('alert');
//   document.body.appendChild(alert);

//   setTimeout(function() {
//     // alert.remove();
//     alert.classList.add('show');
//   }, 2000);
// }

// $(document).ready(function () {
//     $("#popup").click(function () {
//         $(".footer").animate({
//             opacity: '0.5'
//         });
//     });
// });

const mainContainer = $("#main");
const url = "pages/home.php";

$.get(url, function (data) {
  mainContainer.html(data);
}).fail(function () {
  console.error("Произошла ошибка при загрузке данных");
});

var lastScrollTop = 0;
var isHide = false;
var fixedTop = $('.fixed-top');
var fixedBottom = $('.fixed-bottom');
var height = fixedTop.height();

$(window).scroll(function() {
    var currentScrollTop = $(this).scrollTop();
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 800) {
        if (!isHide) {
            fixedTop.animate({
                top: -fixedTop.height() + 'px'
            }, 300);

            fixedBottom.animate({
              bottom: -fixedBottom.height() + 'px'
          }, 300);
            isHide = true;
        } 
    } else {
        if (isHide) {
          fixedTop.animate({
              top: '0px'
          }, 300);

          fixedBottom.animate({
            bottom: '0px'
        }, 300);
          isHide = false;
      } 
    }

    lastScrollTop = currentScrollTop;
});