import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import gamesData from "../data/games.json";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About me",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/games",
    name: "Games",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Games.vue"),
    children: [
      {
        path: ":gameId",
        props: true,
        component: () => import("../views/GameDetails.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
