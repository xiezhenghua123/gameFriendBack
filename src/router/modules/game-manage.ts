/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 22:36:03
 */
import gameManage from "/@/assets/svg/game_manage.svg?component";

const gameRouter = {
  path: "/game-manage",
  name: "game-manage",
  component: () => import("/@/views/gameManage/index.vue"),
  meta: {
    icon: gameManage,
    title: "比赛管理"
  }
};

export default gameRouter;
