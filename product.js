const productDetailsDiv = document.getElementById("product-details");
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

fetchProducts()
    .then(products => {
        const product = products.find(p => p.id === productId);
        if (product) {
            productDetailsDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
                <p>${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
        } else {
            productDetailsDiv.innerHTML = "<p>Product not found.</p>";
        }
    });

function fetchProducts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const products = [
                { id: 1, name: "Wooden Bowl", price: 25, image: "bowl.jpg", description: "Hand-turned wooden bowl." },
                { id: 2, name: "Ceramic Mug", price: 15, image: "mug.jpg", description: "Hand-painted ceramic mug." },
                { id: 3, name: "Woven Basket", price: 30, image: "basket.jpg", description: "Hand-woven storage basket." }
            ];
            resolve(products);
        }, 500);
    });
}

function addToCart(productId, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (!cart[productId]) {
        cart[productId] = { quantity: 0, product: products.find(p => p.id === productId) };
    }
    cart[productId].quantity += quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "index.html";
}
