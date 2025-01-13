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
            checkoutItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">
                ${item.title} - $${item.price.toFixed(2)} x ${item.quantity}
            `;
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
//Push changes to github
// git add .
// git commit -m "Added checkout functionality"
// git push origin main

