import { CurrencyPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceRange',
})
export class PriceRangePipe implements PipeTransform {

    currencyPipe: CurrencyPipe;

    constructor(@Inject(LOCALE_ID) private _locale: string) {
        this.currencyPipe = new CurrencyPipe(_locale);
    }

    transform<T extends { [key: string]: number; }, U extends keyof T>(values: T[], priceProperty: U): string | null {
        if (values && values.length > 1) {
            const min = Math.min(...values.map(v => v[priceProperty]));
            return `From ` + this.currencyPipe.transform(min / 100);
        }
        return this.currencyPipe.transform(values && values[0] && (values[0].price / 100));
    }

}
