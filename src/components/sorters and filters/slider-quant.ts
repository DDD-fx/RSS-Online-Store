import { ValueFilters } from './value-filters';
import noUiSlider from '../../../node_modules/nouislider/dist/nouislider';
import { SOCKS } from '../../data';
import { target } from '../../../node_modules/nouislider/dist/nouislider';
import { FiltersDataType, FiltersNameEnum, FiltersRangeType, ProductDataType, SliderQuantInterface } from '../../types';

export class SliderQuant extends ValueFilters implements SliderQuantInterface {
    static quantityRange: number[];
    static rangeToShow: number[];

    createQuantitySlider(): void {
        const quantitySlider = document.getElementById('quantity-slider') as target;
        this.createSliderTitle(quantitySlider, 'In Stock');

        const quantitySet: Set<number> = new Set();
        SOCKS.forEach((el: ProductDataType) => quantitySet.add(Number(el.quantity)));
        const maxQuantity: number = Math.max(...quantitySet);
        SliderQuant.rangeToShow = [0, maxQuantity];

        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        const localStorageQuantityFilter: number[] = filterObj.filtersRange.quantity;
        if (localStorageQuantityFilter.length) {
            SliderQuant.rangeToShow = localStorageQuantityFilter;
        }

        noUiSlider.create(quantitySlider, {
            start: SliderQuant.rangeToShow,
            connect: true,
            range: {
                min: 0,
                max: maxQuantity,
            },
            step: 1,
            tooltips: {
                to: function (numericValue) {
                    return numericValue.toFixed(0);
                },
            },
        });

        if (quantitySlider.noUiSlider) {
            quantitySlider.noUiSlider.on('change', () => {
                const currentQuantityRange = quantitySlider.noUiSlider?.get() as string[];
                SliderQuant.quantityRange = currentQuantityRange.map((num) => parseInt(num));
                this.controlLocalStorageSlider(FiltersNameEnum.Quantity, SliderQuant.quantityRange);
                ValueFilters.filterProducts();
            });
        }
    }

    createSliderTitle(parent: target, sliderName: string): void {
        const rangeTitle: HTMLParagraphElement = document.createElement('p');
        rangeTitle.classList.add('range-sliders__title');
        rangeTitle.innerHTML = `<b>${sliderName}</b>`;
        parent.before(rangeTitle);
    }

    controlLocalStorageSlider(filterName: FiltersRangeType, sliderArr: number[]): void {
        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        filterObj.filtersRange[filterName] = sliderArr;
        localStorage.setItem('filters', JSON.stringify(filterObj));
    }
}
