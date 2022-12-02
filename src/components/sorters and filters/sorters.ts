import { createList } from '../../index';
import { ValueFilters } from './value-filters';
import { SortByEnum, SortersInterface } from '../../types';
import { SearchField } from '../search/search-field';

export class Sorters extends ValueFilters implements SortersInterface {
    static activeSorterBtn: HTMLButtonElement | null;

    checkLocalStorageSorter(sorterVal = ''): void {
        const currentSorters: string | null = localStorage.getItem('sorter');
        if (currentSorters !== sorterVal && currentSorters) {
            localStorage.setItem('sorter', sorterVal);
        } else if (!currentSorters) {
            localStorage.setItem('sorter', sorterVal);
        }
    }

    createSorters(): void {
        const sorters = document.getElementsByClassName('sorters')[0] as HTMLElement;
        const sortByNameAscendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.NameAsc,
            'Sort By Name Ascending'
        );
        const sortByNameDescendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.NameDes,
            'Sort By Name Descending'
        );
        const sortByYearAscendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.YearAsc,
            'Sort By Year Ascending'
        );
        const sortByYearDescendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.YearDes,
            'Sort By Year Descending'
        );
        sorters.append(
            sortByNameAscendingBtn,
            sortByNameDescendingBtn,
            sortByYearAscendingBtn,
            sortByYearDescendingBtn
        );
        this.checkForActiveSortersOnReload();
    }

    createSortersBtns(sorterName: string, innerText: string): HTMLButtonElement {
        const sorterBtn: HTMLButtonElement = document.createElement('button');
        sorterBtn.classList.add('sorters__btn');
        sorterBtn.setAttribute('sorter', sorterName);
        sorterBtn.innerText = innerText;

        sorterBtn.addEventListener('click', (): void => {
            this.checkLocalStorageSorter(sorterName);
            Sorters.sortBy(sorterName);
            this.checkForActiveSorterBtn(sorterBtn);
        });
        return sorterBtn;
    }

    static sortBy(sorter: string): void {
        if (SearchField.currentInput) {
            Sorters.currentCollection = Sorters.currentCollection.filter((item) =>
                item.title.toLowerCase().includes(SearchField.currentInput)
            );
        }
        switch (sorter) {
            case SortByEnum.NameAsc:
                Sorters.currentCollection.sort((a, b) => (a.title > b.title ? 1 : -1));
                break;
            case SortByEnum.NameDes:
                Sorters.currentCollection.sort((a, b) => (a.title < b.title ? 1 : -1));
                break;
            case SortByEnum.YearAsc:
                Sorters.currentCollection.sort((a, b) => (a.year > b.year ? 1 : -1));
                break;
            case SortByEnum.YearDes:
                Sorters.currentCollection.sort((a, b) => (a.year < b.year ? 1 : -1));
                break;
            case '':
                break;
        }
        createList(Sorters.currentCollection);
    }

    checkForActiveSorterBtn(btn: HTMLButtonElement): void {
        if (Sorters.activeSorterBtn) {
            Sorters.activeSorterBtn.classList.toggle('sorters__btn--active');
            Sorters.activeSorterBtn = btn;
            btn.classList.toggle('sorters__btn--active');
        } else {
            btn.classList.toggle('sorters__btn--active');
            Sorters.activeSorterBtn = btn;
        }
    }

    checkForActiveSortersOnReload(): void {
        const activeSorters: string | null = localStorage.getItem('sorter');
        const sorterBtns: HTMLCollection = document.getElementsByClassName('sorters__btn');
        if (activeSorters) {
            for (const btn of sorterBtns) {
                if (btn.getAttribute('sorter') === activeSorters) {
                    btn.classList.add('sorters__btn--active');
                    Sorters.activeSorterBtn = btn as HTMLButtonElement;
                    return;
                }
            }
        }
    }
}
