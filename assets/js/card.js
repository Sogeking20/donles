const wrapper = document.querySelector('#card-products');
const basketList = document.querySelector(".cart_list");
const basketCount = document.querySelector(".badge");
let productsData = [];
let Basket = [];


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('./assets/js/db.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
            console.log(productsData)
        }
        
        loadProductDetails(productsData);

    } catch (err) {
        console.log(err.message);
    }
}


function getParameterFromURL(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


function loadProductDetails(data) {
    
    if (!data || !data.length) {
        return;
    }
    
    const productId = Number(getParameterFromURL('id'));
    console.log(productId)
    
    if (!productId) {
        return;
    }
    
    const findProduct = data.find(card => card.id === productId);
    console.log(findProduct)
    
    if(!findProduct) {
        return;
    }
    renderInfoProduct(findProduct);
}


function renderInfoProduct(product) {
    const productItem = 
    `
    <div class="col-lg-6">
        <div class="product-big-img">
            <div class="img"><img src='${product.imgURl}' alt="Product Image"></div>
        </div>
    </div>
    <div class="col-lg-6 align-self-center">
        <div class="product-about">
            <p class="price">${product.features[0].price}р<del>3000р</del></p>
            <h2 class="product-title">${product.title}</h2>
            <div class="product-rating">
                <div class="star-rating" role="img" aria-label="Rated 5.00 out of 5"><span style="width:100%">Rated <strong class="rating">5.00</strong> out of 5 based on <span class="rating">1</span> customer rating</span></div>
                    <a href="shop-details.html" class="woocommerce-review-link">(<span class="count">4</span> customer reviews)</a>
                </div>
            <p class="text">The registration fee covers access to all conference sessions, workshops, networking events, exhibition areas, and conference materials. Please refer to the registration page for a detailed breakdown of inclusions. You can make payments through our secure online registration.</p>
            <div class="mt-2 link-inherit">
                <p>
                    <strong class="text-title me-3">Availability:</strong>
                    <span class="stock in-stock"><i class="far fa-check-square me-2 ms-1"></i>In Stock</span>
                </p>
            </div>
            <div class="actions">
                <div class="quantity">
                    <input type="number" class="qty-input" step="1" min="1" max="100" name="quantity" value="1" title="Qty">
                    <button class="quantity-plus qty-btn"><i class="far fa-chevron-up"></i></button>
                    <button class="quantity-minus qty-btn"><i class="far fa-chevron-down"></i></button>
                </div>
                <button class="th-btn" onClick="addArr('${product.id}','${product.title}','${product.imgURl}' ,'${product.features[0].price}')">Add to Cart</button>
                <a href="wishlist.html" class="icon-btn"><i class="far fa-heart"></i></a>
            </div>
            <div class="product_meta">
                <span class="sku_wrapper">SKU: <span class="sku">Coffee-Red-Mug</span></span>
                <span class="posted_in">Category: <a href="shop.html">Event Conference</a></span>
                <span>Tags: <a href="shop.html">Gift</a><a href="shop.html">Mug</a></span>
            </div>
        </div>
    </div>
    `
    wrapper.innerHTML = productItem;
}

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

getProducts();