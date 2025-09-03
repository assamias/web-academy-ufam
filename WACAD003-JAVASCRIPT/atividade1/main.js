// main.js — versão corrigida
const customName = document.getElementById('customName');
const randomize = document.getElementById('randomize');
const story = document.getElementById('story');

function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const storyText = 'Na noite decisiva em :insertx:, a torcida vibrava quando o time entrou em campo. ' +
  'De repente, :inserty: pegou a bola e encontrou :insertz:. O estádio inteiro explodiu em emoção. ' +
  'Bob disse que a temperatura era de 94 fahrenheit e que a taça pesava 300 libras. ' +
  'No fim, :insertx: levantou a Champions League diante da multidão.';

const insertX = ['Madrid', 'Londres', 'Paris', 'Milão', 'Istambul'];
const insertY = ['um craque inesperado', 'o técnico nervoso', 'o goleiro heróico'];
const insertZ = ['um gol de bicicleta', 'um pênalti salvador', 'uma virada histórica'];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // substituir todas as ocorrências de cada placeholder
  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

  // substituir todas as ocorrências de 'Bob' se houver nome personalizado
  if (customName.value.trim() !== '') {
    const name = customName.value.trim();
    newStory = newStory.replace(/Bob/g, name);
  }

  // conversões UK
  if (document.getElementById('uk').checked) {
    const weightInPounds = 300;
    const temperatureInF = 94;

    const weightInStone = Math.round(weightInPounds / 14) + ' stone';
    const temperatureInC = Math.round((temperatureInF - 32) * 5 / 9) + ' centigrade';

    newStory = newStory.replace(/300 libras/g, weightInStone);
    newStory = newStory.replace(/94 fahrenheit/g, temperatureInC);
  }

  story.textContent = newStory;
}
    