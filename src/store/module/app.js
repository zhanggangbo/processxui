import { getBreadCrumbList, getMenuByRouter, getHomeRoute } from "@/libs/util";
import routers from "@/router/routers";
import config from "@/config";
const { homeName } = config;

export default {
  state: {
    breadCrumbList: [],
    homeRoute: {},
  },
  getters: {
    menuList: () => getMenuByRouter(routers),
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
  },
};
