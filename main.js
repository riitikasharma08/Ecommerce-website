let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }

    let addCartButtons = document.getElementsByClassName("add-cart");
    for (let button of addCartButtons) {
        button.addEventListener("click", addCartClicked);
    }
}

function removeCartItem(event) {
    event.target.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price = shopProduct.getElementsByClassName("price")[0].innerText;
    let productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartItemNames = cartContent.getElementsByClassName("cart-product-title");

    for (let name of cartItemNames) {
        if (name.innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

function updateTotal() {
    let cartContent = document.querySelector('.cart-content');
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let cartBox of cartBoxes) {
        let priceElement = cartBox.querySelector(".cart-price");
        let quantityElement = cartBox.querySelector(".cart-quantity");
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.querySelector(".total-price").innerText = "$" + total;
}
