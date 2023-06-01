const categoriesContainer = document.querySelector('.categories');
const productsContainer = document.querySelector('.products');
const productDetailsContainer = document.querySelector('.product-details');

const buyButton = document.getElementById('buyButton');
const orderForm = document.getElementById('orderForm');
orderForm.style.display = 'none';
const confirmOrder = document.getElementById('confirmOrder');
const orderInfo = document.getElementById('orderInfo');

const categories = [
    { id: 1, name: 'Книги' },
    { id: 2, name: 'Одяг' },
    { id: 3, name: 'Їжа' },
];

const products = [
    { id: 1, name: 'Роман', categoryId: 1, price: 120, description: 'Володар перснів' },
    { id: 2, name: 'Детектив', categoryId: 1, price: 125, description: 'Пригоди Шерлока Холмса' },
    { id: 3, name: 'Футболка', categoryId: 2, price: 500, description: 'Футболка Fila 107749-Z4 56-58' },
    { id: 4, name: 'Штани', categoryId: 2, price: 600, description: 'Штани C&A FL2133310-Beige XL' },
    { id: 5, name: 'Піца', categoryId: 3, price: 250, description: 'Піца Техас' },
    { id: 6, name: 'Суші', categoryId: 3, price: 550, description: 'Суші Філадельфія сет' },
];

const renderCategories = () => {
    console.log('renderCategories');
    categoriesContainer.innerHTML = '<h3>Перелік категорій</h3>';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.innerText = category.name;
        categoryElement.addEventListener(
            'click',
            () => {
                renderProducts(category.id);
            }
        );
        categoriesContainer.appendChild(categoryElement);
    });
};

const renderProducts = (categoryId) => {
    console.log('renderProducts');
    productsContainer.innerHTML = '<h3>Товари категорії</h3>';
    if (!categoryId) {
        return;
    }

    const filteredProducts = products.filter(product => product.categoryId === categoryId);

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerText = product.name;
        productElement.addEventListener(
            'click',
            () => {
                renderProductsDetails(product);
            }
        );

        productsContainer.appendChild(productElement);
    });
};

const renderProductsDetails = (product) => {
    console.log('renderProductsDetails');
    productDetailsContainer.innerHTML = '';

    if (!product) {
        return;
    }

    const productDetailsElement = document.createElement("div");

    productDetailsElement.innerHTML = `
    <h3>${product.name}</h3> 
    <div>${product.description}</div> 
    <div>${product.price}</div>` ;

    productDetailsElement.appendChild(buyButton);

    productDetailsContainer.appendChild(productDetailsElement);

    buyButton.addEventListener("click", function () {
        orderForm.style.display = "block";
    });

    confirmOrder.addEventListener('click', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const city = document.getElementById('city').value;
        const post = document.getElementById('post').value;
        const payment = document.getElementById('payment').value;
        const quantity = document.getElementById('quantity').value;
        const comment = document.getElementById('comment').value;
        if (name && city && post && payment && quantity) {
            const order = {
                product: product,
                name: name,
                city: city,
                post: post,
                payment: payment,
                quantity: quantity,
                comment: comment,
                date: new Date().toLocaleDateString()
            };

            saveOrder(order);

            orderInfo.innerHTML = `
            <h2>Інформація про замовлення</h2>
            <h3>Інформація про товар:</h3>
            <p>Назва товару: ${product.name}</p>
            <p>Опис товару: ${product.description}</p>
            <p>Ціна: ${product.price}</p>
            <h3>Інформація про доставку:</h3>
            <p>ПІБ покупця: ${name}</p>
            <p>Місто: ${city}</p>
            <p>Склад Нової пошти: ${post}</p>
            <p>Спосіб оплати: ${payment}</p>
            <p>Кількість товару: ${quantity}</p>
            <p>Коментар до замовлення: ${comment}</p>`;

            orderForm.style.display = 'none';
        } else {
            alert(`Будь ласка, заповніть всі обов'язкові поля`);
        }
    });
};

const saveOrder = (order) => {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
};

const displayOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orderInfo.innerHTML = '<h2>Мої замовлення</h2>';

    if (orders.length === 0) {
        orderInfo.innerHTML += '<p>У вас немає збережених замовлень.</p>';
    } else {
        orders.forEach((order, index) => {
            const orderElement = document.createElement('div');
            orderElement.classList.add('order');
            const orderSummary = document.createElement('div');
            orderSummary.classList.add('order_summary');
            orderSummary.innerHTML = `
            <h3>Замовлення №${index + 1}</h3>
            <p>Дата: ${order.date}</p>
            <p>Ціна: ${order.product.price}</p>`;

            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order_details');
            orderDetails.innerHTML = `
            <p>Назва товару: ${order.product.name}</p>
            <p>Опис товару: ${order.product.description}</p>
            <p>ПІБ покупця: ${order.name}</p>
            <p>Місто: ${order.city}</p>
            <p>Склад Нової пошти: ${order.post}</p>
            <p>Спосіб оплати: ${order.payment}</p>
            <p>Кількість товару: ${order.quantity}</p>
            <p>Коментар до замовлення: ${order.comment}</p>
            <button class="delete_order" data-order-index="${index}">Видалити замовлення</button>`;

            orderElement.appendChild(orderSummary);
            orderElement.appendChild(orderDetails);
            orderInfo.appendChild(orderElement);
        });

        handleDeleteOrder();
    }
};

const handleDeleteOrder = () => {
    const deleteButtons = document.querySelectorAll('.delete_order');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderIndex = button.getAttribute('data_order_index');
            deleteOrder(orderIndex);
        });
    });
};

const deleteOrder = (orderIndex) => {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(orderIndex, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
};

const myOrdersButton = document.getElementById('orders_btn');
myOrdersButton.addEventListener('click', () => {
    categoriesContainer.style.display = 'none';
    productsContainer.style.display = 'none';
    productDetailsContainer.style.display = 'none';
    orderForm.style.display = 'none';
    displayOrders();
});

renderCategories();
renderProducts();
renderProductsDetails();

if (localStorage.getItem('orders')) {
    displayOrders();
}