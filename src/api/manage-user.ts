/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-12 20:14:44
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 10:36:40
 */
import { http } from "../utils/http";

export const getManagerList = () => {
  return http.get("manager/list");
};

export const addManager = (data: Object) => {
  return http.post("manager/add", { data });
};

export const removeManager = (id: String) => {
  return http.request("delete", `manager/${id}`);
};
