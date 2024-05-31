//* HTML Elements
var inputName = document.getElementById("name");
var inputCategory = document.getElementById("category");
var inputPrice = document.getElementById("price");
var inputDescription = document.getElementById("description");
var inputFoto = document.getElementById("foto");
var addBtn = document.getElementById("add");
var cardsRow = document.getElementById("cards");
var inputSearch = document.getElementById("inputSearch");
var updateBtn = document.getElementById("update");
var test = document.getElementById("test");
var board = document.querySelector(".board");
updateBtn.style.display = "none";

//* App variable
var isValid = true;
var photoPath;

var nameRegex = /^[A-Z][a-z]{3,}$/;
var categoryRegex = /^[A-Z][a-z]{3,}$/;
var priceRegex = /^([1-9]|[1-9][0-9]|100)$/;
var descriptionRegex = /^[a-z\s]{15,100}$/;
var productList = JSON.parse(localStorage.getItem("products")) || [];
var temp;

displayAllProduct();

//! Functions
function addProduct() {
  if (
    validate(nameRegex, inputName) &&
    validate(categoryRegex, inputCategory) &&
    validate(priceRegex, inputPrice) &&
    validate(descriptionRegex, inputDescription)
  ) {
    var product = {
      name: inputName.value,
      category: inputCategory.value,
      price: inputPrice.value,
      description: inputDescription.value,
      fotoPath: photoPath,
      //"./css/images/hero.jpg",
    };

    //console.log(product);
    productList.push(product);
    console.log(productList);
    localStorage.setItem("products", JSON.stringify(productList));
    displayProduct(productList.length - 1);
    clearInputs();
    inputName.classList.remove("is-valid");
    inputCategory.classList.remove("is-valid");
    inputPrice.classList.remove("is-valid");
    inputDescription.classList.remove("is-valid");
    scroll({
      top: 1600,
    });
    board.classList.add("d-none");
  } else {
    alert("data not correct");
  }
}

function displayProduct(index) {
  var productHtml = `<div class="col-sm-6 col-md-4 col-lg-3 animate__animated animate__bounceInLeft animate__fast" id="test">
  <div class="inner">
    <div class="card-img">
      <img src=${productList[index].fotoPath} alt="hero" class="w-100" />
    </div>
    <div class="content bg-body-secondary p-2">
      <div class="d-flex justify-content-between align-items-center">
        <h3>${productList[index].name}</h3>
        <span>${productList[index].price} $</span>
      </div>
      <p class="mw-100">${productList[index].description}</p>
      <div class="btns d-flex justify-content-between align-items-center">
        <button class="btn btn-outline-danger" onclick="updateProduct(${index})">update</button>
        <button class="btn btn-outline-warning" onclick="deleteProduct(${index})">delete</button>
      </div>
    </div>
  </div>
</div>`;
  cardsRow.innerHTML += productHtml;
}

function displayAllProduct() {
  if (productList.length > 0) {
    for (var i = 0; i < productList.length; i++) {
      displayProduct(i);
      board.classList.add("d-none");
    }
  } else {
    board.classList.remove("d-none");
  }
}

function clearInputs() {
  inputName.value = "";
  inputCategory.value = "";
  inputPrice.value = "";
  inputDescription.value = "";
  inputFoto.value = null;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  cardsRow.innerHTML = "";
  displayAllProduct();
}

function searchProducts() {
  cardsRow.innerHTML = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) {
      displayProduct(i);
    }
  }
}

function updateProduct(index) {
  temp = index;
  inputName.value = productList[index].name;
  inputCategory.value = productList[index].category;
  inputPrice.value = productList[index].price;
  inputDescription.value = productList[index].description;
  addBtn.style.display = "none";
  updateBtn.style.display = "block";
  scroll({
    top: 600,
    behavior: "smooth",
  });
}

function saveUpdate() {
  if (
    validate(nameRegex, inputName) &&
    validate(categoryRegex, inputCategory) &&
    validate(priceRegex, inputPrice) &&
    validate(descriptionRegex, inputDescription)
  ) {
    console.log(temp);
    productList[temp].name = inputName.value;
    productList[temp].category = inputCategory.value;
    productList[temp].price = inputPrice.value;
    productList[temp].description = inputDescription.value;
    console.log(productList[temp]);
    localStorage.setItem("products", JSON.stringify(productList));
    cardsRow.innerHTML = "";
    displayAllProduct();
    clearInputs();
    scroll({
      top: 1600,
    });
    addBtn.style.display = "block";
    updateBtn.style.display = "none";
    inputName.classList.remove("is-valid");
    inputCategory.classList.remove("is-valid");
    inputPrice.classList.remove("is-valid");
    inputDescription.classList.remove("is-valid");
  } else {
    alert("data not correct");
  }
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function setCalss(p) {
  p.setAttribute(
    "class",
    "animate__animated animate__bounceInLeft animate__fast"
  );
}

//! save fotos
inputFoto.addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsDataURL(inputFoto.files[0]);
  reader.addEventListener("load", () => {
    const url = reader.result;
    photoPath = url;
    console.log(photoPath);
  });
});
