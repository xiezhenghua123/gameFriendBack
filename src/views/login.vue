<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { storageSession } from "/@/utils/storage";
import { addClass, removeClass } from "/@/utils/operate";
import bg from "/@/assets/login/bg.png";
import avatar from "/@/assets/login/avatar.svg?component";
import illustration from "/@/assets/login/illustration.svg?component";
import { useUserStoreHook } from "/@/store/modules/user";
import { errorMessage } from "/@/utils/message";

const router = useRouter();

let user = ref();
let pwd = ref();

const onLogin = (): void => {
  useUserStoreHook()
    .loginByUsername({
      phone: user.value,
      password: pwd.value
    })
    .then(code => {
      if (code) {
        router.push("/");
      } else {
        errorMessage("账号或密码错误！");
      }
    });
};

function onUserFocus() {
  addClass(document.querySelector(".user"), "focus");
}

function onUserBlur() {
  if (user.value.length === 0)
    removeClass(document.querySelector(".user"), "focus");
}

function onPwdFocus() {
  addClass(document.querySelector(".pwd"), "focus");
}

function onPwdBlur() {
  if (pwd.value.length === 0)
    removeClass(document.querySelector(".pwd"), "focus");
}
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <illustration />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100
            }
          }"
        >
          赛事寻友后台管理平台
        </h2>
        <div
          class="input-group user focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-user" width="14" height="14" />
          </div>
          <div class="flex">
            <label style="width: 60px">用户名:</label>
            <el-input
              type="text"
              v-model="user"
              style="flex: 1"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          class="input-group pwd focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 300
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-lock" width="14" height="14" />
          </div>
          <div class="flex">
            <label style="width: 60px">密码:</label>
            <el-input
              type="password"
              v-model="pwd"
              style="flex: 1"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <button
          class="btn"
          v-motion
          :initial="{
            opacity: 0,
            y: 10
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400
            }
          }"
          @click="onLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
