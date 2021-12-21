let giphyKey = "bAqrGC0EFBsitN09IxRQsJdQPme35o1E";
let giphySearchEl = $(".giphyForm");
let giphySearchInputEl = $("#giphyInput");
let giphySearchResultsContainerEl = $(".giphyResultsContainer");
let giphySearchResultsEl = $(".giphyResults");
let giphySearchTermEl = $("#giphySearch");

function handleGiphySearch(event) {
  event.preventDefault();
  let stickerSearch = giphySearchInputEl.val().trim();
  if (!stickerSearch) {
    console.error("Need search input");
  }
  giphySearchTermEl.text("");
  giphySearchInputEl.val("");
  giphySearchTermEl.text(stickerSearch);
  giphyStickerSearch(stickerSearch);
}

function giphyStickerSearch(search) {
  let giphyAPIUrl =
    "https://api.giphy.com/v1/stickers/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q=" +
    search +
    "&limit=10&rating=g&lang=en";

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
      getStickers(data);
    })
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
        let imageEl = $("<img>").attr("src",imageUrl);

        giphySearchResultsEl.append(imageEl);
    }
}



giphySearchEl.on("submit", handleGiphySearch);
