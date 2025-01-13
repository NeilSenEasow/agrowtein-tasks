document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartCountElement = document.getElementById('cart-count');
    const loadingSpinner = document.getElementById('loading-spinner');
    const notification = document.getElementById('notification');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize cart count
    updateCartCount();

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';

            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <div class="product-footer">
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });

            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.product button').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const product = products.find(p => p.id == productId);
                    addToCart(product);

                    // Show "Added to Cart" notification
                    showNotification('Added to Cart!');
                });
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
            // Hide loading spinner in case of error
            loadingSpinner.style.display = 'none';
        });

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

    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        notification.classList.add('visible'); // Add a class for animation
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300); // Wait for the fade-out animation to finish
        }, 2000); // Keep notification visible for 2 seconds
    }
    
});
