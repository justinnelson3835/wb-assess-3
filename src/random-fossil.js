import axios from 'axios';

const getRandomFossilBtn = document.getElementById('get-random-fossil');
const randomFossilImage = document.getElementById('random-fossil-image');
const randomFossilName = document.getElementById('random-fossil-name');

getRandomFossilBtn.addEventListener('click', () => {
  
  axios.get('/random-fossil.json')
    .then((response) => {
      
      const { name, img } = response.data;

      randomFossilImage.innerHTML = `<img src="${img}" alt="${name}">`;
      randomFossilName.innerText = name;
    });
    
});

  