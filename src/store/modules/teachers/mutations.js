export default {
	registerTeacher(state, payload) {
		state.teachers.push(payload);
	},
	setTeachers(state, payload) {
		state.teachers = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime();
	}
};