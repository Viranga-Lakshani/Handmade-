const productsDiv = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalSpan = document.getElementById("total");
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function fetchProducts() {
    // ... (same as before)
}

fetchProducts()
    .then(products => {
        productsDiv.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <p>${product.description}</p>
            `;
            productDiv.addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });
            productsDiv.appendChild(productDiv);
        });
    })
    .catch(error => {
        // ... (same as before)
    });

function addToCart(productId, quantity = 1) { // quantity parameter
    if (!cart[productId]) {
        cart[productId] = { quantity: 0, product: products.find(p => p.id === productId) }; // Store product info
    }
    cart[productId].quantity += quantity;
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
    for (const productId in cart) {
        const item = cart[productId];
        if (item.product) {
            const itemTotal = item.product.price * item.quantity;
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
                ${item.product.name} x
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${productId}, this.value)"> - $${itemTotal}
                <button onclick="removeFromCart(${productId})">Remove</button>
            `;
            cartList.appendChild(li);
            total += itemTotal;
        }
    }
    totalSpan.textContent = total;
}

function updateQuantity(productId, quantity) {
    cart[productId].quantity = parseInt(quantity, 10);
    if(cart[productId].quantity <= 0){
        removeFromCart(productId)
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    delete cart[productId];
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    // ... (same as before)
}

updateCart();
