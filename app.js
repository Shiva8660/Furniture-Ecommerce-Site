let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    // Hide checkout form and restore checkout button when closing cart
    checkoutForm.style.display = 'none';
    checkoutBtn.style.display = 'block';
})

    let filteredProducts = [];

const filterProducts = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    addDataToHTML();
}

const addDataToHTML = () => {
    // remove datas default from HTML
    listProductHTML.innerHTML = '';
    
    // add new datas
    if(filteredProducts.length > 0) {
        // Group products by category
        const productsByCategory = {};
        filteredProducts.forEach(product => {
            if (!productsByCategory[product.category]) {
                productsByCategory[product.category] = [];
            }
            productsByCategory[product.category].push(product);
        });

        // Create sections for each category
        Object.keys(productsByCategory).forEach(category => {
            // Create category heading
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');
            const categoryHeading = document.createElement('h2');
            categoryHeading.classList.add('category-heading');
            categoryHeading.textContent = category;
            categorySection.appendChild(categoryHeading);

            // Create product grid for this category
            const productGrid = document.createElement('div');
            productGrid.classList.add('product-grid');

            // Add products for this category
            productsByCategory[category].forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                productGrid.appendChild(newProduct);
            });

            categorySection.appendChild(productGrid);
            listProductHTML.appendChild(categorySection);
        });
    }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let cartTotal = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            cartTotal += info.price * item.quantity;
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
    document.getElementById('cartTotalAmount').innerText = `$${cartTotal.toFixed(2)}`;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        filteredProducts = [...products];
        addDataToHTML();

        // Add search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });


        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
// Handle checkout button click
const checkoutBtn = document.querySelector('.checkOut');

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        // Store products data in localStorage for checkout page
        localStorage.setItem('products', JSON.stringify(products));
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty!');
    }
});

// Validate card number
function validateCard(cardNumber) {
    // Remove spaces and non-digit characters
    const cleanNumber = cardNumber.replace(/\D/g, '');
    // Check if the card number is between 13 and 19 digits
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i]);
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cardNumber = document.getElementById('card').value;
    if (!validateCard(cardNumber)) {
        alert('Please enter a valid card number');
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        card: cardNumber,
        total: document.getElementById('cartTotalAmount').innerText
    };
    
    // Show processing message
    const submitBtn = document.querySelector('.submit-order');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate processing (in real app, this would be an API call)
    setTimeout(() => {
        // Clear cart and reset UI
        cart = [];
        localStorage.removeItem('cart');
    
        // Reset form
        document.getElementById('checkoutForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    
        // Show success message then redirect
        alert('Order placed successfully! Thank you for your purchase.');
    
        // Redirect to shop.html
        window.location.href = 'shop.html';
    }, 1500);    
});

initApp();