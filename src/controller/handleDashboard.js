const dashboard = document.querySelector('select[name="liste-dashboard"]');

window.addEventListener('DOMContentLoaded', () => {
    dashboard.querySelectorAll('option').forEach((option) => {
        option.style.display = 'none';

        if (option.classList.contains('dashboard-choice')) {
            option.style.display = 'block';
        }
    });
});

function initDashboardValue(value) {
    if(value !== "") {
        dashboard.value = value;
    }
}

function redirectTo(event) {
    const pathnameArr = window.location.pathname.split("/");
    const currentPath = window.location.pathname;
    const dashboardId = event.options[event.selectedIndex].id;

    let newPath = currentPath;

    if (pathnameArr.indexOf("index.html") !== -1) {
        const valueToDirPath = switchToPath(event.options[event.selectedIndex].value);
        newPath = currentPath.replace("index.html", "dashboard/" + valueToDirPath + "/" + dashboardId + ".html");
    } else {
        newPath = currentPath.split("/dashboard/")[0] + "/dashboard/" + switchToPath(event.options[event.selectedIndex].value) + "/" + dashboardId + ".html";
    }

    return window.location.href = newPath;
}

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