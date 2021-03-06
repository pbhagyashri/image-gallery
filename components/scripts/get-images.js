//create a function to generate img tag
const apiUrl = "http://loadurl-api.azurewebsites.net/api/loadurl";
const createImg = function(src) {
  var img = document.createElement("img");
  img.src = src;
  img.className = "grid-container__thumbnails";
  return img;
};

const createGallery = function(response) {
  //query the grid container div and save it in a variable.
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0];
  response.forEach(imageUrl => {
    // create a thumbnail container div for each photo returned by api
    let thumbnailContainer = document.createElement("div");

    thumbnailContainer.className = "thumbnail-container";
    //create img tag for each photo returned by api
    let imgTag = createImg(imageUrl);

    //append the image tag to  thumbnail container div
    thumbnailContainer.appendChild(imgTag);

    //append thumbnail container div to main grid-container
    thumbnailDiv.appendChild(thumbnailContainer);

    imgTag.addEventListener("click", function() {
      createModel(photo, this);
    });
  });
};

//this function displays total word count
const totalWordCount = function(response) {
  let totalCountContainer = document.getElementById("total-word-count");
  totalCountContainer.innerHTML = response.totalWordCount;
};

//this function displays a list of words with their counts.
const wordCount = function(responseObject) {
  let wordCountList = document.getElementById("word-count-list");
  wordCountList.innerHTML = "";

  let counter = 1;
  for (let key in responseObject) {
    if (counter <= 10) {
      let value = responseObject[key];
      let listItem = document.createElement("li");
      listItem.className = "word-count-list__item";
      listItem.innerHTML = `${key} - ${value}`;
      wordCountList.appendChild(listItem);
      counter++;
    } else break;
  }
};

//This function will remove existing images from gallery
function removeChildElements(parentDiv) {
  //run a loop to remove child nodes
  while (parentDiv.hasChildNodes()) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

//This is the main function that makes fetch calls to provided API
const loadUrl = function(userInput) {
  let url = `${apiUrl}?Url=${userInput}`;

  return fetch(url, {
    method: "GET",
    mode: "cors",
    origin: "*",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      createGallery(response.imageUrls);
      totalWordCount(response);
      wordCount(response.wordCount);
    })
    .catch(error => {
      console.log("error", error);
    });
};

//handle User Input or search query
let inputTag = document.getElementsByClassName("seacrh-form__input")[0];
let inputBtn = document.getElementsByClassName("search-form__btn")[0];

inputBtn.addEventListener("click", e => {
  e.preventDefault();
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0];
  removeChildElements(thumbnailDiv);
  let searchInput = inputTag.value;
  loadUrl(searchInput);
});
