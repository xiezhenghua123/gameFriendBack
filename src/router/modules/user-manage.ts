/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 21:42:58
 */
import userManage from "/@/assets/svg/user-manage.svg?component";
import student from "/@/assets/svg/student.svg?component";
import administrator from "/@/assets/svg/administrator.svg?component";

const Layout = () => import("/@/layout/index.vue");

const userRouter = {
  path: "/user-manage",
  name: "user-manage",
  component: Layout,
  redirect: "/user-manage/user",
  meta: {
    icon: userManage,
    title: "用户管理"
  },
  children: [
    {
      path: "/user",
      name: "user",
      component: () => import("/@/views/user-manage/user/index.vue"),

      meta: {
        icon: student,
        title: "学生管理"
      }
    },
    {
      path: "/administrator",
      name: "administrator",
      component: () => import("/@/views/user-manage/administrator/index.vue"),
      meta: {
        icon: administrator,
        title: "管理员管理"
      }
    }
  ]
};

export default userRouter;
