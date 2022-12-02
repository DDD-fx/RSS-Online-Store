import { ValueFilters } from './value-filters';
import noUiSlider from '../../../node_modules/nouislider/dist/nouislider';
import { SOCKS } from '../../data';
import { target } from '../../../node_modules/nouislider/dist/nouislider';
import { FiltersDataType, FiltersNameEnum, SliderYearInterface } from '../../types';
import { SliderQuant } from './slider-quant';

export class SliderYear extends SliderQuant implements SliderYearInterface {
    static yearRange: number[];
    static yearToShow: number[];

    createYearSlider(): void {
        const yearSlider = document.getElementById('year-slider') as target;
        super.createSliderTitle(yearSlider, 'Year');

        const yearSet: Set<number> = new Set();
        SOCKS.forEach((el) => yearSet.add(Number(el.year)));
        const maxYear = Math.max(...yearSet);
        const minYear = Math.min(...yearSet);
        SliderYear.yearToShow = [minYear, maxYear];

        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        const localStorageYearFilter: number[] = filterObj.filtersRange.year;
        if (localStorageYearFilter.length) {
            SliderYear.yearToShow = localStorageYearFilter;
        }

        noUiSlider.create(yearSlider, {
            start: SliderYear.yearToShow,
            connect: true,
            range: {
                min: minYear,
                max: maxYear,
            },
            step: 1,
            tooltips: {
                to: function (numericValue) {
                    return numericValue.toFixed(0);
                },
            },
        });

        if (yearSlider.noUiSlider) {
            yearSlider.noUiSlider.on('change', () => {
                const currentYearRange = yearSlider.noUiSlider?.get() as string[];
                SliderYear.yearRange = currentYearRange.map((num) => parseInt(num));
                super.controlLocalStorageSlider(FiltersNameEnum.Year, SliderYear.yearRange);
                ValueFilters.filterProducts();
            });
        }
    }
}
