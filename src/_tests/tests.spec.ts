/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

import {
    checkForMaxOrder,
    countItemsInCart,
    createShoppingCart,
    decreaseShoppingCart,
    getItemsInCart,
} from '../components/shopping-cart/shopping-cart';
import balen01 from '../components/card/img/balen01.webp';
import balenciagaLogo from '../components/card/img/balen02.jpg';
import { Card } from '../components/card/card';

describe('When trying to get items in cart', () => {
    it('return numeric value of items in cart', () => {
        document.body.innerHTML = `<div class="shopping-cart__orderQuantity">10</div>`;
        const shoppingCartElem = document.getElementsByClassName('shopping-cart__orderQuantity')[0] as HTMLDivElement;
        const shoppingCartVal = Number(shoppingCartElem.innerText);

        expect(getItemsInCart()).toEqual(shoppingCartVal);
    });
});

describe('When checking for Max order in cart', () => {
    it('call alert', () => {
        window.alert = jest.fn().mockImplementation();
        checkForMaxOrder(20);
        expect(window.alert).toHaveBeenCalledWith("Sorry, can't add more than 20 items");
    });
});

describe('When creating shopping cart', () => {
    it('create correct HTML', () => {
        document.body.innerHTML = `<header class="header"><h1 class="header__title">World Brand Socks</h1></header>`;
        const result = `<header class="header"><h1 class="header__title">World Brand Socks</h1></header><div class="shopping-cart"><img src="" alt="shopping cart" class="shopping-cart__img"><div class="shopping-cart__orderQuantity">0</div></div>`;
        createShoppingCart();

        expect(result).toEqual(document.body.innerHTML);
    });
});

describe('When counting items in cart', () => {
    it('return correct number of items', () => {
        localStorage.setItem('addedQuantity 0', '1');
        localStorage.setItem('addedQuantity 1', '1');
        localStorage.setItem('addedQuantity 2', '1');
        localStorage.setItem('addedQuantity 3', '0');
        expect(countItemsInCart()).toEqual(3);
        localStorage.clear();
    });
});

describe('When invoke function', () => {
    it('return undefined', () => {
        expect(decreaseShoppingCart()).toEqual(undefined);
    });
});

describe('When creating Card class', () => {
    it('return correct object fields', () => {
        const SOCKS = {
            id: 0,
            photo: balen01,
            title: 'BalenSocks M',
            quantity: 1,
            year: 2008,
            color: 'white',
            size: 'M',
            manufacturer: 'Balenciaga',
            makerImg: balenciagaLogo,
            price: 200,
            popular: 'true',
        };
        localStorage.setItem('addedQuantity 0', '1');
        const card = new Card(SOCKS);
        expect(card.cardData).toBe(SOCKS);
        expect(card.currentQuantity).toEqual('1');
        localStorage.clear();
    });
});

describe('When checking class method', () => {
    it('should be a function', () => {
        const SOCKS = {
            id: 0,
            photo: balen01,
            title: 'BalenSocks M',
            quantity: 1,
            year: 2008,
            color: 'white',
            size: 'M',
            manufacturer: 'Balenciaga',
            makerImg: balenciagaLogo,
            price: 200,
            popular: 'true',
        };
        const card = new Card(SOCKS);
        expect(typeof card.createPrice).toBe('function');
    });
});

describe('When adding item to order', () => {
    it('currentQuantity and LS addedQuantity increases', () => {
        const SOCKS = {
            id: 0,
            photo: balen01,
            title: 'BalenSocks M',
            quantity: 1,
            year: 2008,
            color: 'white',
            size: 'M',
            manufacturer: 'Balenciaga',
            makerImg: balenciagaLogo,
            price: 200,
            popular: 'true',
        };
        localStorage.setItem('addedQuantity 0', '10');
        document.body.innerHTML = `<div class="shopping-cart__orderQuantity">10</div>`;
        const card = new Card(SOCKS);
        card.createButton();
        card.transformButton();
        card.addItemToOrder();

        const localStorageResult = localStorage.getItem(`addedQuantity ${card.cardData.id}`);
        expect(card.currentQuantity).toEqual('11');
        expect(localStorageResult).toEqual('11');
        localStorage.clear();
    });
});

describe('When adding item to order', () => {
    it('currentQuantity and LS addedQuantity decreases', () => {
        const SOCKS = {
            id: 0,
            photo: balen01,
            title: 'BalenSocks M',
            quantity: 1,
            year: 2008,
            color: 'white',
            size: 'M',
            manufacturer: 'Balenciaga',
            makerImg: balenciagaLogo,
            price: 200,
            popular: 'true',
        };
        localStorage.setItem('addedQuantity 0', '20');
        document.body.innerHTML = `<div class="shopping-cart__orderQuantity">10</div>`;
        const card = new Card(SOCKS);
        card.createButton();
        card.transformButton();
        card.removeItemFromOrder();

        const localStorageResult = localStorage.getItem(`addedQuantity ${card.cardData.id}`);
        expect(card.currentQuantity).toEqual('19');
        expect(localStorageResult).toEqual('19');
        localStorage.clear();
    });
});

describe('When creating card title', () => {
    it('create correct title', () => {
        const SOCKS = {
            id: 0,
            photo: balen01,
            title: 'BalenSocks M',
            quantity: 1,
            year: 2008,
            color: 'white',
            size: 'M',
            manufacturer: 'Balenciaga',
            makerImg: balenciagaLogo,
            price: 200,
            popular: 'true',
        };
        const card = new Card(SOCKS);

        expect(card.createTitle().innerText).toEqual(SOCKS.title);
    });
});
