// 1. CAPTURANDO AS REFERÊNCIAS DO HTML
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. TEXTOS EM PORTUGUÊS (BR) - Unidades: °C e kg
const storyPT = "Para assar a sobremesa perfeita, o forno precisava atingir 177°C. Enquanto isso, :insertx: preparava a bancada. Durante o preparo da receita, :inserty:, o que fez com que :insertz:. No fim do dia, o degustador provou o prato feito com 6 kg de chocolate puro e rasgou elogios.";
const insertX_PT = ['o chef executivo', 'a confeiteira principal', 'o ajudante de cozinha'];
const insertY_PT = ['adicionou uma pitada extra de essência de baunilha', 'misturou delicadamente as claras em neve', 'peneirou o cacau em pó sobre a massa'];
const insertZ_PT = ['o aroma tomasse conta de todo o restaurante', 'a textura ficasse perfeitamente aveludada', 'a sobremesa ganhasse um brilho espetacular'];

// 3. TEXTOS EM INGLÊS (US) - Unidades: Fahrenheit e Pounds
const storyEN = "To bake the perfect dessert, the oven needed to reach 350 fahrenheit. Meanwhile, :insertx: was preparing the counter. During the recipe preparation, :inserty:, which caused :insertz:. At the end of the class, the taster tried the dish made with 14 pounds of pure chocolate and showered it with praise.";
const insertX_EN = ['the executive chef', 'the head baker', 'the kitchen assistant'];
const insertY_EN = ['added an extra pinch of vanilla extract', 'gently folded the egg whites', 'sifted cocoa powder over the batter'];
const insertZ_EN = ['the aroma to fill the entire restaurant', 'the texture to become perfectly velvety', 'the dessert to get a spectacular shine'];

// 4. EVENT LISTENER E FUNÇÃO
randomize.addEventListener('click', result);

function result() {
  let newStory, xItem, yItem, zItem, targetName;

  // Seleção de idioma e unidades com base na opção marcada
  if (document.getElementById("br").checked) {
    newStory = storyPT;
    xItem = randomValueFromArray(insertX_PT);
    yItem = randomValueFromArray(insertY_PT);
    zItem = randomValueFromArray(insertZ_PT);
    targetName = 'o degustador';
  } else {
    newStory = storyEN;
    xItem = randomValueFromArray(insertX_EN);
    yItem = randomValueFromArray(insertY_EN);
    zItem = randomValueFromArray(insertZ_EN);
    targetName = 'the taster';
  }

  // Substituição dos placeholders
  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Substituição do nome personalizado
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace(targetName, name);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}