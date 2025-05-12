document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = document.querySelector('.cart__products');

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const productId = product.getAttribute('data-id');
        const productTitle = product.querySelector('.product__title').textContent;
        const productImage = product.querySelector('.product__image').getAttribute('src');
        const productCount = product.querySelector('.product__count');
        let productQuantity = parseInt(product.querySelector('.product__quantity-value').textContent);
        const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить'; 

        // Проверяем, есть ли уже такой товар в корзине
        const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`);
        
        if (existingCartItem) {
            let existingQuantity = parseInt(existingCartItem.querySelector('.cart__product-count').textContent);
            existingCartItem.querySelector('.cart__product-count').textContent = existingQuantity + productQuantity;
        } else {
            const cartProductTemplate = `
                <div class="cart__product" data-id="${productId}">
                <img class="cart__product-image" src="${productImage}">
                <div class="cart__product-count">${productQuantity}</div>
                <button class="remove-button">Удалить</button>
            </div>
        `;

           // Создаем элемент на основе шаблонного кода
           const cartProductElement = document.createElement('div');
           cartProductElement.innerHTML = cartProductTemplate;

           const removeButton = cartProductElement.querySelector('.remove-button');
           removeButton.addEventListener('click', (e) => {
               e.preventDefault();

               cartProductElement.remove();
           });

            cartProducts.insertAdjacentElement('afterbegin', cartProductElement);
        }
    };

    // Обработчики для увеличения и уменьшения количества товара
    const quantityControls = document.querySelectorAll('.product__quantity-controls');
    quantityControls.forEach((control) => {
        const quantityValue = control.querySelector('.product__quantity-value');
        const decButton = control.querySelector('.product__quantity-control_dec');
        const incButton = control.querySelector('.product__quantity-control_inc');

        decButton.addEventListener('click', (e) => {
            event.preventDefault();

            let currentValue = parseInt(quantityValue.textContent);
            if (currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        });

        incButton.addEventListener('click', (e) => {
            event.preventDefault();

            let currentValue = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentValue + 1;
        });
    });

    // Получаем все кнопки "Добавить в корзину" и добавляем обработчики события
    const addButtons = document.querySelectorAll('.product__add');
    addButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const product = button.closest('.product');
            addToCart(product);
        });
    });
});
