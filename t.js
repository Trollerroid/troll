let users = {};
let currentUser = null;
let balance = 300000;
let cart = [];

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (users[username]) {
        alert('Username already exists!');
    } else {
        users[username] = { password: password, history: [] };
        alert('Account created! Please login.');
        showLogin();
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('shop-section').style.display = 'block';
        updateBalance();
    } else {
        alert('Invalid username or password!');
    }
}

function updateBalance() {
    document.getElementById('balance').innerText = `₱${balance}`;
}

function addItemToCart(cost, itemName) {
    cart.push({ name: itemName, cost: cost });
    alert(`${itemName} added to cart.`);
    updateCart();
}

function viewCart() {
    document.getElementById('shop-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';

    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');
    let totalCost = 0;

    cartItemsList.innerHTML = '';
    cart.forEach((item) => {
        totalCost += item.cost;
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - ₱${item.cost}`;
        cartItemsList.appendChild(listItem);
    });

    totalCostElement.innerText = `₱${totalCost}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let totalCost = cart.reduce((sum, item) => sum + item.cost, 0);
    if (balance >= totalCost) {
        balance -= totalCost;
        alert('Purchase successful!');
        cart = [];
        updateBalance();
    } else {
        alert('Not enough balance!');
    }
}

function goBackToShop() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('shop-section').style.display = 'block';
}
