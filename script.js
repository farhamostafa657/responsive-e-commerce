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

async function filterProducts() {
  let data = await fetchProducts();
  let product = " ";
  data.forEach((element) => {
    product += `<div class="col-sm-6 col-lg-3">
                       <div class="product-item bg-light p-4 shadow-on-hover my-3 ${
                         element.category.name
                       } card ">
                      <img src="${element.image}" alt="">
                      <div class="product-content-item">
                        <div class="my-2">
                          <span>Rated(5.4)</span>
                          <span class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                          </span>
                          <h5 class="mt-1 mb-2"><a href="#">${element.title
                            .toUpperCase()
                            .slice(0, 13)}</a></h5>
                          <p>${element.description.slice(0, 27)}</p>
                           <div class="cart-style"><a href=""><i class="fa-solid fa-cart-shopping"></a></i></div>
                        </div>
                    </div>
                    </div>
                   
                  </div>
     
                   
    `;
  });
  document.getElementById("product-list").innerHTML = product;
}
