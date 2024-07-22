const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
const searchResult = document.getElementById("searchResult")
let products = []

const search = (searchStr) => {
    fetch('./assets/js/db.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const filteredData = data.filter(dataItem => {
                return dataItem.title.trim().toLowerCase().includes(searchStr)
            })
            render(filteredData)
        })

    // try {
    //     const resp = await fetch('../../catalog/db.json') // В эту функцию передаём ссылку на json файл
    //     const data = await resp.json()
    //     products = data
    //     console.log(products)
    // } catch (err) {
    //     console.log(err)
    // }
}

function render(products){
    if (products.length === 0) {
        searchResult.innerHTML = `<h2>Ничего не найдено</h2>`
    } else {

        const html = products.map(toHTML).join('')
        searchResult.innerHTML = html
    }
}

searchInput.addEventListener('input', (event) => {
    search(event.target.value.trim().toLowerCase())
}) 

function toHTML(product) {
    return `
                <div class="event-list" data-product-name="${product.title}" >
                    <div class="box-img">
                        <img src='${product.imgURl}' alt="event">
                    </div>
                    <h3 class="box-title box-title-shop"><a href="shop-details.html?id=${product.id}" class="inactive-link" >${product.title}</a></h3>
                    <div class="event-meta">
                        <div class="event-meta__sizes">
                            <span><svg class="ruler-icon" fill="#fff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#fff">
                                    <g id="SVGRepo_iconCarrier">
                                        <title>ruler-triangle</title>
                                        <path
                                            d="M30.531 29.469l-28.001-27.999c-0.136-0.136-0.323-0.22-0.531-0.22-0.414 0-0.75 0.336-0.75 0.75 0 0 0 0 0 0.001v-0 28c0 0.414 0.336 0.75 0.75 0.75h28c0.415-0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.53v0zM2.75 29.25v-25.439l4.197 4.197-1.485 1.531c-0.135 0.136-0.218 0.323-0.218 0.529 0 0.414 0.336 0.75 0.75 0.75 0.214 0 0.407-0.090 0.544-0.234l0-0 1.47-1.515 3.931 3.931-1.47 1.47c-0.14 0.136-0.227 0.327-0.227 0.538 0 0.414 0.336 0.75 0.75 0.75 0.211 0 0.401-0.087 0.537-0.227l1.47-1.47 3.939 3.939-1.47 1.469c-0.135 0.136-0.218 0.323-0.218 0.529 0 0.415 0.336 0.751 0.751 0.751 0.206 0 0.393-0.083 0.528-0.218l1.471-1.47 3.938 3.938-1.47 1.47c-0.136 0.136-0.22 0.324-0.22 0.531 0 0.415 0.336 0.751 0.751 0.751 0.207 0 0.395-0.084 0.531-0.22l1.47-1.47 5.188 5.188zM6.53 16.47c-0.136-0.136-0.323-0.22-0.531-0.22-0.414 0-0.75 0.336-0.75 0.75 0 0 0 0 0 0.001v-0 9c0 0.414 0.336 0.75 0.75 0.75h9c0 0 0 0 0 0 0.414 0 0.75-0.336 0.75-0.75 0-0.207-0.084-0.395-0.22-0.531v0zM6.75 25.25v-6.439l6.439 6.439z">
                                        </path>
                                    </g>
                                </svg>${product.features[0].depth} x ${product.features[0].width}</span>
                            ${product.features[1] ? (
                                `<span><svg class="ruler-icon" fill="#fff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                    transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#fff">
                                    <g id="SVGRepo_iconCarrier">
                                        <title>ruler-triangle</title>
                                        <path
                                            d="M30.531 29.469l-28.001-27.999c-0.136-0.136-0.323-0.22-0.531-0.22-0.414 0-0.75 0.336-0.75 0.75 0 0 0 0 0 0.001v-0 28c0 0.414 0.336 0.75 0.75 0.75h28c0.415-0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.53v0zM2.75 29.25v-25.439l4.197 4.197-1.485 1.531c-0.135 0.136-0.218 0.323-0.218 0.529 0 0.414 0.336 0.75 0.75 0.75 0.214 0 0.407-0.090 0.544-0.234l0-0 1.47-1.515 3.931 3.931-1.47 1.47c-0.14 0.136-0.227 0.327-0.227 0.538 0 0.414 0.336 0.75 0.75 0.75 0.211 0 0.401-0.087 0.537-0.227l1.47-1.47 3.939 3.939-1.47 1.469c-0.135 0.136-0.218 0.323-0.218 0.529 0 0.415 0.336 0.751 0.751 0.751 0.206 0 0.393-0.083 0.528-0.218l1.471-1.47 3.938 3.938-1.47 1.47c-0.136 0.136-0.22 0.324-0.22 0.531 0 0.415 0.336 0.751 0.751 0.751 0.207 0 0.395-0.084 0.531-0.22l1.47-1.47 5.188 5.188zM6.53 16.47c-0.136-0.136-0.323-0.22-0.531-0.22-0.414 0-0.75 0.336-0.75 0.75 0 0 0 0 0 0.001v-0 9c0 0.414 0.336 0.75 0.75 0.75h9c0 0 0 0 0 0 0.414 0 0.75-0.336 0.75-0.75 0-0.207-0.084-0.395-0.22-0.531v0zM6.75 25.25v-6.439l6.439 6.439z">
                                        </path>
                                    </g>
                                </svg>${product.features[1].depth} x ${product.features[1].width}</span>`
                            ) : ``
                            }
                        </div>
                
                    </div>
                    <div class="content-price">
                        <div class="price-block">
                            <div class="price-block__one">
                                <p class="price-cart box-title">${product.features[0].price}р</p>
                            </div>
                            ${product.features[1] ? (
                                `<div class="price-block__one">
                                    <p class="price-cart box-title">${product.features[1].price}р</p>
                                </div>`
                            ) : ``
                            }
                
                        </div>
                        <!-- <a href="event-details.html" class="th-btn btn-blick btn-shopping"><i class="fa-regular fa-cart-shopping"></i></a> -->
                    </div>
                </div>
            `
}