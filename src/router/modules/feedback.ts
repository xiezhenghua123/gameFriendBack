/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:44:54
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 14:47:21
 */
import feedback from "/@/assets/svg/feedback.svg?component";

const feedbackRouter = {
  path: "/feedback",
  name: "feedback",
  component: () => import("/@/views/welcome.vue"),
  meta: {
    icon: feedback,
    title: "用户意见反馈"
  }
};

export default feedbackRouter;
