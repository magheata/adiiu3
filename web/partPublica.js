/* global Highcharts */

var acumCantidad;
var acumPelisString;
var p1;
var p2;
var p3;

var acumPP;
var ppactores;
var actoresFallecidos;
var actoresVivos;
var menoresDe30;
var entre30y60;
var mayoresDe60;
var pppelis;

$(document).ready(function () {
    acumCantidad = 0;
    acumPelisString = 0;
    acumPP = 0;
    actoresFallecidos = 0;
    actoresVivos = 0;
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
    getMoviesAndActors();
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

function pintarGrafica2() {
    if ((acumCantidad === 3)) {
        $('#espera').empty();
        pie();
    }
}

function getMoviesAndActors() {
    mayoresDe60 = 0;
    entre30y60 = 0;
    menoresDe30 = 0;
    result1 = sessionStorage.getItem("actoresPrincipales");
    result2 = sessionStorage.getItem("cantidadPeliculasActores");
    ppactores = [];
    if (result1 === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=personas",
            success: function (result1) {
                sessionStorage.setItem("actoresPrincipales", result1);
                //String to array
                result1 = result1.split(",");
                for (var i = 0; i < result1.length; i++) {
                    var infoActor = result1[i].split(";");
                    var nombreActor = infoActor[0].substring(infoActor[0].indexOf("name") + 8, infoActor[0].length - 2);
                    var fechaNacimiento = parseInt(infoActor[3].substring(infoActor[3].indexOf("dateOfBirth") + 15, infoActor[3].length - 2));
                    var fechaMuerte = parseInt(infoActor[4].substring(infoActor[4].indexOf("dateOfDecease") + 17, infoActor[4].length - 2));
                    var edad = fechaMuerte - fechaNacimiento;
                    if (edad < 30) {
                        menoresDe30++;
                    } else if ((30 <= edad) && (edad < 50)) {
                        entre30y60++;
                    } else {
                        mayoresDe60++;
                    }
                    ppactores.push(nombreActor);
                }
                acumPP++;
            }});
    } else {
        //String to array
        result1 = result1.split(",");
        for (var i = 0; i < result1.length; i++) {
            var infoActor = result1[i].split(";");
            var nombreActor = infoActor[0].substring(infoActor[0].indexOf("name") + 8, infoActor[0].length - 2);
            var fechaNacimiento = parseInt(infoActor[3].substring(infoActor[3].indexOf("dateOfBirth") + 15, infoActor[3].length - 2));
            var fechaMuerte = parseInt(infoActor[4].substring(infoActor[4].indexOf("dateOfDecease") + 17, infoActor[4].length - 2));
            var edad = fechaMuerte - fechaNacimiento;
            if (edad < 30) {
                menoresDe30++;
                    } else if ((30 <= edad) && (edad < 50)) {
                entre30y60++;
            } else {
                mayoresDe60++;
            }
            ppactores.push(nombreActor);
        }
        acumPP++;
    }
    if (result2 === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=pelis",
            success: function (result2) {
                sessionStorage.setItem("cantidadPeliculasActores", result2);
                //String to array
                result2 = result2.replace('[', "");
                result2 = result2.replace(']', "");
                result2 = result2.replace('\r\n', "");
                result2 = result2.split(', ').map(function (item) {
                    return parseInt(item, 10);
                });
                pppelis = result2;
                acumPP++;
            }});
    } else {
        result2 = result2.replace('[', "");
        result2 = result2.replace(']', "");
        result2 = result2.replace('\r\n', "");
        result2 = result2.split(', ').map(function (item) {
            return parseInt(item, 10);
        });
        ;
        pppelis = result2;
        acumPP++;
    }
    pintarGrafica2();
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
        credits: {
            enabled: false
        },
        series: [{
                name: 'Edades',
                colorByPoint: true,
                data: [{
                        name: '< 20',
                        y: menoresDe30,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'entre 20 y 45',
                        y: entre30y60
                    }, {
                        name: '> 45',
                        y: mayoresDe60
                    }]
            }]
    });

    Highcharts.chart('containerBarras', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Películas por persona'
        },
        xAxis: {
            categories: ppactores
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Películas'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
                type: 'column',
                colorByPoint: true,
                name: 'Películas',
                data: pppelis,
                showInLegend: false
            }]
    });
}

$("#btnLogin").click(function (event) {

    //Fetch form to apply custom Bootstrap validation
    var form = $("#formLogin");

    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    form.addClass('was-validated');
});