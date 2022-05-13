/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 00:45:55
 */
import { usePermissionStoreHook } from "/@/store/modules/permission";
import { Directive } from "vue";
import type { DirectiveBinding } from "vue";

export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (value) {
      const authRoles = value;
      const hasAuth = usePermissionStoreHook().buttonAuth.includes(authRoles);
      if (!hasAuth) {
        el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-auth=\"['admin','test']\"");
    }
  }
};
