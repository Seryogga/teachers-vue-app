import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	namespaced: true,
	state() {
		return {
			lastFetch: null,
			teachers: [{
					id: 't1',
					firstName: 'John',
					lastName: 'Smith',
					areas: ['school', 'college', 'university'],
					description: "I'm John and I've worked as a teacher for years. Let me help you speak English fluently!",
					hourlyRate: 30
				},
				{
					id: 't2',
					firstName: 'Julie',
					lastName: 'Jones',
					areas: ['school', 'university'],
					description: 'I am Julie and I worked in different states to appove my knowledges. I can help you get your first job or progress in your current role.',
					hourlyRate: 30
				}
			]
		};
	},
	mutations,
	actions,
	getters
};