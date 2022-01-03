

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, options);
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
    +"&limit=15&offset=0&rating=g&lang=en&bundle=fixed_width_small";

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
    let imgEl=$("<div>");
    imgEl.addClass("imgHandle");
    let rtHandle = $("<div>&circlearrowright;</div>");
    rtHandle.addClass("handle");
    rtHandle.appendTo(imgEl);
    imgEl.append(customizableSticker);
    imgEl.appendTo(imgContainerEl);
}


let restrictParent = interact.modifiers.restrictRect({
        restriction: "#image-container",
        elementRect: { left: 0, right: 1, top: 0, bottom: 0 },
});
let coord = {l: 0, t: 0, r: 0, b: 0};
interact('.imgHandle').draggable({
    maxPerElement: Infinity,
    modifiers: [restrictParent],
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      }
    ,
      move (event) {
        let {x,y,angle} = event.target.dataset;
              x= (parseFloat(x) || 0) + event.dx;
              y = (parseFloat(y) || 0) + event.dy;
              angle=(parseFloat(angle) || 0);
              Object.assign(event.target.style.transform =`translate(${x}px, ${y}px) rotate(${angle}rad)`)
              Object.assign(event.target.dataset, {x,y,angle})
              coord.l =x;
              coord.t =y;
              coord.r= x+ event.target.width;
              coord.b= y+ event.target.height;

        },
      end (event){
        event.preventDefault();

        console.log(coord);
        console.log(event.type);
        return coord;
      }
    }
})
    


  interact(".imgHandle").resizable({
      edges: {top: false, left: false, bottom: true, right: true},        
          modifiers: [restrictParent],
  
      listeners: {
          move (event){
              let {x, y,angle} = event.target.dataset;
              x = (parseFloat(x) || 0);
              y = (parseFloat(y) || 0);
              x+=event.deltaRect.left;
              y+=event.deltaRect.top;
              angle =parseFloat(angle || 0);
              Object.assign(event.target.dataset, {x, y, angle})
              Object.assign(event.target.style, {
                  width: `${event.rect.width}px`,
                  height: `${event.rect.height}px`,
                  transform: `translate(${x}px, ${y}px rotate(${angle}rad)`
                  
              })          
        }
      }
  })

  interact("#trash").dropzone({
      accept: ".imgHandle",
      ondrop: function(event){
          event.preventDefault();
          console.log(event.relatedTarget);
          event.relatedTarget.remove();
      }
  })
    interact(".handle").draggable({
        modifiers: [restrictParent],
        onstart: function(event) {
            event.preventDefault();
            let box = event.target.parentElement;
            let rect = box.getBoundingClientRect();
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', getDragAngle(event));
          },
          onmove: function(event) {
            event.preventDefault();
            // gets x and y location
            var box = event.target.parentElement;
            var pos = {
              x: parseFloat(box.getAttribute('data-x')) || 0,
              y: parseFloat(box.getAttribute('data-y')) || 0
            };
      
            var angle = getDragAngle(event);
            console.log(angle);
      
            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
          },
          
          onend: function(event) {
            event.preventDefault();
            var box = event.target.parentElement;
      
            // save the angle when onend is triggered
            box.setAttribute('data-angle', getDragAngle(event));
          },
        })
    


function getDragAngle(event) {
    event.preventDefault();
    let box = event.target.parentElement;
    console.log(box);
    let startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    let center = {
      x: parseFloat(box.getAttribute('data-center-x')) || 0,
      y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    // calculates angle on the drag event then returns
    let angle = Math.atan2(center.y - event.clientY,
      center.x - event.clientX);
  
    return angle - startAngle;
  }

function applyFilter(event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  const filterType = event.currentTarget.firstElementChild.dataset.filter;
  display = document.querySelector("#image-container");
  display.style.setProperty(`--filter-type`, `${filterType}`);
}

giphySearchEl.on("submit", handleGiphySearch);
let textFormEl = $(".textForm");
let textInputEl = $("#textInput");

function textInput(event) {
    event.preventDefault();
    let newText = textInputEl.val().trim();
    if (!newText) {
      console.error("Need text input");
    }
    textInputEl.val("");
    textBox(newText);
  }
function textBox(txt){
    let texta=$("<textarea>");
    texta.val(txt);


}
  textFormEl.on("submit", textInput);
