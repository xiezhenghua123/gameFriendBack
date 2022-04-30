/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 17:30:30
 */
import { App, Component } from "vue";
import {
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  ElForm,
  ElFormItem,
  ElUpload,
  ElDatePicker,
  ElCascader,
  ElTable,
  ElTableColumn,
  ElPagination,
  // 指令
  ElLoading,
  ElInfiniteScroll,
  ElImage
} from "element-plus";

// Directives
const plugins = [ElLoading, ElInfiniteScroll];

const components = [
  ElPagination,
  ElTable,
  ElTableColumn,
  ElCascader,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElUpload,
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  ElImage
];

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component);
  });
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin);
  });
}
