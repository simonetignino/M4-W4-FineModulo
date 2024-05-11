const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzg4ZDcyYjNlYTAwMTU3MWZjZjAiLCJpYXQiOjE3MTUzNTM3NDEsImV4cCI6MTcxNjU2MzM0MX0.XbyKU3YTRF6pKCqAz_xIKR0dDq4gBqFftfa0Ac2Mv80"

window.onload = async () => {
    await showArticle();
}
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
            `<div class="col-2 col-md-3 col-lg-4" id="card-product">
                <div class="card shadow-sm w-100 h-100">
                    <div class="d-flex align-items-center justify-content-center mt-3"><img src="${article.imageUrl}" alt="immagine prodotto"></div>
                    <div class="card-body">
                        <h3 class="card-text">${article.name}</h3>
                        <p class="card-text">${article.description}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Add To Cart</button>
                            </div>
                            <small class="text-body-secondary">€${article.price}</small>
                        </div>
                    </div>
                </div>
            </div>`
        ).join(``);
        // console.log(articlesContainer);
    }
}