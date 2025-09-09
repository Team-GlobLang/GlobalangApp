import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import Home_Moderators from "../feautures/moderators/pages/Home_Moderators.vue";
import Quizz_request from "../feautures/moderators/pages/Quizz_request.vue";
import Request_Colaborator from "../feautures/moderators/pages/Request_Colaborator.vue";
import Colaborator_Request_View from "../feautures/moderators/pages/Colaborator_Request_View.vue";
import Audio_Request_Moderator from "../feautures/moderators/pages/Audio_Request_Moderator.vue";

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
    path: "/home/moderator",
    name: "Home_Moderator",
    component: Home_Moderators,
  },
  {
    path: "/request/quiz/moderator",
    name: "Request_Quizz_Moderator",
    component: Quizz_request,
  },
  {
    path: "/request/colaborator/moderator",
    name: "Request_colaborator_Moderator",
    component: Request_Colaborator,
  },
  {
    path: "/request/colaborator/view/moderator",
    name: "Request_colaborator_View_Moderator",
    component: Colaborator_Request_View,
  },
  {
    path: "/request/audio/moderator",
    name: "Request_colaborator_audio_Moderator",
    component: Audio_Request_Moderator,
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
