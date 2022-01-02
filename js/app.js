

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, options);
});
$(document).ready(function(){
  $('.sidenav').sidenav();
});

let imgSearchEl = $(".imgForm");
let imgSearchInputEl = $("#imgInput");
let imgResultsContainer = $(".imgResultsContainer");
let imgSearchResultsEl = $(".imgResults");
let imgSearchTermEl = $("#imgSearch");

function handleImageSearch(event) {
  event.preventDefault();
  let newImageSearch = imgSearchInputEl.val().trim();
  let backgroundImageSearch = newImageSearch.replace(/\s/g, "+");
  if (!backgroundImageSearch) {
    $("#imgSearch-modal").modal({});
    $("#imgSearch-modal").modal("open");
  }
  imgSearchResultsEl.empty();
  imgSearchTermEl.text("");
  imgSearchInputEl.val("");
  unsplashImageSearch(backgroundImageSearch);
}

function unsplashImageSearch(search) {
  console.log(search);
  let imgSearchVal = search.replace(/\+/g, " ");
  console.log(imgSearchVal);
  imgSearchTermEl.text(imgSearchVal);
  let accessKey = "EHxuxyvymZS2_p4tpYQf51gNAOtih5AJF9xo-7UAmzI";
  let unsplashAPIUrl =
    "https://api.unsplash.com/search/photos?query=" +
    imgSearchVal +
    "&orientation=squarish&content_filter=high&client_id=" +
    accessKey +
    "&fm=jpg";

  fetch(unsplashAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.results == 0) {
        imgSearchTermEl.text("Sorry, no results found for: " + imgSearchVal);
      } else
        for (let i = 0; i < 9; i++) {
          const img = document.createElement("img");
          img.src = data.results[i].urls.thumb;

          img.addEventListener("click", function (event) {
            console.log("clicked");
            console.log(event.target.src);
            let selectedImg = event.target.src;
            console.log(selectedImg);
            let image = new Image();
            console.log(image);
            image.src = selectedImg;
            imgDisplay = document.querySelector("#image-container").style;
            imgDisplay.setProperty(
              "--background-image-url",
              "url('" + selectedImg + "')"
            );
            console.log(imgDisplay);
          });
          imgSearchResultsEl.append(img);
        }
    });
}
imgSearchEl.on("submit", handleImageSearch);
//////////////////////////////////////////////////////////////////////////////

let giphyKey = "bAqrGC0EFBsitN09IxRQsJdQPme35o1E";
let tenorKey = "6FGOA1MVEPK6";
let giphySearchEl = $(".giphyForm");
let giphySearchInputEl = $("#giphyInput");
let giphySearchResultsContainerEl = $(".giphyResultsContainer");
let giphySearchResultsEl = $(".giphyResults");
let giphySearchTermEl = $("#giphySearch");
let imgContainerEl = $("#image-container .module-inside");

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
  let searchVal = search.replace(/\+/g, " ");
  console.log(searchVal);
  giphySearchTermEl.text(searchVal);

    let giphyAPIUrl = "https://api.giphy.com/v1/gifs/search?api_key=bAqrGC0EFBsitN09IxRQsJdQPme35o1E&q="+search
    +"&limit=5&offset=0&rating=g&lang=en&bundle=fixed_width_small";

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
      } else {
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
    let imageEl = $("<img>").attr({
      src: imageUrl,
      alt: imageAlt,
      title: imageAlt,
    });
    imageEl.on("click", pasteSticker);
    giphySearchResultsEl.append(imageEl);
  }
}

function pasteSticker(event){
    event.preventDefault();
    console.log($(this));
    let customizableSticker = $(this).clone();
    customizableSticker.addClass("draggable");
    customizableSticker.appendTo(imgContainerEl);
}


const restrictParent = interact.modifiers.restrictRect({
        restriction: "#image-container",
        // endOnly: true
});

interact('.draggable').draggable({
    maxPerElement: Infinity,
    modifiers: [restrictParent],
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      }
    ,
      move (event) {
        let {x,y} = event.target.dataset;
              x= (parseFloat(x) || 0) + event.dx;
              y = (parseFloat(y) || 0) + event.dy;
              Object.assign(event.target.style.transform =`translate(${x}px, ${y}px)`)
              Object.assign(event.target.dataset, {x,y})
        },
      end (event){
        console.log(event.type);
      }
    }
})
    


  interact(".draggable").resizable({
      edges: {top: true, left: true, bottom: true, right: true},
      modifiers: [restrictParent],
      listeners: {
          move (event){
              let {a,b} = event.target.dataset;
              a= (parseFloat(a) || 0) + event.deltaRect.right;
              b = (parseFloat(b) || 0) + event.deltaRect.top;
              Object.assign(event.target.style, {
                  width: `${event.rect.width}px`,
                  height: `${event.rect.height}px`,
              })
              Object.assign(event.target.dataset, { a, b })
          }
      }
  })



function removeSticker(){
    //TODO button under img container to remove a selected sticker
}
function applyFilter(event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  const filterType = event.currentTarget.firstElementChild.dataset.filter;
  display = document.querySelector("#image-container");
  display.style.setProperty(`--filter-type`, `${filterType}`);
}

giphySearchEl.on("submit", handleGiphySearch);
