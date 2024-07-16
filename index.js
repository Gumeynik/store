import { add, get, moveDocument, getItemCart, deleteAllCart, getAllCartItemIds } from './firebase.js';

export function createCard(item) {
    const card = document.createElement('li');
    card.className = 'item';
    card.id = item.id; 

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const img = document.createElement('img');
    img.src = 'resources/' + item.image + '?' + new Date().getTime();
    img.alt = item.name;
    img.className = 'img-item';

    imgContainer.appendChild(img);
    card.appendChild(imgContainer);

    const title = document.createElement('h2');
    title.textContent = item.name;
    title.className = 'name';

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = item.description;

    const price = document.createElement('p');
    price.textContent = ` $ ${item.cost}`;
    price.className = 'cost';

    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    button.className = 'add-to-cart';
    button.addEventListener('click', async () => {
        const sourceCollection = 'items';
        const sourceDocId = item.id;
        const targetCollection = 'cart';
        const targetDocId = item.id;

        await moveDocument(sourceCollection, sourceDocId, targetCollection, targetDocId);
        await renderlistCart(); 
    });

    const priceButtonContainer = document.createElement('div');
    priceButtonContainer.className = 'price-button-container';
    priceButtonContainer.appendChild(price);
    priceButtonContainer.appendChild(button);

    card.appendChild(imgContainer);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(priceButtonContainer);

    return card;
}

async function renderCards(array) {
    const container = document.querySelector('.items');
    array.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    await renderCards(await get());
});

async function renderlist() {
    const items = await get();
    renderCards(items);
}

renderlist();

// function addToCart(item) {
//     const imgCart = document.createElement('cart-img');
//     imgCart.src = 'resources/' + item.image + '?' + new Date().getTime();
//     imgCart.alt = item.name;
//     imgCart.className = 'img-item-cart';
//     const cart = document.querySelector('.cart-img-container')
//     cart.appendChild(imgCart)
//     return imgCart 
// };
// async function renderCart(array) {
//     const container = document.querySelector('.cart-img-container');
//     container.innerHTML = '';
//     array.forEach(item => {
//         const card = addToCart(item);
//         container.appendChild(card);
//     });
// }

// async function renderlistCart() {
//     const items = await getItemCart();
//     renderCart(items);

// }

// renderlistCart();

// //код для корзины

// function renderCartList (item) {
//     const card = document.createElement('li');
//     card.className = 'cart-item';
//     card.id = item.id; 

//     const cartContainer = document.createElement('div');
//     cartContainer.className = 'cart-container';

//     const img = document.createElement('cart-img');
//     img.src = 'resources/' + item.image + '?' + new Date().getTime();
//     img.alt = item.name;
//     img.className = 'cart-img-item';


//     const title = document.createElement('h2');
//     title.textContent = item.name;
//     title.className = 'cart-item-name';

//     const description = document.createElement('p');
//     description.className = 'cart-item-description';
//     description.textContent = item.description;

//     const price = document.createElement('p');
//     price.textContent = ` $ ${item.cost}`;
//     price.className = 'cart-item-cost';

//     card.appendChild(cartContainer);
//     card.appendChild(title);
//     card.appendChild(description);
//     card.appendChild(price);
// };

// async function renderCardForCart(array) {
//     const container = document.querySelector('.card-cart-list');
//     array.forEach(item => {
//         const card = createCard(item);
//         container.appendChild(card);
//     });
// }

// async function renderCartList() {
//     const items = await getItemCart();
//     renderCardForCart(items);
// }
// renderCartList();


// async function sumCost() {
//     const items = await getItemCart();
//     let totalCost = 0;
//     items.forEach(item => {
//         totalCost += item.cost;
//     });
//     return totalCost;
// }

// async function updateTotalCost() {
//     const totalCostElement = document.querySelector('.cost');
//     const totalCost = await sumCost();
//     totalCostElement.textContent = `Total cost: $ ${totalCost.toFixed(2)}`;
// }

// const clearBtn = document.querySelector('.clear-btn');
// clearBtn.addEventListener('click', async () => {
//     const itemIds = await getAllCartItemIds();
//     await deleteAllCart(itemIds);
//     updateTotalCost();
//     renderCarList();
//     console.log(123)
// });
// updateTotalCost();
































