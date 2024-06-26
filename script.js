const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"
let articoli = [];
const filterInput = document.getElementById(`search-btn`)

window.onload = async () => {
    await showArticle();
}
const showArticle = async () => {
    mostraSpinner();
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, 
        },
    })
    const articles = await response.json();
    // console.log(articles);
    const articlesContainer = document.getElementById(`products-list`);
    // console.log(articlesContainer);

    if(articlesContainer) {
        nascondSpinner();
        articlesContainer.innerHTML = articles.map((article) => 
        `   <div class="col-2 col-md-3 col-lg-4 card-product">
                <div class="card shadow-sm w-100 h-100">
                    <div class="d-flex align-items-center justify-content-center mt-3"><img src="${article.imageUrl}" alt="immagine prodotto"></div>
                    <div class="card-body">
                        <h3 class="card-text">${article.name}</h3>
                        <p class="card-text">${article.description}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="./PaginaProdotto/prodotto.html?id=${article._id}" class='btn btn-sm btn-outline-secondary'>Dettagli<i class="bi bi-info-circle ms-2"></i></a>
                                <button type="button" class="btn btn-sm btn-success" onclick="addToCart('${article.name}', '${article.price}', '${article.description.replace(/'/g, ' \\\' ')}', '${article._id}')">Aggiungi<i class="bi bi-cart ms-2"></i></button>
                            </div>
                            <small class="text-body-secondary">€${article.price}</small>
                        </div>
                    </div>
                </div>
            </div>`
        ).join(``);
        // console.log(articlesContainer);
        articoli = [...articles];
    }
}
let totCart = 0;
let totArticle = 0;

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
    const totaleArticoli = document.querySelector("#total-articles")
    totArticle++;
    totaleArticoli.innerHTML = totArticle;
  };

// FUNZIONE PER SVUOTARE IL CARRELLO 
const deleteAll = () => {
    let contenitore = document.getElementById(`cart`)
    contenitore.innerHTML = ``;
    const totale = document.querySelector("#totalPrice");
    totale.innerHTML = `Totale carrello: 0.00`;
    const totaleArticoli = document.querySelector("#total-articles")
    totaleArticoli.innerHTML = 0;
  }

// FUNZIONE PER TOGLIERE UN ARTICOLO DAL CARRELLO
function removeArticle(idArticle, price) {
    const totale = document.querySelector("#totalPrice");
    price = (Number(price));
    totCart-=price;
    totale.innerHTML = `Totale carrello: €${totCart.toFixed(2)}`;
    const card = document.getElementById(idArticle);
    card.remove();
    const totaleArticoli = document.querySelector("#total-articles")
    totArticle--;
    totaleArticoli.innerHTML = totArticle;
}

//FUNZIONE PER MOSTRARE IL CARICAMENTO 
function mostraSpinner() {
    document.getElementById(`spinner`).style.display="flex";
}
function nascondSpinner() {
    document.getElementById(`spinner`).style.display="none";
}

// FUNZIONE PER CERCARE UN PRODOTTO 
filterInput.addEventListener(`input`, () =>{
    let contenitore = document.getElementById(`products-list`);
    contenitore.innerHTML = ``;
    const searchText = filterInput.value;
    const filteredArticles = articoli.filter((articoli) => {
      const output = articoli.name.toLowerCase().includes(searchText.toLowerCase());
      return output;
    })
    filteredArticles.forEach(articolo => {
      contenitore.innerHTML += 
      ` <div class="col-2 col-md-3 col-lg-4 card-product">
            <div class="card shadow-sm w-100 h-100">
                <div class="d-flex align-items-center justify-content-center mt-3"><img src="${articolo.imageUrl}" alt="immagine prodotto"></div>
                <div class="card-body">
                    <h3 class="card-text">${articolo.name}</h3>
                    <p class="card-text">${articolo.description}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href="./PaginaProdotto/prodotto.html?id=${articolo._id}" class='btn btn-sm btn-outline-secondary'>Dettagli<i class="bi bi-info-circle ms-2"></i></a>
                            <button type="button" class="btn btn-sm btn-success" onclick="addToCart('${articolo.name}', '${articolo.price}', '${articolo.description}', '${articolo._id}')">Aggiungi<i class="bi bi-cart ms-2"></i></button>
                        </div>
                        <small class="text-body-secondary">€${articolo.price}</small>
                    </div>
                </div>
            </div>
        </div>`
    });
  })