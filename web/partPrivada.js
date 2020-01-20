/* global Highcharts */

var pelisTipo1Done;
var pelisTipo2Done;
var pelisTipo3Done;
var pelisEspera;

var tipo1DeleteMap = false;
var tipo2DeleteMap = false;
var tipo3DeleteMap = false;


$(document).ready(function () {
    pelisEspera = 0;
    if (sessionStorage.getItem("hasAccess") !== "true") {
        $("#pageContent").empty();
        $("#pageContent").append('<div class="card" style="margin: 30px"><div class="card-body">Debes loguearte para acceder a esta página</div></div>');
    }
    sessionStorage.setItem("tipo1Selected", false);
    sessionStorage.setItem("tipo2Selected", false);
    sessionStorage.setItem("tipo3Selected", false);

    var data = [
        ['eu', 0],
        ['oc', 0],
        ['af', 0],
        ['as', 0],
        ['na', 0],
        ['sa', 0]
    ];
    sessionStorage.setItem("dataMap", data);
});

function getMovieInformationType1() {
    pelisTipo1Done = 0;
    var element = document.getElementById("peliCat1");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        sessionStorage.setItem("tipo1Selected", false);
        tipo1DeleteMap = true;
        $('.type1movies').remove();
        deleteFromMap("paisesMapaTipo1");
    } else {
        element.classList.add("active");
        sessionStorage.setItem("tipo1Selected", true);
        getMoviesRatingUnder5();
    }
    chart();
}

function getMovieInformationType2() {
    pelisTipo2Done = 0;
    var element = document.getElementById("peliCat2");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        tipo2DeleteMap = true;
        $('.type2movies').remove();
        sessionStorage.setItem("tipo2Selected", false);
        deleteFromMap("paisesMapaTipo2");
    } else {
        element.classList.add("active");
        sessionStorage.setItem("tipo2Selected", true);
        getMoviesRatingBetween5And7();
    }
    chart();
}

function getMovieInformationType3() {
    pelisTipo3Done = 0;
    var element = document.getElementById("peliCat3");
    if (element.classList.contains("active")) {
        sessionStorage.setItem("tipo3Selected", false);
        element.classList.remove("active");
        tipo3DeleteMap = true;
        $('.type3movies').remove();
        deleteFromMap("paisesMapaTipo3");
    } else {
        element.classList.add("active");
        sessionStorage.setItem("tipo3Selected", true);
        getMoviesRatingOver7();
    }
    chart();
}

function getMoviesRatingUnder5() {
    result = sessionStorage.getItem("peliculasTipo1");
    if (result === null) {
        var espera = document.getElementById("gifEspera");
        if (espera === null) {
            $('#espera').append('<img src="espera.gif" id ="gifEspera"/>');
        }
        pelisEspera++;
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=0-5",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo1", result);
                pelisTipo1Done = pelisTipo1Done + 1;
                getMovieInfoFromAPI("peliculasTipo1", "peliculasInfoTipo1", "type1movies", pelisTipo1Done);
            }});
    } else
    {
        pelisTipo1Done = pelisTipo1Done + 1;
        getMovieInfoFromAPI("peliculasTipo1", "peliculasInfoTipo1", "type1movies", pelisTipo1Done, "listaPaisesTipo1", "paisesMapaTipo1");
    }
}

function getMoviesRatingBetween5And7() {
    result = sessionStorage.getItem("peliculasTipo2");
    if (result === null) {
        var espera = document.getElementById("gifEspera");
        if (espera === null) {
            $('#espera').append('<img src="espera.gif" id ="gifEspera"/>');
        }
        pelisEspera++;
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=6-8",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo2", result);
                pelisTipo2Done = pelisTipo2Done + 1;
                getMovieInfoFromAPI("peliculasTipo2", "peliculasInfoTipo2", "type2movies", pelisTipo2Done);
            }});
    } else {
        pelisTipo2Done = pelisTipo2Done + 1;
        getMovieInfoFromAPI("peliculasTipo2", "peliculasInfoTipo2", "type2movies", pelisTipo2Done, "listaPaisesTipo2", "paisesMapaTipo2");
    }
}

