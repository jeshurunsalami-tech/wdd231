const currentYear = document.querySelector("#current-year");
const lastModification = document.querySelector("#last-modification");

currentYear.textContent = new Date().getFullYear();

lastModification.textContent = document.lastModified;


const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});