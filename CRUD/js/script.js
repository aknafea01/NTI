let titleInput = document.getElementById("pTitle");
let priceInput = document.getElementById("pPrice");
let categoryInput = document.getElementById("pCategory");
let descriptionInput = document.getElementById("pDescription");

let btn = document.getElementById("btn");
let searchInput = document.getElementById("search");
let output = document.getElementById("output");

let allProducts;
let flag = 0;
let superIndex = 0;
if (JSON.parse(localStorage.getItem("allProducts")) == null) {
  allProducts = [];
} else {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  display();
  console.log(allProducts);
}
function display() {
  let markup = "";
  for (let i = 0; i < allProducts.length; i++) {
    markup += `
      <tr>
        <td>${i}</td>
        <td>${allProducts[i].title}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].desc}</td>
        <td><button class="btn btn-outline-primary btn-sm" onclick="editElement(${i})">update</button></td>
        <td><button class="btn btn-outline-danger btn-sm " onclick="deleteElement(${i})">delete</button></td>
      </tr>
    `;
  }
  output.innerHTML = markup;
  formRest();
}

function deleteElement(i) {
  allProducts.splice(i, 1);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  display();
  flag = 0;
}

function editElement(i) {
  titleInput.value = allProducts[i].title;
  priceInput.value = allProducts[i].price;
  categoryInput.value = allProducts[i].category;
  descriptionInput.value = allProducts[i].desc;
  btn.innerHTML = "Edit Product";
  superIndex = i;
  flag = 1;
}
function formRest() {
  titleInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
}
function search() {
  let markup = ``;
  for (let i = 0; i < allProducts.length; i++) {
    if (new RegExp(searchInput.value, "i").test(allProducts[i].title)) {
      markup += `
      <tr>
        <td>${i}</td>
       <td>${allProducts[i].title.replace(
         new RegExp(searchInput.value, "i"),
         (match) => `<span style='color:#52489C'>${match}</span>`
       )}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].desc}</td>
        <td><button class="btn btn-outline-primary btn-sm" onclick="editElement(${i})">update</button></td>
        <td><button class="btn btn-outline-danger btn-sm " onclick="deleteElement(${i})">delete</button></td>
      </tr>
    `;
    }
  }
  output.innerHTML = markup;
}

btn.addEventListener("click", () => {
  if (flag) {
    btn.innerHTML = "Add Product";
    allProducts[superIndex] = {
      title: titleInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      desc: descriptionInput.value,
    };
    flag = 0;
  } else {
    let currentProduct = {
      title: titleInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      desc: descriptionInput.value,
    };
    allProducts.push(currentProduct);
  }
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  display();
});
