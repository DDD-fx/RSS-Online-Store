import { ValueFilters } from './value-filters';
import { SOCKS } from '../../data';
import { ColorFilterInterface, FiltersNameEnum, ProductDataType } from '../../types';

export class ColorFilter extends ValueFilters implements ColorFilterInterface {
    createColorFilter(): HTMLDivElement {
        const colorFilterBlock: HTMLDivElement = document.createElement('div');
        colorFilterBlock.classList.add('value-filters__btn-block');

        const set: Set<string> = new Set();
        SOCKS.forEach((el: ProductDataType) => set.add(el.color));
        set.forEach((el) => {
            const colorBtn = this.createColorFilterBtn(el);
            colorFilterBlock.append(colorBtn);
        });
        return colorFilterBlock;
    }

    createColorFilterBtn(colorName: string): HTMLButtonElement {
        const colorFilterBtn: HTMLButtonElement = document.createElement('button');
        colorFilterBtn.classList.add('value-filters__btn', 'color-filter-btn', `color-filter-btn--${colorName}`);
        colorFilterBtn.setAttribute(FiltersNameEnum.Color, colorName);
        colorFilterBtn.style.background = colorName;

        colorFilterBtn.addEventListener('click', (): void => {
            colorFilterBtn.classList.toggle('common-btn--active');
            super.controlLocalStorageFilter(FiltersNameEnum.Color, colorName);
            ValueFilters.filterProducts();
        });
        return colorFilterBtn;
    }
}
