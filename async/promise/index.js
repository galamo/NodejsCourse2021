const { cars } = require("./data")
const axios = require("axios")
function getCarsFromServer(param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!param) return reject("Missing param")
            resolve(cars[0].Name)
        }, 3000);
    })
}
// getCarsFromServer().then(res => console.log(res)).catch(err => console.log(err))
// getCarsFromServer(1).then(res => console.log(res)).catch(err => console.log(err))
// getCarsFromServer().then(res => console.log(res)).catch(err => console.log(err))
// getCarsFromServer(1).then(res => console.log(res)).catch(err => console.log(err))


 function getCountries() {
    return new Promise((resolve, reject) => {
        axios.get("https://restcountries.eu/rest/v2/all").then(result => {
            // console.log(result.data[0].flag)
            resolve(result.data)
        })
    })
}
const getUrl = (code) => `https://restcountries.eu/rest/v2/currency/${code}`;
async function main() {
    let result;
    try {
        result = await getCountries();
    } catch (ex) {
        //here the error
    }
    const currencies = result.filter(country => Array.isArray(country.currencies))
        .map(country => country.currencies[0])
    console.log(currencies)
    const cur = [currencies[0], currencies[1]]
    const promises = cur.map(c => { return axios.get(getUrl(c.code)) })
    console.log(promises)
    Promise.all(promises).then(result => {
        console.log(result.length)
    })
    // currencies.forEach(async (c) => {
    //     const currency = await axios.get(url)
    // });
}

main()
console.log("Script start")
// getCarsFromServer((result) => { console.log(result[0].Name) })
// getCarsFromServer((result) => { console.log(result[1].Name) })
// getCarsFromServer((result) => { console.log(result[2].Name) })
// getCarsFromServer((result) => { console.log(result[3].Name) })
console.log("Script end")