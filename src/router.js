import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home/Home.vue';
import Dashboard from './pages/Home/Dashboard.vue';
import Art from './pages/Home/Art/Art.vue';
import DetailArt from './pages/Home/Art/Detail.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'login', component: Login, },
        {
            path: '/admin',
            name: 'admin',
            component: Home,
            children: [
                {
                    path: '',
                    component: Dashboard,
                    name: 'dashboard'
                },
                {
                    path: 'art',
                    component: Art,
                    name: 'art',

                },
                {
                    path: 'art/detail',
                    component: DetailArt
                }
            ]
        },

    ]
});

export default router;