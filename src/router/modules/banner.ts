/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:15:18
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 14:37:42
 */
import banner from "/@/assets/svg/banner.svg?component";

const bannerRouter = {
  path: "/banner-manage",
  name: "banner-manage",
  component: () => import("/@/views/banner/index.vue"),
  meta: {
    icon: banner,
    title: "Banner管理"
  }
};

export default bannerRouter;
