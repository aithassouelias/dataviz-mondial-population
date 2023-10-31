// Récupérer la liste déroulante des continents
const filter = document.querySelector("select[name='liste-continent']");

window.addEventListener('DOMContentLoaded', () => {
    initFilterValue();
});

/**
 * Initialise la valeur du filtre en récupérant la sélection dans le menu déroulant,
 * puis utilise cette valeur pour actualiser les données du continent choisi.
 */
function initFilterValue() {
    let value = "";

    // Vérifie s'il y a une valeur dans le stockage local (localStorage)
    if(localStorage.getItem("filter")) {
        value = localStorage.getItem("filter");
    }

    // Affecte la valeur au menu déroulant
    filter.value = value;

    // Actualise les données en utilisant la valeur du filtre
    initializeData(value);
}


/**
 * Modifie le filtre de sélection des continents en réponse à un clic.
 * 
 * @param {Event} event - Les informations récupérées lors d'un clic sur l'écran.
 */
function handleChangeFilter(event) {
    const value = event.options[event.selectedIndex].value;

    // Stocke la valeur sélectionnée dans le stockage local
    localStorage.setItem("filter", value);

    // Met à jour la valeur du filtre et initialise les données correspondantes
    initFilterValue();
}

/**
 * Récupère la valeur actuellement sélectionnée dans le filtre.
 *
 * @returns {string} - La valeur actuellement sélectionnée dans le filtre.
 */
function getFilterValue() {
    return filter.value;
}