

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
var imgSearchEl = document.querySelector("#imgForm");
var imgSearchInputEl = document.querySelector("#img-search");

var imgSearchResultsContainer = document.querySelector(
  ".imgSearchResultsContainer"
);
var imgSearchResultsEl = document.querySelector("#image");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var imgSearchVal = imgSearchInputEl.value.trim();
  console.log(imgSearchVal);
  if (imgSearchVal) {
    getApi(imgSearchVal);
    imgSearchInputEl.value = "";
  } else {
    $("#imgSearch-modal").modal({});
    $("#imgSearch-modal").modal("open");
  }
};

function getApi(imgSearchVal) {
  var accessKey = "EHxuxyvymZS2_p4tpYQf51gNAOtih5AJF9xo-7UAmzI";
  var requestUrl =
    "https://api.unsplash.com/search/photos?query=" +
    imgSearchVal +
    "&orientation=squarish&content_filter=high&client_id=" +
    accessKey +
    "&fm=jpg";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

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
          // document.querySelector(".module-inside").style. backgroundImage = "url('"+selectedImg+"')";
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
imgSearchEl.addEventListener("submit", formSubmitHandler);

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


let restrictParent = interact.modifiers.restrictRect({
        restriction: "#image-container",
        elementRect: { left: 0, right: 1, top: 0, bottom: 1 },
        // preserveAspectRatio: true,
        // endOnly: true
});
let coord = {l: 0, t: 0, r: 0, b: 0};
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
              coord.l =x;
              coord.t =y;
              coord.r= x+ event.target.width;
              coord.b= x+ event.target.height;

        },
      end (event){
        console.log(coord);
        console.log(event.type);
      }
    }
})
    


  interact(".draggable").resizable({
      edges: {top: true, left: true, bottom: true, right: true},
      modifiers: [interact.modifiers.aspectRatio({
          ratio: 'preserve',
      
          modifiers: [restrictParent],
      })
    ],
      listeners: {
          move (event){
                // modifiers: [restrictParent];
              let {x, y} = event.target.dataset;
              x = (parseFloat(x) || 0) + event.deltaRect.left;
              y = (parseFloat(y) || 0) + event.deltaRect.top;
            //   c = a + event.deltaRect.right;
            //   d = b + event.deltaRect.bottom;
              Object.assign(event.target.style, {
                  width: `${event.rect.width}px`,
                  height: `${event.rect.height}px`,
                  webkitTransform : `translate(${x}px, ${y}px)`,
                  transform: `translate(${x}px, ${y}px)`

              })
              console.log(event.edges);
              Object.assign(event.target.dataset, {x, y})
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
