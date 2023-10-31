function createSpinner() {
    const div = document.createElement("div");
    div.classList.add("spinner-border", "text-warning");
    div.setAttribute("role", "status");

    const span = document.createElement("span");
    span.classList.add("visually-hidden");
    span.textContent = "Loading...";

    div.appendChild(span);

    return div;
}