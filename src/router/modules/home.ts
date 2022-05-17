/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:33:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-18 00:26:39
 */

import gameManage from "/@/assets/svg/game_manage.svg?component";
const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: gameManage,
    title: "比赛管理",
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "比赛管理",
        i18n: true
      }
    }
  ]
};

export default homeRouter;
