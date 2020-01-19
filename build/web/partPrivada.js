var pelisTipo1Done;
var pelisTipo2Done;
var pelisTipo3Done;

$(document).ready(function () {
    if(sessionStorage.getItem("hasAccess") !== "true"){
        $("#pageContent").empty();
        $("#pageContent").append('<div class="card" style="margin: 30px"><div class="card-body">Debes loguearte para acceder a esta página</div></div>');
    }
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
    getMovieInfoFromAPI("peliculasTipo1", "peliculasInfoTipo1", "type1movies", pelisTipo1Done);
}

function getMoviesRatingBetween5And7() {
    result = sessionStorage.getItem("peliculasTipo2");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=6-8",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo2", result);
            }});
    }
    pelisTipo2Done = pelisTipo2Done + 1;
    getMovieInfoFromAPI("peliculasTipo2", "peliculasInfoTipo2", "type2movies", pelisTipo2Done);
}

function getMoviesRatingOver7() {
    result = sessionStorage.getItem("peliculasTipo3");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=9-10",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo3", result);
            }});
    }
    pelisTipo3Done = pelisTipo3Done + 1;
    getMovieInfoFromAPI("peliculasTipo3", "peliculasInfoTipo3", "type3movies", pelisTipo3Done);
}

function getMovieInformationType1() {
    pelisTipo1Done = 0;
    var element = document.getElementById("peliCat1");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        $('.type1movies').remove();
    } else {
        element.classList.add("active");
        getMoviesRatingUnder5();
    }
}

function getMovieInformationType2() {
    pelisTipo2Done = 0;
    var element = document.getElementById("peliCat2");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        $('.type2movies').remove();
    } else {
        element.classList.add("active");
        getMoviesRatingBetween5And7();
    }
}

function getMovieInformationType3() {
    pelisTipo3Done = 0;
    var element = document.getElementById("peliCat3");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        $('.type3movies').remove();
    } else {
        element.classList.add("active");
        getMoviesRatingOver7();
    }
}

function parseAPIResponse(peliculasTipoInfo, typeMovie) {
    result = sessionStorage.getItem(peliculasTipoInfo);
    var peliculas = result.split("%");
    var movieStringList = "";
    for (i = 0; i < peliculas.length - 1; i++) {
        var peliculaActual = peliculas[i].split(",");
        var nombrePelicula = peliculaActual[0].substring(peliculaActual[0].indexOf("movieName") + 12, peliculaActual[0].length - 1);
        var fechaEstreno = peliculaActual[1].substring(peliculaActual[1].indexOf("dateOfRelease") + 16, peliculaActual[1].length - 1);
        var paisCreacion = peliculaActual[2].substring(peliculaActual[2].indexOf("country") + 10, peliculaActual[2].length - 1);
        //var actoresPelicula = peliculaActual[3].split("$");
        //for (j = 0; j < actoresPelicula.length; j++){
        //    var actorActual = actoresPelicula[j].split(";");
        //    var nombreActor = actorActual[0].substring(actorActual[0].indexOf("name") + 7, actorActual[0].length - 1);
        //    var paisNacimientoActor = actorActual[1].substring(actorActual[1].indexOf("name") + 7, actorActual[1].length - 1);
       // }
       var movieString = "<div class=\"col-lg-4 col-md-6 mb-4 " + typeMovie +"\">" +
                            "<div class=\"card h-100\">" + 
                                "<a href=\"#\"><img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"></a>" +
                                "<div class=\"card-body\">" +
                                    "<h4 class=\"card-title\">" +
                                        "<a href=\"#\">" + nombrePelicula +"</a>" +
                                    "</h4>" +
                                    "<h5>País orígen: "+ paisCreacion + "</h5>" +
                                    "<p class=\"card-text\"> Fecha estreno: "+ fechaEstreno +"</p>" +
                                "</div>" +
                                "<div class=\"card-footer\">";
        var stars = "";

        if (peliculasTipoInfo === "peliculasInfoTipo1"){
            stars = "<small class=\"text-muted\">&#9733;</small>";
        } else if (peliculasTipoInfo === "peliculasInfoTipo2"){
            stars = "<small class=\"text-muted\">&#9733; &#9733;</small>";
        } else {
            stars = "<small class=\"text-muted\">&#9733; &#9733; &#9733;</small>";
        }           
        stars= stars + "</div></div></div>";
        movieString = movieString + stars;
        movieStringList = movieStringList + movieString;    
    }
    $('#movieList').append(movieStringList);
}

function awaitData(pelisTipoDone, peliculasTipoInfo, typeMovie) {
    if (pelisTipoDone === 2) {
        parseAPIResponse(peliculasTipoInfo, typeMovie);
    }
}

function getMovieInfoFromAPI(peliculasTipoS, peliculasTipoInfo, typeMovie, pelisTipoDone) {
    peliculasTipo = sessionStorage.getItem(peliculasTipoS);
    if (sessionStorage.getItem(peliculasTipoInfo) === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo,
            success: function (result) {
                sessionStorage.setItem(peliculasTipoInfo, result);
            }});
    }
    pelisTipoDone = pelisTipoDone + 1;
    awaitData(pelisTipoDone, peliculasTipoInfo, typeMovie);
}