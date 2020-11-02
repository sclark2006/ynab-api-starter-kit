import currency from './currency.min.js';
import {utils} from 'ynab';
import moment from 'moment';

export function toCurrency(amount) {
    return currency(amount, { decimal: '.', separator: ',' }).format();
}

export function sumAmounts(amountsArray) {
    return amountsArray.reduce((a,b) => a + b,0);
}

export function millisToCurrency(amount) {
    return currency(utils.convertMilliUnitsToCurrencyAmount(amount).toFixed(2), 
    { decimal: '.', separator: ',' }).format();
}

export function sumToCurrency(amountsArray) {
    return millisToCurrency(sumAmounts(amountsArray));
}
const spanishMonths = ["enero","febrero","marzo","abril","mayo","junio",
                        "julio","agosto","septiembre","octubre","noviembre","diciembre"];
const spanishDateRegex = new RegExp("([\\d]+) de ("+ spanishMonths.join("|")+") de ([\\d]{4})");
const spanishTimeRegex = /([\d]+):([\d]{2}) (a. m.|p. m.)/;
export function parseSpanishDate(dateString) {
    let day = 0, month = 0, year = 0, hours = 0, minutes = 0;
    let dateMatch = spanishDateRegex.exec(dateString);
    if(!dateMatch || dateMatch.length != 4) return null;
    day = parseInt(dateMatch[1]);
    month = spanishMonths.indexOf(dateMatch[2]);
    year = parseInt(dateMatch[3]);

    let timeMatch = dateString.match(spanishTimeRegex);
    if(timeMatch && timeMatch.length == 4) {
        hours = parseInt(timeMatch[1]);
        minutes = parseInt(timeMatch[2]);
        if(timeMatch[3] == 'p. m.') hours += 12;
    }
    let result = moment(new Date(year,month,day,hours,minutes,0,0)).format("ll");
    return result;
}
