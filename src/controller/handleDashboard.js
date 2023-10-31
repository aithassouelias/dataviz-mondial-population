// Sélection de la liste déroulante des dashboards
const dashboard = document.querySelector('select[name="liste-dashboard"]');

window.addEventListener('DOMContentLoaded', () => {
    dashboard.querySelectorAll('option').forEach((option) => {
        option.style.display = 'none';

        if (option.classList.contains('dashboard-choice')) {
            option.style.display = 'block';
        }
    });
});

/**
 * Initialise la valeur du tableau de bord.
 * 
 * @param {string} value - La valeur à attribuer au tableau de bord.
 */
function initDashboardValue(value) {
    if(value !== "") {
        dashboard.value = value;
    }
}

/**
 * Redirige vers une page HTML en fonction de l'événement de sélection d'un tableau de bord.
 * 
 * @param {Event} event - Les informations récupérées lors d'un événement de clic sur l'écran.
 * @returns {string} Le nouveau chemin de la page HTML vers laquelle rediriger.
 */

function redirectTo(event) {
    // Tableau avec chaque élément du chemin de la page actuelle séparée par /
    const pathnameArr = window.location.pathname.split("/");

    // chemin de la page actuelle
    const currentPath = window.location.pathname;

    // Récupérer l'id du dashboard sur lequel on a cliqué
    const dashboardId = event.options[event.selectedIndex].id;

    let newPath = currentPath;

    // si on est sur la page index.html
    if (pathnameArr.indexOf("index.html") !== -1) {
        const valueToDirPath = switchToPath(event.options[event.selectedIndex].value);
        // Le nouveau chemin vers le dashboard : 
        newPath = currentPath.replace("index.html", "dashboard/" + valueToDirPath + "/" + dashboardId + ".html");
    } else {
        // Sinon : 
        newPath = currentPath.split("/dashboard/")[0] + "/dashboard/" + switchToPath(event.options[event.selectedIndex].value) + "/" + dashboardId + ".html";
    }
    
    // on retourne le nouveau chemin
    return window.location.href = newPath;
}

/**
 * Retourne la valeur à ajouter dans le chemin pour les redirections.
 * 
 * @param {string} value - La valeur de chaque dashboard dans la liste déroulante.
 * @returns {string} La valeur correspondante à ajouter dans le chemin pour la redirection.
 */
function switchToPath(value) {
    switch(value) {
        case "death": {
            return "deces";
            break;
        }
        case "birth": {
            return "naissance";
            break;
        }
        case "total": {
            return "total";
            break;
        }
    }
}