/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 20:46:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 16:44:11
 */
import { http } from "../utils/http";

export const addGame = (data: Object) => {
  return http.request("post", "/game/add", { data });
};

export const removeGame = (data: String) => {
  return http.request("delete", `/game/${data}`);
};

export const editGame = (data: Object, id: String) => {
  return http.request("put", `/game/${id}`, { data });
};

export const getGameDetails = (data: Object) => {
  return http.request("get", "/game", { data });
};
export const getGame = (page: String, data: Object) => {
  return http.get(`/game/list/${page}`, {
    params: {
      uid: data["uid"]
    }
  });
};
export const imageUpload = data => {
  const param = new FormData();
  param.append("image", data);
  data = param;
  return http.request(
    "post",
    "/image",
    { data },
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
};
