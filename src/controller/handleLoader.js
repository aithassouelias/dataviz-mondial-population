/**
 * Cette fonction crée un élément de chargement visuel (spinner) pour indiquer un chargement en cours.
   Elle génère un élément div contenant une classe CSS pour afficher un spinner. Ce spinner est utilisé pour indiquer qu'une opération de chargement est en cours.
 * @returns {div} - div : L'élément div contenant le spinner de chargement. 
 */
function createSpinner() {

    // Création d'un élément div pour le spinner

    const div = document.createElement("div");
    div.classList.add("spinner-border", "text-warning"); // Ajout des classes CSS pour afficher le spinner
    div.setAttribute("role", "status"); // Attribut "role" pour indiquer le statut du spinner

    // Création d'un élément span pour un texte de chargement

    const span = document.createElement("span");
    span.classList.add("visually-hidden"); // Ajout d'une classe pour cacher le texte visuellement
    span.textContent = "Loading..."; // Texte indiquant le chargement

    div.appendChild(span); // Ajout du texte au spinner

    return div; // Renvoie l'élément div contenant le spinner
}