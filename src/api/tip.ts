/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-11 14:46:16
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 15:50:37
 */
import { http } from "../utils/http";

export const getTipList = (page: Number) => {
  return http.get(`tip/list/${page}`);
};

export const handle = (id: String, data: Object) => {
  return http.request("put", `tip/${id}`, { data });
};
