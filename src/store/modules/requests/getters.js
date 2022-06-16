export default {
	requests(state, _, _2, rootGetters) {
		const teacherId = rootGetters.userId;
		return state.requests.filter(req => req.teacherId === teacherId);
	},
	hasRequests(_, getters) {
		return getters.requests && getters.requests.length > 0;
	}
};