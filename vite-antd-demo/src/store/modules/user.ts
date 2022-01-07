export const user = {
  state: () => ({
    form: {
      name: '',
      artist: '',
      album: ''
    }
  }),

  actions: {
    setName( { commit }, data ){
      commit( 'setName', data );
    }
  },

  mutations: {
    setName( state, name ){
      state.form.name = name;
    }
  },

  getters: {
    getForm( state ){
      return state.form
    }
  }
}