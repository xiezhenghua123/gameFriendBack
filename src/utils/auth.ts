/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 21:34:27
 */
import Cookies from "js-cookie";
import { useUserStoreHook } from "/@/store/modules/user";

const TokenKey = "authorized-token";

type paramsMapType = {
  name: string;
  expires: number;
  token: string;
  level: String;
};

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get("authorized-token");
}

export function getLevel() {
  return sessionStorage.getItem("level");
}
// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(dataList) {
  const { data, expires, name } = dataList;
  const token = data.api_token;
  const level = data.level;
  // 提取关键信息进行存储
  const paramsMap: paramsMapType = {
    name,
    expires: Date.now() + parseInt(expires),
    token,
    level
  };
  const dataString = JSON.stringify(paramsMap);
  useUserStoreHook().SET_TOKEN(token);
  useUserStoreHook().SET_NAME(name);
  // expires > 0
  //   ? Cookies.set(TokenKey, dataString, {
  //       expires: expires / 86400000
  //     })
  //   : Cookies.set(TokenKey, dataString);
  Cookies.set(TokenKey, token);
  sessionStorage.setItem("level", level);
  sessionStorage.setItem(TokenKey, dataString);
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.removeItem(TokenKey);
}
