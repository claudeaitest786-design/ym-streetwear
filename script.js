// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    if (!cartItems || !totalPrice) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>R${item.price} x ${item.quantity}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

function addToCart(product, price) {
    const existingItem = cart.find(item => item.name === product);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: product, price: parseInt(price), quantity: 1 });
    }
    updateCartDisplay();
    alert('Item added to cart!');
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'https://www.instagram.com/ym_streetwear/';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            addToCart(product, price);
        });
    });

    // Update cart display on cart page
    updateCartDisplay();

    // Add page transition behavior for internal navigation
    const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
            if (isExternal) return;

            event.preventDefault();
            document.body.classList.add('page-leave');
            setTimeout(() => {
                window.location.href = href;
            }, 450);
        });
    });

    // Loading animation and slide-in effect
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    setTimeout(() => {
        loading.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});