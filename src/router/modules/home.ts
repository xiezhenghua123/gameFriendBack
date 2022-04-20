/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:33:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 14:41:59
 */

const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "home-filled",
    title: "首页",
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: "首页",
        i18n: true
      }
    }
  ]
};

export default homeRouter;
