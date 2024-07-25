// script.js

// Variáveis globais para o carrinho de compras
const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addressInput = document.getElementById('address');
const cartCount = document.getElementById('cart-count'); // Elemento para mostrar a quantidade de itens no carrinho

// Função para atualizar o carrinho de compras
function updateCart() {
    // Limpa a lista de itens do carrinho
    cartItemsList.innerHTML = '';
    
    // Inicializa o total em 0
    let total = 0;

    // Itera sobre cada item no carrinho
    cart.forEach((item, index) => {
        // Cria um elemento de lista para cada item
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between mb-2';

        // Define o conteúdo do item
        listItem.innerHTML = `
            <span>${item.name} (R$ ${item.price.toFixed(2)})</span>
            <button class="remove-btn bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Remover</button>
        `;

        // Adiciona o item à lista de itens do carrinho
        cartItemsList.appendChild(listItem);

        // Adiciona o preço do item ao total
        total += item.price;
    });

    // Atualiza o elemento de total no carrinho
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Atualiza o contador do carrinho
    cartCount.textContent = cart.length;

    // Adiciona eventos de clique para os botões de remover
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Função para adicionar um item ao carrinho
function addToCart(event) {
    const button = event.currentTarget; // Usa currentTarget para garantir o elemento correto
    const name = button.getAttribute('data-name'); // Obtém o nome do produto
    const price = parseFloat(button.getAttribute('data-price')); // Obtém o preço do produto

    // Adiciona o item ao array do carrinho
    cart.push({ name, price });

    // Atualiza o carrinho
    updateCart();
}

// Função para remover um item do carrinho
function removeFromCart(event) {
    const index = event.currentTarget.getAttribute('data-index'); // Usa currentTarget para garantir o elemento correto
    cart.splice(index, 1); // Remove o item do array do carrinho
    updateCart(); // Atualiza o carrinho
}

// Função para exibir o modal do carrinho
function showCart() {
    cartModal.classList.remove('hidden');
}

// Função para ocultar o modal do carrinho
function hideCart() {
    cartModal.classList.add('hidden');
}

// Adiciona eventos de clique para os botões de adicionar ao carrinho
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', addToCart);
});

// Evento de clique para o botão do carrinho
cartBtn.addEventListener('click', showCart);

// Evento de clique para o botão de fechar o carrinho
closeCartBtn.addEventListener('click', hideCart);

// Evento de clique para o botão de finalizar compra
checkoutBtn.addEventListener('click', () => {
    const address = addressInput.value.trim();

    if (cart.length === 0) {
        alert('O carrinho está vazio. Adicione itens antes de finalizar a compra.');
        return;
    }

    if (address === '') {
        alert('Por favor, digite seu endereço.');
        return;
    }

    // Lógica para processar a compra
    alert('Compra finalizada com sucesso!');
    cart.length = 0; // Limpa o carrinho
    updateCart();
    hideCart();
});














