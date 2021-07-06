export default {
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER

      const cur = 'symbols=AUD,GBP,HKD,ILS,CAD,CNY,KRW,MXN,NZD,NOK,PLN,RUB,SGD,USD,TRY,CZK,SEK,CHF,ZAR,JPY'

      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&${cur}`)

      return await res.json()
    },

    /*async fetchCurrencyInfo() {
      var url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/currency'
      var token = '8d762b78ff023bed00fcd7b5c2ced19b5acd6744'
      var query = 'RUB'

      var options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({ query: query }),
      }

      const resInfo = fetch(url, options).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))

      return await resInfo
    },*/
  },
}
