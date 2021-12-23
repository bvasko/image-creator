//unsplashed access key = EHxuxyvymZS2_p4tpYQf51gNAOtih5AJF9xo-7UAmzI
//unsplashed secret key =  fiUIPd3h7dVWI683NCuKsFuj4YAipHr-XnBEr1_s9Ps
//https://api.unsplash.com/photos/?client_id=YOUR_APPLICATION_ID

var imgSearchEl = document.querySelector("#imgForm");
var imgSearchInputEl = document.querySelector("#img-search");

var imgSearchResultsContainer = document.querySelector(".imgSearchResultsContainer");
var imgSearchResultsEl = document.querySelector("#image");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var imgSearchVal = imgSearchInputEl.value.trim();
  console.log(imgSearchVal);
  if (imgSearchVal) {
    getApi(imgSearchVal);
    imgSearchInputEl.value = '';
  } else {
    console.error('Please enter a search term!');
  }

};

function getApi(imgSearchVal) {
  var accessKey = "EHxuxyvymZS2_p4tpYQf51gNAOtih5AJF9xo-7UAmzI";
  // var requestUrl = 'https://api.unsplash.com/search/photos?&query=' + imgSearchVal + "/?client_id=" + accessKey;
  var requestUrl = "https://api.unsplash.com/search/photos?query=" + imgSearchVal + "&content_filter=high&client_id=" + accessKey + "&fm=jpg"

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      for (let i = 0; i < 9; i++) {
        const img = document.createElement("img");
        img.src = data.results[i].urls.thumb;

        img.addEventListener("click", function (event) {
          console.log("clicked");
          console.log(event.target.src);
        })

        imgSearchResultsEl.append(img);


      }

    });
}
imgSearchEl.addEventListener('submit', formSubmitHandler);

//////////////////////////////////////////////////////////////////////////////

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
  //   giphySearchTermEl.text(stickerSearch);
  giphyStickerSearch(stickerSearch);
}

function giphyStickerSearch(search) {
  console.log(search);
  let searchVal = search.replace(/\+/g, " ");
  console.log(searchVal);
  giphySearchTermEl.text(searchVal);

  let giphyAPIUrl = "https://api.giphy.com/v1/gifs/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q=" + search + "&limit=5&offset=0&rating=g&lang=en&bundlde=fixed_width_small";
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
      if (data.data.length == 0) {
        giphySearchTermEl.text("No results found for: " + search);
        console.log(data);
      }
      else {
        getStickers(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}


function getStickers(stickers) {
  let sticker = stickers.data;
  console.log(sticker[0].title);
  for (i = 0; i < sticker.length; i++) {
    let imageUrl = sticker[i].images.fixed_height_small.url;
    let imageAlt = sticker[i].title;
    let imageEl = $("<img>").attr({ "src": imageUrl, "alt": imageAlt, "title": imageAlt });
    imageEl.on("click", pasteSticker);
    giphySearchResultsEl.append(imageEl);
  }
}

function pasteSticker(event) {
  event.preventDefault();
  console.log($(this));
  let customizableSticker = $(this);
  customizableSticker.clone().appendTo(imgContainerEl);
}

function positionSticker() {

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
