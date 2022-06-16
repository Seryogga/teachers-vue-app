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
		},
		{
			path: '/requests',
			component: RequestsReceived,
		},
		{
			path: '/auth',
			component: UserAuth,
		},
		{
			path: '/:notFound(.*)',
			component: NotFound
		},
	]
});

export default router;