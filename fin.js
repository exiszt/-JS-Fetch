let nombreUsuario = document.getElementById('nombreUsuario');
let botonGuardarPuntaje = document.getElementById('botonGuardarPuntaje');
let puntajeFinal = document.getElementById('puntajeFinal');
let puntajeReciente = localStorage.getItem('puntajeReciente');
let listaPuntajes = JSON.parse(localStorage.getItem("listaPuntajes")) || [];
let maxPuntajes = 5;

puntajeFinal.innerText = puntajeReciente;

nombreUsuario.addEventListener('input', () => {
    botonGuardarPuntaje.disabled = nombreUsuario.value.length === 0;
});
guardarPuntaje = (e) => {
    e.preventDefault();

    let puntaje = {
        puntaje: puntajeReciente,
        nombre: nombreUsuario.value
    };
    
    listaPuntajes.push(puntaje);
    listaPuntajes.sort( (a,b) => b.puntaje - a.puntaje);
    listaPuntajes.splice(5);
    localStorage.setItem("listaPuntajes", JSON.stringify(listaPuntajes));
    window.location.assign("index.html");
    console.log(listaPuntajes);
};