//vuex module responsible for authentication with firebase

import firebase from 'firebase/app'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async logout({ commit }) {
      await firebase.auth().signOut() //signOut метод очищающий все данные

      commit('clearInfo')
    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')

        await firebase //обращаемся к базеданных
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name: name,
            currency: 'RUB',
            locale: 'ru-RU',
          })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    getUserId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
  },
}
