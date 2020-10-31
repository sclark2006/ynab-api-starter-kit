import currency from './currency.min.js';
import {utils} from 'ynab';

export function toCurrency(amount) {
    return currency(amount, { decimal: '.', separator: ',' }).format();
}

export function millisToCurrency(amount) {
    return currency(utils.convertMilliUnitsToCurrencyAmount(amount).toFixed(2), 
    { decimal: '.', separator: ',' }).format();
}

export function sumToCurrency(amountsArray) {
    return millisToCurrency(amountsArray.reduce((a,b) => a + b,0));
}