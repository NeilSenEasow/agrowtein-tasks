document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCheckout() {
        checkoutItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const checkoutItem = document.createElement('li');
            checkoutItem.textContent = `${item.title} - $${item.price.toFixed(2)} x ${item.quantity}`;
            checkoutItemsContainer.appendChild(checkoutItem);
        });
        checkoutTotalElement.textContent = total.toFixed(2);
    }

    document.getElementById('place-order').addEventListener('click', () => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    updateCheckout();
}); 