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
        // getForecast(imgVal);
        imgSearchInputEl.value = '';
    } else {
        alert('Please enter a City');
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

            for (var i = 0; i < 9; i++) {
                // let imageElement = document.createElement('img');
                const img = document.createElement("img");
                img.src = data.results[i].urls.thumb;
                imgSearchResultsEl.append(img);
                
            }

        });
}
imgSearchEl.addEventListener('submit', formSubmitHandler);