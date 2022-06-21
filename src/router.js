import {
	createRouter,
	createWebHistory
} from 'vue-router';

import TeacherDetails from './pages/teachers/TeacherDetails.vue';
import TeacherRegistration from './pages/teachers/TeacherRegistration.vue';
import TeachersList from './pages/teachers/TeachersList.vue';
import ContactTeacher from './pages/requests/ContactTeacher.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';


const router = createRouter({
	history: createWebHistory(),
	routes: [{
			path: '/',
			redirect: '/teachers'
		},
		{
			path: '/teachers',
			component: TeachersList,
		},
		{
			path: '/teachers/:id',
			component: TeacherDetails,
			props: true,
			children: [{
				path: 'contact', // /teachers/t1/contact
				component: ContactTeacher,
			}, ]
		},
		{
			path: '/register',
			component: TeacherRegistration,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/requests',
			component: RequestsReceived,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/auth',
			component: UserAuth,
			meta: {
				requiresUnauth: true
			}
		},
		{
			path: '/:notFound(.*)',
			component: NotFound
		},
	]
});

router.beforeEach(function (to, _, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/teachers');
	} else {
		next();
	}
});

export default router;