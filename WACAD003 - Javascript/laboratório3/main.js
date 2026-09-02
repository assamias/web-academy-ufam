// Seleciona o canvas e configura o contexto 2D
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Define altura e largura como a viewport inteira
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Funções auxiliares para gerar valores aleatórios
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera tons/intensidades apenas da cor Vermelha (variando a luminosidade)
function randomRedTone() {
  const lightness = random(25, 75); // Varia de vermelho mais escuro a mais claro
  return `hsl(0, 100%, ${lightness}%)`;
}

// Classe que representa uma partícula
class Ball {
  constructor(x, y, velX, velY, color, size, shape) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.shape = shape; // 'circle', 'square', 'triangle', ou 'heart'
  }
}

// Desenha a partícula com base na forma geométrica
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;

  if (this.shape === 'square') {
    // Quadrado
    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
  } else if (this.shape === 'triangle') {
    // Triângulo
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  } else if (this.shape === 'heart') {
    // Coração
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    // Curva da esquerda
    ctx.bezierCurveTo(
      this.x, this.y - this.size * 0.5, 
      this.x - this.size, this.y - this.size * 0.5, 
      this.x - this.size, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size, this.y + (this.size + topCurveHeight) / 2, 
      this.x, this.y + this.size, 
      this.x, this.y + this.size
    );
    // Curva da direita
    ctx.bezierCurveTo(
      this.x, this.y + this.size, 
      this.x + this.size, this.y + (this.size + topCurveHeight) / 2, 
      this.x + this.size, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size, this.y - this.size * 0.5, 
      this.x, this.y - this.size * 0.5, 
      this.x, this.y + topCurveHeight
    );
    ctx.fill();
  } else {
    // Círculo (padrão)
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
};

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
    this.velX = -this.velX;
  }
  if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
    this.velY = -this.velY;
  }
  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function(balls) {
  for (const ball of balls) {
    if (this !== ball) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + ball.size) {
        // Altera para outro tom de vermelho ao colidir
        ball.color = this.color = randomRedTone();
      }
    }
  }
};

// Cria um array para armazenar as partículas
const balls = [];

// Lista com todas as formas
const shapes = ['circle', 'square', 'triangle', 'heart'];

// Cria 25 partículas com formas e tons de vermelho aleatórios
while (balls.length < 25) {
  const size = random(10, 20);
  const randomShape = shapes[random(0, shapes.length - 1)];

  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRedTone(),
    size,
    randomShape
  );
  balls.push(ball);
}

function loop() {
  // Fundo semitransparente para efeito de rastro
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  requestAnimationFrame(loop);
}

loop();