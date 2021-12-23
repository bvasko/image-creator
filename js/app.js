let giphyKey = "bAqrGC0EFBsitN09IxRQsJdQPme35o1E";
let tenorKey = "6FGOA1MVEPK6";
let giphySearchEl = $(".giphyForm");
let giphySearchInputEl = $("#giphyInput");
let giphySearchResultsContainerEl = $(".giphyResultsContainer");
let giphySearchResultsEl = $(".giphyResults");
let giphySearchTermEl = $("#giphySearch");
let imgContainerEl = $("#image-container .module-inside");
let filterIcons = $(".card-image");


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
  giphyStickerSearch(stickerSearch);
}

function giphyStickerSearch(search) {
    console.log(search);
    let searchVal = search.replace(/\+/g," ");
    console.log(searchVal);
    giphySearchTermEl.text(searchVal);

    let giphyAPIUrl = "https://api.giphy.com/v1/gifs/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q="+search+"&limit=5&offset=0&rating=g&lang=en&bundle=fixed_width_small";
    // let giphyAPIUrl = "https://g.tenor.com/v1/search?q=" + search+ "&" + tenorKey+  "&limit=5&contentfitler=high&media_filter=minimal";

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
    let stickerContainer = $("<div>");
    let customizableSticker = $(this).clone();
    customizableSticker.addClass("draggable ui-widget-content");
    stickerContainer.append(customizableSticker);
    stickerContainer.appendTo(imgContainerEl);
}



$(function(){
    $(".draggable").draggable({handle: "img"});
    $("#droppable").droppable({accept: ".draggable"});
});
$(function(){
    $(".draggable").resize();
})

function removeSticker(){
    //button under img container to remove a selected sticker
}

function applyFilter(event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  const filterType = event.currentTarget.firstElementChild.dataset.filter;
  display = document.querySelector('#image-container');
  display.style.setProperty(`--filter-type`, `${filterType}`);
}

giphySearchEl.on("submit", handleGiphySearch);
filterIcons.on("click", applyFilter);