const parametri = new URLSearchParams(location.search); 
const id = parametri.get(`id`);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"
// console.log(id);
const url = "https://striveschool-api.herokuapp.com/api/product/" + id;

window.onload = async () => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, 
        },
    });
    const article = await response.json()
    // console.log(article);
    const container = document.getElementById(`article`)
    container.innerHTML = `
    <div class="product d-flex mt-5">
        <div class="img-product">
            <img src="${article.imageUrl}" alt="immagine articolo">
        </div>
        <div class="info-article mx-5">
            <h2>${article.name}</h2>
            <p class="mt-4">${article.description}</p>
            <p class="fw-bold">${article.brand}</p>
            <p>€${article.price}</p>
            <button class="btn btn-success" onclick="addToCart('${article.name}', '${article.price}', '${article._id}' )">Aggiungi al Carrello</button>
        </div>
    </div>
    `
}

const addToCart = (title, price, id) => {
    let contenitore = document.getElementById(`cart`);
      contenitore.innerHTML += `
      <div class="card col-md-8 w-100" id="${id}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p id="price" class="card-text">€${price}</p>
          <button onclick="remove(${id})" class="border-0 bg-transparent">Rimuovi</button>
        </div>
      </div>`
  };