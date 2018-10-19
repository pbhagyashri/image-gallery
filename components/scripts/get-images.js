// require('dotenv').config();

function img_create(src, alt, title) {
  var img = document.createElement('img');
  img.src = src;
  if ( alt != null ) img.alt = alt;
  if ( title != null ) img.title = title;

  img.className = "grid-container__thumbnails"
  return img;
}

window.addEventListener("load", function() {
  getPhotosByPage(1)
})

let paginationBtn = document.getElementsByClassName("pagination__button")
  
  for(let i = 0; i < paginationBtn.length; i++) {
    let thumbnailDiv = document.getElementsByClassName("grid-container")[0]

    paginationBtn.item(i).addEventListener('click', function() {

      while (thumbnailDiv.hasChildNodes()) {   
    
        thumbnailDiv.removeChild(thumbnailDiv.firstChild);
      }
      let index = parseInt(this.dataset.id)
      getPhotosByPage(index)
    })
  }

function getPhotosByPage(pageNumber) {
  const KEY = 'f1b7bf92f0d79937504418aeaaad3907aa12ce5f5c8b06982e291d68b875d5db'
  let URL = `https://api.unsplash.com/photos?page=${pageNumber}&client_id=${KEY}`

  //make a fetch call to Unsplash api. Provide pageNumber as a variable to fetch URL
  fetch(`${URL}`)
    .then( res => res.json())
    .then(response => {
      
      let thumbnailDiv = document.getElementsByClassName("grid-container")[0]
      
      response.forEach(photo => {

        let thumbnailContainer = document.createElement('div');
        
        let src = photo.urls.thumb
        let title = "image thumbnail"
        let alt = "thumbnail of the image"
        let imgTag = img_create(src, alt, title)
        thumbnailContainer.appendChild(imgTag)
        thumbnailDiv.appendChild(thumbnailContainer)
      })
    })
}

function createModal () {

}