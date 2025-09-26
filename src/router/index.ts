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
    path: "/short-audio",
    children: [
      {
        path: "quiz", //!!Deberia ser phrase o short o words algo referente al contenido
        name: "AudioRecorderPage",
        component: AudioRecorderPage,
      },
      {
        path: "teacher", //!! solicitud de profesor la realiza akion
        name: "TeacherPage",
        component: TeacherPage,
      },
      {
        path: "listen", //! Esta pantalla pertenece a moderadores, el componente esta bien pero el boton revisado esta de mas. el doble marco se puede remover y utilizarlos en scroll
        name: "AudioListenPage",
        component: AudioListenPage,
      },
      {
        path: "audio-list",
        name: "ListPage",//! El nombre de la page se usa para router y demas, debe ser algo vinvulado al contenido ej. AudioList 
        component: ListPage,
      },
      {
        path: "favorite",
        name: "FavoriteAudio", //! Este nombre y ruta estan bien, el contenido puede ser en ves de horizontal vertical. el horizontal es que se utilizara en pantalla de incio
        component: FavoriteAudio,
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
