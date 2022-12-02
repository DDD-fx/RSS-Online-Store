import { SOCKS } from '../../data';
import { createList } from '../../index';
import {
    ProductDataType,
    FiltersNameEnum,
    FiltersStringType,
    FiltersDataType,
    FiltersStringDataType,
    FiltersRangeDataType,
    FiltersRangeType,
    ValueFiltersInterface,
} from '../../types';
import { Sorters } from './sorters';
import { SearchField } from '../search/search-field';

export class ValueFilters implements ValueFiltersInterface {
    static currentCollection: ProductDataType[];

    static initialFilter(): void {
        if (!localStorage.getItem('filters')) {
            localStorage.setItem(
                'filters',
                JSON.stringify(<FiltersDataType>{
                    filtersString: { manufacturer: [], color: [], size: [], popular: [] },
                    filtersRange: { quantity: [], year: [] },
                })
            );
        } else {
            this.filterProducts();
        }
    }

    createValueFilters(filterName: string, createFilter: HTMLDivElement): void {
        const valueFilters = document.getElementsByClassName('value-filters')[0] as HTMLElement;
        const filterTitle: HTMLParagraphElement = document.createElement('p');

        filterTitle.classList.add('value-filters__title');
        filterTitle.innerHTML = `<b>${filterName[0].toUpperCase() + filterName.slice(1)}</b>`;

        valueFilters.append(filterTitle, createFilter);

        ValueFilters.initialFilter();
        this.checkActiveFilterBtns();
    }

    createMakerFilter(): HTMLDivElement {
        const makerFilterBlock = document.createElement('div');
        makerFilterBlock.classList.add('value-filters__btn-block');

        const set: Set<string> = new Set();
        SOCKS.forEach((el) => set.add(el.manufacturer));
        set.forEach((el) => {
            const makerBtn = this.createMakerFilterBtn(el);
            makerFilterBlock.append(makerBtn);
        });

        return makerFilterBlock;
    }

    createMakerFilterBtn(makerName: string): HTMLButtonElement {
        const makerFilterBtn = document.createElement('button');
        const makerData = SOCKS.find((el) => el.manufacturer === makerName) as ProductDataType;

        makerFilterBtn.classList.add('value-filters__btn', 'maker-filter-btn');
        makerFilterBtn.setAttribute(FiltersNameEnum.Manufacturer, makerName);
        const makerImg: HTMLImageElement = new Image();
        makerImg.src = makerData.makerImg;
        makerImg.alt = makerName + 'logo';
        makerImg.classList.add('maker-filter-btn__img');
        makerFilterBtn.append(makerImg);
        makerFilterBtn.addEventListener('click', () => {
            makerFilterBtn.classList.toggle('common-btn--active');
            this.controlLocalStorageFilter(FiltersNameEnum.Manufacturer, makerName);
            ValueFilters.filterProducts();
        });
        return makerFilterBtn;
    }

    static filterProducts(): void {
        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        const filterString: FiltersStringDataType = filterObj.filtersString;
        const filterRange: FiltersRangeDataType = filterObj.filtersRange;
        const activeSorter = localStorage.getItem('sorter') as string;

        let filteredArr: ProductDataType[] = this.filterStringProducts(SOCKS.slice(), filterString);
        filteredArr = this.filterRangeProducts(filteredArr, filterRange);

        ValueFilters.currentCollection = filteredArr;
        Sorters.currentCollection = filteredArr;
        createList(filteredArr);

        if (activeSorter) {
            Sorters.sortBy(activeSorter);
        }
    }

    static filterStringProducts(
        filteredArr: ProductDataType[],
        filterString: FiltersStringDataType
    ): ProductDataType[] {
        let newArr: ProductDataType[] = filteredArr;
        let isEmptyFilters = true;
        for (const key in filterString) {
            if (filterString[key as FiltersStringType]?.length) {
                newArr = this.filterWithStringFilter(
                    filterString[key as FiltersStringType],
                    newArr,
                    key as FiltersStringType
                );
                isEmptyFilters = false;
            }
        }
        if (SearchField.currentInput && isEmptyFilters) {
            newArr = filteredArr.filter((item) => item.title.toLowerCase().includes(SearchField.currentInput));
        }
        return isEmptyFilters && SearchField.currentInput === '' ? SOCKS.slice() : newArr;
    }

    static filterWithStringFilter(
        filterValues: string[],
        items: ProductDataType[],
        filterName: FiltersStringType
    ): ProductDataType[] {
        let filteredArr: ProductDataType[] = items;
        filteredArr = filteredArr.filter((item) => {
            return filterValues.find((filterValue) => item[filterName] === filterValue);
        });

        if (SearchField.currentInput) {
            filteredArr = filteredArr.filter((item) => item.title.toLowerCase().includes(SearchField.currentInput));
        }
        return filteredArr;
    }

    static filterRangeProducts(filteredArr: ProductDataType[], filterRange: FiltersRangeDataType): ProductDataType[] {
        let newArr: ProductDataType[] = filteredArr;
        let isEmptyFilters = true;
        for (const key in filterRange) {
            if (filterRange[key as FiltersRangeType]?.length) {
                newArr = this.filterWithRangeFilter(
                    filterRange[key as FiltersRangeType],
                    newArr,
                    key as FiltersRangeType
                );
                isEmptyFilters = false;
            }
        }
        return isEmptyFilters ? filteredArr : newArr;
    }

    static filterWithRangeFilter(
        filterValues: number[], //[0, 10]
        items: ProductDataType[],
        filterName: FiltersRangeType //"quantity" | "year"
    ): ProductDataType[] {
        let filteredArr: ProductDataType[] = items;
        filteredArr = filteredArr.filter(
            (item) => item[filterName] >= filterValues[0] && item[filterName] <= filterValues[1]
        );
        return filteredArr;
    }

    controlLocalStorageFilter(filterName: FiltersStringType, filterValue: string): void {
        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        let filterArr = filterObj.filtersString[filterName];

        if (filterArr.includes(filterValue)) {
            filterArr = filterArr.filter((el: string) => el !== filterValue);
        } else {
            filterArr.push(filterValue);
        }
        filterObj.filtersString[filterName] = filterArr;
        localStorage.setItem('filters', JSON.stringify(filterObj));
    }

    checkActiveFilterBtns(): void {
        const makerFilterBtns: HTMLCollection = document.getElementsByClassName('maker-filter-btn');
        const colorFilterBtns: HTMLCollection = document.getElementsByClassName('color-filter-btn');
        const sizeFilterBtns: HTMLCollection = document.getElementsByClassName('size-filter-btn');
        const PopularFilterBtn: HTMLCollection = document.getElementsByClassName('popular-btn');
        this.setActiveBtnsOnReload(FiltersNameEnum.Manufacturer, makerFilterBtns);
        this.setActiveBtnsOnReload(FiltersNameEnum.Color, colorFilterBtns);
        this.setActiveBtnsOnReload(FiltersNameEnum.Size, sizeFilterBtns);
        this.setActiveBtnsOnReload(FiltersNameEnum.Popular, PopularFilterBtn);
    }

    setActiveBtnsOnReload(filterName: FiltersStringType, filterBtns: HTMLCollection): void {
        const filterObj: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
        const filterStringObj: FiltersStringDataType = filterObj.filtersString;
        const filterArr: string[] = filterStringObj[filterName];
        if (filterArr?.length) {
            for (const btn of filterBtns) {
                if (filterArr.includes(btn.getAttribute(filterName) as string)) {
                    btn.classList.add('common-btn--active');
                }
            }
        }
    }
}
