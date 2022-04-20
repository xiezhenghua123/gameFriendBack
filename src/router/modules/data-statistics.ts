/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:40:24
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 14:42:31
 */

import data from "/@/assets/svg/data.svg?component";

const dataStatisticsRouter = {
  path: "/data-statistics",
  name: "data-statistics",
  component: () => import("/@/views/welcome.vue"),
  meta: {
    icon: data,
    title: "数据统计"
  }
};

export default dataStatisticsRouter;
