let div = document.querySelector('.card-container');
let package = Array();
let loadingWrapper = document.querySelector('.loading-wrapper');
let cardPackage = document.querySelector('.package-img');
let congrats = document.querySelector('.congrats');

function openPackage()
{
  document.querySelector('.package-img').removeAttribute("onclick");
  let loading = document.createElement('img');
  loading.src = 'images/loading.gif';
  loading.width = 50;
  loading.classList.add('loading-gif')
  loading.style.display = 'block';
  loading.style.margin = 'auto';
  loadingWrapper.appendChild(loading);

  cardPackage.classList.add('animation-package');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
          
fetch('https://api.pokemontcg.io/v2/cards', {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => generateCard(data))
}

function generateCard(results)
{
  for (let index = 0; index <= 9; index++)
  {
    let index = Math.floor(Math.random() * results.data.length);
    package.push(results.data[index]);
  }

  document.querySelector('.package-img').style.display = 'none';

  document.querySelector('.loading-gif').remove();

  package.forEach(element => {
    let img = document.createElement('img');
    img.src = element.images.small;
    img.width = 200;
    img.style.marginBottom = '10px';
    img.style.marginRight = '10px';
    img.classList.add('cards-animation-package');
    div.appendChild(img);
  });

  setTimeout(() => {congrats.src = 'images/congrats.gif'; },1000);


  setTimeout(() => {congrats.src = ''; },2300);
}