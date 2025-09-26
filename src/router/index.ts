import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import AudioRecorderPage from "../feautures/ShortAudio/Page/AudioRecorderPage.vue";
import TeacherPage from "../feautures/ShortAudio/Page/TeacherPage.vue";
import AudioListenPage from "../feautures/ShortAudio/Page/AudioListenPage.vue";
import ListPage from "../feautures/ShortAudio/Page/ListPage.vue";
import FavoriteAudio from "../feautures/ShortAudio/Page/FavoriteAudio.vue";
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
  {
    path: "/short-audio/quiz",
    name: "AudioRecorderPage",
    component: AudioRecorderPage,
  },
  {
    path: "/short-audio/teacher",
    name: "TeacherPage",
    component: TeacherPage,
  },
  {
    path: "/short-audio/listen",
    name: "AudioListenPage",
    component: AudioListenPage,
  },
  {
    path: "/short-audio/audio-list",
    name: "ListPage",
    component: ListPage,
  },
  {
    path: "/short-audio/favorite",
    name: "FavoriteAudio",
    component: FavoriteAudio,
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
  "/",
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
