let html = "";

products.forEach(({ id, image, name, rating, priceCents }) => {
  const starsCount = rating.stars * 10;

  html += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="images/ratings/rating-${starsCount}.png">
      <div class="product-rating-count link-primary">
        ${rating.count}
      </div>
    </div>

    <div class="product-price">
      $${priceCents / 100}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-button" data-product-id="${id}"> Add to cart</button>
  </div>`;
});

document.querySelector(".products-grid").innerHTML = html;

document.querySelectorAll(".js-add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const selectedQuantity = parseInt(
      button.parentElement.querySelector(".product-quantity-container select")
        .value
    );

    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity: selectedQuantity,
      });
    }

    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    document.querySelector(".cart-quantity").innerHTML = totalQuantity;

    const addedToCart = button.parentElement.querySelector(".added-to-cart");
    addedToCart.style.opacity = "1";

    setTimeout(() => {
      addedToCart.style.opacity = "0";
    }, 2000);
  });
});
