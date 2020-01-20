/* global Highcharts */

var acumCantidad;
var acumPelisString;
var p1;
var p2;
var p3;

var acumPP;
var ppactores;
var pppelis;

$(document).ready(function () {
    acumCantidad = 0;
    acumPelisString = 0;
    acumPP = 0;
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
        $.ajax({url: "http://localhost:18669/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=0-5",
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
        $.ajax({url: "http://localhost:18669/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=6-8",
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
        $.ajax({url: "http://localhost:18669/PeliculesWeb_2/bdpeliculas?op=pelisderatingcount&par=9-10",
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
    result1 = sessionStorage.getItem("actoresPrincipales");
    result2 = sessionStorage.getItem("cantidadPeliculasActores");
    if (result1 === null) {
        $.ajax({url: "http://localhost:18669/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=personas",
            success: function (result1) {
                sessionStorage.setItem("actoresPrincipales", result1);
                //String to array
                result1 = result1.replace('["',"");
                result1 = result1.replace('"]',"");
                result1 = result1.replace('\r\n',"");
                result1 = result1.split('", "');
                ppactores = result1;
                acumPP++;
            }});
    } else {
        //String to array
        result1 = result1.replace('["',"");
        result1 = result1.replace('"]',"");
        result1 = result1.replace('\r\n',"");
        result1 = result1.split('", "');
        ppactores = result1;
        acumPP++;
    }
    if (result2 === null) {
        $.ajax({url: "http://localhost:18669/PeliculesWeb_2/bdpeliculas?op=pelisporactor&par=pelis",
            success: function (result2) {
                sessionStorage.setItem("cantidadPeliculasActores", result2);
                //String to array
                result2 = result2.replace('[',"");
                result2 = result2.replace(']',"");
                result2 = result2.replace('\r\n',"");
                result2 = result2.split(', ').map(function(item) {
                    return parseInt(item, 10);
                });;
                pppelis = result2;
                acumPP++;
            }});
    } else {
        result2 = result2.replace('[',"");
        result2 = result2.replace(']',"");
        result2 = result2.replace('\r\n',"");
        result2 = result2.split(', ').map(function(item) {
            return parseInt(item, 10);
        });;
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