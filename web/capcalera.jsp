<%-- 
    Document   : capcalera
    Created on : 06-nov-2019, 15:29:53
    Author     : dsst
--%>

<%@page import="java.util.Date"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
        <style>
            * {box-sizing: border-box;}

            body { 
                margin: 0;
                font-family: Arial, Helvetica, sans-serif;
            }

            .header {
                overflow: hidden;
                background-color: #f1f1f1;
                padding: 20px 10px;
            }

            .header a {
                float: left;
                color: black;
                text-align: center;
                padding: 12px;
                text-decoration: none;
                font-size: 18px; 
                line-height: 25px;
                border-radius: 4px;
            }

            .header a.logo {
                font-size: 25px;
                font-weight: bold;
            }

            .header a:hover {
                background-color: #ddd;
                color: black;
            }

            .header a.active {
                background-color: dodgerblue;
                color: white;
            }

            .header-right {
                float: right;
            }

            @media screen and (max-width: 500px) {
                .header a {
                    float: none;
                    display: block;
                    text-align: left;
                }

                .header-right {
                    float: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <a href="<%= request.getContextPath() %>" class="logo">
                <img alt="Company Logo" src="<%= request.getContextPath() %>/imatges/logo.jpeg" width="100%" height="30%">
            </a>
            <div class="header-right">
                <a class="active" href="<%= request.getContextPath() %>">Home</a>
                <a href="<%= request.getContextPath() %>/login.jsp">Login</a>
                <a href="<%= request.getContextPath() %>/partPrivada.jsp">Catálogo películas</a>
                <a href="javascript:getMovieInformation();">About</a>
            </div>
        </div>

        <div style="padding-left:20px">
            <h1>Date: <%= (new Date()).toString() %> <br> </h1>
            <hr>
        </div>
    </body>
</html>
