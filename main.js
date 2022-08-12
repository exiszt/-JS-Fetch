function api () {
    let primerItem = document.getElementById("cantidadPreguntas").value;
    let segundoItem = document.getElementById("dificultadPreguntas").value;
    let tercerItem = document.getElementById("categoria").value;

    sessionStorage.setItem("primerItem", primerItem);
    sessionStorage.setItem("segundoItem", segundoItem);
    sessionStorage.setItem("tercerItem", tercerItem);
    location.href = "juego.html";
  }