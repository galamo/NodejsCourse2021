import axios from "axios"

const URL = "https://restcountries.eu/rest/v2/all"

interface ICountry {
    name: string,
    currencies: Array<string>;
}

async function getCountriesService(): Promise<Array<ICountry>> {
    try {
        const { data } = await axios.get(URL);
        if (!Array.isArray(data)) return;

        return data.map(country => {
            return {
                name: country.name,
                currencies: _getCurrencies(country.currencies)
            }
        })

    } catch {



    }

    function _getCurrencies(currencies: Array<any>): Array<string> {
        if (!Array.isArray(currencies)) return null;
        return currencies.map(currency => currency.code)
    }


}

async function run() {
    const result = await getCountriesService();
    const currenciesArrays = result.map((myCountry) => myCountry.currencies)
    const flatCurrencies = flatten(currenciesArrays)
    const currenciesObj = flatCurrencies.reduce((currenciesObj, currentCurrency) => {
        return { ...currenciesObj, [currentCurrency]: true }
    }, {})
    const finalResult = Object.keys(currenciesObj)
    const requests = finalResult.map(current => { return axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${current},&tsyms=USD`) })
    Promise.all([requests[0], requests[1]]).then((responses: any) => {
        console.log(responses)
    })

}

function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // pop value from stack
        const next = stack.pop();
        if (Array.isArray(next)) {
            // push back array items, won't modify the original input
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // reverse to restore input order
    return res.reverse();
}

run()