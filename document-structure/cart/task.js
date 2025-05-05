document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = document.querySelector('.cart__products');

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const productId = product.getAttribute('data-id');
        const productTitle = product.querySelector('.product__title').textContent;
        const productImage = product.querySelector('.product__image').getAttribute('src');
        const productCount = product.querySelector('.product__count');
        let productQuantity = parseInt(product.querySelector('.product__quantity-value').textContent);
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`);
        
        if (existingCartItem) {
            let existingQuantity = parseInt(existingCartItem.querySelector('.cart__product-count').textContent);
            existingCartItem.querySelector('.cart__product-count').textContent = existingQuantity + productQuantity;
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.classList.add('cart__product');
            cartProduct.setAttribute('data-id', productId);
            
            const cartProductImage = document.createElement('img');
            cartProductImage.classList.add('cart__product-image');
            cartProductImage.src = productImage;
            
            const cartProductTitle = document.createElement('div');
            cartProductTitle.textContent = productTitle;

            const cartProductCount = document.createElement('div');
            cartProductCount.classList.add('cart__product-count');
            cartProductCount.textContent = productQuantity;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            
            removeButton.addEventListener('click', () => {
                cartProduct.remove();
            });

            cartProduct.appendChild(cartProductImage);
            cartProduct.appendChild(cartProductTitle);
            cartProduct.appendChild(cartProductCount);
            cartProduct.appendChild(removeButton);
            cartProducts.appendChild(cartProduct);
        }
    };

    // Обработчики для увеличения и уменьшения количества товара
    const quantityControls = document.querySelectorAll('.product__quantity-controls');
    quantityControls.forEach((control) => {
        const quantityValue = control.querySelector('.product__quantity-value');
        const decButton = control.querySelector('.product__quantity-control_dec');
        const incButton = control.querySelector('.product__quantity-control_inc');

        decButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.textContent);
            if (currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        });

        incButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentValue + 1;
        });
    });

    // Получаем все кнопки "Добавить в корзину" и добавляем обработчики события
    const addButtons = document.querySelectorAll('.product__add');
    addButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const product = button.closest('.product');
            addToCart(product);
        });
    });
});