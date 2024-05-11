const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"

// FUNZIONE PER AGGIUNGERE UN NUOVO ARTICOLO

const addArticle = async() => {
    event.preventDefault()

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
    // console.log(product);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
    if (response.ok) {
        console.log("articolo aggiunto con successo");
        resetForm(name, description, imageUrl, brand, price);
    }
    showArticle()
}
// document.getElementById("form").addEventListener("submit", addArticle)

// FUNZIONE PER MOSTRARE LA LISTA DEGLI ARTICOLI (SOLO BACKOFFICE)
const showArticle = async () => {
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
        articlesContainer.innerHTML = articles.map((article) => 
            `<div id="article" class="d-flex align-items-center">
                <div id="article-name ">
                    <h4>${article.name}</h4>
                    <span id="id" style="font-size: 8px; font-style: italic;">${article._id}</span>
                </div>
                <button class="btn btn-success m-3">Modifica</button>
                <button class="btn btn-danger" onclick="deleteArticle()">Cancella</button>
            </div>`
        ).join(``);
        // console.log(articlesContainer);
    }
}

// FUNZIONE PER CANCELLARE UN ARTICOLO 
const deleteArticle = async () => {
    const id = document.getElementById(`id`).innerHTML;
    console.log(id);
    const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
        }
    });
    if (response.ok) {
        alert(`Articolo cancellato con successo`)
        await showArticle();
    }
}

//FUNZIONE PER RESETTARE IL FORM 
function resetForm (name, description, imageUrl, brand, price) {
    name = document.getElementById("name").value = "";
    description = document.getElementById("description").value = "";
    imageUrl = document.getElementById("imageUrl").value = "";
    brand = document.getElementById("brand").value = "";
    price = document.getElementById("price").value = "";
}





// FUNZIONE PER AGGIUNGERE UNA CARD ARTICOLO
// function addCardArticle(product) {
//     // Creo un nuovo div per la card utente
//     const card = document.createElement("div");
//     card.classList.add("product-card");

//     // Creo i tag per i vari dati dell'articolo
//     const name = creaElementoConTesto("h3", product.name);
//     const description = creaElementoConTesto("p", product.description);
//     const imageUrl = creaElementoConTesto("img", product.imageUrl);
//     const brand = creaElementoConTesto("p", product.brand);
//     const price = creaElementoConTesto("p", product.price);

//     card.appendChild(name);
//     card.appendChild(description);
//     card.appendChild(imageUrl);
//     card.appendChild(brand);
//     card.appendChild(price);
// }

// // FUNZIONE PER CREARE UN TAG HTML CON DEL TESTO 
// function creaElementoConTesto(tipoDiTag, testo) {
//     const tag = document.createElement(tipoDiTag);
//     tag.textContent = testo;
//     return tag;
// }

// function infoApi() {
//     fetch(url, {
//         headers: {
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"
//         }
//     })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }

