import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../feautures/Home/Page/HomePage.vue";
import {
  ChangePassword,
  ForgetPassword,
  Login,
  Register,
  StartPage,
} from "../feautures/Auth/Page";
import {
  QuizStudio,
  CreateQuiz,
  AvailablesQuizzes,
  MyQuizzes,
  ResolveQuiz,
  QuizInfo,
  ReviewQuiz,
} from "../feautures/Quiz/page";
import {
  JoinAsMasterColab,
  JoinAsCasualColab,
} from "../feautures/Colaborators/Page";
import { User, ChangeInfo } from "../feautures/User/Pages";
import {
  AvailableShorts,
  AudioHomePage,
  CreateShort,
  MyShorts,
  MyFavoriteShorts,
} from "../feautures/ShortAudio/Page";
import Studio from "../feautures/Studio/Page/Studio.vue";
import Ranking from "../feautures/Ranking/Page/Ranking.vue";
import { userStore } from "@UserStore";
import SuccesPayment from "../feautures/Payment/Pages/SuccesPayment.vue";
import ErrorPayment from "../feautures/Payment/Pages/ErrorPayment.vue";

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
        path: "availables",
        name: "Quizzes",
        component: AvailablesQuizzes,
      },
      {
        path: "info/:id",
        name: "QuizInfo",
        component: QuizInfo,
        
      },
      {
        path: "resolve/:id",
        name: "ResolveQuiz",
        component: ResolveQuiz,
        meta: { showBottomBar: false },
      },
    ],
  },
  {
    path: "/short",
    children: [
      {
        path: "",
        name: "Short-audio",
        component: AvailableShorts,
      },
      {
        path: "favorite-shorts",
        name: "Favorite-Shorts",
        component: MyFavoriteShorts,
      },
    ],
  },
  {
    path: "/studio",
    children: [
      {
        path: "",
        name: "Studio",
        component: Studio,
        meta: {roles: [ "MASTER", "COLLABORATOR"] }
      },
      {
        path: "quiz",
        children: [
          {
            path: "",
            name: "QuizStudio",
            component: QuizStudio,
            meta: {roles: ["MASTER"]}
          },
          {
            path: "create-quiz",
            name: "NewQuiz",
            component: CreateQuiz,
            meta: {roles: ["MASTER"]}
          },
          {
            path: "my-quiz",
            name: "MyQuiz",
            component: MyQuizzes,
            meta: {roles: ["MASTER"]}
          },
          {
            path: "review-my-quiz/:id",
            name: "ReviewQuiz",
            component: ReviewQuiz,
            props: true,
            meta: {roles: ["MASTER"]}
          },
        ],
      },
      {
        path: "short",
        children: [
          {
            path: "",
            name: "shorts-home",
            component: AudioHomePage,
            meta: {roles: ["MASTER", "COLLABORATOR"]}
          },
          {
            path: "create-short",
            name: "CreateShort",
            component: CreateShort,
            meta: {roles: ["MASTER", "COLLABORATOR"]}
          },
          {
            path: "my-shorts",
            name: "my-shorts",
            component: MyShorts,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "",
        name: "User",
        component: User,
      },
      {
        path: "edit-info",
        name: "EditUserInfo",
        component: ChangeInfo,
      },
    ],
  },
  {
    path: "/ranking",
    children: [
      {
        path: "",
        name: "Ranking",
        component: Ranking,
      },
    ],
  },
  {
    path: "/succes",
    name: "SuccesPay",
    component: SuccesPayment,
    meta: { showBottomBar: false },
  },
  {
    path: "/error",
    name: "ErrorPay",
    component: ErrorPayment,
    meta: { showBottomBar: false },
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

//MASTER, MODERATOR, COLLAB, BASIC
router.beforeEach(async (to) => {
  // Rutas públicas
  if (publicPages.includes(to.path)) return true;

  // Revisar si hay token
  const token = localStorage.getItem("accessToken");
  const store = userStore;
  const user = store.user;

  if (!token || !userStore.user) {
    // No hay token o no hay usuario: redirigir a start/login
    return { name: "start" };
  }
   const allowedRoles = (to.meta?.roles as string[] | undefined) ?? undefined;
   const userRole = user?.role ?? null;

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    console.warn(`Acceso denegado a para rol ${userRole}, ${userStore.user?.membership}`);
    return { name: "Home" };
  }
  // Si quieres, puedes validar token con API
  // const canAccess = await canUserAccess(to.path, token);
  // if (!canAccess) return { name: 'start' };

  return true;
});

export default router;
