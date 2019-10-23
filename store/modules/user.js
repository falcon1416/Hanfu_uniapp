const state = {
  uid:'',
  name:'',
  avatar:'',
  sex:'',
  isAdmin:'',
}

const mutations = {
	SET_UID: (state, value) => {
		state.uid = value
	},
	SET_NAME: (state, value) => {
		state.name = value
	},
	SET_AVATAR: (state, value) => {
		state.avatar = value
	},
	SET_SEX: (state, value) => {
		state.sex = value
	},
	SET_ADMIN: (state, value) => {
		state.isAdmin = value
	},
}

const actions = {
	setUID({ commit }, value) {
		commit('SET_UID', value)
	},
	setName({ commit }, value) {
		commit('SET_NAME', value)
	},
	setSex({ commit }, value) {
		commit('SET_SEX', value)
	},
	setAvatar({ commit }, value) {
		commit('SET_AVATAR', value)
	},
	setAdmin({ commit }, value) {
		commit('SET_ADMIN', value)
	},
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}