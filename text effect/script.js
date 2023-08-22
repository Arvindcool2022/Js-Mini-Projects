//* Ramdom-letters effect

(function () {
  const text = document.querySelector('[data-random-effect]');

  text.addEventListener('mouseover', animateText /*, { once: true }*/);

  function animateText(e) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let count = 0;
    let animation = setInterval(() => {
      e.target.innerText = e.target.innerText
        .split('')
        .map((letter, index) => {
          if (e.target.dataset.randomEffect[index] === ' ') return ' ';

          if (index < count) return e.target.dataset.randomEffect[index];

          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');
      if (count >= e.target.dataset.randomEffect.length)
        clearInterval(animation);

      count += 1 / 3;
    }, 30);
  }
})();

//* Sparkle effect

(function () {
  let index = 0;
  let timeDelay = 1000 / 3;
  const stars = Array.from(document.querySelectorAll('.magic-star'));
  // const stars = [...document.querySelectorAll('.magic-star')];

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min * 1)) + min;

  const sparkle = star => {
    star.style.setProperty('--star-left', `${random(-10, 100)}%`);
    star.style.setProperty('--star-top', `${random(-40, 100)}%`);
    //? DOM reflow to reset the animation
    star.style.animation = 'none';
    star.offsetHeight;
    star.style.animation = '';
  };

  //# for running all the time
  // alwaysSparkle();

  function alwaysSparkle() {
    for (const star of stars) {
      setTimeout(() => {
        setInterval(() => {
          sparkle(star);
        }, 1000);
      }, index++ * timeDelay);
    }
  }
  //# for hover effect only
  sparkleOnlyOnHover();

  function sparkleOnlyOnHover() {
    let timeouts = [];
    let intervals = [];

    const container = document.querySelector('.magic');

    const startAnimation = () => {
      let index = 0;

      for (const star of stars) {
        timeouts.push(
          setTimeout(() => {
            sparkle(star);

            intervals.push(setInterval(() => sparkle(star), 1000));
          }, index++ * timeDelay)
        );
      }
    };

    const stopAnimation = () => {
      for (const t of timeouts) clearTimeout(t);
      for (const i of intervals) clearInterval(i);

      timeouts = [];
      intervals = [];
    };

    container.addEventListener('mouseenter', () => {
      startAnimation();
    });

    container.addEventListener('mouseleave', () => {
      stopAnimation();
    });
  }
})();
