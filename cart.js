import { add, get, moveDocument, getItemCart, deleteAllCart, getAllCartItemIds } from './firebase.js';
import { createCard } from './index.js';


function createCartItem(item) {
    const card = document.createElement('li');
    card.className = 'cart-item';
    card.id = item.id; 

    const cartContainer = document.createElement('div');
    cartContainer.className = 'cart-container';

    const img = document.createElement('img');
    img.src = `resources/${item.image}?${new Date().getTime()}`;
    img.alt = item.name;
    img.className = 'cart-img-item';

    const title = document.createElement('h2');
    title.textContent = item.name;
    title.className = 'cart-item-name';

    const description = document.createElement('p');
    description.className = 'cart-item-description';
    description.textContent = item.description;

    const price = document.createElement('p');
    price.textContent = ` $ ${item.cost}`;
    price.className = 'cart-item-cost';

    card.appendChild(cartContainer);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);

    return card;
}

async function renderCardForCart(array) {
    const container = document.querySelector('.card-cart-list');
    if (container) {
        array.forEach(item => {
            const card = createCartItem(item);
            container.appendChild(card);
        });
    }
};

async function renderCartList() {
    const items = await getItemCart();
    await renderCardForCart(items);
};

renderCartList();


async function sumCost() {
    const items = await getItemCart();
    let totalCost = 0;
    items.forEach(item => {
        totalCost += item.cost;
    });
    return totalCost;
}

async function updateTotalCost() {
    const totalCostElement = document.querySelector('.cost');
    const totalCost = await sumCost();
    totalCostElement.textContent = `Total cost: $ ${totalCost.toFixed(2)}`;
};

updateTotalCost();

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', async () => {
    const itemIds = await getAllCartItemIds();
    await deleteAllCart(itemIds);
    updateTotalCost();
    renderCartList();
    console.log(123)
});

