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
        <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
        <script src="highcharts.js"></script>
        <script src="exporting.js"></script>
        <script src="export-data.js"></script>
        <script src="primera.js" type="text/javascript"></script>
    </head>
    <body>
        <%
            String lloc = request.getServletContext().getContextPath();
            int num = lloc.length() - lloc.replaceAll("/", "").length();
            lloc = "";
            for (int i = 0; i < num - 1; i++) {
                lloc = lloc + "/..";
            }
            lloc = lloc + "/capcalera.jsp";

        %>
        <jsp:include page="<%= lloc%>"/>   
        <H1>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="graficocanvas/grafico.jsp">Ejemplo de gràfico en canvas de JavaScript </a>
            <br>
        </H1>
        <div id="espera">
        </div>
        <div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
        <div id="containerBarras" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
    </body>
</html>
