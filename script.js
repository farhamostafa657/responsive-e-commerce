const showLoginForm = document.querySelector(".header .nav-bar .log-btn");
const formPopup = document.querySelector(".form-popup");
const hideLoginForm = document.querySelector(".log-in .fa-solid");
const hideSignUpForm = document.querySelector(".form-popup-sign-up .fa-solid");
const loginSignUpLink = document.querySelector(
  ".form-popup .form-box .sign-up a"
);
const signupLoginLink = document.getElementById("signup-login-link");

showLoginForm.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

hideLoginForm.addEventListener("click", () => showLoginForm.click());
hideSignUpForm.addEventListener("click", () => {
  $(".form-popup-sign-up").css("display", "none");
  $(".blurred-background").css({
    opacity: 0,
    "pointer-events": "none",
  });
});

loginSignUpLink.addEventListener("click", (e) => {
  document.body.classList.remove("show-popup");
  e.preventDefault();
  $(".form-popup-sign-up").css("display", "flex");
  $(".blurred-background").css({
    opacity: 1,
    "pointer-events": "auto",
  });
});

signupLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("show-popup");
  $(".form-popup-sign-up").css("display", "none");
  $(".blurred-background").css({
    opacity: 1,
    "pointer-events": "auto",
  });
});

// handle login form backend

const emailLog = document.getElementById("emailLgin");
const passLogin = document.getElementById("passLogin");
const submitLogin = document.getElementById("submitLogin");
const emailLoginError = document.getElementById("emailError");
const passLoginError = document.getElementById("passError");
const submitLoginError = document.getElementById("submitError");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

async function checkUser(users) {
  for (const user of users) {
    if (user.email === emailLog.value) {
      if (user.password !== passLogin.value) {
        console.log(passLogin.value);
        console.log(user.password);
        console.log("error");
        $(".form-popup").css("height", "300px");
        $("#submitError").css({
          color: "red",
          fontSize: "0.8rem",
        });

        submitLoginError.innerHTML = "wrong password";

        return "wrong password";
      } else {
        console.log("this user");
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("avatar", user.avatar);

        console.log("id and name and role saved in local storage");
        submitLoginError.innerHTML = "";
        $(".form-popup").css("height", "260px");
        return "verified";
      }
    }
  }

  // If no email matched after looping through all users
  console.log("email not found");
  $(".form-popup").css("height", "340px");
  $("#submitError").css({
    color: "red",
    fontSize: "0.8rem",
  });
  submitLoginError.innerHTML =
    "email or password isn't connected to an account.";

  return "no email";
}

// submitLogin.addEventListener("submit", submitLoginfun);

async function submitLoginfun(e) {
  e.preventDefault();
  if (emailLog.value == "" || passLogin.value == "") {
    $(".form-popup").css("height", "300px");
    $("#submitError").css({
      color: "red",
      fontSize: "0.8rem",
    });
    submitLoginError.innerHTML = "please whrite your email and password";
    console.log("please whrite your email and password");
  } else {
    submitLoginError.innerHTML = "";
    $(".form-popup").css("height", "260px");
  }
  const users = await fetchData();
  let userV = await checkUser(users);
  console.log(userV);
  if (userV == "verified") {
    $(".form-popup").css("display", "none");
    $(".log-btn").css("display", "none");
    $(".blurred-background").css({ opacity: 0, "pointer-events": "none" });
    $(".nav-bar .name-user").css("display", "flex");
    document.getElementById("add-user-nav").innerHTML = `
    <img src="${sessionStorage.getItem("avatar")}" alt="" />
          <span>${sessionStorage.getItem("name")}</span>`;
  }
}

// handle backend signup
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPass =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const regexName = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;

//handle shopping to display Products

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = () => {
  filterProducts();
};

async function filterProducts() {
  console.log();
  let data = await fetchProducts();
  showProducts(data, "product-list");
}

async function showClothes() {
  const data = await fetchProducts();
  let clotesProducts = data.filter((ele) => ele.category == "men's clothing");
  console.log(clotesProducts);
  showProducts(clotesProducts, "cloth-list");
}

async function womenLothing() {
  const data = await fetchProducts();
  let clotesProducts = data.filter((ele) => ele.category == "women's clothing");
  console.log(clotesProducts);
  showProducts(clotesProducts, "women-list");
}

async function jewellery() {
  const data = await fetchProducts();
  let ourJewellery = data.filter((ele) => ele.category == "jewelery");
  showProducts(ourJewellery, "our-jewelery");
}

async function electronics() {
  const data = await fetchProducts();
  let our_electronics = data.filter((ele) => ele.category == "electronics");
  showProducts(our_electronics, "our-electronics");
}

