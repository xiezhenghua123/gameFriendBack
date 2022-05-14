/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 16:32:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 20:19:41
 */
import { http } from "../utils/http";

export const uploadStudy = (data: Object) => {
  return http.request("post", "study/upload", { data });
};

export const getStudyList = (page: String) => {
  return http.request("get", `study/list/${page}`);
};
export const deleteStudy = (id: String) => {
  return http.request("delete", `study/${id}`);
};
