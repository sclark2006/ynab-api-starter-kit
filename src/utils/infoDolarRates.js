import cheerio from 'cheerio';
import currency from './currency.min.js';

export function loadRates() {
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
                    buying_rate : $(rowData[headers['compra']]).data("order").trim(),
                    selling_rate : $(rowData[headers['venta']]).data("order").trim(),
                    last_updated : $(rowData[rowData.length - 1]).text(),
                };                
                rate.buying_rate = currency(rate.buying_rate, { decimal: '.', separator: ',' }).format();
                rate.selling_rate =  currency(rate.selling_rate, { decimal: '.', separator: ',' }).format();
                infoDolarData[index] = rate;
            });

            return Promise.resolve(infoDolarData);
        });
}

