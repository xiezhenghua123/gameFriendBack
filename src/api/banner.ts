/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 16:32:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 19:19:42
 */
import { http } from "../utils/http";

export const uploadBanner = (data: Object) => {
  return http.request("post", "banner/upload", { data });
};

export const getBanList = (page: String) => {
  return http.request("get", `banner/list/${page}`);
};
export const deleteBanner = (id: String) => {
  return http.request("delete", `banner/${id}`);
};
