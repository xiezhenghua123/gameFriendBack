/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-09 15:17:17
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 16:30:24
 */
import { http } from "../utils/http";

export const getInvitationList = (page: String) => {
  return http.get(`posts/list/${page}`, {
    params: {
      uid: "n"
    }
  });
};

export const deleteInvitation = (id: String) => {
  return http.request("delete", `api/posts/${id}`);
};

export const getComments = (id: String) => {
  return http.request("get", `posts/${id}/comment`);
};
