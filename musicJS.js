let template = document.querySelector("#musicTemp").content;
let musicList = document.querySelector("#musicList");
let page = 1;
let lookingForData = false;
function fetchMusic() {
    lookingForData = true;
    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    let endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/music?_embed&per_page=10&page=" + page
    if (catid) { // DRY
        endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/music?_embed&per_page=10&page=" + page + "&categories=" + catid
    }
    fetch(endpoint)
        .then(e => e.json())
        .then(showMusic);
}
function showMusic(data) {
    console.log(data.length);
    var arrayLength = data.length;
    lookingForData = false;
    data.forEach(showSingleSong);
}
function showSingleSong(aSong) {
    let clone = template.cloneNode(true);
    let fakeClone = template.cloneNode(true);
    var colors = ['#22b742', '#670027', '#714101' , '#858585' , '#f9ad35' , '#005e74'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    clone.querySelector(".overlay").style.background = "linear-gradient(black 45%, " + random_color + ")";
    clone.querySelector(".overlay").style.cursor = "pointer";
    clone.querySelector(".songContainer").style.cursor = "pointer";
    clone.querySelector(".songName").textContent = aSong.acf.name;
    clone.querySelector(".container").style.display = "block";
    let overlay = clone.querySelector(".overlay");
    let songContainer = clone.querySelector(".songContainer");
    overlay.id = aSong.acf.link; 
    songContainer.id = aSong.acf.link; 
    if (aSong._embedded["wp:featuredmedia"]) { 
        clone.querySelector("img").setAttribute("src", aSong._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }
    musicList.appendChild(clone);
    musicList.appendChild(fakeClone);
}
fetchMusic();
function linkPage(x){
    window.location.href = x.id;
}