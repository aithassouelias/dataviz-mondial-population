const filter = document.querySelector("select[name='liste-continent']");

window.addEventListener('DOMContentLoaded', () => {
    initFilterValue();
});

function initFilterValue() {
    let value = "";
    if(localStorage.getItem("filter")) {
        value = localStorage.getItem("filter");
    }
    filter.value = value;
    initializeData(value);
}
function handleChangeFilter(event) {
    const value = event.options[event.selectedIndex].value;

    localStorage.setItem("filter", value);
    initFilterValue();
}

function getFilterValue() {
    return filter.value;
}