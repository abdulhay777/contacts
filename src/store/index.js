import { createStore } from 'vuex'
const storage_name = 'contacts'

export default createStore({
  state: {
    contacts: JSON.parse(localStorage.getItem(storage_name) || '[]')
  },
  actions: {
    AddContact({commit, dispatch}, contact) {
      commit('setAddContact', contact)
      dispatch('SaveData')
    },
    DeleteContact({commit, dispatch}, contact_id) {
      commit('setDeleteContact', contact_id)
      dispatch('SaveData')
    },
    EditContact({commit, dispatch}, contact) {
      commit('setEditContact', contact)
      dispatch('SaveData')
    },
    CheckEmail({state}, contact) {
      return state.contacts.filter(e => e._id != contact._id).some(e => e.email == contact.email)
    },
    CheckPhone({state}, contact) {
      return state.contacts.filter(e => e._id != contact._id).some(e => e.phone_number == contact.phone_number)
    },
    SaveData({state}) {
      localStorage.setItem(storage_name, JSON.stringify(state.contacts))
    }
  },
  mutations: {
    setAddContact(state, contact) {
      contact._id = state.contacts.length + 1
      state.contacts.push(contact)
    },
    setEditContact(state, contact) {
      state.contacts = state.contacts.map(e => {
        if (e._id == contact._id) return contact
        else return e
      })
    },
    setDeleteContact(state, contact_id) {
      state.contacts = state.contacts.filter(contact => contact._id != contact_id)
    }
  }
})