import { ValueFilters } from './value-filters';
import { Sorters } from './sorters';
import { SliderQuant } from './slider-quant';
import { createList } from '../../index';
import { SearchField } from '../search/search-field';
import { target } from '../../../node_modules/nouislider/dist/nouislider';
import { SliderYear } from './slider-year';
import { ResetBtnsInterface } from '../../types';

export class ResetBtns extends ValueFilters implements ResetBtnsInterface {
    private SortersClass: Sorters;
    constructor() {
        super();
        this.SortersClass = new Sorters();
    }
    createResetFiltersBtn(): void {
        const valueFilters = document.getElementsByClassName('search-reset')[0] as HTMLDivElement;
        const resetBtnsBlock: HTMLDivElement = document.createElement('div');
        resetBtnsBlock.classList.add('search-reset__reset-btns');

        const resetFilterBtn: HTMLButtonElement = this.createResetBtns('Reset Filters');
        resetFilterBtn.addEventListener('click', this.resetFiltersFunc.bind(this));

        const resetAllBtn: HTMLButtonElement = this.createResetBtns('Reset All');
        resetAllBtn.addEventListener('click', this.resetAllFunc.bind(this));

        resetBtnsBlock.append(resetFilterBtn, resetAllBtn);
        valueFilters.append(resetBtnsBlock);
    }

    createResetBtns(btnName: string): HTMLButtonElement {
        const resetBtn: HTMLButtonElement = document.createElement('button');
        resetBtn.classList.add('common-btn', 'reset-btn');
        resetBtn.innerText = btnName;

        return resetBtn;
    }

    resetFiltersFunc(): void {
        localStorage.removeItem('filters');
        this.resetInput();
        ValueFilters.initialFilter();
        this.resetSliders();
        ValueFilters.filterProducts();

        this.SortersClass.checkForActiveSortersOnReload();

        const activeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.common-btn--active');
        for (const btn of activeBtns) {
            btn.classList.remove('common-btn--active');
        }
    }

    resetAllFunc(): void {
        localStorage.clear();
        this.resetFiltersFunc();
        const itemsInCart = document.getElementsByClassName('shopping-cart__orderQuantity')[0] as HTMLDivElement;
        itemsInCart.innerHTML = '0';

        const activeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.sorters__btn--active');
        Sorters.activeSorterBtn = null;
        for (const btn of activeBtns) {
            btn.classList.remove('sorters__btn--active');
        }
        createList();
    }

    resetInput(): void {
        const inputElem = document.getElementsByClassName('search-reset__input')[0] as HTMLInputElement;
        SearchField.currentInput = '';
        inputElem.value = '';
        inputElem.focus();
    }

    resetSliders(): void {
        const quantitySlider = document.getElementById('quantity-slider') as target;
        const yearSlider = document.getElementById('year-slider') as target;
        quantitySlider.noUiSlider?.set(SliderQuant.rangeToShow);
        yearSlider.noUiSlider?.set(SliderYear.yearToShow);
    }
}
