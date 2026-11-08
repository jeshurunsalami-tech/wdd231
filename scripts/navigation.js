const hamburger = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('open');

    if (navigation.classList.contains('open')) {
        hamburger.textContent = '✕';
    } else {
        hamburger.textContent = '☰';
    }
});