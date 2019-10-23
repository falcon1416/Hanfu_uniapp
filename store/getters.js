const getters = {
	openid: state => state.app.openid,
	
	uid: state => state.user.uid,
	name: state => state.user.name,
	avatar: state => state.user.avatar,
	sex: state => state.user.sex,
	isAdmin: state => state.user.isAdmin
}
export default getters