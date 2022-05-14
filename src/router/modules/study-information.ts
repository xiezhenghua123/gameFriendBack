/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-14 19:51:57
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 19:57:11
 */
import study from "/@/assets/svg/study.svg?component";

const studyRouter = {
  path: "/study-manage",
  name: "study-manage",
  component: () => import("/@/views/study-information/index.vue"),
  meta: {
    icon: study,
    title: "学习资料管理"
  }
};

export default studyRouter;
