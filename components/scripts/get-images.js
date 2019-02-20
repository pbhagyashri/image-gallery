//create a function to generate img tag
const createImg = function(src) {
  var img = document.createElement('img');
  img.src = src;
  //if ( alt != null ) img.alt = alt;
  //if ( title != null ) img.title = title;

  img.className = "grid-container__thumbnails"
  
  return img;
}

const createGallery = function(response) {
  //query the grid container div and save it in a variable.
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0]

  response.forEach(imageUrl => {
    
    // create a thumbnail container div for each photo returned by api
    let thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = "thumbnail-container";
  
    //create img tag for each photo returned by api
    let imgTag = createImg(imageUrl);
    //append the image tag to  thumbnail container div
    thumbnailContainer.appendChild(imgTag);

    //append thumbnail container div to main grid-container
    thumbnailDiv.appendChild(thumbnailContainer);

    imgTag.addEventListener('click', function() {
      createModel(photo, this)
    })
    
  });
};

//this function displays total word count
const TotalWordCount = function(response) {
  let totalCountContainer = document.getElementById("total-word-count");

  totalCountContainer.innerHTML = response.totalWordCount
  
}

//this function displays a list of words with their counts.
const WordCount = function(responseObject) {
  let wordCountList = document.getElementById("word-count-list");
 

  for (let key in responseObject) {

    let value = responseObject[key];
    let listItem = document.createElement('li');

    listItem.className = "word-count-list__item";

    listItem.innerHTML = `${key} - ${value}`

    wordCountList.appendChild(listItem)

  }

};

//This function opens an image in a model when user clicks the image
function createModel (photo, thumbnail) {
  document.getElementById("modal").style.display = 'block'
  // thumbnail.src = photo.urls.regular
  // thumbnail.className = 'grid-container__small'

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
      modal.style.display = "none";
      thumbnail.className = 'grid-container__thumbnails'
  }
}

//let url = 'https://carouselexample.azurewebsites.net/api/values?Url=blog.atish.me';
//let url = 'https://carouselexample.azurewebsites.net/api/values?Url=';

//This is the main function that makes fetch calls to provided API
const LoadUrl = function(userInput) {
  let url = `https://carouselexample.azurewebsites.net/api/values?Url=${userInput}`

  return fetch(url, {
    method: "GET",
    mode: "cors",
    origin: "*",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then( res => res.json())
	.then(response => {
   
    createGallery(response.imageUrls)
    TotalWordCount(response)
    WordCount(response.wordCount)
    
  })
  .catch(error => {
    console.log("error", error)
  })
      
}

//handle User Input or search query
let inputTag = document.getElementsByClassName('seacrh-form__input')[0]
let inputBtn = document.getElementsByClassName('search-form__btn')[0]
 
inputBtn.addEventListener("click", (e) => {
  e.preventDefault()  
   //removeChildElements()
  let searchInput = inputTag.value
 
  // if (searchInput == "") {
  //   searchInput = 'vintage'
  // }
  LoadUrl(searchInput)
})

