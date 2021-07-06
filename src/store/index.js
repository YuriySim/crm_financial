import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import bills from './bills'
import createCategory from './categories'
import records from './records'
import currency from './currency'

export default createStore({
  state: {
    error: null,
  },

  mutations: {
    setError(state, error) {
      state.error = error
    },

    clearError(state) {
      state.error = null
    },
  },

  getters: {
    error: state => state.error,
  },

  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await res.json()
    },
  },

  modules: {
    auth,
    info,
    bills,
    createCategory,
    records,
    currency,
  },
})
