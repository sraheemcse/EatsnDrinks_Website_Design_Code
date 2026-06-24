/* ==========================================================================
   GLOBAL STATE & PRODUCT DEFINITIONS
   ========================================================================== */
const PRODUCTS = {
    1: { id: 1, name: "Classic Salted Makhana (Fox Nuts)", price: 169, weight: "70g" },
    2: { id: 2, name: "Spicy Masala Makhana (Fox Nuts)", price: 169, weight: "70g" },
    3: { id: 3, name: "Tangy Tomato Makhana (Fox Nuts)", price: 169, weight: "70g" },
    4: { id: 4, name: "Cream & Onion Makhana (Fox Nuts)", price: 169, weight: "70g" },
    5: { id: 5, name: "Cheese & Herbs Makhana (Fox Nuts)", price: 169, weight: "70g" },
    6: { id: 6, name: "Pudina Punch Makhana (Fox Nuts)", price: 169, weight: "70g" },
    7: { id: 7, name: "Sweet & Sour Makhana (Fox Nuts)", price: 169, weight: "70g" },
    8: { id: 8, name: "Premium Plain Makhana (Fox Nuts)", price: 389, weight: "250g" }
};

let cart = [];

/* ==========================================================================
   RESPONSIVE NAVIGATION ACTIONS
   ========================================================================== */
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        menuIcon.className = "fa-solid fa-xmark";
    } else {
        menuIcon.className = "fa-solid fa-bars";
    }
}

// Close menu when a navigation item is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const menuIcon = document.getElementById('menuIcon');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuIcon.className = "fa-solid fa-bars";
        }
    });
});

/* ==========================================================================
   CART FUNCTIONALITY & DOM MANIPULATION
   ========================================================================== */
function toggleCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    cartDrawer.classList.toggle('open');
}

function addToCart(productId) {
    const targetProduct = PRODUCTS[productId];
    if (!targetProduct) return;

    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({
            ...targetProduct,
            quantity: 1
        });
    }

    updateCartUI();
    
    // Slide-open drawer automatically to show success
    const cartDrawer = document.getElementById('cartDrawer');
    if (!cartDrawer.classList.contains('open')) {
        cartDrawer.classList.add('open');
    }
}

function removeFromCart(productId) {
    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
            existingCartItem.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartBody = document.getElementById('cartBody');
    const cartCount = document.getElementById('cartCount');
    const cartTotalValue = document.getElementById('cartTotalValue');
    
    // Elements for checkout synchronization
    const summaryItemsList = document.getElementById('summaryItemsList');
    const subtotalPrice = document.getElementById('subtotalPrice');
    const grandTotalPrice = document.getElementById('grandTotalPrice');

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Sync global counter badge & drawer total value
    cartCount.innerText = totalItems;
    cartTotalValue.innerText = `₹${totalPrice.toFixed(2)}`;

    // Build Cart Drawer Panel
    if (cart.length === 0) {
        cartBody.innerHTML = `<div class="empty-cart-msg">Your cart is currently empty!</div>`;
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} (${item.weight})</div>
                </div>
                <div class="cart-item-controls">
                    <button onclick="removeFromCart(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="addToCart(${item.id})">+</button>
                </div>
            </div>
        `).join('');
    }

    // Build Checkout Order Summary Side-Panel
    if (cart.length === 0) {
        summaryItemsList.innerHTML = `<p class="neutral-text">Please add items to your cart to begin.</p>`;
        subtotalPrice.innerText = "₹0.00";
        grandTotalPrice.innerText = "₹0.00";
    } else {
        summaryItemsList.innerHTML = cart.map(item => `
            <div class="summary-row">
                <span>${item.name} (x${item.quantity})</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        subtotalPrice.innerText = `₹${totalPrice.toFixed(2)}`;
        grandTotalPrice.innerText = `₹${totalPrice.toFixed(2)}`;
    }
}

/* ==========================================================================
   PAYMENT TAB MANAGEMENT
   ========================================================================== */
function switchTab(event, tabId) {
    // Hide active tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Reset active state classes on tab links
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Highlight selected configurations
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function handlePaymentSubmit(event) {
    event.preventDefault();
    alert("Live payments and checkout gateway integrations are [Coming Soon]. No charges have been made.");
}

/* ==========================================================================
   INTERACTIVE CHAT WIDGET
   ========================================================================== */
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('open');
}

// Format credit card inputs cleanly as user typing
const cardNumberField = document.getElementById('cardNumber');
if (cardNumberField) {
    cardNumberField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = "";
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += " ";
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });
}

// Format CC Expiry Input Field
const expiryField = document.getElementById('expiry');
if (expiryField) {
    expiryField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length > 2) {
            e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
        } else {
            e.target.value = value;
        }
    });
}
