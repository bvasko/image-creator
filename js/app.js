var giphyKey = "bAqrGC0EFBsitN09IxRQsJdQPme35o1E";
var giphySearchEl = document.querySelector(".giphyForm");
var giphySearchInputEl = document.querySelector("#giphyInput");
var giphySearchResultsContainerEl = document.querySelector(".giphyResultsContainer");
var giphySearchResultsEl = document.querySelector(".giphyResults");

function handleGiphySearch(event){
    event.preventDefault();
    var stickerSearch = giphySearchInput.ariaValueMax.trim();
    if(!stickerSearch){
        console.error("Need search input");
    }
    giphySearchInput.value = "";
    // giphySearchResults.value = "";
    giphyStickerSearch(stickerSearch);
}

function giphyStickerSearch(search){

}
giphySearchEl.addEventListener("submit", handleGiphySearch);