/* global Highcharts */

var acumCantidad;
var acumPelisString;
var p1;
var p2;
var p3;
var euTotal;
var ocTotal;
var naTotal;
var saTotal;
var afTotal;
var asTotal;
var data;
var ppactores;
var actoresFallecidos;
var actoresVivos;
var actoresFallecidosEurope;
var actoresVivosEurope;
var actoresFallecidosAmerica;
var actoresVivosAmerica;
var menoresDe30;
var entre30y60;
var mayoresDe60;
var menoresDe30Europa;
var entre30y60Europa;
var mayoresDe60Europa;
var menoresDe30America;
var entre30y60America;
var mayoresDe60America;
var pppelis;
var max;

var actorsAmerica;
var actorsEurope;
var actoresSinPais;

$(document).ready(function () {
    pintarEspera();
    acumCantidad = 0;
    acumPelisString = 0;
    acumPP = 0;
    sessionStorage.setItem("mostrarAmerica", true);
    sessionStorage.setItem("mostrarEurope", true);
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
}


function pintarGrafica2(data, ppactores, ppelis, actoresVivos, actoresFallecidos, menoresDe30, entre30y60, mayoresDe60) {
    if ((acumCantidad === 5)) {
        $('#espera').empty();
        var botones = "<h5>Seleccionar por Continente</h5>" +

                    "<button type=\"button\" class=\"btn btn-info buttonMap\" id=\"buttonNorthAmerica\" onclick=\"mostrarPorContinente(this.id)\">North America</button>" +

                    "<button type=\"button\" class=\"btn btn-info buttonMap\" id=\"buttonEurope\" onclick=\"mostrarPorContinente(this.id)\">Europe</button>";
        $('#regionBotones').append(botones);
        pie(data, ppactores, ppelis, actoresVivos, actoresFallecidos, menoresDe30, entre30y60, mayoresDe60);
    }
}

function getMoviesAndActors() {
    mayoresDe60 = 0;
    entre30y60 = 0;
    menoresDe30 = 0;
    mayoresDe60Europa = 0;
    entre30y60Europa = 0;
    menoresDe30Europa = 0;
    mayoresDe60America = 0;
    entre30y60America = 0;
    menoresDe30America = 0;
    actoresFallecidos = 0;
    actoresVivos = 0;
    actoresFallecidosEurope = 0;
    actoresVivosEurope = 0;
    actoresFallecidosAmerica = 0;
    actoresVivosAmerica = 0;
    max = 0;
    euTotal = 0;
    ocTotal = 0;
    naTotal = 0;
    saTotal = 0;
    afTotal = 0;
    asTotal = 0;
    actorsAmerica = [];
    actorsEurope = [];
    data = [];
    result1 = sessionStorage.getItem("actoresPrincipales");
    result2 = sessionStorage.getItem("cantidadPeliculasActores");
    ppactores = [];
    if (result1 === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=personas",
            success: function (result1) {
                sessionStorage.setItem("actoresPrincipales", result1);
                acumCantidad++;
                //String to array
                result1 = result1.split(",");
                for (var i = 0; i < result1.length; i++) {
                    var infoActor = result1[i].split(";");
                    var nombreActor = infoActor[0].substring(infoActor[0].indexOf("name") + 8, infoActor[0].length - 2);
                    var paisOrigen = infoActor[2].substring(infoActor[2].indexOf("countryOfBirth") + 18, infoActor[2].length - 1);
                    switch (paisOrigen) {
                        case "eu":
                            actorsEurope.push(nombreActor);
                            euTotal++;
                            break;
                        case "oc":
                            ocTotal++;
                            break;
                        case "af":
                            afTotal++;
                            break;
                        case "as":
                            asTotal++;
                            break;
                        case "na":
                            actorsAmerica.push(nombreActor);
                            naTotal++;
                            break;
                        case "sa":
                            saTotal++;
                            break;
                        default:
                            actorsAmerica.push(nombreActor);
                            naTotal++;
                            break;
                    }

                    var fechaNacimiento = parseInt(infoActor[3].substring(infoActor[3].indexOf("dateOfBirth") + 15, infoActor[3].length - 2));
                    var fechaMuerte = parseInt(infoActor[4].substring(infoActor[4].indexOf("dateOfDecease") + 17, infoActor[4].length - 2));
                    if (fechaMuerte === -1) {
                        actoresVivos++;
                        if (paisOrigen === "eu") {
                            actoresVivosEurope++;
                        } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                            actoresVivosAmerica++;
                        }
                    } else {
                        actoresFallecidos++;
                        if (paisOrigen === "eu") {
                            actoresFallecidosEurope++;
                        } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                            actoresFallecidosAmerica++;
                        }
                    }
                    var edad = fechaMuerte - fechaNacimiento;
                    if (edad < 30) {
                        menoresDe30++;
                        if (paisOrigen === "eu") {
                            menoresDe30Europa++;
                        } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                            menoresDe30America++;
                        }
                    } else if ((30 <= edad) && (edad < 50)) {
                        entre30y60++;
                        if (paisOrigen === "eu") {
                            entre30y60Europa++;
                        } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                            entre30y60America++;
                        }
                    } else {
                        mayoresDe60++;
                        if (paisOrigen === "eu") {
                            mayoresDe60Europa++;
                        } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                            mayoresDe60America++;
                        }
                    }
                    ppactores.push(nombreActor);
                }
                data = [["eu", euTotal], ["oc", ocTotal], ["af", afTotal], ["as", asTotal], ["na", naTotal], ["sa", saTotal]];
            }});
    } else {
        //String to array
        acumCantidad++;
        result1 = result1.split(",");
        for (var i = 0; i < result1.length; i++) {
            var infoActor = result1[i].split(";");
            var nombreActor = infoActor[0].substring(infoActor[0].indexOf("name") + 8, infoActor[0].length - 2);
            var paisOrigen = infoActor[2].substring(infoActor[2].indexOf("countryOfBirth") + 18, infoActor[2].length - 1);
            switch (paisOrigen) {
                case "eu":
                    actorsEurope.push(nombreActor);
                    euTotal++;
                    break;
                case "oc":
                    ocTotal++;
                    break;
                case "af":
                    afTotal++;
                    break;
                case "as":
                    asTotal++;
                    break;
                case "na":
                    actorsAmerica.push(nombreActor);
                    naTotal++;
                    break;
                case "sa":
                    saTotal++;
                    break;
                default:
                    actorsAmerica.push(nombreActor);
                    naTotal++;
                    break;
            }
            var fechaNacimiento = parseInt(infoActor[3].substring(infoActor[3].indexOf("dateOfBirth") + 15, infoActor[3].length - 2));
            var fechaMuerte = parseInt(infoActor[4].substring(infoActor[4].indexOf("dateOfDecease") + 17, infoActor[4].length - 2));
            var edad = fechaMuerte - fechaNacimiento;
            if (fechaMuerte === -1) {
                actoresVivos++;
                if (paisOrigen === "eu") {
                    actoresVivosEurope++;
                } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                    actoresVivosAmerica++;
                }
            } else {
                actoresFallecidos++;
                if (paisOrigen === "eu") {
                    actoresFallecidosEurope++;
                } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                    actoresFallecidosAmerica++;
                }
            }
            if (edad < 30) {
                menoresDe30++;
                if (paisOrigen === "eu") {
                    menoresDe30Europa++;
                } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                    menoresDe30America++;
                }
            } else if ((30 <= edad) && (edad < 50)) {
                entre30y60++;
                if (paisOrigen === "eu") {
                    entre30y60Europa++;
                } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                    entre30y60America++;
                }
            } else {
                mayoresDe60++;
                if (paisOrigen === "eu") {
                    mayoresDe60Europa++;
                } else if ((paisOrigen === "na") || (paisOrigen === "")) {
                    mayoresDe60America++;
                }
            }
            ppactores.push(nombreActor);
        }
        data = [["eu", euTotal], ["oc", ocTotal], ["af", afTotal], ["as", asTotal], ["na", naTotal], ["sa", saTotal]];
    }
    if (result2 === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=pelis",
            success: function (result2) {
                acumCantidad++;
                sessionStorage.setItem("cantidadPeliculasActores", result2);
                //String to array
                result2 = result2.replace('[', "");
                result2 = result2.replace(']', "");
                result2 = result2.replace('\r\n', "");
                result2 = result2.split(', ').map(function (item) {
                    return parseInt(item, 10);
                });
                ;
                pppelis = result2;
            }});
    } else {
        acumCantidad++;
        result2 = result2.replace('[', "");
        result2 = result2.replace(']', "");
        result2 = result2.replace('\r\n', "");
        result2 = result2.split(', ').map(function (item) {
            return parseInt(item, 10);
        });
        
        pppelis = result2;
    }

    var actorYPeliculas = [];
    for (var i = 0; i < pppelis.length; i++) {
        actorYPeliculas[i] = [ppactores[i], pppelis[i]];
    }

    sessionStorage.setItem("menoresDe30", menoresDe30);
    sessionStorage.setItem("entre30y60", entre30y60);
    sessionStorage.setItem("mayoresDe60", mayoresDe60);
    sessionStorage.setItem("menoresDe30America", menoresDe30America);
    sessionStorage.setItem("entre30y60America", entre30y60America);
    sessionStorage.setItem("mayoresDe60America", mayoresDe60America);
    sessionStorage.setItem("menoresDe30Europa", menoresDe30Europa);
    sessionStorage.setItem("entre30y60Europa", entre30y60Europa);
    sessionStorage.setItem("mayoresDe60Europa", mayoresDe60Europa);
    sessionStorage.setItem("actorYPeliculas", actorYPeliculas);
    sessionStorage.setItem("actoresVivos", actoresVivos);
    sessionStorage.setItem("actoresFallecidos", actoresFallecidos);
    sessionStorage.setItem("actoresVivosEurope", actoresVivosEurope);
    sessionStorage.setItem("actoresFallecidosEurope", actoresFallecidosEurope);
    sessionStorage.setItem("actoresVivosAmerica", actoresVivosAmerica);
    sessionStorage.setItem("actoresFallecidosAmerica", actoresFallecidosAmerica);
    sessionStorage.setItem("pppelis", pppelis);
    sessionStorage.setItem("ppactores", ppactores);
    sessionStorage.setItem("actorsEurope", actorsEurope);
    sessionStorage.setItem("actorsAmerica", actorsAmerica);
    pintarGrafica2(data, ppactores, pppelis, actoresVivos, actoresFallecidos, menoresDe30, entre30y60, mayoresDe60);
}

