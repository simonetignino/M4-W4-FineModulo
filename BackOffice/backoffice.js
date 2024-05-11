const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"

// FUNZIONE PER AGGIUNGERE UN NUOVO ARTICOLO
function addArticle() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    const product = {
        name: name,
        description: description,
        imageUrl: imageUrl,
        brand: brand,
        price: price 
    }
    console.log("ciao");
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then((response) => response.json())
        .then((newProduct) => {
            addCardArticle(newProduct);
        })
        .catch((error) =>{
            console.error("Errore:", error);
        })
}

// FUNZIONE PER AGGIUNGERE UNA CARD ARTICOLO
function addCardArticle(product) {
    // Creo un nuovo div per la card utente
    const card = document.getElementById("div");
    card.classList.add("product-card");

    // Creo i tag per i vari dati dell'articolo
    const name = creaElementoConTesto("h3", product.name);
    const description = creaElementoConTesto("p", product.description);
    const imageUrl = creaElementoConTesto("img", product.imageUrl);
    const brand = creaElementoConTesto("p", product.brand);
    const price = creaElementoConTesto("p", product.price);

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(imageUrl);
    card.appendChild(brand);
    card.appendChild(price);
}

// FUNZIONE PER CREARE UN TAG HTML CON DEL TESTO 
function creaElementoConTesto(tipoDiTag, testo) {
    const tag = document.createElement(tipoDiTag);
    tag.textContent = testo;
    return tag;
}

function infoApi() {
    fetch(url, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"
        }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}

