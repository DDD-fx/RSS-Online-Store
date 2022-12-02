export type ProductDataType = Record<FiltersStringType, string> & {
    id: number;
    photo: string;
    title: string;
    quantity: number;
    year: number;
    makerImg: string;
    price: number;
};

export interface CardInterface {
    cardData: ProductDataType;
    button: HTMLButtonElement;
    buttonContainer: HTMLDivElement;
    addedQuantityDiv: HTMLDivElement;
    currentQuantity: string | null;
    plusBtn: HTMLButtonElement;
    createCard(): HTMLElement;
    createImg(): HTMLImageElement;
    createTitle(): HTMLDivElement;
    createImgContainer(): HTMLDivElement;
    createPrice(): HTMLDivElement;
    createExtraInfo(): HTMLUListElement;
    createButton(): HTMLButtonElement;
    transformButton(): HTMLDivElement;
    checkOrderQuantity(): void;
    addItemToOrder(): void;
    removeItemFromOrder(): void;
    disablePlusBtn(): void;
    enablePlusBtn(): void;
}

export type FiltersStringType = 'manufacturer' | 'color' | 'size' | 'popular';
export type FiltersRangeType = 'quantity' | 'year';
export type FiltersStringDataType = Record<FiltersStringType, string[]>;
export type FiltersRangeDataType = Record<FiltersRangeType, number[]>;
export type FiltersDataType = {
    filtersString: FiltersStringDataType;
    filtersRange: FiltersRangeDataType;
};

export enum FiltersNameEnum {
    Manufacturer = 'manufacturer',
    Color = 'color',
    Size = 'size',
    Popular = 'popular',
    Quantity = 'quantity',
    Year = 'year',
}

export enum SortByEnum {
    NameAsc = 'sortByNameAscending',
    NameDes = 'sortByNameDescending',
    YearAsc = 'sortByYearAscending',
    YearDes = 'sortByYearDescending',
}

export interface ValueFiltersInterface {
    createValueFilters(filterName: string, createFilter: HTMLDivElement): void;
    createMakerFilter(): HTMLDivElement;
    createMakerFilterBtn(makerName: string): HTMLButtonElement;
    controlLocalStorageFilter(filterName: FiltersStringType, filterValue: string): void;
    checkActiveFilterBtns(): void;
    setActiveBtnsOnReload(filterName: FiltersStringType, filterBtns: HTMLCollection): void;
}

export interface SortersInterface {
    checkLocalStorageSorter(sorterVal: string): void;
    createSorters(): void;
    createSortersBtns(sorterName: string, innerText: string): HTMLButtonElement;
    checkForActiveSorterBtn(btn: HTMLButtonElement): void;
    checkForActiveSortersOnReload(): void;
}

export interface SearchFieldInterface {
    createSearchField(): void;
    createSearchFieldClearBtn(inputElem: HTMLInputElement): HTMLButtonElement;
}

export interface ColorFilterInterface extends ValueFiltersInterface {
    createColorFilter(): HTMLDivElement;
    createColorFilterBtn(colorName: string): HTMLButtonElement;
}

export interface SizeFilterInterface extends ValueFiltersInterface {
    createSizeFilter(): HTMLDivElement;
    createSizeFilterBtn(sizeName: string): HTMLButtonElement;
}

export interface PopularFilterInterface extends ValueFiltersInterface {
    createPopularFilterBtn(): void;
}

export interface ResetBtnsInterface extends ValueFiltersInterface {
    createResetFiltersBtn(): void;
    createResetBtns(btnName: string): HTMLButtonElement;
    resetFiltersFunc(): void;
    resetAllFunc(): void;
    resetInput(): void;
    resetSliders(): void;
}

export interface SliderQuantInterface extends ValueFiltersInterface {
    createQuantitySlider(): void;
    createSliderTitle(parent: HTMLDivElement, sliderName: string): void;
    controlLocalStorageSlider(filterName: FiltersRangeType, sliderArr: number[]): void;
}

export interface SliderYearInterface extends SliderQuantInterface {
    createYearSlider(): void;
}
