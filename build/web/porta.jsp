<%-- 
    Document   : index
    Created on : 21-nov-2019, 6:14:50
    Author     : mascport
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="acces.PerPasUsuari" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            PerPasUsuari ppu = new PerPasUsuari();
            String user = request.getParameter("usu");
            String passwd = request.getParameter("pas");
            if ((user == null) || (passwd == null)) {
                response.sendRedirect("noacces.html");
            } else if (ppu.accesUsuari(user, passwd) < 12) {
                response.sendRedirect("nonivell.html");
            } else {
                response.sendRedirect("acces.html");
            }
        %>
        <div><h1> PLANA PRIVADA </h1> </div>
    </body>
</html>
