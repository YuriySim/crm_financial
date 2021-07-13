//Mixin generates cyrrency icons, total bill in other currencies and currency rates against the base currency

export default {
  data() {
    return {
      usd: 0,
      eur: 0,

      curRub: 0,
      curUsd: 0,

      currencies: [],
    }
  },

  methods: {
    generatorIconCurrency() {
      var icon = ''

      if (this.currencyInfo === 'RUB') {
        icon = '₽'
      } else if (this.currencyInfo === 'USD') {
        icon = '$'
      } else icon = '€'

      return icon
    },

    totalBillInOtherCurrencies(totalBill) {
      if (this.currencyInfo === 'RUB') {
        this.eur = (totalBill / this.curRub).toFixed(2)
        this.usd = (this.eur * this.curUsd).toFixed(2)
      } else if (this.currencyInfo === 'USD') {
        this.eur = (totalBill / this.curUsd).toFixed(2)
      } else {
        this.usd = (totalBill * this.curUsd).toFixed(2)
      }
    },

    currenciesCalculate() {
      this.curRub = this.currencies['RUB']
      this.curUsd = this.currencies['USD']

      var cury = []

      if (this.currencyInfo === 'RUB') {
        var base = this.currencies['RUB']

        for (var cur in this.currencies) {
          this.currencies[cur] = +(this.currencies[cur] / base).toFixed(3)
        }
      } else if (this.currencyInfo === 'USD') {
        var base = this.currencies['USD']

        for (var cur in this.currencies) {
          this.currencies[cur] = +(this.currencies[cur] / base).toFixed(2)
        }
      } else {
        for (var cur in this.currencies) {
          this.currencies[cur] = +(this.currencies[cur] * 1).toFixed(2)
        }
      }
    },
  },

  async mounted() {
    this.currencies = (await this.$store.dispatch('fetchCurrency'))[1].rates

    await this.currenciesCalculate()
  },

  computed: {
    currencyInfo() {
      return this.$store.getters.info.currency
    },
  },
}
