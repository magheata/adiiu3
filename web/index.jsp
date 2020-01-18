<%-- 
    Document   : index
    Created on : 06-nov-2019, 15:18:30
    Author     : dsst
--%>
<%@page import="perbd.MovieService"%>
<%@page import="meusservlets.MovieDBRepository"%>
<%@page import="perbd.DBActionsRatingPelis"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Portal de películas</title>
        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="css/shop-homepage.css" rel="stylesheet">
        <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
        <script src="highcharts.js"></script>
        <script src="exporting.js"></script>
        <script src="export-data.js"></script>
        <script src="primera.js" type="text/javascript"></script>
    </head>

    <body>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">Start Bootstrap</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="index.jsp">Home
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="partPrivada.jsp">Catálogo de películas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#LoginModal" data-toggle="modal">Log In</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <H1>
            <br>
        </H1>
        <div id="espera">
        </div>
        <div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
        <div id="containerBarras" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
        <div id="LoginModal" class="modal fade modal-login" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Log In</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                            <div class="form-group">
                                <input type="text" class="form-control" name="user" id="uname1" required="" placeholder="Usuario">
                                <div class="invalid-feedback">Debes rellenar este campo.</div>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="pass" required="" placeholder="Contraseña">
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
    </body>

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</html>
