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
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleSong);


}



function showSingleSong(aSong) {
    let clone = template.cloneNode(true);
    let fakeClone = template.cloneNode(true);


    clone.querySelector(".songName").textContent = aSong.acf.name;
    
    clone.querySelector(".songArtist").textContent = aSong.acf.artist;
    
    //clone.querySelector(".songDuration").textContent = aSong.acf.duration;
    
    //clone.querySelector(".songLink").textContent = aSong.acf.link;


    if (aSong._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", aSong._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }

        musicList.appendChild(clone);
        musicList.appendChild(fakeClone);



}
fetchMusic();



/*
//found this stuff online
      setInterval(function () {

          if (bottomVisible() && lookingForData === false) {
              console.log("We've reached rock bottom, fetching articles")
              page++;
              fetchMusic();
          }
      }, 1000)

      function bottomVisible() {
          const scrollY = window.scrollY
          const visible = document.documentElement.clientHeight
          const pageHeight = document.documentElement.scrollHeight
          const bottomOfPage = visible + scrollY >= pageHeight
          return bottomOfPage || pageHeight < visible
      }


*/
