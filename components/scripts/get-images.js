// require('dotenv').config();

const KEY = 'f1b7bf92f0d79937504418aeaaad3907aa12ce5f5c8b06982e291d68b875d5db'
const URL = `https://api.unsplash.com/photos/?client_id=${KEY}`

function img_create(src, alt, title) {
  var img = document.createElement('img');
  img.src = src;
  if ( alt != null ) img.alt = alt;
  if ( title != null ) img.title = title;
  return img;
}

window.addEventListener("load", function() {
  fetch(`${URL}`)
    .then( res => res.json())
    .then(response => {
      var img = response[0].urls.small
      document.getElementById("image").src = img
    })
})