
//create a function to generate img tag
function createImg(src, alt, title) {
  var img = document.createElement('img');
  img.src = src;
  if ( alt != null ) img.alt = alt;
  if ( title != null ) img.title = title;

  img.className = "grid-container__thumbnails"
  return img;
}

//This function will remove existing images from gallery 
function removeChildElements() {
  //grid-container holds images that are loaded in the dom as it's child nodes.
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0]

  //run a loop to remove child nodes
  while (thumbnailDiv.hasChildNodes()) {
    thumbnailDiv.removeChild(thumbnailDiv.firstChild);
  }
}

let inputTag = document.getElementsByClassName('seacrh-form__input')[0]
inputTag.addEventListener("change", (e) => {
  removeChildElements()
  let searchInput = e.target.value

  if (searchInput == "") {
    searchInput = 'vintage'
  }
  getPhotosByPage(1, searchInput)
})

let paginationBtns = document.getElementsByClassName("pagination-container__button")

for(let i = 0; i < paginationBtns.length; i++) {
  
  paginationBtns.item(i).addEventListener('click', function() {
    removeChildElements()
    pageNumber = parseInt(this.dataset.id)
    getPhotosByPage(pageNumber, inputTag.value)
  })
}

window.addEventListener("load", function() {
  getPhotosByPage()
})

// // wrap api call in a function to make it reusable. this function will take page number as an argument and make fetch call to the api based on the provided page number. 
function getPhotosByPage(pageNumber = 1, searchQuery = 'vintage') {

  const KEY = 'f1b7bf92f0d79937504418aeaaad3907aa12ce5f5c8b06982e291d68b875d5db'
  //let URL = `https://api.unsplash.com/photos?page=${pageNumber}&client_id=${KEY}`
  let URL = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchQuery}&client_id=${KEY}`

  //make a fetch call to Unsplash api. Provide pageNumber as a variable to fetch URL
  fetch(`${URL}`)
    .then( res => res.json())
    .then(response => {

      //query the grid container div and save it in a variable.
      let thumbnailDiv = document.getElementsByClassName("grid-container")[0]

      if(response.results.length === 0) {
        errorMessage = document.createElement('p')
        errorMessage.className = "error"

        errorMessage.append("Sorry no images found :( Please try different keyword!")
        thumbnailDiv.appendChild(errorMessage)
      }
      
      //iterate over the JSON data returned by api call 
      response.results.forEach(photo => {
        
        // create a thumbnail container div for each photo returned by api
        let thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = "thumbnail-container"
        
        //create img tag for each photo returned by api
        let src = photo.urls.thumb
        //let src = photo.preview_photos[0].urls.thumb
        let title = photo.title
        let alt = photo.description
        let imgTag = createImg(src, alt, title)
        //append the image tag to  thumbnail container div
        thumbnailContainer.appendChild(imgTag)

        imgTag.addEventListener('click', function() {
          window.scroll({
            top: '10px',
            behavior: 'smooth'
          })
          createModel(photo, this)
        })

        //append thumbnail container div to main grid-container
        thumbnailDiv.appendChild(thumbnailContainer)
      })
    })
    .catch(error => {
      debugger
      alert(error)
    })
}

function createModel (photo, thumbnail) {
  document.getElementById("modal").style.display = 'block'
  thumbnail.src = photo.urls.regular
  thumbnail.className = 'grid-container__small'

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
      modal.style.display = "none";
      thumbnail.className = 'grid-container__thumbnails'
  }
}




console.log("Create image modal")