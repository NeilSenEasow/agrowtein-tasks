document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = [];

    // Fetch products from API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button data-id="${product.id}">Add to Cart</button>
                `;
                productsContainer.appendChild(productElement);
            });

            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.product button').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const product = products.find(p => p.id == productId);
                    addToCart(product);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Add product to cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.title} - $${item.price.toFixed(2)} x ${item.quantity}
                <button data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Add event listener to "Remove" button
            cartItem.querySelector('button').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });
        cartTotalElement.textContent = total.toFixed(2);
    }

    // Remove product from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});