function getMoviesRatingOver7() {
    result = sessionStorage.getItem("peliculasTipo3");
    if (result === null) {
        var espera = document.getElementById("gifEspera");
        if (espera === null) {
            $('#espera').append('<img src="espera.gif" id ="gifEspera"/>');
        }
        pelisEspera++;
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=pelisderatingstring&par=9-10",
            success: function (result) {
                sessionStorage.setItem("peliculasTipo3", result);
                pelisTipo3Done = pelisTipo3Done + 1;
                getMovieInfoFromAPI("peliculasTipo3", "peliculasInfoTipo3", "type3movies", pelisTipo3Done);
            }});
    } else {
        pelisTipo3Done = pelisTipo3Done + 1;
        getMovieInfoFromAPI("peliculasTipo3", "peliculasInfoTipo3", "type3movies", pelisTipo3Done, "listaPaisesTipo3", "paisesMapaTipo3");
    }
}

function getMovieInfoFromAPI(peliculasTipoS, peliculasTipoInfo, typeMovie, pelisTipoDone, listaPaisesNombre, paisesMapaTipo) {
    peliculasTipo = sessionStorage.getItem(peliculasTipoS);
    if (sessionStorage.getItem(peliculasTipoInfo) === null) {
        $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getMoviesInfo&par=" + peliculasTipo,
            success: function (result) {
                sessionStorage.setItem(peliculasTipoInfo, result);
                pelisTipoDone = pelisTipoDone + 1;
                awaitData(pelisTipoDone, peliculasTipoInfo, typeMovie);
                loadMap();
            }});
    } else {
        pelisTipoDone = pelisTipoDone + 1;
        awaitData(pelisTipoDone, peliculasTipoInfo, typeMovie, listaPaisesNombre);
        loadMap(listaPaisesNombre, paisesMapaTipo);
    }
}

function loadMap(listaPaisesTipo, paisesMapaTipo) {
    addToMap(listaPaisesTipo, paisesMapaTipo);
}

function awaitData(pelisTipoDone, peliculasTipoInfo, typeMovie, listaPaisesNombre) {
    if (pelisTipoDone === 2) {
        parseAPIResponse(peliculasTipoInfo, typeMovie, listaPaisesNombre);
    }
}

function parseAPIResponse(peliculasTipoInfo, typeMovie, listaPaisesNombre) {
    var listaPaisesStorage = sessionStorage.getItem(listaPaisesNombre);
    var newListaPaises = false;
    if (listaPaisesStorage === null) {
        listaPaisesStorage = [[]];
        newListaPaises = true;
    }
    result = sessionStorage.getItem(peliculasTipoInfo);
    var peliculas = result.split("%");
    var movieStringList = "";
    for (var i = 0; i < peliculas.length - 1; i++) {
        var peliculaActual = peliculas[i].split(",");
        var nombrePelicula = peliculaActual[0].substring(peliculaActual[0].indexOf("movieName") + 12, peliculaActual[0].length - 1);
        var fechaEstreno = peliculaActual[1].substring(peliculaActual[1].indexOf("dateOfRelease") + 16, peliculaActual[1].length - 1);
        var paisCreacion = peliculaActual[2].substring(peliculaActual[2].indexOf("country") + 10, peliculaActual[2].length - 1);

        if (newListaPaises === true) {
            var paisIndex = -1;
            for (idx = 0; idx < listaPaisesStorage.length; idx++) {
                if (listaPaisesStorage[idx][0] === paisCreacion) {
                    paisIndex = idx;
                    listaPaisesStorage[idx][1]++;
                }
            }
            if (paisIndex === -1) {
                var newPais = [paisCreacion, 1];
                listaPaisesStorage.push(newPais);
            }
        }

        //var actoresPelicula = peliculaActual[3].split("$");
        //for (j = 0; j < actoresPelicula.length; j++){
        //    var actorActual = actoresPelicula[j].split(";");
        //    var nombreActor = actorActual[0].substring(actorActual[0].indexOf("name") + 7, actorActual[0].length - 1);
        //    var paisNacimientoActor = actorActual[1].substring(actorActual[1].indexOf("name") + 7, actorActual[1].length - 1);
        // }
        var movieString = "<div class=\"col-lg-4 col-md-6 mb-4 " + typeMovie + "\">" +
                "<div class=\"card h-100\">" +
                "<a href=\"#\"><img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"></a>" +
                "<div class=\"card-body\">" +
                "<h4 class=\"card-title\">" +
                "<a href=\"#\">" + nombrePelicula + "</a>" +
                "</h4>" +
                "<h5>País orígen: " + paisCreacion + "</h5>" +
                "<p class=\"card-text\"> Fecha estreno: " + fechaEstreno + "</p>" +
                "</div>" +
                "<div class=\"card-footer\">";
        var stars = "";

        if (peliculasTipoInfo === "peliculasInfoTipo1") {
            stars = "<small class=\"text-muted\">&#9733;</small>";
        } else if (peliculasTipoInfo === "peliculasInfoTipo2") {
            stars = "<small class=\"text-muted\">&#9733; &#9733;</small>";
        } else {
            stars = "<small class=\"text-muted\">&#9733; &#9733; &#9733;</small>";
        }
        stars = stars + "</div></div></div>";
        movieString = movieString + stars;
        movieStringList = movieStringList + movieString;
    }
    if (newListaPaises === true) {
        sessionStorage.setItem(listaPaisesNombre, listaPaisesStorage);
    }
    $('#movieList').append(movieStringList);
    pelisEspera--;
    if (pelisEspera === 0) {
        $('#espera').empty();
    }
}

