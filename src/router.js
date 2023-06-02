import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home/Home.vue';
import Dashboard from './pages/Home/Dashboard.vue';
import Art from './pages/Home/Art/Art.vue';
import Order from './pages/Home/Order/Order.vue';
import DetailArt from './pages/Home/Art/Detail.vue';
import Customer from './pages/Home/Customer/Customer.vue';
import DetailCustomer from './pages/Home/Customer/Detail.vue';


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
                    path: 'customer',
                    component: Customer,
                    name: 'customer',

                },
                {
                    path: 'order',
                    component: Order,
                    name: 'order',

                },
                {
                    path: 'art/detail/:id',
                    component: DetailArt,
                    name: 'detail-art'
                },
                {
                    path: 'customer/detail/:id',
                    component: DetailCustomer,
                    name: 'detail-customer'
                }
            ]
        },

    ]
});

function isAuthentication(){
    return localStorage.getItem('token') !== null
}

router.beforeEach(async(to, form)=>{

    if(to.name != 'login' && !isAuthentication()){
        return {name:'login'}
    }else if(to.name == 'login' && isAuthentication()){
        console.log('as')
        return {name:'admin'}
   }
});

export default router;