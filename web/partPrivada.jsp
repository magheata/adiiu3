<%-- 
    Document   : partPrivada
    Created on : Jan 18, 2020, 5:01:44 PM
    Author     : andreea
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Portal de películas</title>

        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="css/shop-homepage.css" rel="stylesheet">
        <script src="https://code.highcharts.com/maps/highmaps.js"></script>
        <script src="https://code.highcharts.com/mapdata/custom/world-continents.js"></script>
        <script src="exporting.js"></script>
        <script src="export-data.js"></script>
        <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
        <script src="jquery.tagcanvas.min.js" type="text/javascript"></script>
        <script src="partPrivada.js" type="text/javascript"></script>
        <script src="login.js" type="text/javascript"></script>
        <script type="text/javascript">
            function getParPerNom(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
            $(document).ready(function () {
                if(!$('#myCanvas').tagcanvas({
                    textColour: '#ff0000',
                    outlineThickness: 1,
                    outlineColour: '#000000',
                    maxSpeed: 0.03,
                    depth: 0.75
                }, 'tags')) {
                    $('#myCanvasContainer').hide();
                }
                $("#param").html(getParPerNom("persona"))
            });
        </script>
    </head>

    <body>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">PelisWeb</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto" id="navbarMenu">
                        <li class="nav-item">
                            <a class="nav-link" href="index.jsp">Home
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="partPrivada.jsp">Catálogo de películas</a>
                            <span class="sr-only">(current)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Page Content -->
        <div class="container col-lg-12" id="pageContent">

            <div class ="row">

                <div class ="col-lg-4" id ="chartsRegion">
                    Pruebas
                </div>
                <div class="row col-lg-8">
                    <h1 id="partPrivadaTitle">Peliculas por categoría</h1>
                    <div class="list-group col-lg-12">
                        <div class="row d-flex justify-content-center">
                            <a href="javascript:getMovieInformationType1();" style="text-decoration: none" class="list-group-item peliCat col-lg-2" id = "peliCat1"><small class=\"text-muted\">&#9733;</small></a>
                            <a href="javascript:getMovieInformationType2();" style="text-decoration: none" class="list-group-item peliCat col-lg-2" id = "peliCat2"><small class=\"text-muted\">&#9733; &#9733;</small></a>
                            <a href="javascript:getMovieInformationType3();" style="text-decoration: none" class="list-group-item peliCat col-lg-2" id = "peliCat3"><small class=\"text-muted\">&#9733; &#9733; &#9733;</small></a>

                        </div>
                    </div>
                    <!-- /.col-lg-3 -->

                    <div class="col-lg-12">
                        <div id="espera">
                        </div>
                        <div class="row" id ="movieList"  style="overflow-y: scroll; height:525px;">
                        </div>
                        <!-- /.row -->

                    </div>
                    <!-- /.col-lg-9 -->

                </div>
                <!-- /.row -->

            </div>
            
            <div class ="row">
                <div class="row col-lg-12>
                    <h1>Películas por persona</h1>
                    <div class="col-lg-6">
                        <p id="param"></p>
                        <div id="myCanvasContainer">
                            <canvas width="300" height="300" id="myCanvas" style="background: url('imatges/fons.jpg')">
                                <p>In Internet Explorer versions up to 8, things inside the canvas are inaccessible!</p>
                            </canvas>
                        </div>

                        <div id="tags">
                            <ul>
                                <li><a href="http://www.google.com" target="_blank">Google</a></li>
                                <li><a href="http://www.uib.es">primer UIB</a></li>
                                <li><a href="http://www.uib.es">segon UIB</a></li>
                                <li><a href="http://www.uib.es">tercer UIB</a></li>
                                <li><a href="http://www.uib.es">quart UIB</a></li>
                                <li><a href="index.jsp?persona=González">paràmetre1</a></li>
                                <li><a href="index.jsp?persona=Fernández">paràmetre2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- /.container -->
            <div id="LoginModal" class="modal fade modal-login" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Log In</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body">
                            <div id="loginError"></div>
                            <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="user" id="uname1" required="" placeholder="Usuario">
                                    <div class="invalid-feedback">Debes rellenar este campo.</div>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" name="pass" id="pass" required="" placeholder="Contraseña">
                                    <div class="invalid-feedback">Debes rellenar este campo.</div>
                                </div>

                                <div class="form-group text-center py-4">
                                    <button type="submit" class="btn btn-dark" id="btnLogin">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JavaScript -->
        <!--<script src="vendor/jquery/jquery.min.js"></script>-->
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Footer -->
        <footer class="py-5 bg-dark" id ="footer">
            <div class="container">
                <p class="m-0 text-center text-white">Copyright &copy; PelisWeb (Andreea & Pablo) 2020</p>
            </div>
            <!-- /.container -->
        </footer>
    </body>
</html>