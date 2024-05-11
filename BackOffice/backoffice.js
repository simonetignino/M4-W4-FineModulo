const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"
// estrai l'id dal permalink
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramId = urlParams.get('id');

// FUNZIONE PER AGGIUNGERE UN NUOVO ARTICOLO

const addArticle = async() => {
    event.preventDefault()
    mostraSpinner();

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
        nascondSpinner();
        alert("articolo aggiunto con successo");
        resetForm(name, description, imageUrl, brand, price);
    }
    showArticle()
}
// document.getElementById("form").addEventListener("submit", addArticle)

// FUNZIONE PER MOSTRARE LA LISTA DEGLI ARTICOLI (SOLO BACKOFFICE)
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
            `<div id="${article._id}" class="d-flex align-items-center">
                <div class="w-50 overflow-hidden" id="article-name ">
                    <h4>${article.name}</h4>
                </div>
                <button class="btn btn-warning m-3" onclick="getValueForm('${article._id}')">Modifica</button>
                <button id=""class="btn btn-danger" onclick="deleteArticle()">Cancella</button>
            </div>`
        ).join(``);
        // console.log(articlesContainer);
    }
}

// FUNZIONE PER CANCELLARE UN ARTICOLO 
const deleteArticle = async () => {
    mostraSpinner()
    const id = event.target.parentNode.id;
    // console.log(id);
    const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
        }
    });
    if (response.ok) {
        nascondSpinner();
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

// FUNZIONE PER COMPILARE IN AUTOMATICO IL FORM CON I DATI DELL'UTENTE DA MODIFICARE
//ho creato questa varibiale per segnarmi l'id dell'articolo in modifica
let idArticolo = "";
const getValueForm = async (idInInput) => {
    const id = idInInput || paramId; 
    if (id) {
        const response = await fetch (url + id, {
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        })
        const product = await response.json();
        document.getElementById(`name`).value = product.name;   
        document.getElementById(`description`).value = product.description;   
        document.getElementById(`imageUrl`).value = product.imageUrl;   
        document.getElementById(`brand`).value = product.brand;   
        document.getElementById(`price`).value = product.price;  
        idArticolo = product._id; 
    } 
}

// FUNZIONE PER MODIFICARE UN ARTICOLO
const updateProduct = async () => {
    event.preventDefault();
    
    // console.log(idArticolo);
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    // Creo un nuovo articolo con i nuovi dati
    const updatedProduct = {
        name: name,
        description: description,
        imageUrl: imageUrl,
        brand: brand,
        price: price
    };
    const response = await fetch(url + idArticolo, {
        method: "PUT",
        headers:{ 
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
    });
    if(response.ok) {
        alert(`Utente aggiornato con successo`);
        await showArticle();
        resetForm(name, description, imageUrl, brand, price);
    }
}

// FUNZIONE PER IL CARICAMENTO 
function mostraSpinner() {
    document.getElementById(`spinner`).style.display="flex";
  }
function nascondSpinner() {
    document.getElementById(`spinner`).style.display="none";
  }