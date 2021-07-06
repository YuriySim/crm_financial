//vuex module responsible for getting and updating user information

import firebase from 'firebase/app'

export default {
  actions: {
    async createBill({ dispatch, commit }, { titleBill, amount }) {
      try {
        const uid = await dispatch('getUserId')

        const bill = await firebase
          .database()
          .ref(`/users/${uid}/bills`)
          .push({ titleBill, amount })

        return { titleBill, amount, id: bill.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async updateBills({ dispatch, commit }, { amount, titleBill, idBill }) {
      try {
        const uid = await dispatch('getUserId')

        await firebase
          .database()
          .ref(`/users/${uid}/bills`)
          .child(idBill)
          .update({ amount, titleBill })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchBills({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId')

        const bills =
          (await firebase
            .database()
            .ref(`/users/${uid}/bills`)
            .once('value')).val() || {}

        return Object.keys(bills).map(key => ({ ...bills[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async removeBills({ dispatch, commit }, idBill) {
      try {
        const uid = await dispatch('getUserId')

        await firebase
          .database()
          .ref(`/users/${uid}/bills`)
          .child(idBill)
          .remove()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
