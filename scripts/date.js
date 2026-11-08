const currentYearElement = document.querySelector('#currentyear');
const lastModifiedElement = document.querySelector('#lastModified');

const today = new Date();

if (currentYearElement) {
    currentYearElement.textContent = today.getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}