import {
	createStore
} from 'vuex';

import teachersModule from './modules/teachers/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
	modules: {
		teachers: teachersModule,
		requests: requestsModule,
		auth: authModule,
	},
});

export default store;