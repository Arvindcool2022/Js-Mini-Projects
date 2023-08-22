const text = document.querySelector('[data-random-effect]');

text.addEventListener('mouseover', animateText /*, { once: true }*/);

function animateText(e) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let count = 0;
  let animation = setInterval(() => {
    console.log(count);
    e.target.innerText = e.target.innerText
      .split('')
      .map((letter, index) => {
        if (e.target.dataset.randomEffect[index] === ' ') return ' ';

        if (index < count) return e.target.dataset.randomEffect[index];

        return letters[Math.floor(Math.random() * 26)];
      })
      .join('');
    if (count >= e.target.dataset.randomEffect.length) clearInterval(animation);

    count += 1 / 10;
  }, 30);
}

//# ==========================
