/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-18 00:25:28
 */
import data from "/@/assets/svg/data.svg?component";

const dataRouter = {
  path: "/data-static",
  name: "data-static",
  component: () => import("/@/views/data-static/index.vue"),
  meta: {
    icon: data,
    title: "数据统计"
  }
};

export default dataRouter;
