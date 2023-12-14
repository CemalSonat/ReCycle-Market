// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANJy_bzbbKqX8PSmlTKSzk-YbsbC6cf0c",
  authDomain: "recycle-market-b2a8e.firebaseapp.com",
  databaseURL: "https://recycle-market-b2a8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recycle-market-b2a8e",
  storageBucket: "recycle-market-b2a8e.appspot.com",
  messagingSenderId: "665277872695",
  appId: "1:665277872695:web:4228bcddfa3ba97bf6ddb2",
  measurementId: "G-445X6GZ9FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Cart working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making function
function ready(){
    console.log("Ready function called!");
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
       var button = addCart[i];
       button.addEventListener("click", addCartClicked);
    }
    // Buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
}
// Buy button
function buyButtonClicked(){
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// JavaScript for modal
let addProductBtn = document.getElementById("addProductBtn");
let addProductModal = document.getElementById("addProductModal");

function openModal() {
    addProductModal.classList.add("active");
}

function closeModal() {
    addProductModal.classList.remove("active");
}

function addProduct() {
    // Add logic to add product to your system
    closeModal();
}

addProductBtn.addEventListener("click", openModal);


// Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
} 

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already added this item to your cart");
            return;
        }
    }

var cartBoxContent = `
                         <img src="${productImg}" alt="" class="cart-img">
                         <div class="detail-box">
                               <div class="cart-product-title">${title}</div>
                               <div class="cart-price">${price}</div>
                            </div>
                         <!-- Remove Cart -->
                         <i class='bx bxs-trash-alt cart-remove'></i> `;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem); 
}

// Update total
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
       var cartBox = cartBoxes[i];
       var priceElement = cartBox.getElementsByClassName("cart-price")[0];
       var price = parseFloat(priceElement.innerText.replace("₺", ""));
       total = total + price;
    }
       total = Math.round(total * 100) / 100;
       
       document.getElementsByClassName("total-price")[0].innerText = "₺" + total;
    
 }