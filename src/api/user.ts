/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 10:51:16
 */
import { http } from "../utils/http";

interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// 获取验证码
export const getVerify = (): userType => {
  return http.request("get", "/captcha");
};

// 登录
export const getLogin = (data: object) => {
  return http.request("post", "/manager/login", { data });
};

export const getUserList = (page: Number) => {
  return http.get(`user/list/${page}`);
};

export const disableUser = (id: String, data: Object) => {
  return http.request("put", `${id}/update`, { data });
};
// 刷新token
// export const refreshToken = (data: object) => {
//   return http.request("post", "/refreshToken", { data });
// };

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
