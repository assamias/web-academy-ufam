const displayedImg = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 1. Loop para criar as 5 miniaturas */
for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement('img');
  const imagePath = `images/pic${i}.png`;
  
  newImage.setAttribute('src', imagePath);
  thumbBar.appendChild(newImage);

  /* 2. Evento para trocar a imagem principal ao clicar na miniatura */
  newImage.addEventListener('click', function(e) {
    displayedImg.setAttribute('src', e.target.getAttribute('src'));
  });
}

/* 3. Evento do botão para escurecer / clarear */
btn.addEventListener('click', function() {
  const btnClass = btn.getAttribute('class');

  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});