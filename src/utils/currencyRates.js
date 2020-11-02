import cheerio from 'cheerio';
import {toCurrency,parseSpanishDate, sumAmounts} from './formatting.js';

export default {
    currencies: ['USD','EUR','DOP'],
    symbols: ['$','€','RD$'],
    currencyRateInfo(account, default_currency) {
        let note = account.note;
        if(!note) return null;
        let match = note.match(/\((.*)\)/);
        if (!match || match.length < 2) return null;
        let accountConfig = match[1].split(",");
        let isoCode = accountConfig[0] || default_currency.iso_code;
        let symbol = this.symbols[this.currencies.indexOf(isoCode)];
        return  {
            iso_code:  isoCode,
            bank: accountConfig[1] && accountConfig[1].trim(),
            rate: accountConfig[2] || 0,
            currency_symbol: symbol,
            isForeign: isoCode !== default_currency.iso_code
          }
      
      },
    loadRates() {
        return fetch('https://cors-anywhere.herokuapp.com/https://www.infodolar.com.do', {
            //fetch("/infodolar.html",{
                //mode: 'no-cors',
            }).then(resp => {
                if(!resp.ok)
                    throw new Error(" Not Ok. Status:"+resp.statusText);
                return resp.text();
            }).then(html => {
                const $ = cheerio.load(html);
                let infoDolarData = [];
                let headers = [];
                $("#Dolar > thead > tr > th").each((index,element) => {
                    headers[$(element).text().trim().toLowerCase()] = index;
                });
                
                $("#Dolar > tbody > tr").each((index,element) => {
                    let rowData = $(element).find("td");

                    let rate = {
                        entity : $(rowData[headers['entidad']]).text().trim(),
                        buying_rate : toCurrency($(rowData[headers['compra']]).data("order")),
                        selling_rate : toCurrency($(rowData[headers['venta']]).data("order")),
                        last_updated : $(rowData[rowData.length - 1]).text().trim()
                        
                    };
                    rate.last_updated = parseSpanishDate(rate.last_updated);
                    let variacion = toCurrency($(rowData[headers['variación']]).data("order"));
                    if(parseInt(variacion) >= 99) {
                        rate.buying_rate = toCurrency(Math.min(parseFloat(rate.buying_rate), parseFloat(rate.selling_rate)));
                        rate.selling_rate = rate.buying_rate;
                    }
                    
                    infoDolarData[index] = rate;
                });
                let avg_buying = sumAmounts(infoDolarData.map(x => parseFloat(x.buying_rate))) / 
                    infoDolarData.filter(x => x.buying_rate > 0).length;
                let avg_selling = sumAmounts(infoDolarData.map(x => parseFloat(x.selling_rate))) / 
                    infoDolarData.filter(x => x.selling_rate > 0).length;

                return Promise.resolve({
                    rates: infoDolarData,
                    aggregate: {
                        avg_buying_rate: avg_buying ,
                        avg_selling_rate: avg_selling
                    }
                });
            });
    }    
} 
