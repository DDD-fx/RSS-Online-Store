import { ValueFilters } from './value-filters';
import { SOCKS } from '../../data';
import { FiltersNameEnum, ProductDataType, SizeFilterInterface } from '../../types';

export class SizeFilter extends ValueFilters implements SizeFilterInterface {
    createSizeFilter(): HTMLDivElement {
        const sizeFilterBlock = document.createElement('div');
        sizeFilterBlock.classList.add('value-filters__btn-block');

        const set: Set<string> = new Set();
        SOCKS.forEach((el: ProductDataType) => set.add(el.size));

        const availableSizes = ['S', 'M', 'L', 'XL'];
        availableSizes.forEach((availableSize) => {
            if (set.has(availableSize)) {
                const sizeBtn = this.createSizeFilterBtn(availableSize);
                sizeFilterBlock.append(sizeBtn);
            }
        });
        return sizeFilterBlock;
    }

    createSizeFilterBtn(sizeName: string): HTMLButtonElement {
        const colorFilterBtn: HTMLButtonElement = document.createElement('button');
        colorFilterBtn.classList.add('value-filters__btn', 'size-filter-btn', `size-filter-btn--${sizeName}`);
        colorFilterBtn.setAttribute(FiltersNameEnum.Size, sizeName);
        colorFilterBtn.innerText = sizeName;

        colorFilterBtn.addEventListener('click', () => {
            colorFilterBtn.classList.toggle('common-btn--active');
            super.controlLocalStorageFilter(FiltersNameEnum.Size, sizeName);
            ValueFilters.filterProducts();
        });
        return colorFilterBtn;
    }
}
