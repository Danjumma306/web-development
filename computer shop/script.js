let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = cart.length;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Search and Filter
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadCart();

  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const productList = document.getElementById("product-list");

  if (searchInput && categoryFilter && priceFilter && productList) {
    function filterProducts() {
      const searchText = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const price = priceFilter.value;

      Array.from(productList.children).forEach(product => {
        const name = product.querySelector("h4").textContent.toLowerCase();
        const productCategory = product.dataset.category;
        const productPrice = parseInt(product.dataset.price);

        let show = true;

        if (searchText && !name.includes(searchText)) show = false;
        if (category !== "all" && productCategory !== category) show = false;

        if (price !== "all") {
          const [min, max] = price.split("-").map(Number);
          if (!(productPrice >= min && productPrice <= max)) show = false;
        }

        product.style.display = show ? "block" : "none";
      });
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
  }
});
