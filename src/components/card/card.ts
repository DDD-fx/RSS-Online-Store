import { CardInterface, ProductDataType } from '../../types';
import {
    checkForMaxOrder,
    decreaseShoppingCart,
    getItemsInCart,
    increaseShoppingCart,
} from '../shopping-cart/shopping-cart';

export class Card implements CardInterface {
    readonly cardData: ProductDataType;
    button!: HTMLButtonElement;
    buttonContainer!: HTMLDivElement;
    addedQuantityDiv!: HTMLDivElement;
    currentQuantity: string | null;
    plusBtn!: HTMLButtonElement;

    constructor(cardData: ProductDataType) {
        this.cardData = cardData;
        this.currentQuantity = localStorage.getItem(`addedQuantity ${this.cardData.id}`);
    }

    createCard(): HTMLElement {
        const card: HTMLElement = document.createElement('article');
        card.classList.add('card');

        if (!this.currentQuantity) {
            localStorage.setItem(`addedQuantity ${this.cardData.id}`, '0');
            this.currentQuantity = '0';
        }

        const img = this.createImgContainer();
        const title = this.createTitle();
        const price = this.createPrice();
        const extraInfo = this.createExtraInfo();
        const button = this.createButton();
        const buttonContainer = this.transformButton();
        card.append(img, title, price, extraInfo, buttonContainer, button);

        return card;
    }

    createImg(): HTMLImageElement {
        const img: HTMLImageElement = new Image();
        img.src = this.cardData.photo;
        img.alt = this.cardData.title;
        img.classList.add('card__img');
        return img;
    }

    createImgContainer(): HTMLDivElement {
        const imgContainer: HTMLDivElement = document.createElement('div');
        imgContainer.classList.add('card__img-container');
        imgContainer.append(this.createImg());
        return imgContainer;
    }

    createTitle(): HTMLDivElement {
        const title: HTMLDivElement = document.createElement('div');
        title.classList.add('card__title');
        title.innerText = this.cardData.title;
        return title;
    }

    createPrice(): HTMLDivElement {
        const price: HTMLDivElement = document.createElement('div');
        price.classList.add('card__price');
        price.innerText = `${this.cardData.price} €`;
        return price;
    }

    createExtraInfo(): HTMLUListElement {
        const extra: HTMLUListElement = document.createElement('ul');
        extra.classList.add('card__list');
        const quantity: HTMLLIElement = document.createElement('li');
        quantity.innerHTML = `<i>In Stock</i>: ${this.cardData.quantity}`;
        const year: HTMLLIElement = document.createElement('li');
        year.innerHTML = `<i>Year</i>: ${this.cardData.year}`;
        const color: HTMLLIElement = document.createElement('li');
        color.innerHTML = `<i>Color</i>: ${this.cardData.color}`;
        const size: HTMLLIElement = document.createElement('li');
        size.innerHTML = `<i>Size</i>: ${this.cardData.size}`;
        const manufacturer: HTMLLIElement = document.createElement('li');
        manufacturer.innerHTML = `<i>Manufacturer</i>: ${this.cardData.manufacturer}`;
        const popular: HTMLLIElement = document.createElement('li');
        popular.innerHTML = `<i>Popular</i>: ${this.cardData.popular}`;

        extra.append(quantity, year, color, size, manufacturer, popular);
        return extra;
    }

    createButton(): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.classList.add('card__button');
        button.innerText = 'Add to Cart';

        button.addEventListener('click', (): void => {
            if (checkForMaxOrder(getItemsInCart())) return;
            this.addItemToOrder();
            this.checkOrderQuantity();
            increaseShoppingCart();
        });
        this.button = button;
        return button;
    }

    transformButton(): HTMLDivElement {
        const buttonContainer: HTMLDivElement = document.createElement('div');
        buttonContainer.classList.add('card__counter');
        const plusBtn: HTMLButtonElement = document.createElement('button');
        plusBtn.classList.add('plus-btn');
        plusBtn.innerText = '+';
        const minusBtn: HTMLButtonElement = document.createElement('button');
        minusBtn.classList.add('minus-btn');
        minusBtn.innerText = '-';
        const addedQuantityDiv: HTMLDivElement = document.createElement('div');
        addedQuantityDiv.classList.add('counter-num');
        buttonContainer.append(minusBtn, addedQuantityDiv, plusBtn);

        this.buttonContainer = buttonContainer;
        this.addedQuantityDiv = addedQuantityDiv;
        this.plusBtn = plusBtn;

        plusBtn.addEventListener('click', this.addItemToOrder.bind(this));
        plusBtn.addEventListener('click', (): void => {
            if (getItemsInCart() === 20) return;
            increaseShoppingCart();
        });

        minusBtn.addEventListener('click', this.removeItemFromOrder.bind(this));
        minusBtn.addEventListener('click', (): void => {
            decreaseShoppingCart();
        });

        this.checkOrderQuantity();
        if (Number(this.currentQuantity) === this.cardData.quantity) {
            this.disablePlusBtn();
        }
        return buttonContainer;
    }

    checkOrderQuantity(): void {
        if (this.currentQuantity !== '0') {
            this.button.style.display = 'none';
            this.buttonContainer.style.display = 'flex';
            this.addedQuantityDiv.innerText = this.currentQuantity as string;
        } else {
            this.button.style.display = 'block';
            this.buttonContainer.style.display = 'none';
        }
    }

    addItemToOrder(): void {
        if (checkForMaxOrder(getItemsInCart())) return;

        this.currentQuantity = String(Number(this.currentQuantity) + 1);
        localStorage.setItem(`addedQuantity ${this.cardData.id}`, this.currentQuantity);
        this.addedQuantityDiv.innerText = this.currentQuantity;

        if (Number(this.currentQuantity) === this.cardData.quantity) {
            this.disablePlusBtn();
        }
    }

    removeItemFromOrder(): void {
        this.currentQuantity = String(Number(this.currentQuantity) - 1);
        localStorage.setItem(`addedQuantity ${this.cardData.id}`, this.currentQuantity);
        this.addedQuantityDiv.innerText = this.currentQuantity;
        if (this.currentQuantity === '0') {
            this.checkOrderQuantity();
        } else if (Number(this.currentQuantity) < this.cardData.quantity) {
            this.enablePlusBtn();
        }
    }

    disablePlusBtn(): void {
        this.plusBtn.disabled = true;
    }

    enablePlusBtn(): void {
        this.plusBtn.disabled = false;
    }
}
