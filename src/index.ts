import './styles/styles.scss';
import { Card } from './components/card/card';
import { SOCKS } from './data';
import { CardInterface, ColorFilterInterface, FiltersNameEnum, PopularFilterInterface, ProductDataType } from './types';
import { createShoppingCart } from './components/shopping-cart/shopping-cart';
import { Sorters } from './components/sorters and filters/sorters';
import { ValueFilters } from './components/sorters and filters/value-filters';
import { ColorFilter } from './components/sorters and filters/color-filter';
import { SizeFilter } from './components/sorters and filters/size-filter';
import { SliderQuant } from './components/sorters and filters/slider-quant';
import { PopularFilter } from './components/sorters and filters/popular-filter';
import { SliderYear } from './components/sorters and filters/slider-year';
import { ResetBtns } from './components/sorters and filters/reset-btns';
import { SearchField } from './components/search/search-field';
import { printCheckToConsole } from './console-cross-check';

createShoppingCart();

export function createList(dataArr: ProductDataType[] = SOCKS): void {
    const content: Element = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    if (!dataArr.length) {
        content.innerHTML = 'Sorry. No Items Match Selected Filters';
    } else {
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].quantity > 0) {
                const card: CardInterface = new Card(dataArr[i]);
                content.append(card.createCard());
            }
        }
    }
}

createList();

const valueFilters = new ValueFilters();
valueFilters.createValueFilters(FiltersNameEnum.Manufacturer, valueFilters.createMakerFilter());

const colorFilter: ColorFilterInterface = new ColorFilter();
colorFilter.createValueFilters(FiltersNameEnum.Color, colorFilter.createColorFilter());

const sizeFilter = new SizeFilter();
sizeFilter.createValueFilters(FiltersNameEnum.Size, sizeFilter.createSizeFilter());

const sorters = new Sorters();
sorters.createSorters();

const popularFilter: PopularFilterInterface = new PopularFilter();
popularFilter.createPopularFilterBtn();
valueFilters.checkActiveFilterBtns();

const sliderQuant = new SliderQuant();
sliderQuant.createQuantitySlider();

const sliderYear = new SliderYear();
sliderYear.createYearSlider();

const resetField = new SearchField();
resetField.createSearchField();

const resetFilters = new ResetBtns();
resetFilters.createResetFiltersBtn();

printCheckToConsole();
