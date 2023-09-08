const regresarButton = document.querySelector('.regresar')
regresarButton.textContent = '<'

const numeroDeCarta = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // Mientras queden elementos a mezclar...
  while (0 !== currentIndex) {

    // Seleccionar un elemento sin mezclar...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E intercambiarlo con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.getElementById('button-start').addEventListener('click', () => {
  document.querySelector('.start-wilson').classList.add('disable-start')
  document.querySelector('.game-wilson').classList.add('active-game')
})

//document.getElementById('button-start').click()

const cartas = shuffle([...shuffle(numeroDeCarta), ...shuffle(numeroDeCarta)])

let cartasLayout = cartas.map((carta, i) => (
  `
  <div class="carta" id="c${i+1}" data-carta-id="${carta}">
    <img src="./Recursos/Image/Cards/caratula.png" alt="carta" class="front-card">
    <img src="./Recursos/Image/Cards/carta (${carta}).png" alt="carta" class="back-card">
  </div>
  `
))

const gameContainer = document.querySelector('.game-container')
cartasLayout.forEach(el => {
  gameContainer.innerHTML += el
})

let cartasActivas = {
  carta1: {
    elementId: 0,
    cartaId: 0
  },
  carta2: {
    elementId: 0,
    cartaId: 0
  },
  count: 0
}
let fallos = 0
const fallosEl = document.querySelector('.fallos')
fallosEl.innerHTML = fallos

const parejasRestantesEl = document.querySelector('.parejas-restantes')
let parejasRestantes = 9
parejasRestantesEl.innerHTML = parejasRestantes

gameContainer.addEventListener('click', e => {
  const carta = e.target.parentNode
  if (e.target.nodeName = 'IMG') {
    carta.classList.add('active')

    if (cartasActivas.count == 0) {
      console.log('pase por 0')
      cartasActivas.count++
      cartasActivas.carta1.elementId = carta.id
      cartasActivas.carta1.cartaId = carta.dataset.cartaId

    } else if (cartasActivas.count == 1 && cartasActivas.carta1.elementId != carta.id) {
      console.log('pase por 1')
      cartasActivas.count++
      cartasActivas.carta2.elementId = carta.id
      cartasActivas.carta2.cartaId = carta.dataset.cartaId

      if (cartasActivas.carta1.cartaId == cartasActivas.carta2.cartaId) {
        console.log('pase por match')
        parejasRestantes--
        parejasRestantesEl.innerHTML = parejasRestantes
        fallos--
        fallosEl.innerHTML = fallos
        if (parejasRestantes == 0) {
          alert('🎉🎉🎉')
          location.reload()
        }

        setTimeout(() => {
          document.querySelector(`#${cartasActivas.carta1.elementId}`).classList.add('carta-out')
          document.querySelector(`#${cartasActivas.carta2.elementId}`).classList.add('carta-out')
          cartasActivas = {
            carta1: {
              elementId: 0,
              cartaId: 0
            },
            carta2: {
              elementId: 0,
              cartaId: 0
            },
            count: 0
          }
        }, 1000)

      } else {
        console.log('pase por fail')
        fallos++
        fallosEl.innerHTML = fallos

        setTimeout(() => {
          if (fallos == 3){
            alert('Perdiste :(')
            location.reload()
          }
          document.querySelector(`#${cartasActivas.carta1.elementId}`).classList.remove('active')
          document.querySelector(`#${cartasActivas.carta2.elementId}`).classList.remove('active')
          cartasActivas = {
            carta1: {
              elementId: 0,
              cartaId: 0
            },
            carta2: {
              elementId: 0,
              cartaId: 0
            },
            count: 0
          }
        }, 1000)
      }
    }
  }
})