$(document).ready(function () {
    //Logged
    if(sessionStorage.getItem("hasAccess") === "true"){
        $("#navbarMenu").append('<li class="nav-item"><a class="nav-link" href="index.jsp" id="btnLogout">Log Out</a></li>');
    }else{
        $("#navbarMenu").append('<li class="nav-item"><a class="nav-link" href="#LoginModal" data-toggle="modal">Log In</a></li>');
    }
    
    //Login
    $("#btnLogin").click(function(event) {
      $("#loginError").removeClass("alert alert-danger");
      $('#loginError').empty();
      //Fetch form to apply custom Bootstrap validation
        var form = $("#formLogin");
        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            if($('input[name="user"]').val() !== "user" || $('input[name="pass"]').val() !== "1234"){
               $("#loginError").addClass("alert alert-danger");
               $('#loginError').append('<b>Error:</b> Usuario/contraseña incorrectos');
               event.preventDefault();
               event.stopPropagation();
             }else{
               sessionStorage.setItem("hasAccess", true);
               form.addClass('was-validated');
             }
        }
    });
    $("#btnLogout").click(function(event) {
        sessionStorage.setItem("hasAccess", false);
    });
});