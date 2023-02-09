let title = document.getElementById("title")

window.addEventListener('scroll', () => {
    let valye = wondow.scrollY;
    title.style.marginTop = value * 2.5 +'px';
})