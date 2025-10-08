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
} from "../feautures/Quiz/page";
import {
  JoinAsMasterColab,
  JoinAsCasualColab,
} from "../feautures/Colaborators/Page";
import { UserInfo, ChangeInfo } from "../feautures/User/Pages";

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
    path: "/studio",
    name: "Studio",
    children: [
      {
        path: "quiz",
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
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "",
        name: "User",
        component: UserInfo,
      },
      {
        path: "edit-info",
        name: "EditUserInfo",
        component: ChangeInfo,
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
