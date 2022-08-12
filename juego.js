let question = document.getElementById("question")
let alternativas = Array.from(document.getElementsByClassName("texto-eleccion"))
let textoPuntaje = document.getElementById("puntaje")
let textoProgreso = document.getElementById("textoProgreso")
let spinner = document.getElementById("spinner")
let tablero = document.getElementById("tablero")
let preguntaActual = {}
let aceptarRespuestas = false
let puntaje = 0
let contadorPreguntas = 0
let preguntasDisponibles = []
let tiempoRestante = document.querySelector(".tiempoRestante")
let conteo = 11
let cuentaRegresiva

// Contador
let mostrarReloj = () => {
    cuentaRegresiva = setInterval(() => {
      conteo--
      tiempoRestante.innerHTML = `${conteo} seg/s`
      if (conteo == 0) {
        clearInterval(cuentaRegresiva)
        obtenerPregunta()
      }
    }, 1000)
  }
    clearInterval(cuentaRegresiva)

let preguntas = []
let cantidad = 0
let dificultad = 'medium'
let categoria = '9'


function llamarItems () {
    let primerItem = sessionStorage.getItem("primerItem")
    let segundoItem = sessionStorage.getItem("segundoItem")
    let tercerItem = sessionStorage.getItem("tercerItem")
    cantidad = primerItem
    dificultad = segundoItem
    categoria = tercerItem
  }
  
llamarItems()

fetch(
    'https://opentdb.com/api.php?amount='+cantidad+'&category='+categoria+'&difficulty='+dificultad+'&type=multiple'
)
    .then((res) => {
        return res.json()
    })
    .then((preguntasTraidas) => {
        preguntas = preguntasTraidas.results.map((preguntaCargada) => {
            let preguntaSeteada = {
                question: preguntaCargada.question,
            }

            let alternativasRespuesta = [...preguntaCargada.incorrect_answers]
            preguntaSeteada.answer = Math.floor(Math.random() * 4) + 1
            alternativasRespuesta.splice(
                preguntaSeteada.answer - 1,
                0,
                preguntaCargada.correct_answer
            )

            alternativasRespuesta.forEach((eleccion, index) => {
                preguntaSeteada['eleccion' + (index + 1)] = eleccion
            })

            return preguntaSeteada
        })
        comenzar()
    })
    .catch((err) => {
        console.error(err)
    })

let sumarPuntos = 10
let maxPreguntas = cantidad

comenzar = () => {
    puntaje = 0
    contadorPreguntas = 0
    preguntasDisponibles = [...preguntas]

    clearInterval(cuentaRegresiva)
    conteo = 11
    mostrarReloj()

    obtenerPregunta()
    tablero.classList.remove("hidden")
    spinner.classList.add("hidden")
}

obtenerPregunta = () => {
    if (preguntasDisponibles.length == 0 || contadorPreguntas >= maxPreguntas) {
        //need above because the available questions may be more than no of questions you've set 
        localStorage.setItem("puntajeReciente", puntaje)
        return window.location.assign("fin.html")
    }

    contadorPreguntas++

    clearInterval(cuentaRegresiva)
    conteo = 11
    mostrarReloj()

    textoProgreso.innerText = `Pregunta: ${contadorPreguntas}/${maxPreguntas}`
    textoPuntaje.innerText = puntaje

    let indicePregunta = Math.floor(Math.random() * preguntasDisponibles.length)
    preguntaActual = preguntasDisponibles[indicePregunta]

    if(preguntaActual.question.includes("&quot;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&quot;", "\"")}

    if(preguntaActual.question.includes("&#039;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&#039;", "\'")}  

    if(preguntaActual.question.includes("&Idquo;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&Idquo;", "\"")}

    if(preguntaActual.question.includes("&rsquo;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&rsquo;", "\'")}  

    if(preguntaActual.question.includes("&rdquo;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&rdquo;", "\"")}

    if(preguntaActual.question.includes("&hellip;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&hellip;", "...")}

    if(preguntaActual.question.includes("&amp;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&amp;", "&")}
    
    if(preguntaActual.question.includes("&shy;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&shy;", "-")}

    if(preguntaActual.question.includes("&oacute;")){
        preguntaActual.question = preguntaActual.question.replaceAll("&oacute;", "Ó")}
    
    question.innerText = preguntaActual.question


    alternativas.forEach(eleccion => {
        let numero = eleccion.dataset['number']
        eleccion.innerText = preguntaActual['eleccion' + numero]

        if(eleccion.innerText.includes("&quot;")){
            eleccion.innerText = eleccion.innerText.replaceAll("&quot;", "\"")}

        if(eleccion.innerText.includes("&#039;")){
            eleccion.innerText = preguntaActual.question.replaceAll("&#039;", "\'")}  

        if(eleccion.innerText.includes("&Idquo;")){
            eleccion.innerText = preguntaActual.question.replaceAll("&Idquo;", "\"")}

        if(eleccion.innerText.includes("&rsquo;")){
            eleccion.innerText = preguntaActual.question.replaceAll("&rsquo;", "\'")}  

        if(eleccion.innerText.includes("&rdquo;")){
            eleccion.innerText = preguntaActual.question.replaceAll("&rdquo;", "\"")}

        if(eleccion.innerText.includes("&hellip;")){
            eleccion.innerText = preguntaActual.question.replaceAll("&hellip;", "...")}

        if(eleccion.innerText.includes("&amp;")){
            eleccion.innerText = eleccion.innerText.replaceAll("&amp;", "&")}

        if(eleccion.innerText.includes("&shy;")){
            eleccion.innerText = eleccion.innerText.replaceAll("&shy;", "-")}

        if(eleccion.innerText.includes("&oacute;")){
            eleccion.innerText = eleccion.innerText.replaceAll("&shy;", "Ó")}
    
    })
    preguntasDisponibles.splice(indicePregunta, 1)
    aceptarRespuestas = true
}
alternativas.forEach(eleccion => {
    eleccion.addEventListener('click', e => {
        if (!aceptarRespuestas) return
        aceptarRespuestas = false
        let opcionElegida = e.target
        let respuestaElegida = opcionElegida.dataset['number']

        let verificar = respuestaElegida == preguntaActual.answer ? 'correct' : 'incorrect'
        opcionElegida.parentElement.classList.add(verificar)
        if (verificar == 'correct') {
            puntaje += sumarPuntos
        }
        setTimeout(() => {
            opcionElegida.parentElement.classList.remove(verificar)
            obtenerPregunta()
        }, 500)
    })
})