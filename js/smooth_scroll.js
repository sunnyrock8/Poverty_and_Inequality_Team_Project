$(document).ready(function () {
  // Add smooth scrolling to all links
  $('a').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

const sectionNames = [
  'header',
  'aboutus',
  'ourgoal',
  'methods-to-acheive-our-goal',
  'ngos',
];

const sec1 = $('#header').offset().top - 50;
const sec2 = $('#aboutus').offset().top - 50;
const sec3 = $('#ourgoal').offset().top - 50;
const sec4 = $('#methods-to-acheive-our-goal').offset().top - 50;
const sec5 = $('#ngos').offset().top - 50;

const sections = [sec1, sec2, sec3, sec4, sec5];

$(window).scroll(function () {
  const windscroll = $(window).scrollTop();
  let i = 0;
  for (const section of sections) {
    if (windscroll >= section) {
      for (let j = 0; j < sectionNames.length; j++) {
        document
          .querySelectorAll('.header__navigation-item')
          .forEach((link) => {
            link.classList.remove('header__navigation-item--active');
          });
      }
      document
        .querySelector(`.header__navigation-item[href="#${sectionNames[i]}"]`)
        .classList.add('header__navigation-item--active');
    }

    i++;
  }
});
