/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 16:04:11
 */
import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const remainingRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/login.vue"),
    meta: {
      title: $t("menus.hslogin"),
      showLink: false,
      i18n: true,
      rank: 101
    }
  },
  {
    path: "/error/403",
    name: "403",
    component: () => import("/@/views/error/403.vue"),
    meta: {
      title: $t("menus.hsfourZeroOne"),
      i18n: true
    }
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import("/@/views/error/404.vue"),
    meta: {
      title: $t("menus.hsfourZeroFour"),
      i18n: true
    }
  },
  {
    path: "/error/500",
    name: "500",
    component: () => import("/@/views/error/500.vue"),
    meta: {
      title: $t("menus.hsFive"),
      i18n: true
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      icon: "home-filled",
      title: $t("menus.hshome"),
      i18n: true,
      showLink: false,
      rank: 104
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "redirect",
        component: () => import("/@/layout/redirect.vue")
      }
    ]
  }
];

export default remainingRouter;