function pie(data, ppactores, ppelis, actoresVivos, actoresFallecidos, menoresDe30, entre30y60, mayoresDe60) {
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
                        name: '< 30',
                        y: menoresDe30,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'entre 30 y 50',
                        y: entre30y60
                    }, {
                        name: '> 50',
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
                data: ppelis,
                showInLegend: false
            }]
    });
    Highcharts.chart('containerVivos', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Actores que siguen con vida'
        },
        xAxis: {
            categories: ["Vivos", "Fallecidos"]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total'
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
                name: 'Total actores',
                data: [actoresVivos, actoresFallecidos],
                showInLegend: true
            }]
    });

    Highcharts.mapChart('containerMapa', {
        chart: {
            map: 'custom/world-continents'
        },

        title: {
            text: 'Actores por país de origen'
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world-continents.js">World continents</a>'
        },

        mapNavigation: {
            enabled: false
        },

        colorAxis: {
            min: 0,
            startOnTick: false,
            endOnTick: false,
            max: 10
        },

        series: [{
                data: data,
                name: 'Total peliculas',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
    });
}

function mostrarPorContinente(id) {
    var button = document.getElementById(id);
    if (button.classList.contains("btn-outline-info")) {
        button.classList.remove("btn-outline-info");
        button.classList.add("btn-info");
    } else {
        button.classList.remove("btn-info");
        button.classList.add("btn-outline-info");
    }

    if (id === "buttonNorthAmerica") {
        toggleMostrar("mostrarAmerica");
    } else {
        toggleMostrar("mostrarEurope");
    }
    var mostrarAmerica = sessionStorage.getItem("mostrarAmerica");
    var mostrarEurope = sessionStorage.getItem("mostrarEurope");
    actorYPeliculas = sessionStorage.getItem("actorYPeliculas");

    var data = [];
    var ppactores = [];
    var ppelis = [];


    if ((mostrarEurope === "true") && (mostrarAmerica === "true")) {
        data = [["eu", euTotal], ["oc", ocTotal], ["af", afTotal], ["as", asTotal], ["na", naTotal], ["sa", saTotal]];
        ppactores = sessionStorage.getItem("ppactores").split(",");
        var auxPpelis = sessionStorage.getItem("pppelis").split(",");
        for (var j = 0; j < auxPpelis.length; j++) {
            ppelis[j] = parseInt(auxPpelis[j]);
        }
        actoresVivos = parseInt(sessionStorage.getItem("actoresVivos"));
        actoresFallecidos = parseInt(sessionStorage.getItem("actoresFallecidos"));
        menoresDe30 = parseInt(sessionStorage.getItem("menoresDe30"));
        entre30y60 = parseInt(sessionStorage.getItem("entre30y60"));
        mayoresDe60 = parseInt(sessionStorage.getItem("mayoresDe60"));
        
    } else if (mostrarEurope === "true") {
        data = [["eu", euTotal], ["oc", 0], ["af", 0], ["as", 0], ["na", 0], ["sa", 0]];
        ppactores = sessionStorage.getItem("actorsEurope").split(",");
        ppelis = setActorPeliculas(ppactores, ppelis, actorYPeliculas, "actorYPeliculasEurope");
        actoresVivos = parseInt(sessionStorage.getItem("actoresVivosEurope"));
        actoresFallecidos = parseInt(sessionStorage.getItem("actoresFallecidosEurope"));
        menoresDe30 = parseInt(sessionStorage.getItem("menoresDe30Europa"));
        entre30y60 = parseInt(sessionStorage.getItem("entre30y60Europa"));
        mayoresDe60 = parseInt(sessionStorage.getItem("mayoresDe60Europa"));
        
    } else if (mostrarAmerica === "true") {
        data = [["eu", 0], ["oc", 0], ["af", 0], ["as", 0], ["na", naTotal], ["sa", 0]];
        ppactores = sessionStorage.getItem("actorsAmerica").split(",");
        ppelis = setActorPeliculas(ppactores, ppelis, actorYPeliculas, "actorYPeliculasAmerica");
        actoresVivos = parseInt(sessionStorage.getItem("actoresVivosAmerica"));
        actoresFallecidos = parseInt(sessionStorage.getItem("actoresFallecidosAmerica"));
        menoresDe30 = parseInt(sessionStorage.getItem("menoresDe30America"));
        entre30y60 = parseInt(sessionStorage.getItem("entre30y60America"));
        mayoresDe60 = parseInt(sessionStorage.getItem("mayoresDe60America"));
        
    } else {
        data = [["eu", 0], ["oc", 0], ["af", 0], ["as", 0], ["na", 0], ["sa", 0]];
        ppactores = [];
        ppelis = [0];
        actoresVivos = 0;
        actoresFallecidos = 0;
        menoresDe30 = 0;
        entre30y60 = 0;
        mayoresDe60 = 0;
    }

    pie(data, ppactores, ppelis, actoresVivos, actoresFallecidos, menoresDe30, entre30y60, mayoresDe60);
}

function convertStringToArray(string) {
    var array = [[]];
    var auxString = string.split(",");

    for (var j = 0; j <= auxString.length - 2; j = j + 2)
    {
        var newItem = [auxString[j], auxString[j + 1]];
        array.push(newItem);
    }

    var auxArray = [];

    for (var k = 0; k <= array.length - 1; k++) {
        auxArray[k] = array[k + 1];
    }
    return auxArray;
}

function toggleMostrar(id) {
    if (sessionStorage.getItem(id) === "true") {
        sessionStorage.setItem(id, false);
    } else {
        sessionStorage.setItem(id, true);
    }
}

function setActorPeliculas(ppactores, ppelis, actorYPeliculas, actorYPeliculasPais) {
    var actorYPeliculasCurrent = sessionStorage.getItem(actorYPeliculasPais);
    if (actorYPeliculasCurrent === null) {
        var actorYPeliculasAux = convertStringToArray(actorYPeliculas);
        for (var indexActor = 0; indexActor < ppactores.length; indexActor++) {
            var actor = ppactores[indexActor];
            for (var i = 0; i < actorYPeliculasAux.length - 1; i++) {
                if (actorYPeliculasAux[i][0] === actor) {
                    ppelis[indexActor] = actorYPeliculasAux[i][1];
                }
            }
        }
        sessionStorage.setItem(actorYPeliculasPais, ppelis);
    }
    var actorYPeliculasCurrentAux = actorYPeliculasCurrent.split(",");
    for (var i = 0; i < actorYPeliculasCurrentAux.length; i++) {
        ppelis[i] = parseInt(actorYPeliculasCurrentAux[i]);
    }
    return ppelis;
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