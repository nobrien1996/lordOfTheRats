const images = document.querySelectorAll('.carousel-image');
let current = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
});

document.getElementById('prevBtn').addEventListener('click', () => {
  images[current].classList.remove('active');
  current = (current - 1 + images.length) % images.length;
  images[current].classList.add('active');
});

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 4000);