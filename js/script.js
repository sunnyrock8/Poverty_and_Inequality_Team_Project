/* UTILITY FUNCTION DEFINITIONS -- START */
Element.prototype.addClass = function (className) {
  this.classList.add(className);
  return this.classList;
};

Element.prototype.removeClass = function (className) {
  this.classList.remove(className);
  return this.className;
};

Element.prototype.hasClass = function (className) {
  return this.classList.contains(className);
};
/* UTILITY FUNCTION DEFINITIONS -- END */

/* Main script */
window.onload = function () {
  document.querySelector('.loader-container').style.transition = 'opacity 0.5s';
  document.querySelector('.loader-container').style.opacity = '0';
  document.querySelector('body').style.overflowY = 'auto';
  setTimeout(() => document.querySelector('.loader-container').remove(), 500);

  const slideData = [
    {
      title: 'Beating Poverty and Inequality',
      body:
        'Poverty and inequality are some of the fundamental problems of society that must be solved in order to ensure access to resources and economic welfare across nations.',
    },
    {
      title: 'What is poverty?',
      body:
        "Poverty is the state of not having enough material possessions or income for a person's basic needs.",
    },
    {
      title: 'The link between poverty and inequality',
      body:
        'Globalization redistributed income in such a way that poorer became more poor and rich became richer and whenever this will happen, it will increase the income gaps of households and inequality will rise. Similarly, if poverty alone rises, it would also increase inequality.',
    },
  ];

  const isVideoPlaying = (video) =>
    !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );

  const isInViewport = (element) => {
    const bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  function detectSwipe(id, func, deltaMin = 90) {
    const swipe_det = {
      sX: 0,
      sY: 0,
      eX: 0,
      eY: 0,
    };
    // Directions enumeration
    const directions = Object.freeze({
      UP: 'up',
      DOWN: 'down',
      RIGHT: 'right',
      LEFT: 'left',
    });
    let direction = null;
    const el = document.getElementById(id);
    el.addEventListener(
      'touchstart',
      function (e) {
        const t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
      },
      false
    );
    el.addEventListener(
      'touchmove',
      function (e) {
        // Prevent default will stop user from scrolling, use with care
        // e.preventDefault();
        const t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
      },
      false
    );
    el.addEventListener(
      'touchend',
      function (e) {
        const deltaX = swipe_det.eX - swipe_det.sX;
        const deltaY = swipe_det.eY - swipe_det.sY;
        // Min swipe distance, you could use absolute value rather
        // than square. It just felt better for personnal use
        if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return;
        // horizontal
        if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
          direction = deltaX > 0 ? directions.RIGHT : directions.LEFT;
        // vertical
        else direction = deltaY > 0 ? directions.UP : directions.DOWN;

        direction && typeof func === 'function' && func(el, direction);

        direction = null;
      },
      false
    );
  }

  let currentSlide = 0;

  const nextSlide = () => {
    if (currentSlide + 1 === slideData.length) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    timePassed = 0;
  };

  const prevSlide = () => {
    if (currentSlide === 0) currentSlide = slideData.length - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    timePassed = 0;
  };

  const goToSlide = (toSlide) => {
    const title = document.querySelector('.header__title'),
      titleCopy = title.cloneNode(true);
    const text = document.querySelector('.header__text'),
      textCopy = text.cloneNode(true);

    title.before(titleCopy);
    title.remove();

    titleCopy.textContent = slideData[toSlide].title;
    titleCopy.addClass('fadeUp');

    text.before(textCopy);
    text.remove();

    textCopy.textContent = slideData[toSlide].body;
    textCopy.addClass('fade');

    currentSlide = toSlide;

    for (const dot of document.querySelectorAll('.header__slideshow-dot')) {
      dot.removeClass('header__slideshow-dot--active');
    }

    document
      .querySelector(`.header__slideshow-dot[data-slide="${currentSlide + 1}"]`)
      .addClass('header__slideshow-dot--active');

    timePassed = 0;
  };

  document
    .querySelector('.header__slideshow')
    .addEventListener('click', function (e) {
      if (!e.target.hasClass('header__slideshow-dot')) return;

      const toSlide = e.target.dataset.slide - 1;
      goToSlide(toSlide);
    });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      clearInterval(window.slideInterval);
      window.slideInterval = setInterval(switchSlides, 7500);
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      clearInterval(window.slideInterval);
      window.slideInterval = setInterval(switchSlides, 7500);
    } else if (
      e.key === ' ' &&
      isInViewport(document.querySelector('.methods__video')) &&
      document.querySelector('.methods__video') !== document.activeElement
    ) {
      e.preventDefault();
      if (isVideoPlaying(document.querySelector('.methods__video'))) {
        document.querySelector('.methods__video').pause();
      } else {
        document.querySelector('.methods__video').play();
      }
    }
  });

  function switchSlides() {
    nextSlide();
  }

  setTimeout(() => {
    switchSlides();
    window.slideInterval = setInterval(switchSlides, 7500);
  }, 8500);

  document
    .querySelector('.header__navigation')
    .addEventListener('click', (e) => {
      if (!e.target.hasClass('header__navigation-item')) return;

      for (const a of document.querySelectorAll('.header__navigation-item')) {
        a.removeClass('header__navigation-item--active');
      }

      e.target.addClass('header__navigation-item--active');
    });

  function onscroll() {
    checkNavigationBar();
    // checkSection();
    checkAnimations();
  }

  function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  function checkNavigationBar() {
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.header__navigation');

    const viewport = isInViewport(header);
    if (viewport) {
      navbar.style.backgroundColor = 'transparent';
      return;
    }
    navbar.style.backgroundColor = 'rgba(15, 16, 32, 0.95)';
  }

  function checkSection() {
    const sections = [
      'header',
      'aboutus',
      'ourgoal',
      'methods-to-acheive-our-goal',
    ];
    let activeSection;
    for (const section of sections) {
      if (elementInViewport2(document.querySelector(`#${section}`))) {
        activeSection = section;
      }
    }

    for (const a of document.querySelectorAll('.header__navigation-item')) {
      a.classList.remove('header__navigation-item--active');
    }
    document
      .querySelector(`.header__navigation-item[href="#${activeSection}"]`)
      .addClass('header__navigation-item--active');
  }

  function checkAnimations() {
    if (elementInViewport2(document.querySelector('.aboutus__person'))) {
      let delay = 0;
      for (const picture of document.querySelectorAll('.aboutus__person')) {
        picture.style.animationDelay = `${delay}s`;
        picture.addClass('fadeUp');
        delay++;
      }
    }

    if (elementInViewport2(document.querySelector('.aboutus__paragraph'))) {
      document.querySelector('.aboutus__paragraph').addClass('fade');
    }

    if (elementInViewport2(document.querySelector('.ourgoal__paragraph'))) {
      document.querySelector('.ourgoal__paragraph').addClass('fade');
    }

    if (elementInViewport2(document.querySelector('.ourgoals__goal'))) {
      let delay = 0;
      for (const goal of document.querySelectorAll('.ourgoals__goal')) {
        goal.style.animationDelay = `${delay}s`;
        goal.addClass('fadeUp');
        delay++;
      }
    }

    if (elementInViewport2(document.querySelector('.solutions__paragraph'))) {
      document.querySelector('.solutions__paragraph').addClass('fade');
    }

    if (
      elementInViewport2(
        document.querySelector('.methods__steps-text-container')
      )
    ) {
      let delay = 0;
      for (const step of document.querySelectorAll('.methods__step')) {
        step.addClass('fadeUp');
        step.style.animationDelay = `${delay}s`;
        delay++;
      }
    }

    if (elementInViewport2(document.querySelector('.methods__video'))) {
      document.querySelector('.methods__video').addClass('fadeUp');
    }

    if (elementInViewport2(document.querySelector('.contact__paragraph'))) {
      document.querySelector('.contact__paragraph').addClass('fade');
    }

    if (elementInViewport2(document.querySelector('.ngos__paragraph'))) {
      document.querySelector('.ngos__paragraph').addClass('fade');
    }
  }

  window.checkNavigationBar = onscroll;

  detectSwipe('header', (el, dir) => {
    if (!el.id === 'header') return;

    if (dir === 'right') prevSlide();
    else if (dir === 'left') nextSlide();
  });

  document
    .querySelector('.header__hamburger-checkbox')
    .addEventListener('click', function (e) {
      if (this.checked) {
        document.querySelector('.sidebar').style.transform = 'translateX(0)';
      } else {
        document.querySelector('.sidebar').style.transform =
          'translateX(-101%)';
      }
    });

  document
    .querySelector('.sidebar__navigation')
    .addEventListener('click', function (e) {
      if (!e.target.hasClass('sidebar__navigation-item')) return;

      document.querySelector('.header__hamburger-checkbox').click();
    });

  window.onfocus = () => {
    if (
      !window.pausedDueToBlur &&
      !isVideoPlaying(document.querySelector('.methods__video'))
    )
      return;

    document.querySelector('.methods__video').play();
    window.pausedDueToBlur = undefined;
  };

  window.onblur = () => {
    if (!isVideoPlaying(document.querySelector('.methods__video'))) return;

    document.querySelector('.methods__video').pause();

    window.pausedDueToBlur = true;
  };
};
