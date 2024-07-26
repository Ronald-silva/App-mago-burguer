const cartBtn = document.getElementById('cart-btn');
        const cartModal = document.getElementById('cart-modal');
        const closeCartBtn = document.getElementById('close-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');
        const paymentMethods = document.getElementsByName('payment-method');
        const changeInfo = document.getElementById('change-info');
        const changeInput = document.getElementById('change');
        const deliveryAddressInput = document.getElementById('delivery-address');

        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        let cart = [];

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemName = btn.getAttribute('data-name');
                const itemPrice = parseFloat(btn.getAttribute('data-price'));
                addToCart(itemName, itemPrice);
            });
        });

        cartBtn.addEventListener('click', () => {
            cartModal.classList.remove('hidden');
            updateCartUI();
        });

        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });

        checkoutBtn.addEventListener('click', () => {
            // Verificar se o endereço de entrega está preenchido
            const deliveryAddress = deliveryAddressInput.value.trim();
            if (deliveryAddress === '') {
                alert('Por favor, informe o endereço de entrega.');
                return;
            }

            // Verificar o método de pagamento selecionado
            let selectedPaymentMethod = null;
            paymentMethods.forEach(method => {
                if (method.checked) {
                    selectedPaymentMethod = method.value;
                }
            });

            if (!selectedPaymentMethod) {
                alert('Por favor, selecione um método de pagamento.');
                return;
            }

            const orderDetails = {
                items: cart,
                total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                paymentMethod: selectedPaymentMethod,
                change: selectedPaymentMethod === 'Dinheiro' ? parseFloat(changeInput.value) : 0,
                deliveryAddress: deliveryAddress
            };

            // Enviar o pedido para o WhatsApp
            const whatsappNumber = '5585991993833';
            let message = `Pedido realizado:\n\nItens:\n`;
            cart.forEach(item => {
                message += `- ${item.name}: R$${item.price.toFixed(2)} (x${item.quantity})\n`;
            });
            message += `\nTotal: R$${orderDetails.total.toFixed(2)}\n`;
            message += `Método de Pagamento: ${orderDetails.paymentMethod}\n`;
            if (orderDetails.paymentMethod === 'Dinheiro') {
                message += `Troco para: R$${orderDetails.change.toFixed(2)}\n`;
            }
            message += `Endereço de Entrega: ${orderDetails.deliveryAddress}`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Limpar o carrinho após a finalização
            cart = [];
            updateCartUI();
            cartModal.classList.add('hidden');
        });

        // Atualizar o campo de troco com base no método de pagamento selecionado
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                if (method.value === 'Dinheiro') {
                    changeInfo.classList.remove('hidden');
                } else {
                    changeInfo.classList.add('hidden');
                }
            });
        });

        function addToCart(name, price) {
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cart[itemIndex].quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCartUI();
        }

        function updateCartUI() {
            cartItems.innerHTML = '';
            let total = 0;
            let itemCount = 0;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'py-2');
                li.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>R$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="bg-red-500 text-white px-2 py-1 rounded remove-item-btn" data-index="${index}">Remover</button>
                `;
                cartItems.appendChild(li);
                total += item.price * item.quantity;
                itemCount += item.quantity;
            });
            cartTotal.textContent = total.toFixed(2);
            cartCount.textContent = itemCount; // Corrigido para mostrar a quantidade total de itens
            const removeItemBtns = document.querySelectorAll('.remove-item-btn');
            removeItemBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemIndex = parseInt(btn.getAttribute('data-index'));
                    cart.splice(itemIndex, 1);
                    updateCartUI();
                });
            });
        }

        function checkOperatingStatus() {
            const dateSpan = document.getElementById('date-span');
            const currentTime = new Date();
            const currentDay = currentTime.getDay();
            const currentHour = currentTime.getHours();

            // Horário de funcionamento: terça a domingo, das 18h às 23h
            const isOpen = (currentDay >= 2 && currentDay <= 7) && (currentHour >= 18 && currentHour < 23);

            dateSpan.textContent = isOpen ? 'Aberto' : 'Fechado';
            dateSpan.className = isOpen ? 'open' : 'closed';
        }

        // Verificar o status de operação ao carregar a página
        checkOperatingStatus();





