document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize cart count
    updateCartCount();

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

    // Update cart display and count
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
        updateCartCount();
    }

    // Update cart count display
    function updateCartCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }
});
