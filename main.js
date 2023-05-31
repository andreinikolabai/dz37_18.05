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
    { id: 1, name: 'Роман', categoryId: 1, price: 120, description: 'Володар перснів'},
    { id: 2, name: 'Детектив', categoryId: 1, price: 125, description: 'Пригоди Шерлока Холмса'},
    { id: 3, name: 'Футболка', categoryId: 2, price: 500, description: 'Футболка Fila 107749-Z4 56-58'},
    { id: 4, name: 'Штани', categoryId: 2, price: 600, description: 'Штани C&A FL2133310-Beige XL'},
    { id: 5, name: 'Піца', categoryId: 3, price: 250, description: 'Піца Техас'},
    { id: 6, name: 'Суші', categoryId: 3, price: 550, description: 'Суші Філадельфія сет'},
];

const renderCategories = () => {
    console.log('renderCategories');
    categoriesContainer.innerHTML = '<h4>Перелік категорій</h4>';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.innerText = category.name;

        categoryElement.addEventListener(
            'click',
            () => { renderProducts(category.id)}
        );
        categoriesContainer.appendChild(categoryElement);
    })
};

const renderProducts = (categoryId) => {
    console.log('renderProducts');
    productsContainer.innerHTML = '<h4>Товари категорії</h4>';
    if (!categoryId) {
        return;
    }

    const filteredProducts = products.filter(product => product.categoryId === categoryId);

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerText = product.name;

        productElement.addEventListener(
            'click',
            () => { renderProductsDetails(product)}
        );

        productsContainer.appendChild(productElement);
    })}

const renderProductsDetails = (product) => {
    console.log('renderProductsDetails')
    productDetailsContainer.innerHTML = '';

    if (!product) {
        return;
    }

    if (!product) {
        return;
    }

    const productDetailsElement = document.createElement("div");

    productDetailsElement.innerHTML = `
        <h4>${product.name}</h4>
        <div>${product.description}</div>
        <div>${product.price}</div>
`;
    productDetailsElement.appendChild(buyButton);

    productDetailsContainer.appendChild(productDetailsElement);
    console.log(buyButton);
    buyButton.addEventListener("click", function () {
        orderForm.style.display = "block";
        console.log(buyButton);
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
            orderInfo.innerHTML = `
            <h2>Інформація про замовлення</h2>
            <h3>Інформація про товар:</h3>
            <p>Назва товару: ${product.name};</p>
            <p>Опис товару: ${product.description};</p>
            <p>Ціна: ${product.price}.</p>
            <h3>Інформація про доставку:</h3>
            <p>ПІБ покупця: ${name};</p>
            <p>Місто: ${city};</p>
            <p>Склад Нової пошти: ${post};</p>
            <p>Спосіб оплати: ${payment};</p>
            <p>Кількість товару: ${quantity};</p>
            <p>Коментар до замовлення: ${comment}.</p>`
            orderForm.style.display = 'none';
        } else {
            alert('Будь ласка, заповніть всі обовязкові поля');
        }
    });
}

renderCategories();
renderProducts();
renderProductsDetails();

console.log({
    categories,
    products,
});

// localStorage.setItem("list", JSON.stringify([{name: "good 1"}]));
//
// const good = {
//     name: "good 2",
// };
// const newList = JSON.parse(localStorage.getItem("list")).concat(good);
// localStorage.setItem("list", JSON.stringify(newList));
//
// const newList2 = JSON.parse(localStorage.getItem("list")).filter(
//     (el) => el.name !== "good 1"
// );
// localStorage.setItem("list", JSON.stringify(newList2));