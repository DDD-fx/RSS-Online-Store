import imageSrc from './cart.png';

export function countItemsInCart(): number {
    const localStorageKeys: string[] = Object.keys(localStorage);
    let totalItemsInCart = 0;
    for (const key of localStorageKeys) {
        if (key.includes('addedQuantity')) {
            totalItemsInCart += Number(localStorage[key]);
        }
    }
    return totalItemsInCart;
}

export function createShoppingCart(): void {
    const cart: HTMLElement = document.createElement('div');
    cart.classList.add('shopping-cart');

    const cartImg: HTMLImageElement = new Image();
    cartImg.src = imageSrc;
    cartImg.alt = 'shopping cart';
    cartImg.classList.add('shopping-cart__img');
    cart.append(cartImg);

    const orderQuantityDiv: HTMLDivElement = document.createElement('div');
    orderQuantityDiv.classList.add('shopping-cart__orderQuantity');
    orderQuantityDiv.innerHTML = `${countItemsInCart()}`;
    cart.append(orderQuantityDiv);

    const header = document.getElementsByClassName('header')[0] as HTMLHeadingElement;
    header.after(cart);
}

export function increaseShoppingCart(): void {
    const orderQuantity = document.getElementsByClassName('shopping-cart__orderQuantity')[0] as HTMLDivElement;
    if (checkForMaxOrder(getItemsInCart())) return;
    orderQuantity.innerText = `${getItemsInCart() + 1}`;
}

export function decreaseShoppingCart(): void {
    const orderQuantity = document.getElementsByClassName('shopping-cart__orderQuantity')[0] as HTMLDivElement;
    orderQuantity.innerText = `${getItemsInCart() - 1}`;
}

export function getItemsInCart(): number {
    const orderQuantity = document.getElementsByClassName('shopping-cart__orderQuantity')[0] as HTMLDivElement;
    return Number(orderQuantity.innerText);
}

export function checkForMaxOrder(itemsInCart: number): boolean | undefined {
    if (itemsInCart === 20) {
        alert("Sorry, can't add more than 20 items");
        return true;
    }
}
