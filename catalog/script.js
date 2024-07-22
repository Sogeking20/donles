const selectElement = document.querySelector("select");
const containerElement = document.querySelector(".products-container");
const lengthElement = document.querySelector(".length");
const cartIconElement = document.querySelector(".cart-icon");
const cartElement = document.querySelector(".cart");
const crossELement = document.querySelector(".cross");
const subtotalElement = document.querySelector(".subtotal");
const addToBasketButton = document.querySelector(".catalog-card-btn");
const basketList = document.querySelector(".cart_list");
const basketCount = document.querySelector(".badge");
let Basket = []
let cartData = [];
let data = [];

const fetchData = () => {
  fetch("./db.json")
    .then((req) => req.json())
    .then((res) => (addItems(res), (data = res)));
};

fetchData();

const handleChange = (e) => {
  addItems(data, e.target.value);
};

const addItems = (data = [], sortType = "all") => {
  containerElement.innerHTML = "";
  data = data?.filter((item) =>
    sortType !== "all" ? item.type == sortType : item
  );
  lengthElement.textContent = data.length;
  data?.map((item) => {
    const { title, features, imgURl, id } = item;
    containerElement.innerHTML += `
        <div class="catalog-card">
          <a href="../shop-details.html?id=${id}">
            <div class="catalog-card-img">
              <img src="${imgURl}" alt="card img" />
            </div>
          </a>
          <a href="../shop-details.html?id=${id}"> 
          <h2 class="catalog-card-title" title='${title}'>${
        title.length > 25 ? title.slice(0, 25) + "..." : title
            }</h2></a>
          <div class="features">
            ${features.map((itemF) => {
              return `
                <div>
                  <p>
                    <img src="./img/width.svg" />
                    <span>${itemF.depth} x ${itemF.width}</span>
                  </p>
                  <p>${itemF.price}p</p>
                  <button class="catalog-card-btn" onClick="addArr('${item.id}','${item.title}','${item.imgURl}' ,'${itemF.price}')">+</button>
                </div>
              `;
            }).join("<br>")}
          </div>
        </div>
      `;
  });
};


const addArr = (id, title, img, price) => {
  let obj = { id: id, title: title, img: img, price: price };
  Basket.push(obj);
  basketCount.innerHTML = Basket.length
  let object = Basket.map((item) => {
    return `
        <li class="woocommerce-mini-cart-item mini_cart_item">
        <a href="#" onclick="removeArrBasket(${item.id})" class="remove cart-basket-delete-btn">X</a>
        <a href="../shop-details.html?id=${item.id}" style="color: #288053!important">
            <img src="${item.img}" alt="${item.title}">
            ${item.title}
        </a>
        <span class="quantity">1 × 
            <span class="woocommerce-Price-amount amount">
                <span class="woocommerce-Price-currencySymbol">${item.price}</span>
            </span>
        </span>
    </li>`
  });

  basketList.innerHTML = object;
};

const removeArrBasket = (id) => {
  Basket = Basket.filter((item) => item.id != id);
  basketCount.innerHTML = Basket.length
  console.log(Basket);
  console.log(Basket.length)

  let object = Basket.map((item) => {
    return `
        <li class="woocommerce-mini-cart-item mini_cart_item">
        <a href="#" onclick="removeArrBasket(${item.id})" class="remove cart-basket-delete-btn">X</a>
        <a href="../shop-details.html?id=${item.id}" style="color: #288053!important">
            <img src="${item.img}" alt="${item.title}">
            ${item.title}
        </a>
        <span class="quantity">1 × 
            <span class="woocommerce-Price-amount amount">
                <span class="woocommerce-Price-currencySymbol">${item.price}</span>
            </span>
        </span>
    </li>`
  });

  basketList.innerHTML = object;
};

const pushArr = (id, title, img, price) => {
  const obj = { id, title, img, price };
  cartData.push(obj);
};

selectElement.addEventListener("change", handleChange);

cartIconElement.addEventListener("click", () => {
  document.body.style = "overflow:hidden;";
  cartElement.classList = `cart visible ${cartData.length > 0 ? "" : "empty"}`;
  cartElement.querySelector("woocommerce-mini-cart cart_list product_list_widget").innerHTML = "";

  cartData.map((item) => {
    const { img, title, price } = item;
    cartElement.querySelector("ul").innerHTML += `
     <li>
      <img src="${img}" alt="img" class="cart-img" />
      <div class="cart-content">
       <h4>${title}</h4>
       <p>1 x ${price}p</p>
      </div>
      <img src="./img/cross.svg" alt="cross"/>
     </li>
    `;
  });
});

const deleteCartItem = (e, id) => {
  console.log(e);
  console.log(id);
};

crossELement.addEventListener("click", () => {
  cartElement.classList = "cart hidden";
  document.body.style = "overflow:auto;";
});
