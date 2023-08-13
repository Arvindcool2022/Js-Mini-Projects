const leftChevron = document.querySelector('.Carousel .chevron.left');
const rightChevron = document.querySelector('.Carousel .chevron.right');
const sliderContainer = document.querySelector('.Carousel .slider');
const images = document.querySelectorAll('.Carousel .image');
const bottom = document.querySelector('.Carousel .bottom');
carouselNavigator();

function carouselNavigator() {
  let imageWidth = sliderContainer.clientWidth;
  let numImages = images.length;
  let position = 0;
  let slideNumber = 0;

  rightChevron.addEventListener('click', () => {
    if (position === -(imageWidth * (numImages - 1))) {
      position = 0;
    } else {
      position -= imageWidth;
    }
    sliderContainer.style.transform = `translateX(${position}px)`;

    buttonIndicator(position);
  });

  leftChevron.addEventListener('click', () => {
    if (position === 0) {
      position = -(imageWidth * (numImages - 1));
    } else {
      position += imageWidth;
    }

    sliderContainer.style.transform = `translateX(${position}px)`;

    buttonIndicator(position);
  });

  function buttonIndicator(p) {
    resetBtnBg();
    slideNumber = -(p / imageWidth);
    console.log(slideNumber);
    buttons[slideNumber].style.backgroundColor = 'white';
  }
}

// <button class="btn" data-position="3"></button>

images.forEach(() => {
  const div = document.createElement('div');
  div.className = 'btn';
  bottom.appendChild(div);
});

const buttons = document.querySelectorAll('.btn');
buttons[0].style.backgroundColor = 'white';

function resetBtnBg() {
  buttons.forEach(btn => {
    btn.style.backgroundColor = 'transparent';
  });
}

buttons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    sliderContainer.style.transform = `translateX(-${i * 800}px)`;
    resetBtnBg();
    buttons[i].style.backgroundColor = 'white';
  });
});
