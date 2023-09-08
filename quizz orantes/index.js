const regresarButton = document.querySelector('.regresar')
regresarButton.textContent = '<'

const quizz = document.querySelector('.quizz')

let preguntaActual = 0

const preguntas = [
  `<p id="pregunta" data-respuesta="7">¿Cuál es la nota mínima para aprobar un módulo?</p>
  <ul id="respuestas">
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Reparar computadoras">¿Qué se enseña en el modulo de mantenimiento de hardware?</p>
  <ul id="respuestas">
    <li>Instalar aplicaciones</li>
    <li>Reparar computadoras</li>
    <li>Instalar sistemas eléctricos</li>
    <li>Redes</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Prof. Roberto Arias">¿Quién es el coordinador de ITSI?</p>
  <ul id="respuestas">
    <li>Ing. Marta Labor</li>
    <li>Prof. Wilson Hernández</li>
    <li>Prof. Roberto Arias</li>
    <li>Prof. Nicolás Trejo</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Coronel Sanders (KFC)">¿A que personaje se parece el Prof. Roberto Arturo Arias?</p>
  <ul id="respuestas">
    <li>Darth Vader</li>
    <li>Coronel Sanders (KFC)</li>
    <li>Chewbacca</li>
    <li>8Stan Lee</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="HTML">¿Cuál no es un lenguaje de programación?</p>
  <ul id="respuestas">
    <li>Python</li>
    <li>JavaScript</li>
    <li>Java</li>
    <li>HTML</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="20">¿Cuántos modulos se ven a lo largo de los 3 años?</p>
  <ul id="respuestas">
    <li>8</li>
    <li>16</li>
    <li>20</li>
    <li>18</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="5">¿Cuántos docentes son en el área técnica?</p>
  <ul id="respuestas">
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="3">¿Cuántas secciones son en primer año?</p>
  <ul id="respuestas">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Si">¿El cosplay es parte del bachillerato?</p>
  <ul id="respuestas">
    <li>Si</li>
    <li>No</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Crear un negocio">¿Qué es el emprendedurismo?</p>
  <ul id="respuestas">
    <li>Hacer manualidades</li>
    <li>Crear un negocio</li>
    <li>Vestirse de personajes</li>
    <li>Evadir impuestos</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="No">¿Es lo mismo ingles técnico e ingles?</p>
  <ul id="respuestas">
    <li>No</li>
    <li>Si</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Tecnología de la información">¿Qué significa TI?</p>
  <ul id="respuestas">
    <li>Tecnología de la información</li>
    <li>Tecnologías de la Información y Comunicación</li>
    <li>Information Technology</li>
    <li>Tecnología Avanzada</li>
  </ul>`,
  `<p id="pregunta" data-respuesta="Información que se almacena en un sistema informático">¿Qué es una base de datos?</p>
  <ul id="respuestas">
    <li>Información que se almacena en un sistema informático</li>
    <li>Es una carpeta en la computadora</li>
    <li>Programa de procesamiento de textos</li>
    <li>Un juego de computadora</li>
  </ul>`
]

quizz.innerHTML = preguntas[preguntaActual]
runQuizz()

function acierto (){
  preguntaActual++
  if (preguntaActual == preguntas.length) {
    alert('¡Felicidades, completaste el Quizz! 🎉')
    document.getElementById('fin').click()
  }
  quizz.innerHTML = preguntas[preguntaActual]
  runQuizz()
}

function fallo(){
  preguntaActual = 0
  quizz.innerHTML = preguntas[preguntaActual]
  runQuizz()
}

function runQuizz(){
  document.getElementById('respuestas').addEventListener('click', e => {
    if (e.target.nodeName == 'LI') {
      if (document.getElementById('pregunta').dataset.respuesta == e.target.textContent) {
        alert('Correcto!')
        acierto()
      } else {
        alert('Fallaste. Vuelve a intentarlo!')
        fallo()
      }
    }
  })
}