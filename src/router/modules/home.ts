/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:33:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 14:34:18
 */

import data from "/@/assets/svg/data.svg?component";
const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: data,
    title: "首页",
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "首页",
        i18n: true
      }
    }
  ]
};

export default homeRouter;
