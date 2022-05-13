/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 14:40:24
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 15:04:37
 */

import invitation from "/@/assets/svg/invitation.svg?component";

const invitationRouter = {
  path: "/invitation",
  name: "invitation",
  component: () => import("/@/views/invitation/index.vue"),
  meta: {
    icon: invitation,
    title: "帖子管理"
  }
};

export default invitationRouter;
