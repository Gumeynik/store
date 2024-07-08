import { add, get } from './firebase.js';

function createCard(item) {
    const card = document.createElement('li');
    card.className = 'item';

    const img = document.createElement('img');
    img.src = 'resources/' + item.image + new Date().getTime();
    img.alt = item.name;
    img.className = 'img-item';
    console.log('Image path:', 'resources/' + item.image);
    const title = document.createElement('h2');
    title.textContent = item.name;
    title.className = 'name';

    const price = document.createElement('p');
    price.textContent = `Price: $${item.cost}`;
    price.className = 'cost';

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = item.description;

    const button = document.createElement('button');
    button.textContent = 'добавить в корзину';
    button.className = 'add-to-cart';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(button);
console.log(card)
    return card;
}

async function renderCards(array) {

    const container = document.querySelector('.items');
        array.forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
        });
};
async function renderlist() {
    const items = await get();
    renderCards(items)
};
renderlist();












































