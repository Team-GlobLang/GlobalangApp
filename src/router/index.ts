import { createRouter, createWebHistory } from 'vue-router';
import Login from '../feautures/Auth/Page/Login.vue';
import Register from '../feautures/Auth/Page/Register.vue';
import ForgetPassword from '../feautures/Auth/Page/ForgetPassword.vue';
import StartPage from '../feautures/Auth/Page/StartPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: StartPage
  },
  {
    path: '/login',
    name: 'Login',
    component:  Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },


  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
