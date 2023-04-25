import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'login', component: Login, },
        { path: '/home', name: 'home', component: Home, }

    ]
});

export default router;