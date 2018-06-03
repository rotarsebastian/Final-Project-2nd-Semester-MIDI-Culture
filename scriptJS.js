window.addEventListener('load', () => {
    let menuOpen = false;
    let menuIcon = document.querySelector("svg.menuIcon");
    let menu = document.querySelector(".menu");
    let bars = menuIcon.querySelectorAll("rect");
    let logoDesktop = document.querySelector(".brand-logo");
    let logoMobile = document.querySelector(".logoMobile");
    menuIcon.addEventListener('click', toggleMenu);
    logoDesktop.addEventListener('click', reloadPage)
    logoMobile.addEventListener('click', reloadPage)
    function reloadPage() {
        document.location.href = "index.html";
    }
    fetch("http://wordpress.quickcocktails.dk/wp-json/wp/v2/logo")
        .then(e => e.json())
        .then(showLogo)
    function showLogo(data){
        let logoDesktop = document.querySelector(".brand-logo");
        let logoMobile = document.querySelector(".logoMobile");
        data.forEach(item => {
            logoDesktop.setAttribute("src", item.acf.image.url);
            logoMobile.setAttribute("src", item.acf.image.url);
        })
    }
    function toggleMenu() {
        menuOpen = !menuOpen;
        bars[0].classList.toggle("rotateDown");
        bars[1].classList.toggle("fadeOut");
        bars[2].classList.toggle("rotateUp");
        menu.classList.toggle("hidden");
    }
    fetch("http://wordpress.quickcocktails.dk/wp-json/wp/v2/categories")
        .then(e => e.json())
        .then(buildMenu)
    function buildMenu(data) {
        let parentElement = document.querySelector(".menu ul");
        let parentDesktop = document.querySelector(".right");
        data.forEach(item => {
            console.log(item);
            let liMobile = document.createElement("li");
            let aMobile = document.createElement("a");
            let liDesktop = document.createElement("li");
            let aDesktop = document.createElement("a");
            aMobile.textContent = item.name;
            aMobile.style.color = "white";
            aDesktop.textContent = item.name;
            if (item.id === 25) {
                aMobile.href = "shows.html";
                aDesktop.href = "shows.html";
            }
            if (item.id === 30) {
                aMobile.href = "index.html";
                aDesktop.href = "index.html";
            }
            if (item.id === 1) {
                aMobile.href = "music.html";
                aDesktop.href = "music.html";
            }
            if (item.id === 28) {
                aMobile.href = "https://www.dropbox.com/s/bi42869j5kbk2lg/PRESS%20KIT%20Midi.zip?dl=0";
                aDesktop.href = "https://www.dropbox.com/s/bi42869j5kbk2lg/PRESS%20KIT%20Midi.zip?dl=0";
            }
            if (item.id === 27) {
                aMobile.href = "contact.html";
                aDesktop.href = "contact.html";
            }
            if (item.name == "zContact") {
                item.name = "contact";
                aMobile.textContent = item.name;
                aDesktop.textContent = item.name;
                aDesktop.style.content = "";
            }
            console.log(item.id);
            liMobile.appendChild(aMobile);
            liDesktop.appendChild(aDesktop);
            parentElement.appendChild(liMobile);
            parentDesktop.appendChild(liDesktop);
        })
    }
});