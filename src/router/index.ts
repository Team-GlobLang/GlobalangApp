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

export default router;
