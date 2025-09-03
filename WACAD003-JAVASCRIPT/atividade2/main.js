const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const overlay = document.querySelector('.overlay');
const btn = document.querySelector('button');

const imageFilenames = [
  'pic1.jpg',
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpg',
  'pic5.jpg'
];

const altTexts = {
  'pic1.jpg': 'Closeup of a blue human eye',
  'pic2.jpg': 'Abstract pattern painting',
  'pic3.jpg': 'Violet and white flowers',
  'pic4.jpg': 'Egyptian wall painting',
  'pic5.jpg': 'Yellow butterfly on a leaf'
};

// Loop de thumbnails
imageFilenames.forEach(filename => {
  const newImage = document.createElement('img');
  newImage.src = `images/${filename}`;
  newImage.alt = altTexts[filename];
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImg.src = newImage.src;
    displayedImg.alt = newImage.alt;
  });
});

// Darken / Lighten
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
