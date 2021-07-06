//vuex module for working with Income and Outcome categories

import firebase from 'firebase/app'

export default {
  actions: {

    async createCategory({ dispatch, commit }, { titleCategory, limitCategory, directory }) {
      try {
        const uid = await dispatch('getUserId')

        const categoryOutcome = await firebase
          .database()
          .ref(`/users/${uid}/categories/${directory}`)
          .push({ titleCategory, limitCategory })

        return { titleCategory, limitCategory, id: categoryOutcome.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async updateCategory({ dispatch, commit }, { titleCategory, limitCategory, idCategory, directory }) {
      try {
        const uid = await dispatch('getUserId')

        await firebase
          .database()
          .ref(`/users/${uid}/categories/${directory}`)
          .child(idCategory)
          .update({ titleCategory, limitCategory })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async createStartCategories({ dispatch, commit }, { titleCategory, directory }) {
      try {
        const uid = await dispatch('getUserId')

        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories/${directory}`)
          .push({ titleCategory })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchCategories({ dispatch, commit }, { directory }) {
      try {
        const uid = await dispatch('getUserId')

        const categories =
          (await firebase
            .database()
            .ref(`/users/${uid}/categories/${directory}`)
            .once('value')).val() || {}

        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchCategoryById({ dispatch, commit }, { idCategory, directory }) {
      try {
        const uid = await dispatch('getUserId')

        const category =
          (await firebase
            .database()
            .ref(`/users/${uid}/categories/${directory}`)
            .child(idCategory)
            .once('value')).val() || {}

        return { ...category, idCategory }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async removeCategory({ dispatch, commit }, { idCategory, directory }) {
      try {
        const uid = await dispatch('getUserId')

        await firebase
          .database()
          .ref(`/users/${uid}/categories/${directory}`)
          .child(idCategory)
          .remove()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
