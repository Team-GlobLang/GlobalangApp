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
import { canUserAcces } from "../feautures/Auth/Services/AuthServices";

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
      },
      {
        path: "quiz",
        children: [
          {
            path: "",
            name: "QuizStudio",
            component: QuizStudio,
          },
          {
            path: "create-quiz",
            name: "NewQuiz",
            component: CreateQuiz,
          },
          {
            path: "my-quiz",
            name: "MyQuiz",
            component: MyQuizzes,
          },
          {
            path: "review-my-quiz/:id",
            name: "ReviewQuiz",
            component: ReviewQuiz,
            props: true,
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
          },
          {
            path: "create-short",
            name: "CreateShort",
            component: CreateShort,
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
  "/ranking",
  "/succes",
  "/error",
  "/quiz/info/:id",
  "/quiz/resolve/:id",
  "/user/edit-info",
  "/user",
];

function isPublic(toPath: string) {
  return publicPages.some((route) => {
    if (route.includes(":id")) {
      const regex = new RegExp(
        "^" + route.replace(":id", "[a-zA-Z0-9_-]+") + "$"
      );
      return regex.test(toPath);
    }
    return route === toPath;
  });
}

//MASTER, MODERATOR, COLLAB, BASIC
router.beforeEach(async (to) => {
  // Rutas públicas
  if (isPublic(to.path)) return true;

  // Revisar si hay token
  const token = localStorage.getItem("accessToken");

  if (!token || !userStore.user) {
    return { name: "start" };
  }
  const canAccess = await canUserAcces(to.path);
  if (!canAccess) return { name: "start" };
  return true;
});

export default router;
