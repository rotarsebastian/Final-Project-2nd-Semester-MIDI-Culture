let template = document.querySelector("#evTemp").content;
let eventList = document.querySelector("#eventList");
let page = 1;
let lookingForData = false;
function fetchEvents() {
    lookingForData = true;
    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    let endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/shows?_embed&per_page=10&page=" + page
    if (catid) { // DRY
        endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/shows?_embed&per_page=10&page=" + page + "&categories=" + catid
    }
    fetch(endpoint)
        .then(e => e.json())
        .then(showEvents);
}
function showEvents(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleEvent);
}
let count = 0;
function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);
    let fakeClone = template.cloneNode(true);
    let fakeClone1 = template.cloneNode(true);
    clone.querySelector(".location").textContent = anEvent.acf.location;
    clone.querySelector(".date").textContent = anEvent.acf.date;
    if (anEvent._embedded["wp:featuredmedia"]) { 
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { 
        clone.querySelector("img").remove()
    }
    clone.querySelector(".event").style.backgroundColor = "#171717";
    let show = clone.querySelector(".event");
    show.style.cursor = "pointer";
    show.id = anEvent.acf.link;
    console.log(show.id);
    eventList.appendChild(clone);
    if (count % 2 === 0) {
        eventList.appendChild(clone);
        eventList.appendChild(fakeClone);
        eventList.appendChild(fakeClone1);
        
    } else {
        eventList.appendChild(clone);
    }
    count++;
    
}
fetchEvents();
function linkPage(x){
    window.location.href = x.id;
}