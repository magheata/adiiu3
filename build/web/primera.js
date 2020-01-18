/* global Highcharts */

var acumCantidad;
var acumPelisString;
var p1;
var p2;
var p3;

$(document).ready(function () {
    acumCantidad = 0;
    acumPelisString = 0;
    pintarEspera();
    loadCacheElements();
});

function pintarEspera() {
    $('#espera').append('<img src="espera.gif"/>');
}

function loadCacheElements() {
    getMoviesRatingUnder5Count();
    getMoviesRatingBetween5And7Count();
    getMoviesRatingOver7Count();
}

function getMoviesRatingUnder5Count() {
    result = sessionStorage.getItem("cantidadPeliculas1");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=0-5",
            success: function (result) {
                sessionStorage.setItem("cantidadPeliculas1", result);
                p1 = parseInt(result);
                acumCantidad++;
            }});
    } else {
        p1 = parseInt(result);
        acumCantidad++;
    }
    pintarGrafica2();
}

function getMoviesRatingUnder5() {
    result = sessionStorage.getItem("peliculasTipo1");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=0-5",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo1", result);
            }});
    }
}

function getMoviesRatingBetween5And7Count() {
    result = sessionStorage.getItem("cantidadPeliculas2");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=6-8",
            success: function (result) {
                sessionStorage.setItem("cantidadPeliculas2", result);
                p2 = parseInt(result);
                acumCantidad++;
            }});
    } else {
        p2 = parseInt(result);
        acumCantidad++;

    }
    pintarGrafica2();
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

function getMoviesRatingOver7Count() {
    result = sessionStorage.getItem("cantidadPeliculas3");
    if (result === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=9-10",
            success: function (result) {
                sessionStorage.setItem("cantidadPeliculas3", result);
                p3 = parseInt(result);
                acumCantidad++;
            }});
    } else {
        p3 = parseInt(result);
        acumCantidad++;
    }
    pintarGrafica2();
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
    var element = document.getElementById("peliCat1");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    } else {
        element.classList.add("active");
        getMoviesRatingUnder5();
        result = sessionStorage.getItem("peliculasInfoTipo1");
        if (result === null) {
            peliculasTipo1 = sessionStorage.getItem("peliculasTipo1");
            $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo1,
                success: function (result) {
                    sessionStorage.setItem("peliculasInfoTipo1", result);
                    acumPelisString++;
                    pintarGrafica2();
                }});
        }
    }
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
                    acumPelisString++;
                    pintarGrafica2();
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
                    acumPelisString++;
                    pintarGrafica2();
                }});
        }
    }
}

function pintarGrafica2() {
    if ((acumCantidad === 3)) {
        $('#espera').empty();
        pie();
    }
}

function pie() {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Edad de las personas por conjuntos'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
                name: 'Edades',
                colorByPoint: true,
                data: [{
                        name: '< 5',
                        y: p1,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'entre 6 y 8',
                        y: p2
                    }, {
                        name: '> 8',
                        y: p3
                    }]
            }]
    });
}