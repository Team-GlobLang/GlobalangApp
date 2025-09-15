import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import ChangePassword from "../feautures/Auth/Page/ChangePassword.vue";
import { canUserAcces } from "../feautures/Auth/Services/AuthServices";

const routes = [
  {
    path: "/",
    name: "Home",
    component: StartPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

const publicPages = [
  "/login",
  "/register",
  "/forgetPassword",
  "/changePassword",
];

router.beforeEach(async (to) => {
  if (publicPages.includes(to.path)) return true;

  const canAccess = await canUserAcces(to.path);
  if (!canAccess) return "/login";

  return true;
});

export default router;
