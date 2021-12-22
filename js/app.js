let giphyKey = "bAqrGC0EFBsitN09IxRQsJdQPme35o1E";
let tenorKey = "6FGOA1MVEPK6";
let giphySearchEl = $(".giphyForm");
let giphySearchInputEl = $("#giphyInput");
let giphySearchResultsContainerEl = $(".giphyResultsContainer");
let giphySearchResultsEl = $(".giphyResults");
let giphySearchTermEl = $("#giphySearch");
let imgContainerEl = $("#image-container");

function handleGiphySearch(event) {
  event.preventDefault();
  let uneditiedStickerSearch = giphySearchInputEl.val().trim();
  let stickerSearch = uneditiedStickerSearch.replace(/\s/g, "+");
  if (!stickerSearch) {
    console.error("Need search input");
  }
  giphySearchResultsEl.empty();

  
  giphySearchTermEl.text("");
  giphySearchInputEl.val("");
//   giphySearchTermEl.text(stickerSearch);
  giphyStickerSearch(stickerSearch);
}

function giphyStickerSearch(search) {
    console.log(search);
    let searchVal = search.replace(/\+/g," ");
    console.log(searchVal);
    giphySearchTermEl.text(searchVal);

    let giphyAPIUrl = "https://api.giphy.com/v1/gifs/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q="+search+"&limit=5&offset=0&rating=g&lang=en&bundlde=fixed_width_small";
    // let giphyAPIUrl = "https://g.tenor.com/v1/search?q=" + search+ "&" + tenorKey+  "&limit=5&contentfitler=high&media_filter=minimal";

    // "https://api.giphy.com/v1/stickers/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q=" +
    // search +
    // "&offset=0&rating=g&lang=en";

  fetch(giphyAPIUrl)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if(data.data.length == 0){
        giphySearchTermEl.text("No results found for: " + search);
        console.log(data);
        }
        else{
        getStickers(data);
    }})
    .catch(function (error) {
      console.error(error);
    });
}


function getStickers(stickers){
    let sticker = stickers.data;
    console.log(sticker[0].title);
    for(i=0; i<sticker.length;i++){
        let imageUrl = sticker[i].images.fixed_height_small.url;
        let imageAlt = sticker[i].title;
        let imageEl = $("<img>").attr({"src": imageUrl, "alt" : imageAlt, "title" :imageAlt});
        imageEl.on("click", pasteSticker);
        giphySearchResultsEl.append(imageEl);
    }
}

function pasteSticker(event){
    event.preventDefault();
    console.log($(this));
    let customizableSticker = $(this);
    customizableSticker.clone().appendTo(imgContainerEl);
}

function positionSticker(){

}

giphySearchEl.on("submit", handleGiphySearch);