function chart() {
    var p1 = parseInt(sessionStorage.getItem("cantidadPeliculas1"));
    var p2 = parseInt(sessionStorage.getItem("cantidadPeliculas2"));
    var p3 = parseInt(sessionStorage.getItem("cantidadPeliculas3"));

    var tipo1Selected = sessionStorage.getItem("tipo1Selected");
    var tipo2Selected = sessionStorage.getItem("tipo2Selected");
    var tipo3Selected = sessionStorage.getItem("tipo3Selected");

    if ((tipo1Selected === "true") && (tipo2Selected === "true") && (tipo3Selected === "true")) {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: '< 6',
                            y: p1
                        }, {
                            name: 'entre 6 y 9',
                            y: p2
                        }, {
                            name: '> 9',
                            y: p3
                        }]
                }]
        });
    } else if ((tipo1Selected === "true") && (tipo2Selected === "true")) {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: '< 6',
                            y: p1
                        }, {
                            name: 'entre 6 y 9',
                            y: p2
                        }]
                }]
        });
    } else if ((tipo1Selected === "true") && (tipo3Selected === "true")) {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: '< 6',
                            y: p1
                        }, {
                            name: '> 9',
                            y: p3
                        }]
                }]
        });
    } else if ((tipo2Selected === "true") && (tipo3Selected === "true")) {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: 'entre 6 y 9',
                            y: p2
                        }, {
                            name: '> 9',
                            y: p3
                        }]
                }]
        });
    } else if (tipo1Selected === "true") {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: '< 6',
                            y: p1
                        }]
                }]
        });
    } else if (tipo2Selected === "true") {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: 'entre 6 y 9',
                            y: p2
                        }]
                }]
        });
    } else if (tipo3Selected === "true") {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: [{
                            name: '> 9',
                            y: p3
                        }]
                }]
        });
    } else {
        Highcharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 300
            },
            title: {
                text: 'Categorías de películas'
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
                    name: 'Nota',
                    colorByPoint: true,
                    data: []
                }]
        });
    }
}

function continentRegistered(country) {
    var continentList = sessionStorage.getItem("countryContinent");
    if (continentList !== null) {
        var continentList = convertStringToMultidimensionalArray(sessionStorage.getItem("countryContinent"));
        if (continentList === []) {
            return null;
        } else {
            for (i = 0; i < continentList.length; i++) {
                if (continentList[i][0] === country) {
                    return continentList[i][1];
                }
            }
        }
    }
    return null;
}


function convertStringToMultidimensionalArray(string) {
    var array = [[]];
    var auxString = string.split(",");

    for (var j = 1; j <= auxString.length - 2; j = j + 2)
    {
        var newItem = [auxString[j], auxString[j + 1]];
        array.push(newItem);
    }
    return array;
}

