import Main from "@/components/main";

/**
 * processx中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  icon: 该页面在左侧菜单和面包屑的图标
 * }
 */

export default [
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: "首页",
          icon: "md-home",
        },
        component: () => import("@/view/home"),
      },
    ],
  },
  {
    path: "/process",
    name: "process",
    meta: {
      icon: "md-settings",
      title: "流程管理",
    },
    component: Main,
    children: [
      {
        path: "page",
        name: "page",
        meta: {
          icon: "md-list-box",
          title: "流程列表",
        },
        component: () => import("@/view/process"),
      },
      {
        path: "node/:processId",
        name: "node",
        meta: {
          icon: "md-git-network",
          title: "流程节点",
          hideInMenu: true,
        },
        component: () => import("@/view/process/node"),
      },
    ],
  },

  {
    path: "/process_instance",
    name: "process_instance",
    meta: {
      icon: "md-build",
      title: "流程实例管理",
    },
    component: Main,
    children: [
      {
        path: "page",
        name: "instance_page",
        meta: {
          icon: "md-clipboard",
          title: "流程实例列表",
        },
        component: () => import("@/view/instance"),
      },
    ],
  },
];
