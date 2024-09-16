document.addEventListener("DOMContentLoaded", function () {
  // prettier-ignore
  let products = [
    { id: 1, brand: "Zenit", model: "TTL", price: 50, img: "img/1.webp" },
    { id: 2, brand: "Agfa", model: "Optima", price: 150, img: "img/2.webp" },
    { id: 3, brand: "Konica", model: "Autoreflex TC", price: 120, img: "img/3.webp" },
    { id: 4, brand: "Minolta", model: "Dynax 700si", price: 220, img: "img/4.webp" },
    { id: 5, brand: "Olympus", model: "OM-4", price: 300, img: "img/5.webp" },
    { id: 6, brand: "Olympus", model: "M II", price: 350, img: "img/6.webp" },
    { id: 7, brand: "Rolleiflex", model: "Xenotar", price: 315, img: "img/7.webp" },
    { id: 8, brand: "Leica", model: "M6", price: 2000, img: "img/8.webp" },
    { id: 9, brand: "Pentax", model: "K1000", price: 180, img: "img/9.webp" },
    { id: 10, brand: "Canon", model: "AE-1", price: 250, img: "img/10.webp" },
    { id: 11, brand: "Hasselblad", model: "500C/M", price: 2500, img: "img/11.webp" },
    { id: 12, brand: "Yashica", model: "Electro 35", price: 120, img: "img/12.webp" }
  ];
  let productList = document.getElementById("productList");

  let productHtml = "";
  for (var i = 0; i < products.length; i++) {
    let product = products[i];
    productHtml += `
      <div class="pro">
        <img src="${product.img}" alt="${product.model}" />
        <div class="des">
          <span>${product.brand}</span>
          <h5>${product.model}</h5>
          <h4>$${product.price}</h4>
        </div>
        <a href="#" class="add-to-cart" data-id="${product.id}">
          <span class="material-symbols-outlined">add_shopping_cart</span>
        </a>
      </div>
    `;
  }
  productList.innerHTML = productHtml;

  let productDetails = document.getElementById("productDetails");
  let overlay = document.getElementById("overlay");
  let modal = document.getElementById("modal");

  productList.addEventListener("click", function (event) {
    let target = event.target.closest(".add-to-cart");
    if (target) {
      event.preventDefault();
      let productId = target.getAttribute("data-id");
      let product = products.find(function (p) {
        return p.id == productId;
      });
      localStorage.setItem("selectedProduct", JSON.stringify(product));

      productDetails.innerHTML = `
        <p><strong>${product.brand} ${product.model}</strong></p>
        <p>Price: $${product.price}</p>
        <img src="${product.img}" alt="${product.model}" class=productImg />
        <p>Total: $<span id="totalAmount">${product.price}</span></p>
      `;

      overlay.style.display = "block";
      modal.style.display = "block";

      var checkboxes = document.querySelectorAll("input[name='accessories']");
      for (var j = 0; j < checkboxes.length; j++) {
        checkboxes[j].addEventListener("change", function () {
          updateTotal(product.price);
        });
      }
    }
  });

  function updateTotal(productPrice) {
    var total = productPrice;
    var checkedCheckboxes = document.querySelectorAll(
      "input[name='accessories']:checked"
    );
    for (var k = 0; k < checkedCheckboxes.length; k++) {
      var checkbox = checkedCheckboxes[k];
      total += parseFloat(checkbox.getAttribute("data-price"));
    }
    document.getElementById("totalAmount").textContent = total.toFixed(2);
  }

  document
    .getElementById("confirmPurchaseBtn")
    .addEventListener("click", function () {
      let form = document.getElementById("CameraForm");
      let ownerName = form.querySelector("#ownerName").value.trim();
      let deliveryDate = form.querySelector("#deliveryDate").value;
      let errorMessage = document.getElementById("errorMessage");

      let errorMessages = [];
      if (ownerName.split(" ").length < 2) {
        errorMessages.push("Please enter your full name");
      }
      if (!deliveryDate) {
        errorMessages.push("Please select a delivery date");
      }

      if (errorMessages.length) {
        errorMessage.innerHTML = errorMessages.join("<br>");
        errorMessage.style.display = "block";
      } else {
        errorMessage.style.display = "none";
        localStorage.setItem(
          "totalAmount",
          document.getElementById("totalAmount").textContent
        );
        window.location.href = "thankyou.html";
      }
    });

  document.getElementById("closeModal").addEventListener("click", function () {
    overlay.style.display = "none";
    modal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const totalAmount = localStorage.getItem("totalAmount");
  const productInfo = document.getElementById("productInfo");
  const totalAmountElement = document.getElementById("totalAmount");

  if (product) {
    productInfo.innerHTML = `
            <h2>${product.brand} ${product.model}</h2>
            <img src="${product.img}" alt="${product.model}" />
            <p>Price: $${product.price}</p>
          `;
    totalAmountElement.textContent = totalAmount;
    localStorage.clear();
  } else {
    productInfo.innerHTML = "<p>No product information available.</p>";
  }
});
