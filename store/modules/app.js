const state = {
  openid:'',
}

const mutations = {
	SET_OPENID: (state, value) => {
		state.openid = value
	},
}

const actions = {
	setOpenID({ commit }, value) {
		commit('SET_OPENID', value)
	},

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}