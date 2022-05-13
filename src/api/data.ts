/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-12 12:23:22
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 12:24:32
 */
import { http } from "../utils/http";

export const getDataStatic = () => {
  return http.get("statistics");
};
