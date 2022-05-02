<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-02 08:59:21
-->
<script setup lang="ts">
import logo from "/@/assets/svg/logo.svg?component";
import { getCurrentInstance } from "vue";
const props = defineProps({
  collapse: Boolean
});

const title =
  getCurrentInstance().appContext.config.globalProperties.$config?.Title;
console.log(title);
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <logo
          style="
            width: 35px;
            height: 35px;
            background-color: #ccc;
            border-radius: 50%;
          "
        />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link
        v-else
        key="expand"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <logo
          style="
            width: 35px;
            height: 35px;
            background-color: #ccc;
            border-radius: 50%;
          "
        />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 5px;

    .sidebar-title {
      color: #1890ff;
      font-weight: 600;
      font-size: 16px;
      margin-top: 10px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }

  .collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
