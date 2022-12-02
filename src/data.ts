import { ProductDataType } from './types';
import balenciagaLogo from './components/card/img/balen02.jpg';
import balen01 from './components/card/img/balen01.webp';
import balen02 from './components/card/img/balenciagaLogo.jpg';
import burberryLogo from './components/card/img/burberryLogo.jpg';
import burbe01 from './components/card/img/burbe01.webp';
import burbe02 from './components/card/img/burbe02.webp';
import burbe03 from './components/card/img/burbe03.jpg';
import pieCarLogo from './components/card/img/pieCarLogo.jpg';
import pieCar01 from './components/card/img/pieCar01.jpg';
import pieCar02 from './components/card/img/pieCar02.webp';
import chanelLogo from './components/card/img/chanelLogo.jpg';
import chanel01 from './components/card/img/chanel01.jpg';
import chanel02 from './components/card/img/chanel02.jpg';
import chanel03 from './components/card/img/chanel03.jpg';

export const SOCKS: ProductDataType[] = [
    {
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
    },
    {
        id: 1,
        photo: balen02,
        title: 'BalenSocks S',
        quantity: 20,
        year: 2022,
        color: 'white',
        size: 'S',
        manufacturer: 'Balenciaga',
        makerImg: balenciagaLogo,
        price: 240,
        popular: 'false',
    },
    {
        id: 2,
        photo: burbe01,
        title: 'BurbeSocks M',
        quantity: 10,
        year: 2021,
        color: 'beige',
        size: 'M',
        manufacturer: 'Burberry',
        makerImg: burberryLogo,
        price: 300,
        popular: 'true',
    },
    {
        id: 3,
        photo: burbe02,
        title: 'BurbeSocks L',
        quantity: 50,
        year: 2009,
        color: 'beige',
        size: 'L',
        manufacturer: 'Burberry',
        makerImg: burberryLogo,
        price: 186,
        popular: 'false',
    },
    {
        id: 4,
        photo: burbe03,
        title: 'BurbeSocks XL',
        quantity: 5,
        year: 2020,
        color: 'black',
        size: 'XL',
        manufacturer: 'Burberry',
        makerImg: 'https://i.pinimg.com/736x/12/25/9e/12259e84547d00bcc6169b4579045ca2.jpg',
        price: 235,
        popular: 'true',
    },
    {
        id: 5,
        photo: pieCar01,
        title: 'PieCarSocks M',
        quantity: 18,
        year: 2019,
        color: 'black',
        size: 'M',
        manufacturer: 'Pierre Cardin',
        makerImg: pieCarLogo,
        price: 700,
        popular: 'false',
    },
    {
        id: 6,
        photo: pieCar02,
        title: 'PieCarSocks S',
        quantity: 11,
        year: 2020,
        color: 'red',
        size: 'S',
        manufacturer: 'Pierre Cardin',
        makerImg: pieCarLogo,
        price: 250,
        popular: 'true',
    },
    {
        id: 7,
        photo: chanel01,
        title: 'ChaSocks S',
        quantity: 8,
        year: 2012,
        color: 'white',
        size: 'S',
        manufacturer: 'Chanel',
        makerImg: chanelLogo,
        price: 120,
        popular: 'true',
    },
    {
        id: 8,
        photo: chanel02,
        title: 'ChaSocks S',
        quantity: 19,
        year: 2012,
        color: 'red',
        size: 'S',
        manufacturer: 'Chanel',
        makerImg: chanelLogo,
        price: 165,
        popular: 'false',
    },
    {
        id: 9,
        photo: chanel03,
        title: 'ChaSocks M',
        quantity: 14,
        year: 2019,
        color: 'black',
        size: 'M',
        manufacturer: 'Chanel',
        makerImg: chanelLogo,
        price: 180,
        popular: 'false',
    },
    {
        //если количество=0, не отрисовывать карточку
        id: 10,
        photo: chanel03,
        title: 'ChaSocks M',
        quantity: 0,
        year: 2020,
        color: 'black',
        size: 'M',
        manufacturer: 'Chanel',
        makerImg: chanelLogo,
        price: 180,
        popular: 'false',
    },
];
