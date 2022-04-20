/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-18 16:29:54
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

// 刷新token
// export const refreshToken = (data: object) => {
//   return http.request("post", "/refreshToken", { data });
// };

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
