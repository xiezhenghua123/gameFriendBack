/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 01:38:38
 */
import { defineStore } from "pinia";
import { initRouter } from "/@/router/utils";
import { store } from "/@/store";
import { userType } from "./types";
import { router } from "/@/router";
import { storageSession } from "/@/utils/storage";
import { getLogin } from "/@/api/user";
import { getToken, setToken, removeToken } from "/@/utils/auth";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";

const data = getToken();
let token = "";
const name = "";
if (data) {
  token = data;
}

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    token,
    name
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME(name) {
      this.name = name;
    },
    // 登入
    async loginByUsername(data) {
      return new Promise<Boolean>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data["code"] === 0) {
              setToken(data);
              initRouter(
                data["data"]["level"] == 0 ? "superAdmin" : "admin"
              ).then(() => {});
              storageSession.setItem("info", {
                username: data["data"]["name"],
                accessToken: data["data"]["api_token"],
                id: data["data"]["id"],
                level: data["data"]["level"]
              });
              this.SET_NAME(data["data"]["name"]);
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出 清空缓存
    logOut() {
      this.token = "";
      this.name = "";
      removeToken();
      storageSession.clear();
      useMultiTagsStoreHook().handleTags("equal", [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "menus.hshome",
            icon: "home-filled",
            i18n: true
          }
        }
      ]);
      router.push("/login");
    }
    // 刷新token
    // async refreshToken(data) {
    //   return refreshToken(data).then(data => {
    //     if (data) {
    //       setToken(data);
    //       return data;
    //     }
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
