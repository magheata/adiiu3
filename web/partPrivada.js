var pelisTipo1Done;
var pelisTipo2Done;
var pelisTipo3Done;

$(document).ready(function () {
    pelisTipo2Done = 0;
    pelisTipo3Done = 0;
});

function getMoviesRatingUnder5() {
    result = sessionStorage.getItem("peliculasTipo1");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=0-5",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo1", result);
            }});
    }
    pelisTipo1Done = pelisTipo1Done + 1;
    getMovieInfoFromAPI();
}

function getMoviesRatingBetween5And7() {
    result = sessionStorage.getItem("peliculasTipo2");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=6-8",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo2", result);
            }});
    }
}

function getMoviesRatingOver7() {
    result = sessionStorage.getItem("peliculasTipo3");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=9-10",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo3", result);
            }});
    }
}

function getMovieInformationType1() {
    pelisTipo1Done = 0;
    var element = document.getElementById("peliCat1");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    } else {
        element.classList.add("active");
        getMoviesRatingUnder5();
    }
}

function parseAPIResponse() {
    result = sessionStorage.getItem("peliculasInfoTipo1");
    var peliculas = result.split("%");
    for (i = 0; i < peliculas.length; i++) {
        var peliculaActual = peliculas[i].split(",");
        var nombrePelicula = peliculaActual[0];
        var fechaEstreno = peliculaActual[1];
        var paisCreacion = peliculaActual[2];
        var actoresPelicula = peliculaActual[3];
    }
}

function awaitData() {
    if (pelisTipo1Done === 2) {
        parseAPIResponse();
    }
}

function getMovieInfoFromAPI() {
    peliculasTipo1 = sessionStorage.getItem("peliculasTipo1");
    if (sessionStorage.getItem("peliculasInfoTipo1") === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo1,
            success: function (result) {
                sessionStorage.setItem("peliculasInfoTipo1", result);
            }});
    }
    pelisTipo1Done = pelisTipo1Done + 1;
    awaitData();
}

function getMovieInformationType2() {
    var element = document.getElementById("peliCat2");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    } else {
        element.classList.add("active");
        getMoviesRatingBetween5And7();
        result = sessionStorage.getItem("peliculasInfoTipo2");
        if (result === null) {
            peliculasTipo2 = sessionStorage.getItem("peliculasTipo2");
            $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo2,
                success: function (result) {
                    sessionStorage.setItem("peliculasInfoTipo2", result);
                }});
        }
    }
}

function getMovieInformationType3() {
    var element = document.getElementById("peliCat3");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    } else {
        element.classList.add("active");
        getMoviesRatingOver7();
        result = sessionStorage.getItem("peliculasInfoTipo3");
        if (result === null) {
            peliculasTipo3 = sessionStorage.getItem("peliculasTipo3");
            $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo3,
                success: function (result) {
                    sessionStorage.setItem("peliculasInfoTipo3", result);
                }});
        }
    }
}