function showProducts(data, id) {
  let product = " ";
  data.forEach((element) => {
    product += `<div class="col-sm-6 col-lg-3">
                       <div class="product-item bg-light p-4 shadow-on-hover my-3 ${
                         element.category
                       } card ">
                            <img src="${element.image}" alt="">
                            <div class="product-content-item">
                                <div class="my-2">
                                   <h5 id="productTitle"  class="mt-1 mb-2"><a href="#">${element.title
                                     .toUpperCase()
                                     .slice(0, 13)}</a></h5>
                                               <p>${element.description.slice(
                                                 0,
                                                 27
                                               )}</p>
                                                 <span id="productPrice">${
                                                   element.price
                                                 }$ </span>
                                                 <span class="stars">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                              </span>
                                
                                              <div class="cart-style"><i class="fa-solid fa-cart-shopping shopCartt"></i></div>
                             </div>
                    </div>
                    </div>
                   
                  </div>
     
                   
    `;
  });
  document.getElementById(`${id}`).innerHTML = product;
}

// cart

const cartIcon = document.getElementById("cartIcon");
const cartAppear = document.getElementById("cart-icon");
const close = document.getElementById("close-cart-id");

cartIcon.addEventListener("click", () => {
  cartAppear.classList.add("active");
});

close.addEventListener("click", () => {
  cartAppear.classList.remove("active");
});

//add to cart button

document.addEventListener("click", (event) => {
  if (event.target.closest(".shopCartt")) {
    const productBox = event.target.closest(".product-item");
    if (productBox) {
      addToCartFunc(productBox);
    } else {
      console.log("No product box found");
    }
  }
});

const cartContent = document.getElementById("cartContent");
function addToCartFunc(productBox) {
  const productImg = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector("#productTitle").textContent;
  const productPrice = productBox.querySelector("#productPrice").textContent;

  let cartItems = cartContent.querySelectorAll(".productTitle");

  for (const title of cartItems) {
    if (title.textContent == productTitle) {
      alert("this item already exist in the cart");
      return;
    }
  }

  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-detail", "px-2", "py-2");
  cartBox.innerHTML = `
  
          <div class="row">
            <div class="col-3">
              <img class="w-100" src="${productImg}" alt="">
            </div>
            <div class="col-5 text-start d-flex flex-column justify-content-around">
              <span class="productTitle">${productTitle}</span>
              <span class="productPrice">${productPrice}</span>
              <div class="quantitty">
                <button class="minus" >-</button>
                <span class="number">1</span>
                <button class="plus">+</button>
              </div>
              
            </div>
            <i id="removeItemInCart" class="fa-solid fa-trash col-2 d-flex align-items-center justify-content-center removeItem"></i>
          </div>
          
       

  `;

  cartContent.appendChild(cartBox);

  const removeItem = cartBox.querySelector(".removeItem");
  removeItem.addEventListener("click", () => {
    cartBox.remove();
    updateTotalPrice();
    updateTotalCountInCart(-1);
  });

  let quantitty = cartBox.querySelector(".number");
  const minus = cartBox.querySelector(".minus");
  const plus = cartBox.querySelector(".plus");
  let number = quantitty.textContent;

  minus.addEventListener("click", () => {
    if (number > 1) {
      number--;
      quantitty.textContent = number;
      updateTotalPrice();
      minus.style.backgroundColor = "";
    } else {
      minus.style.color = "#999";
    }
  });

  plus.addEventListener("click", () => {
    if (number < 10) {
      number++;
      quantitty.textContent = number;
      updateTotalPrice();
      minus.style.color = "";
    }
  });
  updateTotalCountInCart(1);
  updateTotalPrice();
}

const updateTotalPrice = () => {
  let totalPrice = document.querySelector("#totalPriceCart");
  let cartBoxes = cartContent.querySelectorAll(".cart-detail");
  let total = 0;
  for (const box of cartBoxes) {
    let priceElement = box.querySelector(".productPrice").textContent;
    let price = priceElement.replace("$", "");
    let quantitty = box.querySelector(".number").textContent;
    console.log(quantitty);
    total += price * quantitty;
    console.log(total);
  }

  totalPrice.textContent = `${total}$`;
};
let cartItemCount = 0;
const updateTotalCountInCart = (num) => {
  const cartIconePage = document.querySelector(".addCart");
  cartItemCount += num;
  if (cartItemCount >= 1) {
    cartIconePage.style.visibility = "visible";
    cartIconePage.textContent = cartItemCount;
  } else {
    cartIconePage.style.visibility = "hidden";
    cartIconePage.textContent = "";
  }
};

const buyNowButton = document.querySelector("#btn-buy-card");

buyNowButton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-detail");
  if (cartBoxes.length == 0) {
    alert("your cart is empty please add item to cart before buying");
    return;
  }

  cartBoxes.forEach((box) => box.remove());
  cartItemCount = 0;
  updateTotalCountInCart(0);
  updateTotalPrice();
  alert("thank you for your purchase!");
});