function convertMapDataToArray(string) {
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

function getTotalMoviesPerContinent(data, listaPaises, paisesMapaTipo) {
    var listaPaisesMapa = sessionStorage.getItem(listaPaises);

    if (listaPaisesMapa === null) {
        var paisesArray = [[]];
        if (listaPaises !== null) {
            paisesArray = convertStringToMultidimensionalArray(listaPaises);
        }
        var paisesEncontrados = 0;

        for (var i = 1; i < paisesArray.length; i++) {
            var pais = paisesArray[i][0];
            if (pais !== "null") {
                var continent = continentRegistered(pais);
                if (continent === null) {
                    $.ajax({url: "http://localhost:8080/PeliculesWeb_2/bdpeliculas?op=getContinent&par=" + pais,
                        async: false,
                        success: function (result) {
                            var continentsListStorage = sessionStorage.getItem("countryContinent");
                            result = result.replace(/\n/ig, '');
                            var newContinent = [pais, result];
                            var continentsList = [[]];
                            if (continentsListStorage !== null) {
                                var continentsList = convertStringToMultidimensionalArray(continentsListStorage);
                            }
                            continentsList.push(newContinent);
                            var totalEnEstePais = parseInt(paisesArray[i][1]);
                            sessionStorage.setItem("countryContinent", continentsList);
                            switch (result) {
                                case "eu":
                                    data[0][1] = parseInt(data[0][1]) + totalEnEstePais;
                                    break;
                                case "oc":
                                    data[1][1] = parseInt(data[1][1]) + totalEnEstePais;
                                    break;
                                case "af":
                                    data[2][1] = parseInt(data[2][1]) + totalEnEstePais;
                                    break;
                                case "as":
                                    data[3][1] = parseInt(data[3][1]) + totalEnEstePais;
                                    break;
                                case "na":
                                    data[4][1] = parseInt(data[4][1]) + totalEnEstePais;
                                    break;
                                case "sa":
                                    data[5][1] = parseInt(data[5][1]) + totalEnEstePais;
                                    break;
                            }
                            paisesEncontrados++;
                        }});
                } else {
                    switch (continent) {
                        case "eu":
                            data[0][1] = parseInt(data[0][1]) + parseInt(paisesArray[i][1]);
                            break;
                        case "oc":
                            data[1][1] = parseInt(data[1][1]) + parseInt(paisesArray[i][1]);
                            break;
                        case "af":
                            data[2][1] = parseInt(data[2][1]) + parseInt(paisesArray[i][1]);
                            break;
                        case "as":
                            data[3][1] = parseInt(data[3][1]) + parseInt(paisesArray[i][1]);
                            break;
                        case "na":
                            data[4][1] = parseInt(data[4][1]) + parseInt(paisesArray[i][1]);
                            break;
                        case "sa":
                            data[5][1] = parseInt(data[5][1]) + parseInt(paisesArray[i][1]);
                            break;
                    }
                    paisesEncontrados++;
                }
            } else {
                paisesEncontrados++;
            }
        }
        if (paisesEncontrados === (paisesArray.length - 1)) {
            sessionStorage.setItem(paisesMapaTipo, data);
            return data;
        }
    } else {
        var auxArray = convertMapDataToArray(listaPaisesMapa);

        var returnArray = [];

        for (var k = 1; k < auxArray.length; k++) {
            returnArray[k - 1] = auxArray[k];
        }
        return returnArray;
    }
}


function deleteFromMap(paisesMapaTipo) {
    var data = convertMapDataToArray(sessionStorage.getItem("dataMap"));
    data.pop();
    var listaPaises = convertMapDataToArray(sessionStorage.getItem(paisesMapaTipo));
    listaPaises.pop();
    var max = 0;
    for (var i = 0; i < data.length; i++) {
        data[i][0] = listaPaises[i][0];
        data[i][1] = parseInt(data[i][1]) - parseInt(listaPaises[i][1]);
        if (data[i][1] > max) {
            max = data[i][1];
        }
    }
    sessionStorage.setItem("dataMap", data);
    paintMap(data, max);
}

function paintMap(data, max) {
    $('.map').remove();
// Create the chart
    Highcharts.mapChart('map', {
        chart: {
            map: 'custom/world-continents',
            height: 300,
            width: 300
        },

        title: {
            text: 'Películas por país de orígen'
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
            max: max
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
function addToMap(listaPaisesTipo, paisesMapaTipo) {

    var newData = [];

    var data = convertMapDataToArray(sessionStorage.getItem("dataMap"));
    var dataPais = sessionStorage.getItem(paisesMapaTipo);

    if (dataPais === null) {
        var newDataAux = getTotalMoviesPerContinent(data, sessionStorage.getItem(listaPaisesTipo), paisesMapaTipo);
        newDataAux.pop();
        newData = newDataAux;
    } else {
        var dataPaisArray = convertMapDataToArray(dataPais);
        dataPaisArray.pop();
        var max = 0;
        for (var i = 0; i < dataPaisArray.length; i++) {
            dataPaisArray[i][1] = parseInt(data[i][1]) + parseInt(dataPaisArray[i][1]);
            if (dataPaisArray[i][1] > max) {
                max = dataPaisArray[i][1];
            }
        }
        newData = dataPaisArray;
    }

    var max = 0;
    sessionStorage.setItem("dataMap", newData);
    for (var k = 0; k < newData.length; k++) {
        newData[k][1] = parseInt(newData[k][1]);
        var aux = parseInt(newData[k][1]);
        if (aux > max) {
            max = aux;
        }
    }
    paintMap(newData, max);
}