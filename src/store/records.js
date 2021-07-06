import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ dispatch, commit }, { formData, directory }) {
      try {
        const uid = await dispatch('getUserId')

        return await firebase
          .database()
          .ref(`/users/${uid}/records/${directory}`)
          .push(formData)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchRecords({ dispatch, commit }, { directory }) {
      try {
        const uid = await dispatch('getUserId')

        const records =
          (await firebase
            .database()
            .ref(`/users/${uid}/records/${directory}`)
            .once('value')).val() || {}

        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchRecordById({ dispatch, commit }, { idRecord, directory }) {
      try {
        const uid = await dispatch('getUserId')

        const record =
          (await firebase
            .database()
            .ref(`/users/${uid}/records/${directory}`)
            .child(idRecord)
            .once('value')).val() || {}

        return { ...record, idRecord }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async checkRecordById({ dispatch, commit }, { idRecord }) {
      try {
        const uid = await dispatch('getUserId')

        const record =
          (await firebase
            .database()
            .ref(`/users/${uid}/records/income`)
            .child(idRecord)
            .once('value')).val() || {}

        if (record.key) {
          return 'income'
        } else return 'outcome'
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async updateRecord({ dispatch, commit }, { formDataRec, idRecord, directory }) {
      try {
        const uid = await dispatch('getUserId')

        await firebase
          .database()
          .ref(`/users/${uid}/records/${directory}`)
          .child(idRecord)
          .update(formDataRec)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
