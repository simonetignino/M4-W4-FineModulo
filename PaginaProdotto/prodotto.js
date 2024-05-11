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

let totCart = 0;

// FUNZIONE PER AGGIUNGERE UN ARTICOLO AL CARRELLO
const addToCart = (title, price, description, id) => {
    let contenitore = document.getElementById(`cart`);
      contenitore.innerHTML += `
      <div class="card col-md-8 w-100 mb-2" id="${id}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p id="price" class="cart-text m-0 p-0">€${price}</p>
          <p id="description" class="cart-text my-2 p-0">${description}</p>
          <button onclick="removeArticle('${id}', '${price}')" class="btn btn-danger p-2 px-3"><i class="bi bi-trash3-fill fs-6"></i></button>
        </div>
      </div>`
    const totale = document.querySelector("#totalPrice")
    price = (Number(price));
    totCart+=price;
    totale.innerHTML = `Totale carrello: €${totCart.toFixed(2)}`;
  };

// FUNZIONE PER SVUOTARE IL CARRELLO 
const deleteAll = () => {
    let contenitore = document.getElementById(`cart`)
    contenitore.innerHTML = ``;
  }

// FUNZIONE PER TOGLIERE UN ARTICOLO DAL CARRELLO
function removeArticle(idArticle, price) {
    const totale = document.querySelector("#totalPrice");
    price = (Number(price));
    totCart-=price;
    totale.innerHTML = `Totale carrello: €${totCart.toFixed(2)}`;
    const card = document.getElementById(idArticle);
    card.remove();
}