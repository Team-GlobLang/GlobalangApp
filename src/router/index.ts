import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import AudioRecorderPage from "../feautures/ShortAudio/Page/AudioRecorderPage.vue";
import ChangePassword from "../feautures/Auth/Page/ChangePassword.vue";
import HomePage from "../feautures/Home/Page/HomePage.vue";
import JoinAsMasterColab from "../feautures/Colaborators/Page/JoinAsMasterColab.vue";
import JoinAsCasualColab from "../feautures/Colaborators/Page/JoinAsCasualColab.vue";
import NavBarLayout from "../layouts/NavBarLayout.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: StartPage,
    meta: { showBottomBar: false },
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { showBottomBar: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { showBottomBar: false },
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { showBottomBar: false },
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { showBottomBar: false },
  },
  {
    path: "/coloaborators",
    children: [
      {
        path: "join-master",
        name: "MasterRequest",
        component: JoinAsMasterColab,
        meta: { showBottomBar: false },
      },
      {
        path: "join-casual",
        name: "CasualRequest",
        component: JoinAsCasualColab,
        meta: { showBottomBar: false },
      },
    ],
  },
  {
    path: "/quiz",
    name: "Quiz",
    children: [
      {
        path: "",
        name: "",
        component: NavBarLayout, //Esta solamente de ejemplo para un path index
      },
    ],
  },
  {
    path: "/studio",
    name: "Studio",
    component: AudioRecorderPage
  },
  {
    path: "/user",
    name: "User",
    children: [
      {
        path: "",
        name: "",
        component: NavBarLayout, //Esta solamente de ejemplo para un path index
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

//const publicPages = [
//  "/",
//  "/login",
//  "/register",
//  "/forgetPassword",
//  "/changePassword",
//];

//router.beforeEach(async (to) => {
//  if (publicPages.includes(to.path)) return true;
//
//  const canAccess = await canUserAcces(to.path);
//  if (!canAccess) return "/login";
//
//  return true;
//});

export default router;
