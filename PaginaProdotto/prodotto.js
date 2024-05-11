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
    console.log(article);
    const container = document.getElementById(`article`)
    container.innerHTML = `
    <div class="product d-flex mt-5">
        <div class="img-product">
            <img src="${article.imageUrl}" alt="immagine articolo">
        </div>
        <div class="info-article">
            <h2>${article.name}</h2>
            <p>${article.description}</p>
            <p>${article.brand}</p>
            <p>${article.price}</p>
        </div>
    </div>
    `
}