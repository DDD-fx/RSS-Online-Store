import { ValueFilters } from '../sorters and filters/value-filters';
import { createList } from '../../index';
import { ProductDataType, SearchFieldInterface } from '../../types';

export class SearchField implements SearchFieldInterface {
    static currentCollection: ProductDataType[];
    static currentInput: string;

    createSearchField(): void {
        const parent = document.getElementsByClassName('search-reset')[0] as HTMLDivElement;
        const wrapper = document.createElement('div');
        wrapper.classList.add('input-wrapper');

        const inputElem: HTMLInputElement = document.createElement('input');
        inputElem.type = 'text';
        inputElem.name = 'text';
        inputElem.autocomplete = 'off';
        inputElem.placeholder = 'Search Here';
        inputElem.classList.add('search-reset__input');

        inputElem.addEventListener('input', () => {
            SearchField.currentInput = inputElem.value;
            if (!SearchField.currentInput) createList(ValueFilters.currentCollection);

            const currentCollection = ValueFilters.currentCollection.filter((item) => {
                const title = item.title.toLocaleLowerCase();
                return title.includes(SearchField.currentInput.toLowerCase());
            });
            SearchField.currentCollection = currentCollection;
            createList(currentCollection);
        });

        const clearBtn = this.createSearchFieldClearBtn(inputElem);
        window.addEventListener('DOMContentLoaded', () => {
            inputElem.focus();
        });

        wrapper.append(inputElem, clearBtn);
        parent.append(wrapper);
    }

    createSearchFieldClearBtn(inputElem: HTMLInputElement): HTMLButtonElement {
        const clearBtn: HTMLButtonElement = document.createElement('button');
        clearBtn.classList.add('search-reset__clear');
        clearBtn.innerHTML = '&#x2715';

        clearBtn.addEventListener('click', () => {
            inputElem.value = '';
            SearchField.currentInput = '';
            ValueFilters.filterProducts();
            inputElem.focus();
        });

        return clearBtn;
    }
}
