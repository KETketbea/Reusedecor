document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    const navMenu = document.querySelector('.nav-menu');
    const menu = document.querySelector('.menu');
    menu.addEventListener('click', () => {
        menu.classList.toggle('ativo');
        navMenu.classList.toggle('ativo');
    });

    const comprarButtons = document.querySelectorAll('.comprar-btn');
    const removerButtons = document.querySelectorAll('.remover-btn');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('totalPrice');
    const cartItemsContainer = document.getElementById('cartItems');

    let cartItems = {};

    // Event listener para botões de comprar
    comprarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            addToCart(productName, productPrice);
            updateCart();
        });
    });

    // Event listener para botões de remover
    removerButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            removeFromCart(productName);
            updateCart();
        });
    });

    function addToCart(productName, productPrice) {
        if (!cartItems[productName]) {
            cartItems[productName] = {
                quantity: 1,
                price: productPrice
            };
        } else {
            cartItems[productName].quantity++;
        }
    }

    function removeFromCart(productName) {
        if (cartItems[productName] && cartItems[productName].quantity > 0) {
            cartItems[productName].quantity--;
            if (cartItems[productName].quantity === 0) {
                delete cartItems[productName];
            }
        }
    }

    function updateCart() {
        let totalItems = 0;
        let totalPrice = 0;

        cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho

        for (const productName in cartItems) {
            if (cartItems.hasOwnProperty(productName)) {
                const itemCount = cartItems[productName].quantity;
                const itemPrice = cartItems[productName].price;

                totalItems += itemCount;
                totalPrice += itemCount * itemPrice;

                const productElement = document.createElement('div');
                productElement.classList.add('cart-item');

                const itemName = document.createElement('p');
                itemName.textContent = productName;
                itemName.classList.add('cart-item-name');
                productElement.appendChild(itemName);

                const itemQuantityContainer = document.createElement('div');
                itemQuantityContainer.classList.add('cart-item-quantity');

                const minusButton = document.createElement('button');
                minusButton.innerHTML = '<i class="fas fa-minus"></i>';
                minusButton.classList.add('cart-item-control', 'minus');
                minusButton.addEventListener('click', () => {
                    removeFromCart(productName);
                    updateCart();
                });
                itemQuantityContainer.appendChild(minusButton);

                const itemCountSpan = document.createElement('span');
                itemCountSpan.textContent = itemCount;
                itemCountSpan.classList.add('cart-item-count');
                itemQuantityContainer.appendChild(itemCountSpan);

                const plusButton = document.createElement('button');
                plusButton.innerHTML = '<i class="fas fa-plus"></i>';
                plusButton.classList.add('cart-item-control', 'plus');
                plusButton.addEventListener('click', () => {
                    addToCart(productName, itemPrice);
                    updateCart();
                });
                itemQuantityContainer.appendChild(plusButton);

                productElement.appendChild(itemQuantityContainer);

                const itemPriceSpan = document.createElement('span');
                itemPriceSpan.textContent = `R$ ${itemPrice.toFixed(2)}`;
                itemPriceSpan.classList.add('cart-item-price');
                productElement.appendChild(itemPriceSpan);

                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="fas fa-trash"></i> Remover';
                removeButton.classList.add('cart-item-remove');
                removeButton.addEventListener('click', () => {
                    removeFromCart(productName);
                    updateCart();
                });
                productElement.appendChild(removeButton);

                cartItemsContainer.appendChild(productElement);
            }
        }

        cartCount.textContent = totalItems;
        totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`; // Formata o preço com duas casas decimais
    }

    // Inicializar o modal do Bootstrap quando o DOM estiver pronto
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    // Selecionar o ícone do carrinho e adicionar o evento de clique para mostrar o modal
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', () => {
        updateCart(); // Atualizar o carrinho antes de mostrar o modal
        cartModal.show(); // Mostrar o modal do carrinho
    });
});
