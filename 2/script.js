let productname = document.getElementById("productname");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btn = document.getElementById("btn");

let mood = "create";
let vovo;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

btn.onclick = function () {
  let newpro = {
    productname: productname.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[vovo] = newpro;
    mood = "create";
    btn.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(datapro));

  clearData();
  showData();
};

function clearData() {
  productname.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <td>${i}</td>
        <td>${datapro[i].productname}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()" >delete All (${datapro.length})</button>
      `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);

  showData();
}

function deleteAll() {
  localStorage.clear();
  datapro.splice(0);

  showData();
}

function updateData(i) {
  productname.value = datapro[i].productname;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  btn.innerHTML = "update";
  mood = "update";
  vovo = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
