let template = document.querySelector("#homeTemp").content;
let homeList = document.querySelector("#homeList");
let page = 1;
let lookingForData = false;
function fetchHomePage() {
    lookingForData = true;
    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    let endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/home_page?_embed&per_page=10&page=" + page
    if (catid) { 
        endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/home_page?_embed&per_page=10&page=" + page + "&categories=" + catid
    }
    fetch(endpoint)
        .then(e => e.json())
        .then(showHome);
}
function showHome(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showHomePage);
}
function showHomePage(homePage) {
    let clone = template.cloneNode(true);
    let image = clone.querySelector("img");
    image.id = homePage.acf.link;
    if (homePage._embedded["wp:featuredmedia"]) { 
        clone.querySelector("img").setAttribute("src", homePage._embedded["wp:featuredmedia"][0].source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }
    homeList.appendChild(clone);
}
fetchHomePage();
function linkPage(image){
    window.location.href = image.id;
}