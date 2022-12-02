import { FiltersNameEnum, PopularFilterInterface } from '../../types';
import { ValueFilters } from './value-filters';

export class PopularFilter extends ValueFilters implements PopularFilterInterface {
    createPopularFilterBtn(): void {
        const valueFilters = document.getElementsByClassName('value-filters')[0] as HTMLDivElement;
        const popularBtn: HTMLButtonElement = document.createElement('button');
        popularBtn.classList.add('common-btn', 'popular-btn');
        popularBtn.setAttribute(FiltersNameEnum.Popular, 'true');
        popularBtn.innerText = 'Only Popular';

        popularBtn.addEventListener('click', (): void => {
            popularBtn.classList.toggle('common-btn--active');
            super.controlLocalStorageFilter(FiltersNameEnum.Popular, 'true');
            ValueFilters.filterProducts();
        });
        valueFilters.append(popularBtn);
    }
}
