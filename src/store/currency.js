export default {
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER

      const cur = 'symbols=AUD,GBP,HKD,ILS,CAD,CNY,KRW,MXN,NZD,NOK,PLN,RUB,SGD,USD,TRY,CZK,SEK,CHF,ZAR,JPY'

      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&${cur}`)

      return await res.json()
    },
  },
}
