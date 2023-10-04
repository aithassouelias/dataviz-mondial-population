function rediriger() {
    var listeDeroulante = document.getElementById("redirectionList");
    var choix = listeDeroulante.value;
    
    if (choix !== "") {
        window.location.href = choix; // Redirection vers la page sélectionnée
    }
}